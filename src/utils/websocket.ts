import { RUST_WEBSOCKET_URL } from 'src/config-global';

const wsUrl = RUST_WEBSOCKET_URL;

type OrderBookRequest = {
  id: string;
  exchange: string;
  pair: string;
};

export type OrderBookEntry = {
  price: number;
  quantity: number;
};

type OrderBookUpdateResponse = {
  eventTime: number;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
};

export class WebSocketClient {
  _connected: boolean = false;

  _socket: WebSocket | null = null;

  _priceData: OrderBookUpdateResponse | null = null;

  _pendingRequests: Array<() => void> = [];

  _onMessageCallback: ((data: OrderBookUpdateResponse) => void) | null = null;

  constructor() {
    this._connect = this._connect.bind(this);
    this.requestOrderBookData = this.requestOrderBookData.bind(this);
    this._onMessage = this._onMessage.bind(this);
  }

  static _createOrderBookRequest(pair: string, exchange: string): OrderBookRequest | null {
    if (!pair || !exchange) {
      console.error('[WS] Could not create order book request: invalid request body');
      return null;
    }
    return {
      id: crypto.randomUUID(),
      exchange,
      pair,
    };
  }

  _connect() {
    if (this._connected || this._socket) return; // Prevent duplicate connections

    this._socket = new WebSocket(wsUrl);

    this._socket.onopen = () => {
      console.log('[WS] Connected');
      this._connected = true;

      // Process pending requests
      this._pendingRequests.forEach((callback) => callback());
      this._pendingRequests = [];
    };

    this._socket.onmessage = this._onMessage; // Use the bound onMessage handler

    this._socket.onclose = () => {
      console.warn('[WS] WebSocket closed. Attempting to reconnect...');
      this._connected = false;
      this._socket = null;
      setTimeout(() => this._connect(), 1000); // Reconnect after delay
    };

    this._socket.onerror = (error) => {
      console.error('[WS] WebSocket error:', error);
      if (this._socket) {
        this._socket.close();  // Close socket and attempt reconnect
      }
    };
  }

  _onMessage(event: MessageEvent) {
    try {
      const response = JSON.parse(event.data);

      const orderBookUpdate: OrderBookUpdateResponse = {
        eventTime: response.event_time,
        bids: response.bids.map((entry: { price: string; quantity: string }) => ({
          price: parseFloat(entry.price),
          quantity: parseFloat(entry.quantity),
        })),
        asks: response.asks.map((entry: { price: string; quantity: string }) => ({
          price: parseFloat(entry.price),
          quantity: parseFloat(entry.quantity),
        })),
      };

      this._priceData = orderBookUpdate;

      if (this._onMessageCallback) {
        this._onMessageCallback(orderBookUpdate);
      }
    } catch (ex) {
      console.error('[WS] Failed to parse order book data:', ex);
      this._priceData = null;
    }
  }

  setOnMessageCallback(callback: (data: OrderBookUpdateResponse) => void) {
    this._onMessageCallback = callback;
  }

  requestOrderBookData(pair: string, exchange: string) {
    if (!this._socket || !this._connected) {
      console.error('[WS] Cannot request order book data, WebSocket is not open yet. Queueing request.');

      this._pendingRequests.push(() => this.requestOrderBookData(pair, exchange));
      return;
    }

    const request = WebSocketClient._createOrderBookRequest(pair, exchange);
    if (request == null) return;

    try {
      this._socket.send(JSON.stringify(request));
      console.log(`[WS] Requested order book for ${pair} on ${exchange}`);
    } catch (error) {
      console.error('[WS] Error sending request:', error);
    }
  }

  get isConnected() {
    return this._connected;
  }

  get priceData() {
    return this._priceData;
  }
}

export const webSocketClient = new WebSocketClient();
webSocketClient._connect();
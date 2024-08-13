const wsUrl = process.env.NEXT_PUBLIC_RUST_WEBSOCKET_URL || '';

type OrderBookRequest = {
  id: string;
  exchange: string;
  pair: string;
};

export class WebSocketClient {
  _connected: boolean = false;

  _socket: WebSocket | null = null;

  constructor() {
    // Bind functions
    this._connect = this._connect.bind(this);
  }

  static _createOrderBookRequest(pair: string, exchange: string): OrderBookRequest | null {
    if (pair == null || exchange == null) {
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
    if (!this._connected) {
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        this._socket = socket;
        this._connected = true;
      };

      socket.onclose = () => {
        setTimeout(() => this._connect(), 1000);
        this._socket = null;
        this._connected = false;
      };

      socket.onerror = (error) => {
        socket.close();
        this._socket = null;
        this._connected = false;
      };

      socket.onmessage = (message) => {
        // TODO: handle
        console.log(message);
      };
    }
  }

  disconnect() {
    if (this._socket && this._connected) {
      this._socket.close();
      this._socket = null;
      this._connected = false;
    }
  }

  requestOrderBookData(pair: string, exchange: string) {
    if (this._socket == null || !this._connected) {
      console.error('[WS] Cannot request order book data, WebSocket is not open');
      return;
    }

    const request = WebSocketClient._createOrderBookRequest(pair, exchange);
    if (request == null) {
      return;
    }

    this._socket.send(JSON.stringify(request));
  }

  get isConnected() {
    return this._connected;
  }
}

export const webSocketClient = new WebSocketClient();
webSocketClient._connect();

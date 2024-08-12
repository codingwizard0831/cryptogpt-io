const wsUrl = process.env.NEXT_PUBLIC_RUST_WEBSOCKET_URL || '';

const ws = new WebSocket(wsUrl);

export const requestOrderBookData = (pair: string) => {
  if (pair == null) {
    return;
  }

  ws.send(`pair: ${pair}`);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onopen = () => {
  console.info('WebSocket connected!');
};

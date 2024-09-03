'use client';

import { useRef, useState, useEffect } from 'react';

import {
  Box,
  Stack,
  Table,
  alpha,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';

import { OrderBookEntry, webSocketClient } from 'src/utils/websocket';
import { fNumberPrice } from 'src/utils/format-number';

import { MAIN_CHART_PANEL } from 'src/layouts/config-layout';

import Iconify from 'src/components/iconify';

const fixedOrderBookNumber = 11;

export default function DashboardOrderBook() {
  const [sellOrders, setSellOrders] = useState<OrderBookEntry[] | []>([]);
  const [buyOrders, setBuyOrders] = useState<OrderBookEntry[] | []>([]);
  const orderBookContainer = useRef<HTMLDivElement>(null);
  const [currentSelectedSellOrder, setCurrentSelectedSellOrder] = useState(sellOrders.length - 1);
  const [currentSelectedBuyOrder, setCurrentSelectedBuyOrder] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [sumBTC, setSumBTC] = useState(0);
  const [sumUSDT, setSumUSDT] = useState(0);
  const [topOfInfoModal, setTopOfInfoModal] = useState('calc(50% - 47px)');
  const [buySellLayout, setBuySellLayout] = useState<'SELL' | 'BUY' | 'BOTH'>('BOTH');

  const [buyPercentage, setBuyPercentage] = useState(50);
  const [sellPercentage, setSellPercentage] = useState(50);
  const [marketPrice, setMarketPrice] = useState(0);
  const [marketPriceDirection, setMarketPriceDirection] = useState('down');

  // Get real-time price updates from trading system
  const [currentSelectedPair, setCurrentSelectedPair] = useState('BTC/USDT'); // TODO: Make pair dynamic
  const [currentSelectedExchange, setCurrentSelectedExchange] = useState('Binance');


  useEffect(() => {
    if (!webSocketClient.isConnected) {
      webSocketClient.setOnConnectedCallback(() => {
        webSocketClient.requestOrderBookData(currentSelectedPair, currentSelectedExchange);
      });
      webSocketClient._connect();
    }
  }, [currentSelectedPair, currentSelectedExchange]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { priceData } = webSocketClient;
      if (priceData) {
        setSellOrders(priceData.asks);
        setBuyOrders(priceData.bids);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currentSelectedPair, currentSelectedExchange]);

  useEffect(() => {
    let totalSellPrice = 0;
    let totalBuyPrice = 0;
    let totalSellBTC = 0;
    let totalBuyBTC = 0;
    let totalSellUSDT = 0;
    let totalBuyUSDT = 0;

    const selectedSellOrders = sellOrders.slice(currentSelectedSellOrder);
    const selectedBuyOrders = buyOrders.slice(0, currentSelectedBuyOrder + 1);

    if (selectedSellOrders.length > 0) {
      totalSellPrice = selectedSellOrders.reduce((sum, order) => sum + order.price, 0);
      totalSellBTC = selectedSellOrders.reduce((sum, order) => sum + order.quantity, 0);
      totalSellUSDT = selectedSellOrders.reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
      );
    }

    if (selectedBuyOrders.length > 0) {
      totalBuyPrice = selectedBuyOrders.reduce((sum, order) => sum + order.price, 0);
      totalBuyBTC = selectedBuyOrders.reduce((sum, order) => sum + order.quantity, 0);
      totalBuyUSDT = selectedBuyOrders.reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
      );
    }

    const avgPrice =
      (totalSellPrice + totalBuyPrice) /
      (selectedSellOrders.length + selectedBuyOrders.length || 1);
    const sumA = totalSellBTC + totalBuyBTC;
    const sumB = totalSellUSDT + totalBuyUSDT;

    // Calculate the buy-sell ratio
    const ratio = totalSellUSDT !== 0 ? totalBuyUSDT / totalSellUSDT : 1;

    const currentBuyPercentage = (ratio / (1 + ratio)) * 100;
    const currentSellPercentage = 100 - buyPercentage;

    if (buyOrders.length > 0 && sellOrders.length > 0) {
      const bestBidPrice = buyOrders[0].price; // Highest bid (first buy order)
      const bestAskPrice = sellOrders[0].price; // Lowest ask (first sell order)
      const currentMarketPrice = (bestBidPrice + bestAskPrice) / 2;

      if (currentMarketPrice > marketPrice) {
        setMarketPriceDirection('up');
      } else if (currentMarketPrice < marketPrice) {
        setMarketPriceDirection('down');
      }

      setMarketPrice(currentMarketPrice);
    }

    // Determine the direction of the price movement

    setBuyPercentage(currentBuyPercentage);
    setSellPercentage(currentSellPercentage);

    setAveragePrice(avgPrice);
    setSumBTC(sumA);
    setSumUSDT(sumB);
  }, [
    currentSelectedSellOrder,
    currentSelectedBuyOrder,
    sellOrders,
    buyOrders,
    buyPercentage,
    sellPercentage,
    marketPrice,
  ]);

  const handleMouseEnterSellOrder = (e: React.MouseEvent, orderIndex: number) => {
    setCurrentSelectedSellOrder(orderIndex);
    if (orderBookContainer.current) {
      const rect = orderBookContainer.current.getBoundingClientRect();
      setTopOfInfoModal(`${e.clientY - rect.top - 32}px`);
    }
  };

  const handleMouseEnterBuyOrder = (e: React.MouseEvent, orderIndex: number) => {
    setCurrentSelectedBuyOrder(orderIndex);
    if (orderBookContainer.current) {
      const rect = orderBookContainer.current.getBoundingClientRect();
      setTopOfInfoModal(`${e.clientY - rect.top - 32}px`);
    }
  };

  return (
    <Box ref={orderBookContainer}>
      <Typography variant="h6">Order Book</Typography>
      <Stack direction="row" spacing={1} sx={{ my: 1 }}>
        <Iconify
          icon="fluent:layout-column-two-split-left-focus-top-left-24-filled"
          onClick={() => setBuySellLayout('BOTH')}
          sx={{
            cursor: 'pointer',
            color: buySellLayout === 'BOTH' ? 'text.primary' : 'text.secondary',
          }}
        />
        <Iconify
          icon="fluent:layout-column-two-focus-left-24-filled"
          onClick={() => setBuySellLayout('BUY')}
          sx={{
            cursor: 'pointer',
            color: buySellLayout === 'BUY' ? 'success.main' : 'text.secondary',
          }}
        />
        <Iconify
          icon="fluent:layout-column-two-16-regular"
          onClick={() => setBuySellLayout('SELL')}
          sx={{
            cursor: 'pointer',
            color: buySellLayout === 'SELL' ? 'error.main' : 'text.secondary',
          }}
        />
      </Stack>

      <Table
        sx={{
          '& td,th': {
            fontSize: '10px',
            padding: '0px',
          },
          '& th': {
            backgroundColor: 'transparent',
          },
          '& tbody tr': {
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.background.opposite, 0.1),
            },
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell width="30%">
              <Typography variant="caption">Price(USDT)</Typography>
            </TableCell>
            <TableCell align="right" width="35%">
              <Typography variant="caption">Quantity(BTC)</Typography>
            </TableCell>
            <TableCell align="right" width="35%">
              <Typography variant="caption">Total</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Box
        sx={{
          maxHeight: `${MAIN_CHART_PANEL.W_DESKTOP - 140}px`,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Table
          sx={{
            '& td,th': {
              fontSize: '10px',
              padding: '0px',
            },
            '& th': {
              backgroundColor: 'transparent',
            },
            '& tbody tr': {
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.background.opposite, 0.1),
              },
            },
          }}
        >
          {buySellLayout !== 'BUY' && (
            <TableBody>
              {(buySellLayout === 'BOTH'
                ? sellOrders.filter((_, _i) => _i < fixedOrderBookNumber)
                : sellOrders
              ).map((_sellOrder, _index) => (
                <TableRow
                  key={`row-key-${_index}`}
                  onMouseEnter={(e) => handleMouseEnterSellOrder(e, _index)}
                  onMouseLeave={() =>
                    setCurrentSelectedSellOrder(
                      buySellLayout === 'BOTH' ? fixedOrderBookNumber - 1 : sellOrders.length - 1
                    )
                  }
                  sx={{
                    backgroundColor:
                      currentSelectedSellOrder <= _index
                        ? (theme) => alpha(theme.palette.error.main, 0.1)
                        : 'transparent',
                  }}
                >
                  <TableCell align="left" width="30%">
                    <Typography
                      variant="caption"
                      align="left"
                      sx={{
                        color: (theme) => theme.palette.error.main,
                      }}
                    >
                      {fNumberPrice(_sellOrder.price, 2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" width="35%">
                    <Typography variant="caption" align="right">
                      {fNumberPrice(_sellOrder.quantity)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" width="35%">
                    <Typography variant="caption" align="right">
                      {fNumberPrice(_sellOrder.price * _sellOrder.quantity)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mt: buySellLayout !== 'BUY' ? 1 : 0,
          mb: buySellLayout !== 'SELL' ? 1 : 0,
        }}
      >
        <Typography variant="h6" color={marketPriceDirection === 'up' ? 'success.main' : 'error'}>
          {fNumberPrice(marketPrice, 2)}
        </Typography>
        <Iconify
          icon={
            marketPriceDirection === 'up' ? 'mingcute:arrow-up-fill' : 'mingcute:arrow-down-fill'
          }
          sx={{
            color: (theme) =>
              marketPriceDirection === 'up' ? theme.palette.success.main : theme.palette.error.main,
          }}
        />

        <Typography variant="caption" sx={{ ml: 2 }}>
          ${fNumberPrice(marketPrice, 2)}
        </Typography>
      </Stack>

      <Box
        sx={{
          maxHeight: `${MAIN_CHART_PANEL.W_DESKTOP - 140}px`,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Table
          sx={{
            '& td,th': {
              fontSize: '10px',
              padding: '0px',
            },
            '& tbody tr': {
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.background.opposite, 0.1),
              },
            },
          }}
        >
          {buySellLayout !== 'SELL' && (
            <TableBody>
              {(buySellLayout === 'BOTH'
                ? buyOrders.filter((_, _i) => _i > buyOrders.length - fixedOrderBookNumber)
                : buyOrders
              ).map((_buyOrder, _index) => (
                <TableRow
                  key={`row-key-${_index}`}
                  onMouseEnter={(e) => handleMouseEnterBuyOrder(e, _index)}
                  onMouseLeave={() => setCurrentSelectedBuyOrder(0)}
                  sx={{
                    backgroundColor:
                      currentSelectedBuyOrder >= _index
                        ? (theme) => alpha(theme.palette.success.main, 0.1)
                        : 'transparent',
                  }}
                >
                  <TableCell align="left" width="30%">
                    <Typography
                      variant="caption"
                      align="left"
                      sx={{
                        color: (theme) => theme.palette.success.main,
                      }}
                    >
                      {fNumberPrice(_buyOrder.price, 2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" width="35%">
                    <Typography variant="caption" align="right">
                      {fNumberPrice(_buyOrder.quantity)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" width="35%">
                    <Typography variant="caption" align="right">
                      {fNumberPrice(_buyOrder.price * _buyOrder.quantity)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Box>

      {buySellLayout === 'BOTH' && (
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
          <Typography variant="body2">B</Typography>
          <Typography
            variant="caption"
            sx={{
              color: (theme) => theme.palette.success.main,
            }}
          >
            {buyPercentage.toFixed(2)}%
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              borderRadius: '4px',
              flex: 1,
            }}
          >
            <Box
              sx={{
                width: `${buyPercentage}%`,
                height: '4px',
                backgroundColor: (theme) => theme.palette.success.main,
              }}
            />
            <Box
              sx={{
                width: `${sellPercentage}%`,
                height: '4px',
                backgroundColor: (theme) => theme.palette.error.main,
              }}
            />
          </Stack>
          <Typography
            variant="caption"
            sx={{
              color: (theme) => theme.palette.error.main,
            }}
          >
            {sellPercentage.toFixed(2)}%
          </Typography>
          <Typography variant="body2">S</Typography>
        </Stack>
      )}

      <Box
        sx={{
          width: '240px',
          p: 1,
          borderRadius: 1,
          backgroundColor: (theme) => alpha(theme.palette.background.opposite, 0.1),
          backdropFilter: 'blur(10px)',
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          transition: 'all 0.3s',
          position: 'absolute',
          left: '-244px',
          top: topOfInfoModal,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          opacity:
            currentSelectedSellOrder <
              (buySellLayout === 'BOTH' ? fixedOrderBookNumber - 1 : sellOrders.length - 1) ||
              currentSelectedBuyOrder > 0
              ? 1
              : 0,
          visibility:
            currentSelectedSellOrder <
              (buySellLayout === 'BOTH' ? fixedOrderBookNumber - 1 : sellOrders.length - 1) ||
              currentSelectedBuyOrder > 0
              ? 'visible'
              : 'hidden',
        }}
      >
        <Stack direction="row" alignItems="center">
          <Iconify
            icon="hugeicons:chart-average"
            sx={{
              color: (theme) => theme.palette.primary.main,
              mr: 1,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Avg.Price:
          </Typography>

          <Typography
            variant="caption"
            sx={{
              display: 'block',
              flexGrow: 1,
              textAlign: 'right',
            }}
          >
            ≈ ${fNumberPrice(averagePrice)}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Iconify
            icon="mdi:bitcoin"
            sx={{
              color: (theme) => theme.palette.primary.main,
              mr: 1,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Sum BTC:
          </Typography>

          <Typography
            variant="caption"
            color="success"
            sx={{
              display: 'block',
              flexGrow: 1,
              textAlign: 'right',
            }}
          >
            {fNumberPrice(sumBTC)}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Iconify
            icon="token:usdt"
            sx={{
              color: (theme) => theme.palette.primary.main,
              mr: 1,
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Sum USDT:
          </Typography>

          <Typography
            variant="caption"
            color="success"
            sx={{
              display: 'block',
              flexGrow: 1,
              textAlign: 'right',
            }}
          >
            {fNumberPrice(sumUSDT)}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

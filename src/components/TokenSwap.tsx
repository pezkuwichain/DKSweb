import React, { useState } from 'react';
import { ArrowDownUp, Settings, Info, TrendingUp, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const TokenSwap = () => {
  const [fromToken, setFromToken] = useState('PEZ');
  const [toToken, setToToken] = useState('HEZ');
  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  const exchangeRate = fromToken === 'PEZ' ? 2.5 : 0.4;
  const toAmount = fromAmount ? (parseFloat(fromAmount) * exchangeRate).toFixed(4) : '';

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const handleConfirmSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setShowConfirm(false);
      setFromAmount('');
    }, 2000);
  };

  const liquidityData = [
    { pool: 'PEZ/HEZ', tvl: '2.5M', apr: '24.5%', volume: '850K' },
    { pool: 'PEZ/USDT', tvl: '1.8M', apr: '18.2%', volume: '620K' },
    { pool: 'HEZ/USDT', tvl: '1.2M', apr: '21.8%', volume: '480K' }
  ];

  const txHistory = [
    { from: 'PEZ', to: 'HEZ', amount: '1000', rate: '2.48', time: '2 min ago' },
    { from: 'HEZ', to: 'PEZ', amount: '500', rate: '0.41', time: '5 min ago' },
    { from: 'PEZ', to: 'HEZ', amount: '2500', rate: '2.51', time: '12 min ago' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Token Swap</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">From</span>
                <span className="text-sm text-gray-600">Balance: 10,000</span>
              </div>
              <div className="flex gap-3">
                <Input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="text-2xl font-bold border-0 bg-transparent"
                />
                <Button variant="outline" className="min-w-[100px]">
                  {fromToken === 'PEZ' ? '🟣 PEZ' : '🟡 HEZ'}
                </Button>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwap}
                className="rounded-full bg-white border-2"
              >
                <ArrowDownUp className="h-5 w-5" />
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">To</span>
                <span className="text-sm text-gray-600">Balance: 5,000</span>
              </div>
              <div className="flex gap-3">
                <Input
                  type="text"
                  value={toAmount}
                  readOnly
                  placeholder="0.0"
                  className="text-2xl font-bold border-0 bg-transparent"
                />
                <Button variant="outline" className="min-w-[100px]">
                  {toToken === 'PEZ' ? '🟣 PEZ' : '🟡 HEZ'}
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex justify-between text-sm">
                <span>Exchange Rate</span>
                <span className="font-semibold">1 {fromToken} = {exchangeRate} {toToken}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Slippage Tolerance</span>
                <span className="font-semibold">{slippage}%</span>
              </div>
            </div>

            <Button
              className="w-full h-12 text-lg"
              onClick={() => setShowConfirm(true)}
              disabled={!fromAmount || parseFloat(fromAmount) <= 0}
            >
              Swap Tokens
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Liquidity Pools
          </h3>
          <div className="space-y-3">
            {liquidityData.map((pool, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-semibold">{pool.pool}</div>
                  <div className="text-sm text-gray-600">TVL: ${pool.tvl}</div>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-semibold">{pool.apr} APR</div>
                  <div className="text-sm text-gray-600">Vol: ${pool.volume}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {txHistory.map((tx, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{tx.amount} {tx.from}</span>
                  <ArrowDownUp className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Rate: {tx.rate}</span>
                  <span>{tx.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Swap Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Slippage Tolerance</label>
              <div className="flex gap-2 mt-2">
                {['0.1', '0.5', '1.0'].map(val => (
                  <Button
                    key={val}
                    variant={slippage === val ? 'default' : 'outline'}
                    onClick={() => setSlippage(val)}
                    className="flex-1"
                  >
                    {val}%
                  </Button>
                ))}
                <Input
                  type="number"
                  value={slippage}
                  onChange={(e) => setSlippage(e.target.value)}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Swap</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>You Pay</span>
                <span className="font-bold">{fromAmount} {fromToken}</span>
              </div>
              <div className="flex justify-between">
                <span>You Receive</span>
                <span className="font-bold">{toAmount} {toToken}</span>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleConfirmSwap}
              disabled={isSwapping}
            >
              {isSwapping ? 'Swapping...' : 'Confirm Swap'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TokenSwap;
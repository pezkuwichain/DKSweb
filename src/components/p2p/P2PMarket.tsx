import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Search, Filter, TrendingUp, TrendingDown, User, Shield, Clock, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface P2POffer {
  id: string;
  type: 'buy' | 'sell';
  token: 'HEZ' | 'PEZ';
  amount: number;
  price: number;
  paymentMethod: string;
  seller: {
    name: string;
    rating: number;
    completedTrades: number;
    verified: boolean;
  };
  minOrder: number;
  maxOrder: number;
  timeLimit: number;
}

export const P2PMarket: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedToken, setSelectedToken] = useState<'HEZ' | 'PEZ'>('HEZ');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<P2POffer | null>(null);
  const [tradeAmount, setTradeAmount] = useState('');

  const offers: P2POffer[] = [
    {
      id: '1',
      type: 'sell',
      token: 'HEZ',
      amount: 10000,
      price: 0.95,
      paymentMethod: 'Bank Transfer',
      seller: {
        name: 'CryptoTrader',
        rating: 4.8,
        completedTrades: 234,
        verified: true
      },
      minOrder: 100,
      maxOrder: 5000,
      timeLimit: 30
    },
    {
      id: '2',
      type: 'sell',
      token: 'HEZ',
      amount: 5000,
      price: 0.96,
      paymentMethod: 'PayPal',
      seller: {
        name: 'TokenMaster',
        rating: 4.9,
        completedTrades: 567,
        verified: true
      },
      minOrder: 50,
      maxOrder: 2000,
      timeLimit: 15
    },
    {
      id: '3',
      type: 'buy',
      token: 'PEZ',
      amount: 15000,
      price: 1.02,
      paymentMethod: 'Crypto',
      seller: {
        name: 'PezWhale',
        rating: 4.7,
        completedTrades: 123,
        verified: false
      },
      minOrder: 500,
      maxOrder: 10000,
      timeLimit: 60
    },
    {
      id: '4',
      type: 'sell',
      token: 'PEZ',
      amount: 8000,
      price: 1.01,
      paymentMethod: 'Wire Transfer',
      seller: {
        name: 'QuickTrade',
        rating: 4.6,
        completedTrades: 89,
        verified: true
      },
      minOrder: 200,
      maxOrder: 3000,
      timeLimit: 45
    }
  ];

  const filteredOffers = offers.filter(offer => 
    offer.type === activeTab && 
    offer.token === selectedToken &&
    (searchTerm === '' || offer.seller.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleTrade = (offer: P2POffer) => {
    console.log('Initiating trade:', tradeAmount, offer.token, 'with', offer.seller.name);
    // Implement trade logic
  };

  return (
    <div className="space-y-6">
      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400">HEZ Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$0.95</div>
            <div className="flex items-center text-green-500 text-xs mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.3%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400">PEZ Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$1.02</div>
            <div className="flex items-center text-red-500 text-xs mt-1">
              <TrendingDown className="w-3 h-3 mr-1" />
              -0.8%
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$2.4M</div>
            <p className="text-xs text-gray-500 mt-1">1,234 trades</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-400">Active Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">342</div>
            <p className="text-xs text-gray-500 mt-1">89 verified sellers</p>
          </CardContent>
        </Card>
      </div>

      {/* P2P Trading Interface */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white">P2P Market</CardTitle>
          <CardDescription className="text-gray-400">
            Buy and sell tokens directly with other users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'buy' | 'sell')} className="flex-1">
                <TabsList className="grid w-full max-w-[200px] grid-cols-2">
                  <TabsTrigger value="buy">Buy</TabsTrigger>
                  <TabsTrigger value="sell">Sell</TabsTrigger>
                </TabsList>
              </Tabs>

              <Select value={selectedToken} onValueChange={(v) => setSelectedToken(v as 'HEZ' | 'PEZ')}>
                <SelectTrigger className="w-[120px] bg-gray-800 border-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HEZ">HEZ</SelectItem>
                  <SelectItem value="PEZ">PEZ</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1 max-w-xs">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search sellers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </div>

            {/* Offers List */}
            <div className="space-y-3">
              {filteredOffers.map((offer) => (
                <Card key={offer.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{offer.seller.name}</span>
                            {offer.seller.verified && (
                              <Badge variant="secondary" className="bg-blue-600/20 text-blue-400">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>⭐ {offer.seller.rating}</span>
                            <span>{offer.seller.completedTrades} trades</span>
                            <span>{offer.paymentMethod}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="text-lg font-bold text-white">
                          ${offer.price} / {offer.token}
                        </div>
                        <div className="text-sm text-gray-400">
                          Available: {offer.amount.toLocaleString()} {offer.token}
                        </div>
                        <div className="text-xs text-gray-500">
                          Limits: {offer.minOrder} - {offer.maxOrder} {offer.token}
                        </div>
                      </div>

                      <Button 
                        className="ml-4 bg-green-600 hover:bg-green-700"
                        onClick={() => setSelectedOffer(offer)}
                      >
                        {activeTab === 'buy' ? 'Buy' : 'Sell'} {offer.token}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trade Modal */}
      {selectedOffer && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>
              {activeTab === 'buy' ? 'Buy' : 'Sell'} {selectedOffer.token} from {selectedOffer.seller.name}
            </CardTitle>
            <CardDescription>Complete your P2P trade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Amount ({selectedOffer.token})</Label>
              <Input
                type="number"
                placeholder={`Min: ${selectedOffer.minOrder}, Max: ${selectedOffer.maxOrder}`}
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div className="bg-gray-800 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Price per {selectedOffer.token}</span>
                <span className="text-white">${selectedOffer.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Amount</span>
                <span className="text-white font-semibold">
                  ${(parseFloat(tradeAmount || '0') * selectedOffer.price).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment Method</span>
                <span className="text-white">{selectedOffer.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Time Limit</span>
                <span className="text-white">{selectedOffer.timeLimit} minutes</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => handleTrade(selectedOffer)}
              >
                Confirm {activeTab === 'buy' ? 'Purchase' : 'Sale'}
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedOffer(null)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
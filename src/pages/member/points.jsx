// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Star, Gift, History, Exchange } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const mockPoints = {
  total: 2580,
  available: 1980,
  frozen: 600
};
const mockPointsHistory = [{
  id: '1',
  type: 'earn',
  amount: 100,
  description: '完成订单',
  time: '2024-03-15 14:30',
  balance: 2580
}, {
  id: '2',
  type: 'spend',
  amount: 200,
  description: '兑换优惠券',
  time: '2024-03-10 10:15',
  balance: 2480
}, {
  id: '3',
  type: 'earn',
  amount: 50,
  description: '每日签到',
  time: '2024-03-09 09:00',
  balance: 2680
}, {
  id: '4',
  type: 'spend',
  amount: 300,
  description: '兑换商品',
  time: '2024-03-05 16:45',
  balance: 2630
}];
const mockRewards = [{
  id: '1',
  name: '10元优惠券',
  points: 500,
  image: 'https://images.unsplash.com/photo-1571176094527-9d906d9ba6b7?w=200&h=200&fit=crop',
  description: '满100元可用'
}, {
  id: '2',
  name: '20元优惠券',
  points: 1000,
  image: 'https://images.unsplash.com/photo-1571176094527-9d906d9ba6b7?w=200&h=200&fit=crop',
  description: '满200元可用'
}, {
  id: '3',
  name: '精美礼品盒',
  points: 1500,
  image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=200&fit=crop',
  description: '限量版礼品盒'
}, {
  id: '4',
  name: '50元优惠券',
  points: 2000,
  image: 'https://images.unsplash.com/photo-1571176094527-9d906d9ba6b7?w=200&h=200&fit=crop',
  description: '满500元可用'
}];
export default function Points(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [points] = useState(mockPoints);
  const [pointsHistory] = useState(mockPointsHistory);
  const [rewards] = useState(mockRewards);
  const [activeTab, setActiveTab] = useState('rewards');
  const handleExchange = reward => {
    if (points.available < reward.points) {
      toast({
        title: '积分不足',
        description: '您的可用积分不足以兑换此商品',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: '兑换成功',
      description: `成功兑换${reward.name}`
    });
  };
  const tabs = [{
    key: 'rewards',
    label: '积分兑换',
    icon: Gift
  }, {
    key: 'history',
    label: '积分明细',
    icon: History
  }];
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 积分概览 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">我的积分</h1>
          <Star className="w-6 h-6" />
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold mb-2">{points.total}</p>
          <div className="flex justify-center space-x-6 text-sm">
            <div>
              <p className="opacity-90">可用积分</p>
              <p className="font-medium">{points.available}</p>
            </div>
            <div>
              <p className="opacity-90">冻结积分</p>
              <p className="font-medium">{points.frozen}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 标签切换 */}
      <div className="bg-white p-4 border-b">
        <div className="flex space-x-6">
          {tabs.map(tab => <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center pb-2 border-b-2 ${activeTab === tab.key ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-600'}`}>
              <tab.icon className="w-4 h-4 mr-1" />
              <span className="text-sm">{tab.label}</span>
            </button>)}
        </div>
      </div>

      {/* 内容区域 */}
      {activeTab === 'rewards' ? <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {rewards.map(reward => <Card key={reward.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <img src={reward.image} alt={reward.name} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{reward.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-orange-500 mr-1" />
                        <span className="text-sm font-medium text-orange-600">{reward.points}</span>
                      </div>
                      <Button onClick={() => handleExchange(reward)} size="sm" className="bg-orange-500 hover:bg-orange-600">
                        兑换
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div> : <div className="p-4 space-y-3">
          {pointsHistory.map(record => <Card key={record.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${record.type === 'earn' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {record.type === 'earn' ? <Exchange className="w-4 h-4 text-green-600" /> : <Gift className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900 text-sm">{record.description}</h3>
                      <p className="text-xs text-gray-500">{record.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${record.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                      {record.type === 'earn' ? '+' : '-'}{record.amount}
                    </p>
                    <p className="text-xs text-gray-500">余额: {record.balance}</p>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>}

      <TabBar activeTab="profile" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
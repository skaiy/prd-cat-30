// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { ArrowUp, ArrowDown, Gift } from 'lucide-react';
// @ts-ignore;
import { Badge } from '@/components/ui';

const mockPoints = [{
  id: '1',
  type: 'earn',
  description: '订单消费获得积分',
  points: 110,
  date: '2024-03-15',
  orderId: 'ORD001'
}, {
  id: '2',
  type: 'redeem',
  description: '积分兑换优惠券',
  points: -200,
  date: '2024-03-10',
  orderId: null
}, {
  id: '3',
  type: 'earn',
  description: '订单消费获得积分',
  points: 68,
  date: '2024-03-05',
  orderId: 'ORD002'
}, {
  id: '4',
  type: 'earn',
  description: '新用户注册奖励',
  points: 100,
  date: '2024-03-01',
  orderId: null
}];
export default function Points(props) {
  const {
    $w
  } = props;
  const totalPoints = mockPoints.reduce((sum, record) => sum + record.points, 0);
  const getTypeIcon = type => {
    switch (type) {
      case 'earn':
        return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'redeem':
        return <ArrowDown className="w-4 h-4 text-red-600" />;
      default:
        return <Gift className="w-4 h-4 text-gray-600" />;
    }
  };
  const getTypeColor = points => {
    return points > 0 ? 'text-green-600' : 'text-red-600';
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <h1 className="text-lg font-semibold text-center">积分记录</h1>
      </div>

      {/* 积分总览 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
        <div className="text-center text-white">
          <p className="text-sm opacity-90">当前积分</p>
          <p className="text-3xl font-bold mt-1">{totalPoints}</p>
        </div>
      </div>

      {/* 积分记录列表 */}
      <div className="p-4">
        <div className="space-y-3">
          {mockPoints.map(record => <div key={record.id} className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    {getTypeIcon(record.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{record.description}</p>
                    {record.orderId && <p className="text-xs text-gray-500">订单号: {record.orderId}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${getTypeColor(record.points)}`}>
                    {record.points > 0 ? '+' : ''}{record.points}
                  </p>
                  <p className="text-xs text-gray-500">{record.date}</p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}
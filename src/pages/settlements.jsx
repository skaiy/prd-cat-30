// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Calendar, DollarSign } from 'lucide-react';
// @ts-ignore;
import { Badge } from '@/components/ui';

const mockSettlements = [{
  id: 'SET001',
  period: '2024年3月',
  startDate: '2024-03-01',
  endDate: '2024-03-31',
  totalAmount: 299.99,
  status: '已结算',
  orderCount: 12,
  settlementDate: '2024-04-05'
}, {
  id: 'SET002',
  period: '2024年2月',
  startDate: '2024-02-01',
  endDate: '2024-02-29',
  totalAmount: 456.50,
  status: '已结算',
  orderCount: 18,
  settlementDate: '2024-03-05'
}, {
  id: 'SET003',
  period: '2024年1月',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  totalAmount: 189.00,
  status: '已结算',
  orderCount: 8,
  settlementDate: '2024-02-05'
}];
export default function Settlements(props) {
  const {
    $w
  } = props;
  const getStatusBadge = status => {
    const variants = {
      '已结算': 'success',
      '待结算': 'warning',
      '处理中': 'info'
    };
    return <Badge variant={variants[status] || 'secondary'}>
        {status}
      </Badge>;
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <h1 className="text-lg font-semibold text-center">结算记录</h1>
      </div>

      {/* 结算记录列表 */}
      <div className="p-4">
        <div className="space-y-4">
          {mockSettlements.map(settlement => <div key={settlement.id} className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{settlement.period}</span>
                </div>
                {getStatusBadge(settlement.status)}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">订单数量</span>
                  <span>{settlement.orderCount}笔</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">结算金额</span>
                  <span className="font-bold text-orange-600">¥{settlement.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">结算日期</span>
                  <span>{settlement.settlementDate}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-gray-500">
                  结算周期: {settlement.startDate} 至 {settlement.endDate}
                </p>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
}
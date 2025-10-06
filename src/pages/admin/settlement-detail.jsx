// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Calendar, DollarSign, Package, User, Phone } from 'lucide-react';

import { Sidebar } from '@/components/Sidebar';
const mockSettlement = {
  id: 'SET001',
  memberName: '张三',
  memberPhone: '138****1234',
  period: '2024-03-01 至 2024-03-31',
  totalAmount: 299.99,
  status: '已结算',
  createdAt: '2024-04-01',
  orders: 3,
  ordersList: [{
    id: 'ORD001',
    date: '2024-03-15',
    amount: 89.99,
    items: 3
  }, {
    id: 'ORD002',
    date: '2024-03-10',
    amount: 156.50,
    items: 5
  }, {
    id: 'ORD003',
    date: '2024-03-05',
    amount: 234.00,
    items: 8
  }]
};
export default function SettlementDetail(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [settlement] = useState(mockSettlement);
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
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="settlements" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'admin/dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center">
                  <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">结算详情</h1>
                    <p className="text-gray-600 mt-1">结算单号: {settlement.id}</p>
                  </div>
                </div>
              </div>

              <div className="max-w-4xl space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>结算信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">结算单号</p>
                        <p className="font-medium">{settlement.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">结算状态</p>
                        <p className="font-medium">{getStatusBadge(settlement.status)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">结算周期</p>
                        <p className="font-medium">{settlement.period}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">创建时间</p>
                        <p className="font-medium">{settlement.createdAt}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">结算金额</p>
                        <p className="font-medium text-lg text-orange-600">¥{settlement.totalAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">订单数量</p>
                        <p className="font-medium">{settlement.orders}单</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>会员信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <User className="w-5 h-5 text-gray-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">会员姓名</p>
                          <p className="font-medium">{settlement.memberName}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-500 mr-2" />
                        <div>
                          <p className="text-sm text-gray-600">手机号</p>
                          <p className="font-medium">{settlement.memberPhone}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>订单清单</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">订单号</th>
                            <th className="text-left py-2">日期</th>
                            <th className="text-center py-2">商品数量</th>
                            <th className="text-right py-2">金额</th>
                          </tr>
                        </thead>
                        <tbody>
                          {settlement.ordersList.map((order, index) => <tr key={index} className="border-b">
                              <td className="py-2">{order.id}</td>
                              <td className="py-2">{order.date}</td>
                              <td className="text-center py-2">{order.items}</td>
                              <td className="text-right py-2">¥{order.amount}</td>
                            </tr>)}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" className="text-right py-2 font-medium">总计</td>
                            <td className="text-right py-2 font-medium">¥{settlement.totalAmount}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>;
}
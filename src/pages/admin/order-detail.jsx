// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft } from 'lucide-react';

import { Sidebar } from '@/components/Sidebar';
const mockOrder = {
  id: 'ORD001',
  memberName: '张三',
  memberPhone: '138****1234',
  memberAddress: '北京市朝阳区幸福路123号',
  totalAmount: 89.99,
  status: '待发货',
  orderTime: '2024-03-15 14:30',
  items: [{
    name: '有机苹果',
    quantity: 2,
    price: 12.99,
    total: 25.98
  }, {
    name: '新鲜牛奶',
    quantity: 3,
    price: 7.99,
    total: 23.97
  }, {
    name: '全麦面包',
    quantity: 2,
    price: 5.99,
    total: 11.98
  }]
};
export default function OrderDetail(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [order, setOrder] = useState(mockOrder);
  const handleConfirmDelivery = () => {
    setOrder({
      ...order,
      status: '已发货'
    });
    toast({
      title: '操作成功',
      description: '订单已确认发货'
    });
  };
  const getStatusBadge = status => {
    const variants = {
      '待发货': 'warning',
      '已发货': 'info',
      '已完成': 'success',
      '已取消': 'destructive'
    };
    return <Badge variant={variants[status] || 'secondary'}>
            {status}
          </Badge>;
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="orders" onNavigate={path => $w.utils.navigateTo({
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
                    <h1 className="text-2xl font-bold text-gray-900">订单详情</h1>
                    <p className="text-gray-600 mt-1">订单号: {order.id}</p>
                  </div>
                </div>
              </div>

              <div className="max-w-4xl space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>订单信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">订单状态</p>
                        <p className="font-medium">{getStatusBadge(order.status)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">下单时间</p>
                        <p className="font-medium">{order.orderTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">总金额</p>
                        <p className="font-medium text-lg">¥{order.totalAmount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>收货信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><span className="text-gray-600">收货人：</span>{order.memberName}</p>
                      <p><span className="text-gray-600">手机号：</span>{order.memberPhone}</p>
                      <p><span className="text-gray-600">地址：</span>{order.memberAddress}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>商品清单</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">商品</th>
                          <th className="text-center py-2">数量</th>
                          <th className="text-right py-2">单价</th>
                          <th className="text-right py-2">小计</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, index) => <tr key={index} className="border-b">
                            <td className="py-2">{item.name}</td>
                            <td className="text-center py-2">{item.quantity}</td>
                            <td className="text-right py-2">¥{item.price}</td>
                            <td className="text-right py-2">¥{item.total}</td>
                          </tr>)}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3" className="text-right py-2 font-medium">总计</td>
                          <td className="text-right py-2 font-medium">¥{order.totalAmount}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </CardContent>
                </Card>

                {order.status === '待发货' && <div className="flex justify-end">
                    <Button onClick={handleConfirmDelivery} className="bg-blue-600">
                      确认发货
                    </Button>
                  </div>}
              </div>
            </div>
          </div>
        </div>;
}
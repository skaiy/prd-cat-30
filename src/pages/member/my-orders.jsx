// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const mockOrders = [{
  id: 'ORD001',
  status: '待发货',
  items: [{
    name: '法国进口黄油',
    image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=100&h=100&fit=crop',
    quantity: 2
  }, {
    name: '有机高筋面粉',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop',
    quantity: 1
  }],
  totalAmount: 110.1,
  orderTime: '2024-03-15 14:30',
  address: '北京市朝阳区幸福路123号'
}, {
  id: 'ORD002',
  status: '已发货',
  items: [{
    name: '比利时巧克力豆',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&h=100&fit=crop',
    quantity: 3
  }],
  totalAmount: 204.0,
  orderTime: '2024-03-10 10:15',
  address: '北京市朝阳区幸福路123号'
}, {
  id: 'ORD003',
  status: '已完成',
  items: [{
    name: '新西兰淡奶油',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&h=100&fit=crop',
    quantity: 2
  }],
  totalAmount: 65.0,
  orderTime: '2024-03-05 16:45',
  address: '北京市朝阳区幸福路123号'
}, {
  id: 'ORD004',
  status: '已取消',
  items: [{
    name: '有机白砂糖',
    image: 'https://images.unsplash.com/photo-1565600444102-063f8a7a1e67?w=100&h=100&fit=crop',
    quantity: 5
  }],
  totalAmount: 64.0,
  orderTime: '2024-03-01 09:20',
  address: '北京市朝阳区幸福路123号'
}];
const statusConfig = {
  '待发货': {
    icon: Package,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    badgeVariant: 'warning'
  },
  '已发货': {
    icon: Truck,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    badgeVariant: 'info'
  },
  '已完成': {
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    badgeVariant: 'success'
  },
  '已取消': {
    icon: XCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    badgeVariant: 'destructive'
  }
};
export default function MyOrders(props) {
  const {
    $w
  } = props;
  const [orders, setOrders] = useState(mockOrders);
  const [activeTab, setActiveTab] = useState('all');
  const filteredOrders = activeTab === 'all' ? orders : orders.filter(order => order.status === activeTab);
  const getStatusIcon = status => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return <Icon className={`w-5 h-5 ${config.color}`} />;
  };
  const getStatusBadge = status => {
    const config = statusConfig[status];
    return <Badge variant={config.badgeVariant}>
            {status}
          </Badge>;
  };
  const tabs = [{
    key: 'all',
    label: '全部',
    count: orders.length
  }, {
    key: '待发货',
    label: '待发货',
    count: orders.filter(o => o.status === '待发货').length
  }, {
    key: '已发货',
    label: '已发货',
    count: orders.filter(o => o.status === '已发货').length
  }, {
    key: '已完成',
    label: '已完成',
    count: orders.filter(o => o.status === '已完成').length
  }];
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-lg font-semibold">我的订单</h1>
      </div>

      {/* 订单状态筛选 */}
      <div className="bg-white p-4 border-b">
        <div className="flex space-x-6">
          {tabs.map(tab => <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`pb-2 border-b-2 ${activeTab === tab.key ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-600'}`}>
              <span className="text-sm">{tab.label}</span>
              {tab.count > 0 && <span className="ml-1 px-1.5 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">{tab.count}</span>}
            </button>)}
        </div>
      </div>

      {/* 订单列表 */}
      <div className="p-4 space-y-4">
        {filteredOrders.map(order => <Card key={order.id} className="cursor-pointer" onClick={() => $w.utils.navigateTo({
        pageId: 'member/order-detail',
        params: {
          id: order.id
        }
      })}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className="ml-2 font-medium">{order.status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{order.orderTime}</span>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* 商品列表 */}
                <div className="space-y-2">
                  {order.items.map((item, index) => <div key={index} className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1 ml-3">
                        <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                        <span className="text-sm text-gray-600">x{item.quantity}</span>
                      </div>
                    </div>)}
                </div>

                {/* 订单信息 */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>共{order.items.length}件商品</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">实付金额</p>
                    <p className="text-lg font-bold text-orange-600">¥{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                {/* 收货地址 */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">收货地址：</span>
                  {order.address}
                </div>
              </div>
            </CardContent>
          </Card>)}

        {filteredOrders.length === 0 && <div className="text-center py-8">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">暂无{activeTab === 'all' ? '' : activeTab}订单</p>
          </div>}
      </div>

      <TabBar activeTab="orders" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
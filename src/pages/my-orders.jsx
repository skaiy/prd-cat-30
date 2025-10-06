// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Package, Truck, CheckCircle } from 'lucide-react';
// @ts-ignore;
import { Badge } from '@/components/ui';

import { TabBar } from '@/components/TabBar';
const mockOrders = [{
  id: 'ORD001',
  items: [{
    name: '法国进口黄油',
    quantity: 2,
    price: 45.8
  }, {
    name: '有机高筋面粉',
    quantity: 1,
    price: 18.5
  }],
  totalAmount: 110.1,
  status: '待发货',
  orderTime: '2024-03-15 14:30',
  deliveryTime: null
}, {
  id: 'ORD002',
  items: [{
    name: '比利时巧克力豆',
    quantity: 1,
    price: 68.0
  }],
  totalAmount: 68.0,
  status: '配送中',
  orderTime: '2024-03-14 10:15',
  deliveryTime: '2024-03-15 09:00'
}, {
  id: 'ORD003',
  items: [{
    name: '新西兰淡奶油',
    quantity: 3,
    price: 32.5
  }],
  totalAmount: 97.5,
  status: '已完成',
  orderTime: '2024-03-10 16:45',
  deliveryTime: '2024-03-11 14:30'
}];
export default function MyOrders(props) {
  const {
    $w
  } = props;
  const [activeTab, setActiveTab] = useState('全部');
  const tabs = ['全部', '待发货', '配送中', '已完成'];
  const getStatusIcon = status => {
    switch (status) {
      case '待发货':
        return <Package className="w-4 h-4" />;
      case '配送中':
        return <Truck className="w-4 h-4" />;
      case '已完成':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };
  const getStatusColor = status => {
    switch (status) {
      case '待发货':
        return 'warning';
      case '配送中':
        return 'info';
      case '已完成':
        return 'success';
      default:
        return 'secondary';
    }
  };
  const filteredOrders = activeTab === '全部' ? mockOrders : mockOrders.filter(order => order.status === activeTab);
  const handleOrderClick = order => {
    $w.utils.navigateTo({
      pageId: 'order-detail',
      params: {
        orderId: order.id
      }
    });
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white p-4 border-b">
        <h1 className="text-lg font-semibold text-center">我的订单</h1>
      </div>

      {/* 订单状态标签 */}
      <div className="bg-white px-4 py-3">
        <div className="flex space-x-2">
          {tabs.map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm ${activeTab === tab ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              {tab}
            </button>)}
        </div>
      </div>

      {/* 订单列表 */}
      <div className="p-4">
        {filteredOrders.length === 0 ? <div className="text-center py-8">
            <p className="text-gray-500">暂无订单</p>
          </div> : <div className="space-y-4">
            {filteredOrders.map(order => <div key={order.id} className="bg-white rounded-lg p-4" onClick={() => handleOrderClick(order)}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">订单号: {order.id}</span>
                  <Badge variant={getStatusColor(order.status)}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status}</span>
                  </Badge>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, index) => <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-900">{item.name} x{item.quantity}</span>
                      <span className="text-gray-600">¥{(item.price * item.quantity).toFixed(2)}</span>
                    </div>)}
                </div>

                <div className="border-t mt-3 pt-3 flex justify-between items-center">
                  <span className="text-sm text-gray-600">{order.orderTime}</span>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">总计: </span>
                    <span className="font-bold text-orange-600">¥{order.totalAmount}</span>
                  </div>
                </div>

                {order.deliveryTime && <div className="text-xs text-gray-500 mt-2">
                    送达时间: {order.deliveryTime}
                  </div>}
              </div>)}
          </div>}
      </div>

      <TabBar activeTab="profile" onTabChange={path => $w.utils.navigateTo({
      pageId: path.slice(1)
    })} />
    </div>;
}
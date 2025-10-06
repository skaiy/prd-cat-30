// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Users, ShoppingCart, DollarSign, TrendingUp, Package } from 'lucide-react';

import { Sidebar } from '@/components/Sidebar';
const mockStats = {
  totalMembers: 1234,
  totalOrders: 856,
  totalRevenue: 125680,
  totalProducts: 89
};
const mockRecentOrders = [{
  id: 'ORD001',
  memberName: '张三',
  amount: 89.99,
  status: '待发货',
  time: '10分钟前'
}, {
  id: 'ORD002',
  memberName: '李四',
  amount: 156.50,
  status: '已发货',
  time: '25分钟前'
}, {
  id: 'ORD003',
  memberName: '王五',
  amount: 234.00,
  status: '已完成',
  time: '1小时前'
}, {
  id: 'ORD004',
  memberName: '赵六',
  amount: 78.90,
  status: '待发货',
  time: '2小时前'
}];
const mockRecentMembers = [{
  id: 'MEM001',
  name: '张三',
  phone: '138****1234',
  joinDate: '2024-03-15',
  totalOrders: 5,
  totalAmount: 456.78
}, {
  id: 'MEM002',
  name: '李四',
  phone: '139****5678',
  joinDate: '2024-03-14',
  totalOrders: 3,
  totalAmount: 234.56
}, {
  id: 'MEM003',
  name: '王五',
  phone: '136****9012',
  joinDate: '2024-03-13',
  totalOrders: 8,
  totalAmount: 789.12
}];
export default function Dashboard(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [stats] = useState(mockStats);
  const [recentOrders] = useState(mockRecentOrders);
  const [recentMembers] = useState(mockRecentMembers);
  const getStatusBadge = status => {
    const variants = {
      '待发货': 'warning',
      '已发货': 'info',
      '已完成': 'success',
      '已取消': 'destructive'
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === '待发货' ? 'bg-yellow-100 text-yellow-800' : status === '已发货' ? 'bg-blue-100 text-blue-800' : status === '已完成' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {status}
          </span>;
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="dashboard" onNavigate={path => $w.utils.navigateTo({
      pageId: path
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">商家后台</h1>
                <p className="text-gray-600 mt-1">欢迎回来，管理员</p>
              </div>

              {/* 统计卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">总会员数</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <ShoppingCart className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">总订单数</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <DollarSign className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">总收入</p>
                        <p className="text-2xl font-bold text-gray-900">¥{stats.totalRevenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Package className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">商品总数</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 最近订单和会员 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>最近订单</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.memberName}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">¥{order.amount}</p>
                            <div className="flex items-center justify-end mt-1">
                              {getStatusBadge(order.status)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>新增会员</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentMembers.map((member, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-600">{member.phone}</p>
                            <p className="text-xs text-gray-500">加入时间: {member.joinDate}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">订单: {member.totalOrders}</p>
                            <p className="font-medium text-gray-900">¥{member.totalAmount}</p>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>;
}
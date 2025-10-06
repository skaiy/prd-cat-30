// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Badge, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Phone, Mail, MapPin, Calendar, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

import { Sidebar } from '@/components/Sidebar';
const mockMember = {
  id: 'MEM001',
  name: '张三',
  phone: '138****1234',
  email: 'zhangsan@example.com',
  address: '北京市朝阳区幸福路123号',
  joinDate: '2024-01-15',
  lastOrderDate: '2024-03-10',
  totalOrders: 15,
  totalAmount: 1256.80,
  status: '活跃',
  level: '黄金会员',
  points: 2580,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
};
const mockOrders = [{
  id: 'ORD001',
  date: '2024-03-10',
  amount: 89.99,
  status: '已完成',
  items: 3
}, {
  id: 'ORD002',
  date: '2024-03-05',
  amount: 156.50,
  status: '已完成',
  items: 5
}, {
  id: 'ORD003',
  date: '2024-02-28',
  amount: 234.00,
  status: '已完成',
  items: 8
}, {
  id: 'ORD004',
  date: '2024-02-20',
  amount: 78.90,
  status: '已完成',
  items: 2
}];
export default function MemberDetail(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [member] = useState(mockMember);
  const [orders] = useState(mockOrders);
  const getStatusBadge = status => {
    const variants = {
      '活跃': 'success',
      '普通': 'secondary',
      '新用户': 'info'
    };
    return <Badge variant={variants[status] || 'secondary'}>
            {status}
          </Badge>;
  };
  const getOrderStatusBadge = status => {
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
          <Sidebar activePage="members" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'admin/dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6 flex items-center">
                <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">会员详情</h1>
                  <p className="text-gray-600 mt-1">会员ID: {member.id}</p>
                </div>
              </div>

              <div className="max-w-6xl space-y-6">
                {/* 基本信息 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>基本信息</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center">
                        <Avatar className="w-24 h-24 mb-4">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-semibold">{member.name}</h3>
                        <div className="mt-2">{getStatusBadge(member.status)}</div>
                        <div className="mt-4 w-full space-y-3">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm">{member.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm">{member.email}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm">{member.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm">加入时间: {member.joinDate}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>消费统计</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <ShoppingCart className="w-8 h-8 text-blue-600 mr-3" />
                            <div>
                              <p className="text-sm text-gray-600">总订单数</p>
                              <p className="text-2xl font-bold text-gray-900">{member.totalOrders}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                            <div>
                              <p className="text-sm text-gray-600">总消费金额</p>
                              <p className="text-2xl font-bold text-gray-900">¥{member.totalAmount}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <TrendingUp className="w-8 h-8 text-yellow-600 mr-3" />
                            <div>
                              <p className="text-sm text-gray-600">会员等级</p>
                              <p className="text-2xl font-bold text-gray-900">{member.level}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="flex items-center">
                            <Calendar className="w-8 h-8 text-purple-600 mr-3" />
                            <div>
                              <p className="text-sm text-gray-600">最近下单</p>
                              <p className="text-2xl font-bold text-gray-900">{member.lastOrderDate}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 最近订单 */}
                <Card>
                  <CardHeader>
                    <CardTitle>最近订单</CardTitle>
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
                            <th className="text-center py-2">状态</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => <tr key={index} className="border-b">
                              <td className="py-2">{order.id}</td>
                              <td className="py-2">{order.date}</td>
                              <td className="text-center py-2">{order.items}</td>
                              <td className="text-right py-2">¥{order.amount}</td>
                              <td className="text-center py-2">{getOrderStatusBadge(order.status)}</td>
                            </tr>)}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>;
}
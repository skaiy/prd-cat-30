// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Users, Package, ShoppingCart, CreditCard, TrendingUp, DollarSign } from 'lucide-react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

import { Sidebar } from '@/components/Sidebar';
const stats = [{
  title: '总会员数',
  value: '1,234',
  icon: Users,
  change: '+12%',
  color: 'text-blue-600'
}, {
  title: '产品总数',
  value: '89',
  icon: Package,
  change: '+5%',
  color: 'text-green-600'
}, {
  title: '今日订单',
  value: '45',
  icon: ShoppingCart,
  change: '+8%',
  color: 'text-purple-600'
}, {
  title: '本月收入',
  value: '¥12,345',
  icon: DollarSign,
  change: '+15%',
  color: 'text-orange-600'
}];
const recentOrders = [{
  id: 'ORD001',
  member: '张三',
  amount: 89.99,
  status: '待发货'
}, {
  id: 'ORD002',
  member: '李四',
  amount: 156.50,
  status: '已发货'
}, {
  id: 'ORD003',
  member: '王五',
  amount: 45.00,
  status: '已完成'
}];
export default function Dashboard(props) {
  const {
    $w
  } = props;
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="dashboard" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">仪表盘</h1>
                <p className="text-gray-600 mt-1">欢迎使用管理后台</p>
              </div>

              <div className="grid grid-cols-4 gap-6 mb-8">
                {stats.map(stat => <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.change} 较上月</p>
                    </CardContent>
                  </Card>)}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>最近订单</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map(order => <div key={order.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.member}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">¥{order.amount}</p>
                            <p className="text-xs text-gray-600">{order.status}</p>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>快速操作</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <button onClick={() => $w.utils.navigateTo({
                  pageId: 'members'
                })} className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                        查看会员列表
                      </button>
                      <button onClick={() => $w.utils.navigateTo({
                  pageId: 'products'
                })} className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                        管理产品
                      </button>
                      <button onClick={() => $w.utils.navigateTo({
                  pageId: 'orders'
                })} className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                        处理订单
                      </button>
                      <button onClick={() => $w.utils.navigateTo({
                  pageId: 'settlements'
                })} className="w-full text-left px-4 py-2 rounded hover:bg-gray-100">
                        查看结算
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>;
}
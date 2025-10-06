// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { useToast, Badge } from '@/components/ui';

import { DataTable } from '@/components/DataTable';
import { Sidebar } from '@/components/Sidebar';
const mockOrders = [{
  id: 'ORD001',
  memberName: '张三',
  totalAmount: 89.99,
  status: '待发货',
  orderTime: '2024-03-15 14:30',
  items: 3
}, {
  id: 'ORD002',
  memberName: '李四',
  totalAmount: 156.50,
  status: '已发货',
  orderTime: '2024-03-15 10:15',
  items: 5
}, {
  id: 'ORD003',
  memberName: '王五',
  totalAmount: 45.00,
  status: '已完成',
  orderTime: '2024-03-14 16:45',
  items: 2
}];
export default function Orders(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
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
  const columns = [{
    key: 'id',
    title: '订单号'
  }, {
    key: 'memberName',
    title: '会员姓名'
  }, {
    key: 'totalAmount',
    title: '总金额',
    render: value => `¥${value}`
  }, {
    key: 'status',
    title: '状态',
    render: value => getStatusBadge(value)
  }, {
    key: 'items',
    title: '商品数量'
  }, {
    key: 'orderTime',
    title: '下单时间'
  }];
  const handleRowClick = order => {
    $w.utils.navigateTo({
      pageId: 'order-detail',
      params: {
        orderId: order.id
      }
    });
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="orders" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">订单管理</h1>
                <p className="text-gray-600 mt-1">查看和管理所有订单</p>
              </div>
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <DataTable columns={columns} data={mockOrders} onRowClick={handleRowClick} searchPlaceholder="搜索订单号、会员姓名..." />
                </div>
              </div>
            </div>
          </div>
        </div>;
}
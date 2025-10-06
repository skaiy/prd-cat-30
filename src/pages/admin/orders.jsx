// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye } from 'lucide-react';

import { DataTable } from '@/components/DataTable';
import { Sidebar } from '@/components/Sidebar';
const mockOrders = [{
  id: 'ORD001',
  memberName: '张三',
  memberPhone: '138****1234',
  totalAmount: 89.99,
  status: '待发货',
  orderTime: '2024-03-15 14:30',
  items: 3
}, {
  id: 'ORD002',
  memberName: '李四',
  memberPhone: '139****5678',
  totalAmount: 156.50,
  status: '已发货',
  orderTime: '2024-03-15 10:15',
  items: 5
}, {
  id: 'ORD003',
  memberName: '王五',
  memberPhone: '136****9012',
  totalAmount: 234.00,
  status: '已完成',
  orderTime: '2024-03-14 16:45',
  items: 8
}, {
  id: 'ORD004',
  memberName: '赵六',
  memberPhone: '135****3456',
  totalAmount: 78.90,
  status: '待发货',
  orderTime: '2024-03-14 09:20',
  items: 2
}, {
  id: 'ORD005',
  memberName: '钱七',
  memberPhone: '137****7890',
  totalAmount: 312.80,
  status: '已发货',
  orderTime: '2024-03-13 20:10',
  items: 6
}];
export default function Orders(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const columns = [{
    key: 'id',
    title: '订单号'
  }, {
    key: 'memberName',
    title: '会员姓名'
  }, {
    key: 'memberPhone',
    title: '手机号'
  }, {
    key: 'totalAmount',
    title: '金额',
    render: value => <span className="font-medium">¥{value}</span>
  }, {
    key: 'status',
    title: '状态',
    render: value => <Badge variant={value === '待发货' ? 'warning' : value === '已发货' ? 'info' : value === '已完成' ? 'success' : 'destructive'}>
              {value}
            </Badge>
  }, {
    key: 'orderTime',
    title: '下单时间'
  }, {
    key: 'items',
    title: '商品数量',
    render: value => <span className="text-center">{value}</span>
  }, {
    key: 'actions',
    title: '操作',
    render: (_, record) => <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
        pageId: 'admin/order-detail',
        params: {
          id: record.id
        }
      })}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
  }];
  const filteredOrders = orders.filter(order => order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || order.memberPhone.includes(searchTerm));
  const handleExport = () => {
    toast({
      title: '导出成功',
      description: '订单数据已导出'
    });
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="orders" onNavigate={path => $w.utils.navigateTo({
      pageId: path
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">订单管理</h1>
                    <p className="text-gray-600 mt-1">管理所有订单信息</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleExport}>
                      <Download className="w-4 h-4 mr-2" />
                      导出数据
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="搜索订单号、会员姓名或手机号" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      筛选
                    </Button>
                  </div>
                  <DataTable columns={columns} data={filteredOrders} />
                </div>
              </div>
            </div>
          </div>
        </div>;
}
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye } from 'lucide-react';

import { DataTable } from '@/components/DataTable';
import { Sidebar } from '@/components/Sidebar';
const mockSettlements = [{
  id: 'SET001',
  memberName: '张三',
  memberPhone: '138****1234',
  period: '2024-03-01 至 2024-03-31',
  totalAmount: 299.99,
  status: '已结算',
  createdAt: '2024-04-01',
  orders: 3
}, {
  id: 'SET002',
  memberName: '李四',
  memberPhone: '139****5678',
  period: '2024-03-01 至 2024-03-31',
  totalAmount: 456.80,
  status: '已结算',
  createdAt: '2024-04-01',
  orders: 5
}, {
  id: 'SET003',
  memberName: '王五',
  memberPhone: '136****9012',
  period: '2024-02-01 至 2024-02-29',
  totalAmount: 234.00,
  status: '已结算',
  createdAt: '2024-03-01',
  orders: 2
}, {
  id: 'SET004',
  memberName: '赵六',
  memberPhone: '135****3456',
  period: '2024-02-01 至 2024-02-29',
  totalAmount: 678.50,
  status: '已结算',
  createdAt: '2024-03-01',
  orders: 8
}, {
  id: 'SET005',
  memberName: '钱七',
  memberPhone: '137****7890',
  period: '2024-01-01 至 2024-01-31',
  totalAmount: 312.80,
  status: '已结算',
  createdAt: '2024-02-01',
  orders: 4
}];
export default function Settlements(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [settlements, setSettlements] = useState(mockSettlements);
  const [searchTerm, setSearchTerm] = useState('');
  const columns = [{
    key: 'id',
    title: '结算单号'
  }, {
    key: 'memberName',
    title: '会员姓名'
  }, {
    key: 'memberPhone',
    title: '手机号'
  }, {
    key: 'period',
    title: '结算周期'
  }, {
    key: 'totalAmount',
    title: '金额',
    render: value => <span className="font-medium">¥{value}</span>
  }, {
    key: 'status',
    title: '状态',
    render: value => <Badge variant={value === '已结算' ? 'success' : value === '待结算' ? 'warning' : 'info'}>
              {value}
            </Badge>
  }, {
    key: 'createdAt',
    title: '创建时间'
  }, {
    key: 'orders',
    title: '订单数',
    render: value => <span className="text-center">{value}</span>
  }, {
    key: 'actions',
    title: '操作',
    render: (_, record) => <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
        pageId: 'admin/settlement-detail',
        params: {
          id: record.id
        }
      })}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
  }];
  const filteredSettlements = settlements.filter(settlement => settlement.id.toLowerCase().includes(searchTerm.toLowerCase()) || settlement.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || settlement.memberPhone.includes(searchTerm));
  const handleExport = () => {
    toast({
      title: '导出成功',
      description: '结算数据已导出'
    });
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="settlements" onNavigate={path => $w.utils.navigateTo({
      pageId: path
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">结算管理</h1>
                    <p className="text-gray-600 mt-1">管理会员结算记录</p>
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
                      <Input placeholder="搜索结算单号、会员姓名或手机号" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      筛选
                    </Button>
                  </div>
                  <DataTable columns={columns} data={filteredSettlements} />
                </div>
              </div>
            </div>
          </div>
        </div>;
}
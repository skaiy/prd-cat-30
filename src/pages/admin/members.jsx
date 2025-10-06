// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye } from 'lucide-react';

import { DataTable } from '@/components/DataTable';
import { Sidebar } from '@/components/Sidebar';
const mockMembers = [{
  id: 'MEM001',
  name: '张三',
  phone: '138****1234',
  joinDate: '2024-01-15',
  lastOrderDate: '2024-03-10',
  totalOrders: 15,
  totalAmount: 1256.80,
  status: '活跃'
}, {
  id: 'MEM002',
  name: '李四',
  phone: '139****5678',
  joinDate: '2024-01-20',
  lastOrderDate: '2024-03-08',
  totalOrders: 8,
  totalAmount: 678.50,
  status: '活跃'
}, {
  id: 'MEM003',
  name: '王五',
  phone: '136****9012',
  joinDate: '2024-02-01',
  lastOrderDate: '2024-02-28',
  totalOrders: 3,
  totalAmount: 234.00,
  status: '普通'
}, {
  id: 'MEM004',
  name: '赵六',
  phone: '135****3456',
  joinDate: '2024-02-15',
  lastOrderDate: '2024-03-12',
  totalOrders: 12,
  totalAmount: 987.60,
  status: '活跃'
}, {
  id: 'MEM005',
  name: '钱七',
  phone: '137****7890',
  joinDate: '2024-03-01',
  lastOrderDate: '2024-03-14',
  totalOrders: 5,
  totalAmount: 456.30,
  status: '新用户'
}];
export default function Members(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [members, setMembers] = useState(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const columns = [{
    key: 'avatar',
    title: '头像',
    render: (value, row) => <Avatar className="w-10 h-10">
              <AvatarImage src={value} alt={row.name} />
              <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
            </Avatar>
  }, {
    key: 'name',
    title: '姓名'
  }, {
    key: 'phone',
    title: '手机号'
  }, {
    key: 'joinDate',
    title: '加入时间'
  }, {
    key: 'lastOrderDate',
    title: '最近下单'
  }, {
    key: 'totalOrders',
    title: '订单数'
  }, {
    key: 'totalAmount',
    title: '消费金额',
    render: value => <span className="font-medium">¥{value}</span>
  }, {
    key: 'status',
    title: '状态',
    render: value => <span className={`px-2 py-1 rounded-full text-xs font-medium ${value === '活跃' ? 'bg-green-100 text-green-800' : value === '普通' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
              {value}
            </span>
  }, {
    key: 'actions',
    title: '操作',
    render: (_, record) => <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
        pageId: 'admin/member-detail',
        params: {
          id: record.id
        }
      })}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
  }];
  const filteredMembers = members.filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.phone.includes(searchTerm));
  const handleExport = () => {
    toast({
      title: '导出成功',
      description: '会员数据已导出'
    });
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="members" onNavigate={path => $w.utils.navigateTo({
      pageId: path
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">会员管理</h1>
                    <p className="text-gray-600 mt-1">管理所有会员信息</p>
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
                      <Input placeholder="搜索会员姓名或手机号" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      筛选
                    </Button>
                  </div>
                  <DataTable columns={columns} data={filteredMembers} />
                </div>
              </div>
            </div>
          </div>
        </div>;
}
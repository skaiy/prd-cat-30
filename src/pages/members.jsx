// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { useToast, Avatar, AvatarFallback, AvatarImage, Badge } from '@/components/ui';

import { DataTable } from '@/components/DataTable';
import { Sidebar } from '@/components/Sidebar';
const mockMembers = [{
  id: '1',
  name: '张三',
  phone: '138****1234',
  email: 'zhangsan@example.com',
  points: 1250,
  registerTime: '2024-01-15',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
}, {
  id: '2',
  name: '李四',
  phone: '139****5678',
  email: 'lisi@example.com',
  points: 890,
  registerTime: '2024-02-20',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
}, {
  id: '3',
  name: '王五',
  phone: '137****9012',
  email: 'wangwu@example.com',
  points: 2100,
  registerTime: '2024-01-08',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
}];
export default function Members(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const columns = [{
    key: 'avatar',
    title: '头像',
    render: (value, row) => <Avatar className="w-10 h-10">
              <AvatarImage src={row.avatar} alt={row.name} />
              <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
            </Avatar>
  }, {
    key: 'name',
    title: '姓名'
  }, {
    key: 'phone',
    title: '手机号'
  }, {
    key: 'email',
    title: '邮箱'
  }, {
    key: 'points',
    title: '积分',
    render: value => <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {value}
            </Badge>
  }, {
    key: 'registerTime',
    title: '注册时间'
  }];
  const handleRowClick = member => {
    $w.utils.navigateTo({
      pageId: 'member-detail',
      params: {
        memberId: member.id
      }
    });
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="members" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">会员管理</h1>
                <p className="text-gray-600 mt-1">管理所有会员客户信息</p>
              </div>
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <DataTable columns={columns} data={mockMembers} onRowClick={handleRowClick} searchPlaceholder="搜索会员姓名、手机号..." />
                </div>
              </div>
            </div>
          </div>
        </div>;
}
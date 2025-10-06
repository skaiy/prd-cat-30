// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Label, Card, CardContent, CardHeader, CardTitle, Avatar, AvatarFallback, AvatarImage, Badge } from '@/components/ui';

import { Sidebar } from '@/components/Sidebar';
const mockMember = {
  id: '1',
  name: '张三',
  phone: '13812345678',
  email: 'zhangsan@example.com',
  points: 1250,
  registerTime: '2024-01-15',
  address: '北京市朝阳区',
  birthday: '1990-05-15',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
};
export default function MemberDetail(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [member, setMember] = useState(mockMember);
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: '保存成功',
      description: '会员信息已更新'
    });
  };
  const handleCancel = () => {
    setIsEditing(false);
    setMember(mockMember);
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="members" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">会员详情</h1>
                <p className="text-gray-600 mt-1">查看和编辑会员信息</p>
              </div>

              <div className="max-w-4xl">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>基本信息</CardTitle>
                      {!isEditing && <Button onClick={() => setIsEditing(true)}>编辑</Button>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold">{member.name}</h2>
                        <p className="text-gray-600">会员ID: {member.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>姓名</Label>
                        <Input value={member.name} onChange={e => setMember({
                    ...member,
                    name: e.target.value
                  })} disabled={!isEditing} />
                      </div>
                      <div>
                        <Label>手机号</Label>
                        <Input value={member.phone} onChange={e => setMember({
                    ...member,
                    phone: e.target.value
                  })} disabled={!isEditing} />
                      </div>
                      <div>
                        <Label>邮箱</Label>
                        <Input value={member.email} onChange={e => setMember({
                    ...member,
                    email: e.target.value
                  })} disabled={!isEditing} />
                      </div>
                      <div>
                        <Label>积分</Label>
                        <Input type="number" value={member.points} onChange={e => setMember({
                    ...member,
                    points: parseInt(e.target.value)
                  })} disabled={!isEditing} />
                      </div>
                      <div>
                        <Label>生日</Label>
                        <Input type="date" value={member.birthday} onChange={e => setMember({
                    ...member,
                    birthday: e.target.value
                  })} disabled={!isEditing} />
                      </div>
                      <div>
                        <Label>地址</Label>
                        <Input value={member.address} onChange={e => setMember({
                    ...member,
                    address: e.target.value
                  })} disabled={!isEditing} />
                      </div>
                    </div>

                    {isEditing && <div className="flex space-x-2 mt-6">
                        <Button onClick={handleSave}>保存</Button>
                        <Button variant="outline" onClick={handleCancel}>取消</Button>
                      </div>}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>;
}
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
// @ts-ignore;
import { User, Phone, MapPin, Settings, CreditCard, Gift, Star, LogOut, ChevronRight } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const mockUserInfo = {
  name: '张三',
  phone: '138****1234',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  level: '黄金会员',
  points: 2580,
  joinDate: '2024-01-15'
};
const mockStats = {
  totalOrders: 15,
  totalAmount: 1256.80,
  totalPoints: 2580
};
const menuItems = [{
  icon: User,
  title: '个人信息',
  subtitle: '管理您的个人资料',
  action: () => {}
}, {
  icon: MapPin,
  title: '收货地址',
  subtitle: '管理您的收货地址',
  action: () => {}
}, {
  icon: CreditCard,
  title: '支付方式',
  subtitle: '管理您的支付方式',
  action: () => {}
}, {
  icon: Gift,
  title: '优惠券',
  subtitle: '查看可用优惠券',
  action: () => {}
}, {
  icon: Star,
  title: '我的积分',
  subtitle: `当前积分：${mockStats.totalPoints}`,
  action: () => {}
}, {
  icon: Settings,
  title: '设置',
  subtitle: '账号设置与隐私',
  action: () => {}
}];
export default function Profile(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [userInfo] = useState(mockUserInfo);
  const handleLogout = () => {
    toast({
      title: '退出成功',
      description: '您已成功退出登录'
    });
    setTimeout(() => {
      $w.utils.navigateTo({
        pageId: 'login'
      });
    }, 1000);
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 用户信息卡片 */}
      <div className="bg-gradient-to-b from-orange-500 to-orange-600 text-white p-6">
        <div className="flex items-center">
          <Avatar className="w-20 h-20 border-4 border-white">
            <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
            <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <h1 className="text-2xl font-bold mb-1">{userInfo.name}</h1>
            <div className="flex items-center space-x-3">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">{userInfo.level}</span>
              <span className="text-sm opacity-90">积分：{userInfo.points}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      <Card className="mx-4 -mt-6 mb-4 relative z-10">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalOrders}</p>
              <p className="text-sm text-gray-600">总订单</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">¥{mockStats.totalAmount}</p>
              <p className="text-sm text-gray-600">总消费</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalPoints}</p>
              <p className="text-sm text-gray-600">积分</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 功能菜单 */}
      <div className="px-4 space-y-4">
        {menuItems.map((item, index) => <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" onClick={item.action}>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-green-100' : index === 2 ? 'bg-purple-100' : index === 3 ? 'bg-yellow-100' : index === 4 ? 'bg-orange-100' : 'bg-gray-100'}`}>
                  <item.icon className={`w-5 h-5 ${index === 0 ? 'text-blue-600' : index === 1 ? 'text-green-600' : index === 2 ? 'text-purple-600' : index === 3 ? 'text-yellow-600' : index === 4 ? 'text-orange-600' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1 ml-3">
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>)}

        {/* 退出登录 */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleLogout}>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 ml-3">
                <h3 className="font-medium text-red-600">退出登录</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <TabBar activeTab="profile" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
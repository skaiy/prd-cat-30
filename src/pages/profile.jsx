// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { User, Package, CreditCard, LogOut, ChevronRight, Star, Gift } from 'lucide-react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
const mockUser = {
  name: '张三',
  phone: '138****1234',
  points: 1250,
  level: '黄金会员',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
};
const menuItems = [{
  id: 'my-orders',
  label: '我的订单',
  icon: Package,
  path: '/my-orders'
}, {
  id: 'points',
  label: '积分记录',
  icon: Star,
  path: '/points'
}, {
  id: 'settlements',
  label: '结算记录',
  icon: CreditCard,
  path: '/settlements'
}];
export default function Profile(props) {
  const {
    $w
  } = props;
  const handleLogout = () => {
    $w.utils.navigateTo({
      pageId: 'login'
    });
  };
  const handleMenuClick = path => {
    $w.utils.navigateTo({
      pageId: path.slice(1)
    });
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 用户信息卡片 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
        <div className="flex items-center space-x-4">
          <img src={mockUser.avatar} alt={mockUser.name} className="w-16 h-16 rounded-full border-2 border-white" />
          <div className="text-white">
            <h2 className="text-xl font-semibold">{mockUser.name}</h2>
            <p className="text-sm opacity-90">{mockUser.phone}</p>
            <div className="flex items-center mt-1">
              <Gift className="w-4 h-4 mr-1" />
              <span className="text-sm">{mockUser.level}</span>
            </div>
          </div>
        </div>
        
        {/* 积分信息 */}
        <div className="mt-4 bg-white/10 rounded-lg p-3">
          <div className="flex justify-between items-center text-white">
            <span className="text-sm">可用积分</span>
            <span className="text-xl font-bold">{mockUser.points}</span>
          </div>
        </div>
      </div>

      {/* 功能菜单 */}
      <div className="p-4">
        <div className="space-y-2">
          {menuItems.map(item => <div key={item.id} className="bg-white rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50" onClick={() => handleMenuClick(item.path)}>
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>)}
        </div>

        {/* 退出登录 */}
        <div className="mt-6">
          <div className="bg-white rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50" onClick={handleLogout}>
            <LogOut className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-500">退出登录</span>
          </div>
        </div>
      </div>

      <TabBar activeTab="profile" onTabChange={path => $w.utils.navigateTo({
      pageId: path.slice(1)
    })} />
    </div>;
}
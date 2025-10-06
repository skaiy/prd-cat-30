// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { cn } from '@/lib/utils';
// @ts-ignore;
import { Home, ShoppingCart, Package, User, Star } from 'lucide-react';

export function TabBar({
  activeTab,
  onTabChange
}) {
  const tabs = [{
    key: 'home',
    icon: Home,
    label: '首页',
    page: 'member/index'
  }, {
    key: 'products',
    icon: Package,
    label: '��品',
    page: 'member/products'
  }, {
    key: 'cart',
    icon: ShoppingCart,
    label: '购物车',
    page: 'member/cart'
  }, {
    key: 'orders',
    icon: Package,
    label: '订单',
    page: 'member/my-orders'
  }, {
    key: 'profile',
    icon: User,
    label: '我的',
    page: 'member/profile'
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map(tab => <button key={tab.key} onClick={() => onTabChange(tab.page)} className={cn("flex flex-col items-center justify-center w-full h-full transition-colors", activeTab === tab.key ? "text-orange-600" : "text-gray-500 hover:text-gray-700")}>
            <tab.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>)}
      </div>
    </div>;
}
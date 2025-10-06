// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { ShoppingCart, Package, Star, Clock, TrendingUp } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const mockProducts = [{
  id: '1',
  name: '法国进口黄油',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=200&h=200&fit=crop',
  price: 45.8,
  originalPrice: 52.0,
  category: '乳制品'
}, {
  id: '2',
  name: '有机高筋面粉',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
  price: 18.5,
  originalPrice: 22.0,
  category: '面粉'
}, {
  id: '3',
  name: '比利时巧克力豆',
  image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=200&h=200&fit=crop',
  price: 68.0,
  originalPrice: 78.0,
  category: '巧克力'
}, {
  id: '4',
  name: '新西兰淡奶油',
  image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop',
  price: 32.5,
  originalPrice: 38.0,
  category: '乳制品'
}];
const mockCategories = [{
  id: '1',
  name: '乳制品',
  icon: '🥛',
  productCount: 15
}, {
  id: '2',
  name: '面粉',
  icon: '🌾',
  productCount: 8
}, {
  id: '3',
  name: '巧克力',
  icon: '🍫',
  productCount: 12
}, {
  id: '4',
  name: '糖类',
  icon: '🍯',
  productCount: 6
}];
export default function Index(props) {
  const {
    $w
  } = props;
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部横幅 */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">优质烘焙原料</h1>
        <p className="text-orange-100">新鲜、健康、美味</p>
      </div>

      {/* 分类导航 */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">商品分类</h2>
          <Button variant="ghost" onClick={() => $w.utils.navigateTo({
          pageId: 'member/categories'
        })}>
            查看全部
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {mockCategories.map(category => <div key={category.id} className="text-center cursor-pointer" onClick={() => $w.utils.navigateTo({
          pageId: 'member/products',
          params: {
            category: category.name
          }
        })}>
              <div className="text-3xl mb-2">{category.icon}</div>
              <p className="text-sm text-gray-700">{category.name}</p>
              <p className="text-xs text-gray-500">{category.productCount}件</p>
            </div>)}
        </div>
      </div>

      {/* 推荐商品 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">今日推荐</h2>
        <div className="grid grid-cols-2 gap-4">
          {mockProducts.map(product => <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer" onClick={() => $w.utils.navigateTo({
          pageId: 'member/product-detail',
          params: {
            id: product.id
          }
        })}>
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-orange-600 font-bold">¥{product.price}</span>
                    <span className="text-gray-400 text-xs line-through ml-1">¥{product.originalPrice}</span>
                  </div>
                  <span className="text-xs text-gray-500">{product.category}</span>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">快捷功能</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center cursor-pointer" onClick={() => $w.utils.navigateTo({
          pageId: 'member/cart'
        })}>
            <div className="bg-blue-100 p-4 rounded-lg mb-2">
              <ShoppingCart className="w-6 h-6 text-blue-600 mx-auto" />
            </div>
            <p className="text-xs text-gray-700">购物车</p>
          </div>
          <div className="text-center cursor-pointer" onClick={() => $w.utils.navigateTo({
          pageId: 'member/my-orders'
        })}>
            <div className="bg-green-100 p-4 rounded-lg mb-2">
              <Package className="w-6 h-6 text-green-600 mx-auto" />
            </div>
            <p className="text-xs text-gray-700">我的订单</p>
          </div>
          <div className="text-center cursor-pointer" onClick={() => $w.utils.navigateTo({
          pageId: 'member/points'
        })}>
            <div className="bg-yellow-100 p-4 rounded-lg mb-2">
              <Star className="w-6 h-6 text-yellow-600 mx-auto" />
            </div>
            <p className="text-xs text-gray-700">积分商城</p>
          </div>
          <div className="text-center cursor-pointer" onClick={() => $w.utils.navigateTo({
          pageId: 'member/profile'
        })}>
            <div className="bg-purple-100 p-4 rounded-lg mb-2">
              <Clock className="w-6 h-6 text-purple-600 mx-auto" />
            </div>
            <p className="text-xs text-gray-700">个人中心</p>
          </div>
        </div>
      </div>

      <TabBar activeTab="home" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
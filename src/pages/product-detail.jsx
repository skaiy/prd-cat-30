// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
// @ts-ignore;
import { Button, Badge } from '@/components/ui';

import { TabBar } from '@/components/TabBar';
const mockProduct = {
  id: '1',
  name: '法国进口黄油',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=400&h=400&fit=crop',
  price: 45.8,
  originalPrice: 52.0,
  rating: 4.8,
  sales: 234,
  description: '来自法国诺曼底地区的优质黄油，采用传统制作工艺，奶香浓郁，质地细腻，是烘焙的理想选择。',
  specifications: {
    brand: '总统牌',
    origin: '法国',
    weight: '250g',
    shelfLife: '6个月',
    storage: '冷藏保存'
  }
};
export default function ProductDetail(props) {
  const {
    $w
  } = props;
  const [quantity, setQuantity] = useState(1);
  const handleAddToCart = () => {
    console.log('添加到购物车:', mockProduct.name, '数量:', quantity);
    // 这里可以添加购物车逻辑
  };
  const handleBuyNow = () => {
    $w.utils.navigateTo({
      pageId: 'order-confirm',
      params: {
        productId: mockProduct.id,
        quantity: quantity
      }
    });
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 产品图片 */}
      <div className="relative">
        <img src={mockProduct.image} alt={mockProduct.name} className="w-full h-64 object-cover" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-orange-600">
            今日特价
          </Badge>
        </div>
      </div>

      {/* 产品信息 */}
      <div className="bg-white p-4">
        <h1 className="text-lg font-bold text-gray-900">{mockProduct.name}</h1>
        
        <div className="flex items-center mt-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600 ml-1">
            {mockProduct.rating}分 · 已售{mockProduct.sales}件
          </span>
        </div>

        <div className="mt-3">
          <span className="text-2xl font-bold text-orange-600">¥{mockProduct.price}</span>
          <span className="text-sm text-gray-400 line-through ml-2">
            ¥{mockProduct.originalPrice}
          </span>
          <span className="text-sm text-orange-600 ml-2">
            省¥{(mockProduct.originalPrice - mockProduct.price).toFixed(1)}
          </span>
        </div>
      </div>

      {/* 产品详情 */}
      <div className="bg-white mt-2 p-4">
        <h2 className="font-semibold text-gray-900 mb-3">产品详情</h2>
        <p className="text-sm text-gray-600 mb-4">{mockProduct.description}</p>
        
        <div className="space-y-2">
          {Object.entries(mockProduct.specifications).map(([key, value]) => <div key={key} className="flex justify-between text-sm">
              <span className="text-gray-600">{key}:</span>
              <span className="text-gray-900">{value}</span>
            </div>)}
        </div>
      </div>

      {/* 数量选择 */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-900">数量</span>
          <div className="flex items-center space-x-3">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4 flex space-x-2">
        <Button variant="outline" className="flex-1" onClick={handleAddToCart}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          加入购物车
        </Button>
        <Button className="flex-1 bg-orange-600 hover:bg-orange-700" onClick={handleBuyNow}>
          立即购买
        </Button>
      </div>

      <TabBar activeTab="products" onTabChange={path => $w.utils.navigateTo({
      pageId: path.slice(1)
    })} />
    </div>;
}
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, ShoppingCart, Star, Heart, Share2, Minus, Plus } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const mockProduct = {
  id: '1',
  name: '法国进口黄油',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=400&h=400&fit=crop',
  images: ['https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1571176094527-9d906d9ba6b7?w=400&h=400&fit=crop'],
  price: 45.8,
  originalPrice: 52.0,
  category: '乳制品',
  rating: 4.8,
  sales: 234,
  stock: 100,
  description: '来自法国诺曼底地区的优质黄油，采用传统制作工艺，奶香浓郁，质地细腻，是烘焙的理想选择。富含维生素A和D，有助于骨骼健康和视力保护。',
  features: ['100%纯天然', '无添加剂', '富含维生素', '适合烘焙'],
  specification: '250g/块',
  shelfLife: '12个月',
  storage: '冷藏保存'
};
export default function ProductDetail(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [product] = useState(mockProduct);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleAddToCart = () => {
    toast({
      title: '添加成功',
      description: `${product.name} 已添加到购物车`
    });
  };
  const handleBuyNow = () => {
    $w.utils.navigateTo({
      pageId: 'member/order-confirm',
      params: {
        productId: product.id,
        quantity: quantity
      }
    });
  };
  const handleQuantityChange = type => {
    if (type === 'increase' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">商品详情</h1>
      </div>

      {/* 商品图片 */}
      <div className="bg-white">
        <img src={product.images[selectedImageIndex]} alt={product.name} className="w-full h-80 object-cover" />
        <div className="flex p-4 space-x-2 overflow-x-auto">
          {product.images.map((image, index) => <img key={index} src={image} alt={`${product.name}-${index}`} className={`w-16 h-16 object-cover rounded cursor-pointer ${selectedImageIndex === index ? 'border-2 border-orange-500' : ''}`} onClick={() => setSelectedImageIndex(index)} />)}
        </div>
      </div>

      {/* 商品信息 */}
      <div className="bg-white p-4 mt-2">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl font-bold text-gray-900 flex-1">{product.name}</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500 ml-3">已售{product.sales}</span>
          <Badge variant="secondary" className="ml-3">{product.category}</Badge>
        </div>

        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-orange-600">¥{product.price}</span>
            <span className="text-gray-400 text-sm line-through ml-2">¥{product.originalPrice}</span>
          </div>
          <div className="text-sm text-gray-500">
            库存: {product.stock}件
          </div>
        </div>

        {/* 数量选择 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">购买数量</span>
          <div className="flex items-center">
            <Button variant="outline" size="sm" onClick={() => handleQuantityChange('decrease')} disabled={quantity <= 1}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="mx-4 font-medium">{quantity}</span>
            <Button variant="outline" size="sm" onClick={() => handleQuantityChange('increase')} disabled={quantity >= product.stock}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 商品详情 */}
      <div className="bg-white p-4 mt-2">
        <h2 className="text-lg font-semibold mb-3">商品详情</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        
        <h3 className="font-medium text-gray-900 mb-2">产品特点</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {product.features.map((feature, index) => <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>)}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">规格：</span>
            <span className="text-gray-900">{product.specification}</span>
          </div>
          <div>
            <span className="text-gray-600">保质期：</span>
            <span className="text-gray-900">{product.shelfLife}</span>
          </div>
          <div>
            <span className="text-gray-600">储存方式：</span>
            <span className="text-gray-900">{product.storage}</span>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
        <div className="flex space-x-3">
          <Button onClick={handleAddToCart} variant="outline" className="flex-1">
            <ShoppingCart className="w-4 h-4 mr-2" />
            加入购物车
          </Button>
          <Button onClick={handleBuyNow} className="flex-1 bg-orange-500 hover:bg-orange-600">
            立即购买
          </Button>
        </div>
      </div>

      <TabBar activeTab="products" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
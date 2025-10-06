// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Search, ShoppingCart, Star } from 'lucide-react';
// @ts-ignore;
import { Input, Badge } from '@/components/ui';

import { TabBar } from '@/components/TabBar';
const mockProducts = [{
  id: '1',
  name: '法国进口黄油',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=300&h=300&fit=crop',
  price: 45.8,
  originalPrice: 52.0,
  rating: 4.8,
  sales: 234,
  category: '乳制品'
}, {
  id: '2',
  name: '有机高筋面粉',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop',
  price: 18.5,
  originalPrice: 22.0,
  rating: 4.9,
  sales: 567,
  category: '面粉'
}, {
  id: '3',
  name: '比利时巧克力豆',
  image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop',
  price: 68.0,
  originalPrice: 78.0,
  rating: 4.7,
  sales: 189,
  category: '巧克力'
}, {
  id: '4',
  name: '新西兰淡奶油',
  image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop',
  price: 32.5,
  originalPrice: 38.0,
  rating: 4.6,
  sales: 445,
  category: '乳制品'
}];
export default function Products(props) {
  const {
    $w
  } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const categories = ['全部', '乳制品', '面粉', '巧克力', '糖类', '香料'];
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleAddToCart = product => {
    // 模拟添加到购物车
    console.log('添加到购物车:', product.name);
  };
  const handleProductClick = product => {
    $w.utils.navigateTo({
      pageId: 'product-detail',
      params: {
        productId: product.id
      }
    });
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 搜索栏 */}
      <div className="bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="搜索烘焙原料..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      {/* 分类标签 */}
      <div className="bg-white px-4 py-3 overflow-x-auto">
        <div className="flex space-x-2">
          {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedCategory === category ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
              {category}
            </button>)}
        </div>
      </div>

      {/* 产品列表 */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden" onClick={() => handleProductClick(product)}>
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                  <span className="text-xs text-gray-400 ml-1">({product.sales})</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-orange-600 font-bold text-sm">
                      ¥{product.price}
                    </span>
                    <span className="text-gray-400 text-xs line-through ml-1">
                      ¥{product.originalPrice}
                    </span>
                  </div>
                  <button onClick={e => {
                e.stopPropagation();
                handleAddToCart(product);
              }} className="p-1 bg-orange-600 text-white rounded">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      <TabBar activeTab="products" onTabChange={path => $w.utils.navigateTo({
      pageId: path.slice(1)
    })} />
    </div>;
}
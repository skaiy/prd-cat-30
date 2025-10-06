// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, ShoppingCart, Star } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const mockProducts = [{
  id: '1',
  name: '法国进口黄油',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=200&h=200&fit=crop',
  price: 45.8,
  originalPrice: 52.0,
  category: '乳制品',
  rating: 4.8,
  sales: 234
}, {
  id: '2',
  name: '有机高筋面粉',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
  price: 18.5,
  originalPrice: 22.0,
  category: '面粉',
  rating: 4.6,
  sales: 189
}, {
  id: '3',
  name: '比利时巧克力豆',
  image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=200&h=200&fit=crop',
  price: 68.0,
  originalPrice: 78.0,
  category: '巧克力',
  rating: 4.9,
  sales: 156
}, {
  id: '4',
  name: '新西兰淡奶油',
  image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop',
  price: 32.5,
  originalPrice: 38.0,
  category: '乳制品',
  rating: 4.7,
  sales: 98
}, {
  id: '5',
  name: '有机白砂糖',
  image: 'https://images.unsplash.com/photo-1565600444102-063f8a7a1e67?w=200&h=200&fit=crop',
  price: 12.8,
  originalPrice: 15.0,
  category: '糖类',
  rating: 4.5,
  sales: 67
}, {
  id: '6',
  name: '香草精',
  image: 'https://images.unsplash.com/photo-1571176094527-9d906d9ba6b7?w=200&h=200&fit=crop',
  price: 28.9,
  originalPrice: 32.0,
  category: '香料',
  rating: 4.8,
  sales: 45
}];
const mockCategories = [{
  id: '1',
  name: '全部',
  count: 89
}, {
  id: '2',
  name: '乳制品',
  count: 15
}, {
  id: '3',
  name: '面粉',
  count: 8
}, {
  id: '4',
  name: '巧克力',
  count: 12
}, {
  id: '5',
  name: '糖类',
  count: 6
}, {
  id: '6',
  name: '香料',
  count: 9
}];
export default function Products(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleAddToCart = product => {
    toast({
      title: '添加成功',
      description: `${product.name} 已添加到购物车`
    });
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 搜索栏 */}
      <div className="bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="搜索商品" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="bg-white p-4 border-b">
        <div className="flex space-x-4 overflow-x-auto">
          {categories.map(category => <button key={category.id} onClick={() => setSelectedCategory(category.name)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedCategory === category.name ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
              {category.name} ({category.count})
            </button>)}
        </div>
      </div>

      {/* 商品列表 */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="cursor-pointer" onClick={() => $w.utils.navigateTo({
            pageId: 'member/product-detail',
            params: {
              id: product.id
            }
          })}>
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">已售{product.sales}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-orange-600 font-bold">¥{product.price}</span>
                      <span className="text-gray-400 text-xs line-through ml-1">¥{product.originalPrice}</span>
                    </div>
                    <span className="text-xs text-gray-500">{product.category}</span>
                  </div>
                </div>
              </div>
              <div className="p-3 pt-0">
                <Button onClick={() => handleAddToCart(product)} className="w-full bg-orange-500 hover:bg-orange-600" size="sm">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  加入购物车
                </Button>
              </div>
            </div>)}
        </div>
      </div>

      <TabBar activeTab="products" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Package } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const mockCategories = [{
  id: '1',
  name: '乳制品',
  icon: '🥛',
  productCount: 15,
  description: '新鲜牛奶、黄油、奶酪等乳制品'
}, {
  id: '2',
  name: '面粉',
  icon: '🌾',
  productCount: 8,
  description: '高筋面粉、低筋面粉、全麦面粉等'
}, {
  id: '3',
  name: '巧克力',
  icon: '🍫',
  productCount: 12,
  description: '进口巧克力、巧克力豆、巧克力粉等'
}, {
  id: '4',
  name: '糖类',
  icon: '🍯',
  productCount: 6,
  description: '白砂糖、红糖、蜂蜜等甜味剂'
}, {
  id: '5',
  name: '坚果',
  icon: '🥜',
  productCount: 10,
  description: '杏仁、核桃、腰果等坚果类'
}, {
  id: '6',
  name: '水果',
  icon: '🍓',
  productCount: 9,
  description: '新鲜水果、果干、果酱等'
}];
export default function Categories(props) {
  const {
    $w
  } = props;
  const [categories] = useState(mockCategories);
  const handleCategoryClick = categoryId => {
    $w.utils.navigateTo({
      pageId: 'member/products',
      params: {
        categoryId: categoryId
      }
    });
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">商品分类</h1>
      </div>

      {/* 分类列表 */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {categories.map(category => <Card key={category.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCategoryClick(category.id)}>
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                <div className="flex items-center justify-center text-xs text-gray-400">
                  <Package className="w-3 h-3 mr-1" />
                  <span>{category.productCount}件商品</span>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>

      <TabBar activeTab="products" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
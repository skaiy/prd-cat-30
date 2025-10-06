// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Package, Milk, Wheat, Cookie, Candy, Spice } from 'lucide-react';

// @ts-ignore;
import { TabBar } from '@/components/TabBar';
const mockCategories = [{
  id: '1',
  name: '乳制品',
  icon: Milk,
  productCount: 15,
  color: 'bg-blue-500'
}, {
  id: '2',
  name: '面粉',
  icon: Wheat,
  productCount: 8,
  color: 'bg-amber-500'
}, {
  id: '3',
  name: '巧克力',
  icon: Cookie,
  productCount: 12,
  color: 'bg-amber-800'
}, {
  id: '4',
  name: '糖类',
  icon: Candy,
  productCount: 5,
  color: 'bg-pink-500'
}, {
  id: '5',
  name: '香料',
  icon: Spice,
  productCount: 10,
  color: 'bg-green-500'
}, {
  id: '6',
  name: '坚果',
  icon: Package,
  productCount: 7,
  color: 'bg-purple-500'
}];
export default function Categories(props) {
  const {
    $w
  } = props;
  const handleCategoryClick = category => {
    $w.utils.navigateTo({
      pageId: 'products',
      params: {
        category: category.name
      }
    });
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 标题栏 */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-lg font-semibold text-center">商品分类</h1>
      </div>

      {/* 分类列表 */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {mockCategories.map(category => <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleCategoryClick(category)}>
              <div className={`${category.color} h-24 flex items-center justify-center`}>
                <category.icon className="w-12 h-12 text-white" />
              </div>
              <div className="p-4">
                <h3 className="text-center font-medium text-gray-900">{category.name}</h3>
                <p className="text-center text-sm text-gray-600 mt-1">{category.productCount} 件商品</p>
              </div>
            </div>)}
        </div>
      </div>

      <TabBar activeTab="categories" onTabChange={path => $w.utils.navigateTo({
      pageId: path.slice(1)
    })} />
    </div>;
}
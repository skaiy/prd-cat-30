// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';

import { Sidebar } from '@/components/Sidebar';
const mockCategories = [{
  id: 'CAT001',
  name: '乳制品',
  icon: '🥛',
  productCount: 15,
  description: '牛奶、黄油、奶酪等乳制品',
  status: '启用'
}, {
  id: 'CAT002',
  name: '面粉',
  icon: '🌾',
  productCount: 8,
  description: '各种类型的面粉',
  status: '启用'
}, {
  id: 'CAT003',
  name: '巧克力',
  icon: '🍫',
  productCount: 12,
  description: '各类巧克力制品',
  status: '启用'
}, {
  id: 'CAT004',
  name: '糖类',
  icon: '🍯',
  productCount: 6,
  description: '白砂糖、红糖等',
  status: '启用'
}, {
  id: 'CAT005',
  name: '香料',
  icon: '🌿',
  productCount: 9,
  description: '香草精、肉桂等香料',
  status: '启用'
}, {
  id: 'CAT006',
  name: '坚果',
  icon: '🥜',
  productCount: 7,
  description: '各类坚果产品',
  status: '禁用'
}];
export default function Categories(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: '',
    description: ''
  });
  const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleAddCategory = () => {
    if (newCategory.name && newCategory.icon) {
      const category = {
        id: `CAT${String(categories.length + 1).padStart(3, '0')}`,
        name: newCategory.name,
        icon: newCategory.icon,
        description: newCategory.description,
        productCount: 0,
        status: '启用'
      };
      setCategories([...categories, category]);
      setNewCategory({
        name: '',
        icon: '',
        description: ''
      });
      setIsAdding(false);
      toast({
        title: '添加成功',
        description: '分类已成功添加'
      });
    } else {
      toast({
        title: '添加失败',
        description: '请填写分类名称和图标',
        variant: 'destructive'
      });
    }
  };
  const handleDeleteCategory = id => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: '删除成功',
      description: '分类已成功删除'
    });
  };
  const handleToggleStatus = id => {
    setCategories(categories.map(cat => cat.id === id ? {
      ...cat,
      status: cat.status === '启用' ? '禁用' : '启用'
    } : cat));
    toast({
      title: '状态更新成功',
      description: '分类状态已更新'
    });
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="categories" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'admin/dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">分类管理</h1>
                    <p className="text-gray-600 mt-1">管理商品分类信息</p>
                  </div>
                  <Button onClick={() => setIsAdding(true)} className="bg-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    添加分类
                  </Button>
                </div>
              </div>

              {/* 添加分类表单 */}
              {isAdding && <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>添加新分类</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">分类名称</label>
                        <Input value={newCategory.name} onChange={e => setNewCategory({
                  ...newCategory,
                  name: e.target.value
                })} placeholder="请输入分类名称" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">分类图标</label>
                        <Input value={newCategory.icon} onChange={e => setNewCategory({
                  ...newCategory,
                  icon: e.target.value
                })} placeholder="请输入图标emoji" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">分类描述</label>
                        <Input value={newCategory.description} onChange={e => setNewCategory({
                  ...newCategory,
                  description: e.target.value
                })} placeholder="请输入分类描述" />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setIsAdding(false)}>
                        取消
                      </Button>
                      <Button onClick={handleAddCategory} className="bg-green-600">
                        确认添加
                      </Button>
                    </div>
                  </CardContent>
                </Card>}

              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="搜索分类名称" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCategories.map(category => <Card key={category.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <span className="text-3xl mr-3">{category.icon}</span>
                              <div>
                                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                                <Badge variant={category.status === '启用' ? 'success' : 'secondary'} className="mt-1">
                                  {category.status}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(category.id)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Package className="w-4 h-4 mr-1" />
                              <span>{category.productCount} 件商品</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>;
}
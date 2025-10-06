// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Badge, Input } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Edit, Save, Package, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

import { Sidebar } from '@/components/Sidebar';
const mockProduct = {
  id: 'PRD001',
  name: '法国进口黄油',
  category: '乳制品',
  price: 45.8,
  originalPrice: 52.0,
  stock: 100,
  sales: 234,
  status: '在售',
  description: '来自法国诺曼底地区的优质黄油，采用传统制作工艺，奶香浓郁，质地细腻，是烘焙的理想选择。富含维生素A和D，有助于骨骼健康和视力保护。',
  features: ['100%纯天然', '无添加剂', '富含维生素', '适合烘焙'],
  images: ['https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1571176094527-9d906d9ba6b7?w=400&h=400&fit=crop'],
  specification: '250g/块',
  shelfLife: '12个月',
  storage: '冷藏保存'
};
export default function ProductDetailAdmin(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [product, setProduct] = useState(mockProduct);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(mockProduct);
  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(product);
  };
  const handleSave = () => {
    setProduct(editForm);
    setIsEditing(false);
    toast({
      title: '保存成功',
      description: '商品信息已更新'
    });
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(product);
  };
  const getStatusBadge = status => {
    const variants = {
      '在售': 'success',
      '缺货': 'destructive',
      '下架': 'secondary'
    };
    return <Badge variant={variants[status] || 'secondary'}>
            {status}
          </Badge>;
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="products" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'admin/dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">商品详情</h1>
                      <p className="text-gray-600 mt-1">商品ID: {product.id}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {isEditing ? <>
                        <Button onClick={handleSave} className="bg-green-600">
                          <Save className="w-4 h-4 mr-2" />
                          保存
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          取消
                        </Button>
                      </> : <Button onClick={handleEdit} className="bg-blue-600">
                        <Edit className="w-4 h-4 mr-2" />
                        编辑
                      </Button>}
                  </div>
                </div>
              </div>

              <div className="max-w-6xl space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>商品图片</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {product.images.map((image, index) => <img key={index} src={image} alt={`商品图片${index + 1}`} className="w-full h-48 object-cover rounded-lg" />)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>基本信息</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">商品名称</p>
                          {isEditing ? <Input value={editForm.name} onChange={e => setEditForm({
                      ...editForm,
                      name: e.target.value
                    })} className="mt-1" /> : <p className="font-medium">{product.name}</p>}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">商品分类</p>
                          {isEditing ? <Input value={editForm.category} onChange={e => setEditForm({
                      ...editForm,
                      category: e.target.value
                    })} className="mt-1" /> : <p className="font-medium">{product.category}</p>}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">售价</p>
                          {isEditing ? <Input type="number" value={editForm.price} onChange={e => setEditForm({
                      ...editForm,
                      price: parseFloat(e.target.value)
                    })} className="mt-1" /> : <p className="font-medium text-orange-600">¥{product.price}</p>}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">原价</p>
                          {isEditing ? <Input type="number" value={editForm.originalPrice} onChange={e => setEditForm({
                      ...editForm,
                      originalPrice: parseFloat(e.target.value)
                    })} className="mt-1" /> : <p className="font-medium text-gray-500 line-through">¥{product.originalPrice}</p>}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">库存</p>
                          {isEditing ? <Input type="number" value={editForm.stock} onChange={e => setEditForm({
                      ...editForm,
                      stock: parseInt(e.target.value)
                    })} className="mt-1" /> : <p className="font-medium">{product.stock}</p>}
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">状态</p>
                          <p className="font-medium">{getStatusBadge(product.status)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>商品描述</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? <textarea value={editForm.description} onChange={e => setEditForm({
                ...editForm,
                description: e.target.value
              })} className="w-full p-3 border rounded-lg min-h-[100px]" /> : <p className="text-gray-700">{product.description}</p>}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>商品特点</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {product.features.map((feature, index) => <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>销售统计</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <Package className="w-8 h-8 text-blue-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">库存</p>
                            <p className="text-2xl font-bold text-gray-900">{product.stock}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">销量</p>
                            <p className="text-2xl font-bold text-gray-900">{product.sales}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <DollarSign className="w-8 h-8 text-yellow-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">销售额</p>
                            <p className="text-2xl font-bold text-gray-900">¥{(product.price * product.sales).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {product.stock < 10 && <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-600">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        库存预警
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-orange-700">当前库存仅剩 {product.stock} 件，建议及时补货。</p>
                    </CardContent>
                  </Card>}
              </div>
            </div>
          </div>
        </div>;
}
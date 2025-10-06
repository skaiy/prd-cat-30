// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Badge, Card, CardHeader, CardTitle, CardContent, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
// @ts-ignore;
import { ArrowLeft, Upload, Plus, Minus, Save, X, Edit } from 'lucide-react';

import { Sidebar } from '@/components/Sidebar';
const mockProduct = {
  id: '1',
  name: '法国进口黄油',
  images: ['https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1571176094527-9d906d9ba6b7?w=400&h=400&fit=crop'],
  specification: '250g/块',
  originalPrice: 52.0,
  currentPrice: 45.8,
  stock: 100,
  status: '启用',
  category: '乳制品',
  description: '来自法国诺曼底地区的优质黄油，采用传统制作工艺，奶香浓郁，质地细腻，是烘焙的理想选择。',
  createdAt: '2024-01-15',
  updatedAt: '2024-03-15'
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
  const [formData, setFormData] = useState({
    name: product.name,
    specification: product.specification,
    originalPrice: product.originalPrice,
    currentPrice: product.currentPrice,
    stock: product.stock,
    status: product.status,
    category: product.category,
    description: product.description
  });
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [newImages, setNewImages] = useState([]);
  const handleSave = () => {
    setProduct({
      ...product,
      ...formData,
      updatedAt: new Date().toLocaleDateString('zh-CN')
    });
    setIsEditing(false);
    toast({
      title: '保存成功',
      description: '商品信息已更新'
    });
  };
  const handleCancel = () => {
    setFormData({
      name: product.name,
      specification: product.specification,
      originalPrice: product.originalPrice,
      currentPrice: product.currentPrice,
      stock: product.stock,
      status: product.status,
      category: product.category,
      description: product.description
    });
    setIsEditing(false);
  };
  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setNewImages([...newImages, ...newImageUrls]);
    toast({
      title: '上传成功',
      description: `已上传 ${files.length} 张图片`
    });
  };
  const handleRemoveImage = index => {
    const updatedImages = [...product.images];
    updatedImages.splice(index, 1);
    setProduct({
      ...product,
      images: updatedImages
    });
    if (activeImageIndex >= updatedImages.length) {
      setActiveImageIndex(Math.max(0, updatedImages.length - 1));
    }
  };
  const adjustStock = change => {
    setFormData({
      ...formData,
      stock: Math.max(0, formData.stock + change)
    });
  };
  const getStockStatus = stock => {
    if (stock === 0) return {
      text: '缺货',
      color: 'text-red-600 bg-red-50'
    };
    if (stock < 10) return {
      text: '库存紧张',
      color: 'text-orange-600 bg-orange-50'
    };
    return {
      text: '库存充足',
      color: 'text-green-600 bg-green-50'
    };
  };
  const stockStatus = getStockStatus(formData.stock);
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="products" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">产品详情</h1>
                    <p className="text-gray-600 mt-1">商品ID: {product.id}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  {!isEditing ? <Button onClick={() => setIsEditing(true)} className="bg-blue-600">
                        <Edit className="w-4 h-4 mr-2" />
                        编辑
                      </Button> : <>
                      <Button variant="outline" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-2" />
                        取消
                      </Button>
                      <Button onClick={handleSave} className="bg-green-600">
                        <Save className="w-4 h-4 mr-2" />
                        保存
                      </Button>
                    </>}
                </div>
              </div>

              <div className="max-w-6xl space-y-6">
                {/* 图片区域 */}
                <Card>
                  <CardHeader>
                    <CardTitle>商品图片</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* 主图预览 */}
                      <div className="relative">
                        <img src={product.images[activeImageIndex]} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
                        {isEditing && <button onClick={() => handleRemoveImage(activeImageIndex)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full">
                            <X className="w-4 h-4" />
                          </button>}
                      </div>

                      {/* 缩略图 */}
                      <div className="flex space-x-2 overflow-x-auto">
                        {product.images.map((img, index) => <div key={index} className={`relative flex-shrink-0 ${activeImageIndex === index ? 'ring-2 ring-blue-500' : ''}`}>
                            <img src={img} alt={`${product.name} ${index + 1}`} className="w-20 h-20 object-cover rounded cursor-pointer" onClick={() => setActiveImageIndex(index)} />
                          </div>)}
                        {newImages.map((img, index) => <div key={`new-${index}`} className="relative flex-shrink-0">
                            <img src={img} alt="新上传" className="w-20 h-20 object-cover rounded opacity-75" />
                          </div>)}
                      </div>

                      {/* 上传按钮 */}
                      {isEditing && <div className="flex items-center space-x-4">
                          <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-lg flex items-center">
                            <Upload className="w-4 h-4 mr-2" />
                            上传图片
                            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                          </label>
                          <span className="text-sm text-gray-500">支持 JPG、PNG 格式，最大 5MB</span>
                        </div>}
                    </div>
                  </CardContent>
                </Card>

                {/* 基本信息 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>基本信息</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">商品名称</label>
                          {isEditing ? <Input value={formData.name} onChange={e => setFormData({
                      ...formData,
                      name: e.target.value
                    })} placeholder="请输入商品名称" /> : <p className="text-gray-900">{product.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">规格</label>
                          {isEditing ? <Input value={formData.specification} onChange={e => setFormData({
                      ...formData,
                      specification: e.target.value
                    })} placeholder="如：250g/块" /> : <p className="text-gray-900">{product.specification}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                          {isEditing ? <Input value={formData.category} onChange={e => setFormData({
                      ...formData,
                      category: e.target.value
                    })} placeholder="请输入分类" /> : <p className="text-gray-900">{product.category}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
                          {isEditing ? <select value={formData.status} onChange={e => setFormData({
                      ...formData,
                      status: e.target.value
                    })} className="w-full border border-gray-300 rounded-md px-3 py-2">
                              <option value="启用">启用</option>
                              <option value="禁用">禁用</option>
                            </select> : <Badge variant={product.status === '启用' ? 'success' : 'secondary'}>
                              {product.status}
                            </Badge>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>价格与库存</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">原价</label>
                          {isEditing ? <Input type="number" step="0.01" value={formData.originalPrice} onChange={e => setFormData({
                      ...formData,
                      originalPrice: parseFloat(e.target.value) || 0
                    })} placeholder="请输入原价" /> : <p className="text-gray-400 line-through">¥{product.originalPrice}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">今日售价</label>
                          {isEditing ? <Input type="number" step="0.01" value={formData.currentPrice} onChange={e => setFormData({
                      ...formData,
                      currentPrice: parseFloat(e.target.value) || 0
                    })} placeholder="请输入当前售价" /> : <p className="text-orange-600 font-bold text-xl">¥{product.currentPrice}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">库存</label>
                          {isEditing ? <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => adjustStock(-1)}>
                                <Minus className="w-4 h-4" />
                              </Button>
                              <Input type="number" value={formData.stock} onChange={e => setFormData({
                        ...formData,
                        stock: Math.max(0, parseInt(e.target.value) || 0)
                      })} className="w-20 text-center" />
                              <Button variant="outline" size="sm" onClick={() => adjustStock(1)}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div> : <div>
                              <p className="text-lg font-medium">{product.stock}</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                                {stockStatus.text}
                              </span>
                            </div>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 商品描述 */}
                <Card>
                  <CardHeader>
                    <CardTitle>商品描述</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? <textarea value={formData.description} onChange={e => setFormData({
                ...formData,
                description: e.target.value
              })} rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="请输入商品描述" /> : <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>}
                  </CardContent>
                </Card>

                {/* 其他信息 */}
                <Card>
                  <CardHeader>
                    <CardTitle>其他信息</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">创建时间：</span>
                        <span className="text-gray-900">{product.createdAt}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">更新时间：</span>
                        <span className="text-gray-900">{product.updatedAt}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>;
}
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Badge, Card, CardHeader, CardTitle, CardContent, Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
// @ts-ignore;
import { Plus, Edit, Trash2, DollarSign, Package, AlertCircle } from 'lucide-react';

import { DataTable } from '@/components/DataTable';
import { Sidebar } from '@/components/Sidebar';
const mockProducts = [{
  id: '1',
  name: '法国进口黄油',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=100&h=100&fit=crop',
  specification: '250g/块',
  originalPrice: 52.0,
  currentPrice: 45.8,
  stock: 100,
  status: '启用',
  category: '乳制品',
  createdAt: '2024-01-15'
}, {
  id: '2',
  name: '有机高筋面粉',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop',
  specification: '1kg/袋',
  originalPrice: 22.0,
  currentPrice: 18.5,
  stock: 50,
  status: '启用',
  category: '面粉',
  createdAt: '2024-01-20'
}, {
  id: '3',
  name: '比利时巧克力豆',
  image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&h=100&fit=crop',
  specification: '500g/袋',
  originalPrice: 78.0,
  currentPrice: 68.0,
  stock: 30,
  status: '启用',
  category: '巧克力',
  createdAt: '2024-01-25'
}, {
  id: '4',
  name: '新西兰淡奶油',
  image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&h=100&fit=crop',
  specification: '200ml/盒',
  originalPrice: 38.0,
  currentPrice: 32.5,
  stock: 5,
  status: '启用',
  category: '乳制品',
  createdAt: '2024-02-01'
}, {
  id: '5',
  name: '有机白砂糖',
  image: 'https://images.unsplash.com/photo-1565600444102-063f8a7a1e67?w=100&h=100&fit=crop',
  specification: '500g/袋',
  originalPrice: 15.0,
  currentPrice: 12.8,
  stock: 0,
  status: '禁用',
  category: '糖类',
  createdAt: '2024-02-05'
}];
export default function ProductsAdmin(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    specification: '',
    originalPrice: 0,
    currentPrice: 0,
    stock: 0,
    status: '启用',
    category: ''
  });
  const [priceFormData, setPriceFormData] = useState({
    discount: 100,
    fixedPrice: null
  });
  const columns = [{
    key: 'image',
    title: '图片',
    render: (value, row) => <Avatar className="w-10 h-10">
              <AvatarImage src={value} alt={row.name} />
              <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
            </Avatar>
  }, {
    key: 'name',
    title: '商品名称'
  }, {
    key: 'specification',
    title: '规格'
  }, {
    key: 'currentPrice',
    title: '当日售价',
    render: value => <span className="text-orange-600 font-bold">¥{value}</span>
  }, {
    key: 'originalPrice',
    title: '原价',
    render: value => <span className="text-gray-400 line-through">¥{value}</span>
  }, {
    key: 'stock',
    title: '库存',
    render: value => {
      if (value === 0) {
        return <Badge variant="destructive" className="flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  缺货
                </Badge>;
      }
      if (value < 10) {
        return <Badge variant="warning" className="flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {value}
                </Badge>;
      }
      return <span>{value}</span>;
    }
  }, {
    key: 'status',
    title: '状态',
    render: value => <Badge variant={value === '启用' ? 'success' : 'secondary'}>
              {value}
            </Badge>
  }, {
    key: 'category',
    title: '分类'
  }, {
    key: 'actions',
    title: '操作',
    render: (_, record) => <div className="flex space-x-1">
              <Button variant="ghost" size="sm" onClick={e => {
        e.stopPropagation();
        handleEdit(record);
      }} title="编辑">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={e => {
        e.stopPropagation();
        handleSetPrice(record);
      }} title="设置今日售价">
                <DollarSign className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={e => {
        e.stopPropagation();
        handleDelete(record);
      }} title="删除">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
  }];
  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      specification: '',
      originalPrice: 0,
      currentPrice: 0,
      stock: 0,
      status: '启用',
      category: ''
    });
    setIsModalOpen(true);
  };
  const handleEdit = product => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      specification: product.specification,
      originalPrice: product.originalPrice,
      currentPrice: product.currentPrice,
      stock: product.stock,
      status: product.status,
      category: product.category
    });
    setIsModalOpen(true);
  };
  const handleSetPrice = product => {
    setEditingProduct(product);
    setPriceFormData({
      discount: 100,
      fixedPrice: null
    });
    setIsPriceModalOpen(true);
  };
  const handleDelete = product => {
    if (window.confirm(`确定要删除商品"${product.name}"吗？`)) {
      setProducts(products.filter(p => p.id !== product.id));
      toast({
        title: '删除成功',
        description: '商品已删除'
      });
    }
  };
  const handleSave = () => {
    if (!formData.name.trim()) {
      toast({
        title: '提示',
        description: '请输入商品名称',
        variant: 'destructive'
      });
      return;
    }
    if (editingProduct) {
      // 编辑现有商品
      setProducts(products.map(p => p.id === editingProduct.id ? {
        ...p,
        ...formData
      } : p));
      toast({
        title: '更新成功',
        description: '商品信息已更新'
      });
    } else {
      // 新增商品
      const newProduct = {
        id: Date.now().toString(),
        ...formData,
        image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=100&h=100&fit=crop',
        createdAt: new Date().toLocaleDateString('zh-CN')
      };
      setProducts([...products, newProduct]);
      toast({
        title: '添加成功',
        description: '新商品已添加'
      });
    }
    setIsModalOpen(false);
  };
  const handleSavePrice = () => {
    if (editingProduct) {
      let newPrice;
      if (priceFormData.fixedPrice !== null) {
        newPrice = priceFormData.fixedPrice;
      } else {
        newPrice = editingProduct.originalPrice * (priceFormData.discount / 100);
      }
      setProducts(products.map(p => p.id === editingProduct.id ? {
        ...p,
        currentPrice: Math.round(newPrice * 100) / 100
      } : p));
      toast({
        title: '价格更新',
        description: '今日售价已更新'
      });
    }
    setIsPriceModalOpen(false);
  };
  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === '启用' ? '禁用' : '启用';
    setProducts(products.map(p => p.id === id ? {
      ...p,
      status: newStatus
    } : p));
    toast({
      title: '状态更新',
      description: `商品已${newStatus}`
    });
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="products" onNavigate={path => $w.utils.navigateTo({
      pageId: path.slice(1) || 'dashboard'
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
                    <p className="text-gray-600 mt-1">管理所有商品信息</p>
                  </div>
                  <Button onClick={handleAdd} className="bg-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    新增商品
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <DataTable columns={columns} data={products} searchPlaceholder="搜索商品名称..." />
                </div>
              </div>
            </div>
          </div>

          {/* 新增/编辑商品模态框 */}
          {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">
                  {editingProduct ? '编辑商品' : '新增商品'}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">商品名称</label>
                    <Input value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} placeholder="请输入商品名称" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">规格</label>
                    <Input value={formData.specification} onChange={e => setFormData({
              ...formData,
              specification: e.target.value
            })} placeholder="如：250g/块" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">原价</label>
                    <Input type="number" step="0.01" value={formData.originalPrice} onChange={e => setFormData({
              ...formData,
              originalPrice: parseFloat(e.target.value) || 0
            })} placeholder="请输入原价" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">当前售价</label>
                    <Input type="number" step="0.01" value={formData.currentPrice} onChange={e => setFormData({
              ...formData,
              currentPrice: parseFloat(e.target.value) || 0
            })} placeholder="请输入当前售价" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">库存</label>
                    <Input type="number" value={formData.stock} onChange={e => setFormData({
              ...formData,
              stock: parseInt(e.target.value) || 0
            })} placeholder="请输入库存数量" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">分类</label>
                    <Input value={formData.category} onChange={e => setFormData({
              ...formData,
              category: e.target.value
            })} placeholder="请输入分类" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">状态</label>
                    <select value={formData.status} onChange={e => setFormData({
              ...formData,
              status: e.target.value
            })} className="w-full border border-gray-300 rounded-md px-3 py-2">
                      <option value="启用">启用</option>
                      <option value="禁用">禁用</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSave} className="bg-blue-600">
                    保存
                  </Button>
                </div>
              </div>
            </div>}

          {/* 设置今日售价模态框 */}
          {isPriceModalOpen && editingProduct && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">设置今日售价</h2>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">商品：{editingProduct.name}</p>
                  <p className="text-sm text-gray-600">原价：¥{editingProduct.originalPrice}</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">折扣比例 (%)</label>
                    <Input type="number" value={priceFormData.discount} onChange={e => setPriceFormData({
              ...priceFormData,
              discount: parseInt(e.target.value) || 100,
              fixedPrice: null
            })} min="1" max="100" />
                    <p className="text-xs text-gray-500 mt-1">
                      折扣后价格：¥{(editingProduct.originalPrice * (priceFormData.discount / 100)).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center text-gray-500">或</div>
                  <div>
                    <label className="block text-sm font-medium mb-2">固定价格</label>
                    <Input type="number" step="0.01" value={priceFormData.fixedPrice || ''} onChange={e => setPriceFormData({
              ...priceFormData,
              fixedPrice: parseFloat(e.target.value) || null,
              discount: 100
            })} placeholder="直接输入价格" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsPriceModalOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleSavePrice} className="bg-orange-600">
                    更新价格
                  </Button>
                </div>
              </div>
            </div>}
        </div>;
}
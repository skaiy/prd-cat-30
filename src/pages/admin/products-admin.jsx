// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';
// @ts-ignore;
import { Search, Filter, Download, Eye, Plus } from 'lucide-react';

import { DataTable } from '@/components/DataTable';
import { Sidebar } from '@/components/Sidebar';
const mockProducts = [{
  id: 'PRD001',
  name: '法国进口黄油',
  category: '乳制品',
  price: 45.8,
  originalPrice: 52.0,
  stock: 100,
  sales: 234,
  status: '在售',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=100&h=100&fit=crop'
}, {
  id: 'PRD002',
  name: '有机高筋面粉',
  category: '面粉',
  price: 18.5,
  originalPrice: 22.0,
  stock: 50,
  sales: 189,
  status: '在售',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop'
}, {
  id: 'PRD003',
  name: '比利时巧克力豆',
  category: '巧克力',
  price: 68.0,
  originalPrice: 78.0,
  stock: 30,
  sales: 156,
  status: '在售',
  image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&h=100&fit=crop'
}, {
  id: 'PRD004',
  name: '新西兰淡奶油',
  category: '乳制品',
  price: 32.5,
  originalPrice: 38.0,
  stock: 5,
  sales: 98,
  status: '在售',
  image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&h=100&fit=crop'
}, {
  id: 'PRD005',
  name: '有机白砂糖',
  category: '糖类',
  price: 12.8,
  originalPrice: 15.0,
  stock: 0,
  sales: 67,
  status: '缺货',
  image: 'https://images.unsplash.com/photo-1565600444102-063f8a7a1e67?w=100&h=100&fit=crop'
}];
export default function ProductsAdmin(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const columns = [{
    key: 'image',
    title: '图片',
    render: value => <img src={value} alt="商品" className="w-12 h-12 object-cover rounded" />
  }, {
    key: 'name',
    title: '商品名称'
  }, {
    key: 'category',
    title: '分类'
  }, {
    key: 'price',
    title: '售价',
    render: value => <span className="font-medium">¥{value}</span>
  }, {
    key: 'originalPrice',
    title: '原价',
    render: value => <span className="text-gray-500 line-through">¥{value}</span>
  }, {
    key: 'stock',
    title: '库存',
    render: value => <span className={value > 10 ? 'text-green-600' : value > 0 ? 'text-orange-600' : 'text-red-600'}>{value}</span>
  }, {
    key: 'sales',
    title: '销量'
  }, {
    key: 'status',
    title: '状态',
    render: value => <Badge variant={value === '在售' ? 'success' : value === '缺货' ? 'destructive' : 'secondary'}>
              {value}
            </Badge>
  }, {
    key: 'actions',
    title: '操作',
    render: (_, record) => <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={() => $w.utils.navigateTo({
        pageId: 'admin/product-detail-admin',
        params: {
          id: record.id
        }
      })}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
  }];
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleExport = () => {
    toast({
      title: '导出成功',
      description: '商品数据已导出'
    });
  };
  const handleAddProduct = () => {
    toast({
      title: '功能开发中',
      description: '添加商品功能正在开发中'
    });
  };
  return <div className="flex h-screen bg-gray-50">
          <Sidebar activePage="products" onNavigate={path => $w.utils.navigateTo({
      pageId: path
    })} />
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">产品管理</h1>
                    <p className="text-gray-600 mt-1">管理所有商品信息</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddProduct} className="bg-orange-600">
                      <Plus className="w-4 h-4 mr-2" />
                      添加商品
                    </Button>
                    <Button variant="outline" onClick={handleExport}>
                      <Download className="w-4 h-4 mr-2" />
                      导出数据
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="搜索商品名称或分类" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64" />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      筛选
                    </Button>
                  </div>
                  <DataTable columns={columns} data={filteredProducts} />
                </div>
              </div>
            </div>
          </div>
        </div>;
}
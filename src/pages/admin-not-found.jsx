// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Monitor, Search, Users, Package, FileText, AlertCircle, ArrowLeft, Settings, BarChart3 } from 'lucide-react';

import { Sidebar } from '@/components/Sidebar';
const adminPages = [{
  id: 'dashboard',
  title: '控制台',
  description: '查看数据概览和统计',
  icon: BarChart3,
  color: 'text-blue-600'
}, {
  id: 'members',
  title: '会员管理',
  description: '管理会员信息和权限',
  icon: Users,
  color: 'text-green-600'
}, {
  id: 'products-admin',
  title: '商品管理',
  description: '管理商品信息和库存',
  icon: Package,
  color: 'text-orange-600'
}, {
  id: 'orders',
  title: '订单管理',
  description: '处理订单和物流信息',
  icon: FileText,
  color: 'text-purple-600'
}, {
  id: 'settlements',
  title: '结算管理',
  description: '查看财务结算信息',
  icon: Settings,
  color: 'text-red-600'
}, {
  id: 'categories',
  title: '分类管理',
  description: '管理商品分类信息',
  icon: Monitor,
  color: 'text-indigo-600'
}];
export default function AdminNotFound(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const handleGoToDashboard = () => {
    $w.utils.navigateTo({
      pageId: 'admin/dashboard'
    });
  };
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: '请输入搜索内容',
        description: '请输入您想要搜索的管理功能',
        variant: 'destructive'
      });
      return;
    }
    setIsSearching(true);
    try {
      // 模拟搜索请求
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 根据搜索词跳转到对应的管理页面
      const searchLower = searchTerm.toLowerCase();
      if (searchLower.includes('会员') || searchLower.includes('用户')) {
        $w.utils.navigateTo({
          pageId: 'admin/members'
        });
      } else if (searchLower.includes('商品') || searchLower.includes('产品')) {
        $w.utils.navigateTo({
          pageId: 'admin/products-admin'
        });
      } else if (searchLower.includes('订单')) {
        $w.utils.navigateTo({
          pageId: 'admin/orders'
        });
      } else if (searchLower.includes('结算') || searchLower.includes('财务')) {
        $w.utils.navigateTo({
          pageId: 'admin/settlements'
        });
      } else if (searchLower.includes('分类')) {
        $w.utils.navigateTo({
          pageId: 'admin/categories'
        });
      } else {
        // 默认跳转到控制台
        $w.utils.navigateTo({
          pageId: 'admin/dashboard',
          params: {
            search: searchTerm
          }
        });
      }
    } catch (error) {
      toast({
        title: '搜索失败',
        description: '请稍后重试',
        variant: 'destructive'
      });
    } finally {
      setIsSearching(false);
    }
  };
  const handlePageClick = pageId => {
    $w.utils.navigateTo({
      pageId: `admin/${pageId}`
    });
  };
  const handleContactSupport = () => {
    toast({
      title: '联系技术支持',
      description: '技术支持功能正在开发中，敬请期待'
    });
  };
  const handleMemberLogin = () => {
    $w.utils.navigateTo({
      pageId: 'member-login'
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* 顶部导航 */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">页面未找到</h1>
      </div>

      {/* 主要内容 */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* 404图标和标题 */}
          <div className="text-center mb-8">
            <div className="mx-auto w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl font-bold text-white">404</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              页面未找到
            </h2>
            <p className="text-gray-600 text-lg">
              您访问的管理页面可能已被移除、名称已更改或暂时不可用
            </p>
          </div>

          {/* 搜索功能 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Search className="w-5 h-5 mr-2 text-blue-600" />
                搜索管理功能
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input placeholder="搜索管理功能（如：会员管理、商品管理等）" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }} className="flex-1" />
                <Button onClick={handleSearch} disabled={isSearching} className="bg-blue-600 hover:bg-blue-700">
                  {isSearching ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Search className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                支持搜索：会员管理、商品管理、订单管理、结算管理、分类管理等
              </p>
            </CardContent>
          </Card>

          {/* 常用管理页面推荐 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">常用管理页面</CardTitle>
              <p className="text-sm text-gray-600">
                您可能想要访问这些管理功能
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {adminPages.map(page => {
                const Icon = page.icon;
                return <button key={page.id} onClick={() => handlePageClick(page.id)} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
                      <div className="flex items-center mb-2">
                        <Icon className={`w-6 h-6 ${page.color} mr-2`} />
                        <span className="font-medium text-gray-900">{page.title}</span>
                      </div>
                      <p className="text-xs text-gray-600">{page.description}</p>
                    </button>;
              })}
              </div>
            </CardContent>
          </Card>

          {/* 快速操作 */}
          <div className="flex space-x-4 mb-6">
            <Button onClick={handleGoToDashboard} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Monitor className="w-4 h-4 mr-2" />
              返回控制台
            </Button>
            <Button onClick={handleContactSupport} variant="outline" className="flex-1">
              <AlertCircle className="w-4 h-4 mr-2" />
              联系技术支持
            </Button>
          </div>

          {/* 系统信息 */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-medium text-gray-900 mb-2">系统信息</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">系统名称：</span>
                    <span className="text-gray-900">烘焙原料商城管理系统</span>
                  </div>
                  <div>
                    <span className="text-gray-600">版本：</span>
                    <span className="text-gray-900">v1.0.0</span>
                  </div>
                  <div>
                    <span className="text-gray-600">环境：</span>
                    <span className="text-gray-900">生产环境</span>
                  </div>
                  <div>
                    <span className="text-gray-600">最后更新：</span>
                    <span className="text-gray-900">2024-03-15</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 会员登录入口 */}
          <div className="text-center pt-4 border-t">
            <button onClick={handleMemberLogin} className="text-sm text-gray-500 hover:text-gray-700">
              会员用户登录入口
            </button>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="bg-white p-4 text-center border-t">
        <p className="text-sm text-gray-500">
          如果您认为这是一个系统错误，请
          <button onClick={handleContactSupport} className="text-blue-600 hover:text-blue-700 mx-1">
            联系技术支持
          </button>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          © 2024 烘焙原料商城管理系统. 保留所有权利.
        </p>
      </div>
    </div>;
}
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Home, Search, ShoppingBag, Heart, MessageCircle, ArrowLeft, Star } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const popularPages = [{
  id: 'products',
  title: '商品列表',
  description: '浏览所有优质商品',
  icon: ShoppingBag,
  color: 'text-orange-600'
}, {
  id: 'categories',
  title: '商品分类',
  description: '按分类查找商品',
  icon: Star,
  color: 'text-blue-600'
}, {
  id: 'cart',
  title: '购物车',
  description: '查看已选商品',
  icon: Heart,
  color: 'text-red-600'
}, {
  id: 'profile',
  title: '个人中心',
  description: '管理个人信息',
  icon: MessageCircle,
  color: 'text-green-600'
}];
export default function MemberNotFound(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const handleGoHome = () => {
    $w.utils.navigateTo({
      pageId: 'member/index'
    });
  };
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: '请输入搜索内容',
        description: '请输入您想要搜索的商品名称',
        variant: 'destructive'
      });
      return;
    }
    setIsSearching(true);
    try {
      // 模拟搜索请求
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 跳转到商品列表页面并传递搜索参数
      $w.utils.navigateTo({
        pageId: 'member/products',
        params: {
          search: searchTerm
        }
      });
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
      pageId: `member/${pageId}`
    });
  };
  const handleContactSupport = () => {
    toast({
      title: '联系客服',
      description: '客服功能正在开发中，敬请期待'
    });
  };
  const handleAdminLogin = () => {
    $w.utils.navigateTo({
      pageId: 'admin-login'
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
      {/* 顶部导航 */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">页面未找到</h1>
      </div>

      {/* 主要内容 */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* 404图标和标题 */}
          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">404</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              哎呀，页面不见了！
            </h2>
            <p className="text-gray-600">
              您访问的页面可能已被移除、名称已更改或暂时不可用
            </p>
          </div>

          {/* 搜索功能 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Search className="w-5 h-5 mr-2 text-orange-600" />
                搜索商品
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input placeholder="搜索您想要的商品..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }} className="flex-1" />
                <Button onClick={handleSearch} disabled={isSearching} className="bg-orange-600 hover:bg-orange-700">
                  {isSearching ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Search className="w-4 h-4" />}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 热门页面推荐 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">热门页面</CardTitle>
              <p className="text-sm text-gray-600">
                您可能想要访问这些页面
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {popularPages.map(page => {
                const Icon = page.icon;
                return <button key={page.id} onClick={() => handlePageClick(page.id)} className="p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors text-left">
                      <div className="flex items-center mb-2">
                        <Icon className={`w-5 h-5 ${page.color} mr-2`} />
                        <span className="font-medium text-gray-900">{page.title}</span>
                      </div>
                      <p className="text-xs text-gray-600">{page.description}</p>
                    </button>;
              })}
              </div>
            </CardContent>
          </Card>

          {/* 快速操作 */}
          <div className="flex space-x-3 mb-6">
            <Button onClick={handleGoHome} className="flex-1 bg-orange-600 hover:bg-orange-700">
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
            <Button onClick={handleContactSupport} variant="outline" className="flex-1">
              <MessageCircle className="w-4 h-4 mr-2" />
              联系客服
            </Button>
          </div>

          {/* 管理员入口 */}
          <div className="text-center pt-4 border-t">
            <button onClick={handleAdminLogin} className="text-xs text-gray-500 hover:text-gray-700">
              管理员登录入口
            </button>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="bg-white p-4 text-center border-t">
        <p className="text-xs text-gray-500">
          如果您认为这是一个错误，请
          <button onClick={handleContactSupport} className="text-orange-600 hover:text-orange-700 mx-1">
            联系我们
          </button>
        </p>
      </div>

      <TabBar activeTab="home" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { useToast } from '@/components/ui';

// 管理后台页面
import Dashboard from './pages/admin/dashboard';
import Members from './pages/admin/members';
import MemberDetail from './pages/admin/member-detail';
import Orders from './pages/admin/orders';
import OrderDetail from './pages/admin/order-detail';
import Settlements from './pages/admin/settlements';
import SettlementDetail from './pages/admin/settlement-detail';
import ProductsAdmin from './pages/admin/products-admin';
import ProductDetailAdmin from './pages/admin/product-detail-admin';
import Categories from './pages/admin/categories';

// 会员小程序页面
import Index from './pages/member/index';
import Products from './pages/member/products';
import ProductDetail from './pages/member/product-detail';
import Cart from './pages/member/cart';
import OrderConfirm from './pages/member/order-confirm';
import MyOrders from './pages/member/my-orders';
import Profile from './pages/member/profile';
import Points from './pages/member/points';
import CategoriesMember from './pages/member/categories';

// 独立登录页面
import MemberLogin from './pages/member-login';
import AdminLogin from './pages/admin-login';

// 独立404页面
import MemberNotFound from './pages/member-not-found';
import AdminNotFound from './pages/admin-not-found';

// 共享页面
import Login from './pages/login';
import NotFound from './pages/not-found';

// 全局生命周期配置
const lifecycleConfig = {
  // 页面未找到生命周期处理
  onAppPageNotFound: error => {
    console.error('页面未找到:', error);

    // 显示错误提示
    if (typeof window !== 'undefined' && window.$w && window.$w.toast) {
      window.$w.toast({
        title: '页面未找到',
        description: '您访问的页面不存在，已为您跳转到首页',
        variant: 'destructive'
      });
    }

    // 根据当前路径判断用户类型，返回对应的404页面
    const path = window.location.pathname;
    if (path.startsWith('/admin') || path.startsWith('/admin-login')) {
      return AdminNotFound;
    } else if (path.startsWith('/member') || path.startsWith('/member-login')) {
      return MemberNotFound;
    } else {
      return NotFound;
    }
  }
};

// 将生命周期配置挂载到全局window对象，供框架调用
if (typeof window !== 'undefined') {
  window.$wLifecycle = lifecycleConfig;
}
function App() {
  const {
    toast
  } = useToast();

  // 将toast方法挂载到全局，供生命周期使用
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.$w = {
        ...window.$w,
        toast: toast
      };
    }
  }, [toast]);

  // 页面未找到处理函数
  const handlePageNotFound = error => {
    console.error('页面未找到:', error);
    toast({
      title: '页面未找到',
      description: '您访问的页面不存在，已为您跳转到首页',
      variant: 'destructive'
    });

    // 根据当前路径判断用户类型，跳转到对应的404页面
    const path = window.location.pathname;
    let targetPath = '/not-found';
    if (path.startsWith('/admin') || path.startsWith('/admin-login')) {
      targetPath = '/admin-not-found';
    } else if (path.startsWith('/member') || path.startsWith('/member-login')) {
      targetPath = '/member-not-found';
    }

    // 延迟跳转到404页面，确保错误提示显示
    setTimeout(() => {
      window.location.href = targetPath;
    }, 1000);

    // 返回一个加载状态
    return React.createElement('div', {
      className: 'min-h-screen bg-gray-50 flex items-center justify-center'
    }, React.createElement('div', {
      className: 'text-center'
    }, React.createElement('div', {
      className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4'
    }), React.createElement('p', {
      className: 'text-gray-600'
    }, '页面跳转中...')));
  };

  // 根据当前路径返回对应的页面组件
  const getCurrentPage = () => {
    const path = window.location.pathname;

    // 独立登录页面路由
    if (path === '/member-login') return MemberLogin;
    if (path === '/admin-login') return AdminLogin;

    // 独立404页面路由
    if (path === '/member-not-found') return MemberNotFound;
    if (path === '/admin-not-found') return AdminNotFound;

    // 管理后台路由
    if (path === '/admin/dashboard') return Dashboard;
    if (path === '/admin/members') return Members;
    if (path === '/admin/member-detail') return MemberDetail;
    if (path === '/admin/orders') return Orders;
    if (path === '/admin/order-detail') return OrderDetail;
    if (path === '/admin/settlements') return Settlements;
    if (path === '/admin/settlement-detail') return SettlementDetail;
    if (path === '/admin/products-admin') return ProductsAdmin;
    if (path === '/admin/product-detail-admin') return ProductDetailAdmin;
    if (path === '/admin/categories') return Categories;

    // 会员小程序路由
    if (path === '/member/index') return Index;
    if (path === '/member/products') return Products;
    if (path === '/member/product-detail') return ProductDetail;
    if (path === '/member/cart') return Cart;
    if (path === '/member/order-confirm') return OrderConfirm;
    if (path === '/member/my-orders') return MyOrders;
    if (path === '/member/profile') return Profile;
    if (path === '/member/points') return Points;
    if (path === '/member/categories') return CategoriesMember;

    // 共享路由（保持向后兼容）
    if (path === '/login') return Login;
    if (path === '/not-found') return NotFound;

    // 默认重定向到会员首页
    if (path === '/') {
      // 使用 setTimeout 确保在客户端执行重定向
      setTimeout(() => {
        window.location.href = '/member/index';
      }, 0);
      return null;
    }

    // 未匹配的路径，触发页面未找到处理
    return handlePageNotFound(new Error(`路径未找到: ${path}`));
  };
  const CurrentPage = getCurrentPage();

  // 如果当前页面是 null（比如重定向情况），返回一个空 div
  if (!CurrentPage) {
    return React.createElement('div', {
      style: {
        width: '100%',
        height: '100vh'
      }
    });
  }
  return React.createElement(CurrentPage, {
    $w: {
      auth: {
        currentUser: {
          type: 'user',
          userId: 'default_user',
          name: '默认用户',
          nickName: '默认用户'
        }
      },
      utils: {
        navigateTo: ({
          pageId,
          params = {}
        }) => {
          // 构建目标路径
          let targetPath = `/${pageId}`;

          // 如果 pageId 不以 / 开头，说明是相对路径
          if (!pageId.startsWith('/')) {
            targetPath = `/${pageId}`;
          }

          // 添加查询参数
          const searchParams = new URLSearchParams();
          Object.keys(params).forEach(key => {
            searchParams.append(key, params[key]);
          });
          const queryString = searchParams.toString();
          if (queryString) {
            targetPath += `?${queryString}`;
          }

          // 执行导航
          window.location.href = targetPath;
        },
        redirectTo: ({
          pageId,
          params = {}
        }) => {
          let targetPath = `/${pageId}`;
          if (!pageId.startsWith('/')) {
            targetPath = `/${pageId}`;
          }
          const searchParams = new URLSearchParams();
          Object.keys(params).forEach(key => {
            searchParams.append(key, params[key]);
          });
          const queryString = searchParams.toString();
          if (queryString) {
            targetPath += `?${queryString}`;
          }
          window.location.replace(targetPath);
        },
        navigateBack: () => {
          window.history.back();
        }
      },
      page: {
        dataset: {
          params: (() => {
            const urlParams = new URLSearchParams(window.location.search);
            const params = {};
            urlParams.forEach((value, key) => {
              params[key] = value;
            });
            return params;
          })()
        }
      },
      cloud: {
        callFunction: async ({
          name,
          data
        }) => {
          console.log('调用云函数:', name, data);
          return {
            result: 'success'
          };
        },
        getCloudInstance: async () => {
          return {
            database: {
              collection: () => ({
                get: () => Promise.resolve({
                  data: []
                }),
                add: () => Promise.resolve({
                  _id: 'new_id'
                }),
                update: () => Promise.resolve({
                  updated: 1
                }),
                remove: () => Promise.resolve({
                  deleted: 1
                })
              })
            },
            storage: {
              uploadFile: () => Promise.resolve({
                fileID: 'new_file_id'
              }),
              downloadFile: () => Promise.resolve({
                tempFilePath: '/temp/path'
              })
            }
          };
        }
      }
    }
  });
}
export default App;
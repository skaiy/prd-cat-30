// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { cn } from '@/lib/utils';
// @ts-ignore;
import { Home, Users, ShoppingCart, Package, Settings, Menu, X } from 'lucide-react';

export function Sidebar({
  activePage,
  onNavigate
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const menuItems = [{
    title: '控制台',
    icon: Home,
    page: 'admin/dashboard',
    key: 'dashboard'
  }, {
    title: '会员管理',
    icon: Users,
    page: 'admin/members',
    key: 'members'
  }, {
    title: '订单管理',
    icon: ShoppingCart,
    page: 'admin/orders',
    key: 'orders'
  }, {
    title: '结算管理',
    icon: Package,
    page: 'admin/settlements',
    key: 'settlements'
  }, {
    title: '产品管理',
    icon: Package,
    page: 'admin/products-admin',
    key: 'products'
  }, {
    title: '分类管理',
    icon: Settings,
    page: 'admin/categories',
    key: 'categories'
  }];
  const handleNavigate = page => {
    onNavigate(page);
    if (isMobile) {
      setIsOpen(false);
    }
  };
  const sidebarContent = <div className={cn("flex flex-col h-full bg-white border-r transition-all duration-300", isCollapsed ? "w-16" : "w-64")}>
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && <h1 className="text-xl font-bold text-gray-900">商家后台</h1>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map(item => <li key={item.key}>
              <button onClick={() => handleNavigate(item.page)} className={cn("w-full flex items-center p-3 rounded-lg transition-colors", activePage === item.key ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:bg-gray-100")}>
                <item.icon className="w-5 h-5" />
                {!isCollapsed && <span className="ml-3 font-medium">{item.title}</span>}
              </button>
            </li>)}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center p-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          {!isCollapsed && <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">管理员</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>}
        </div>
      </div>
    </div>;
  if (isMobile) {
    return <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md">
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      {isOpen && <div className="fixed inset-0 z-40">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            {sidebarContent}
          </div>
        </div>}
    </>;
  }
  return sidebarContent;
}
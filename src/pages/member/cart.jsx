// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const mockCartItems = [{
  id: '1',
  name: '法国进口黄油',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=100&h=100&fit=crop',
  price: 45.8,
  originalPrice: 52.0,
  quantity: 2,
  stock: 100
}, {
  id: '2',
  name: '有机高筋面粉',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop',
  price: 18.5,
  originalPrice: 22.0,
  quantity: 1,
  stock: 50
}, {
  id: '3',
  name: '比利时巧克力豆',
  image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&h=100&fit=crop',
  price: 68.0,
  originalPrice: 78.0,
  quantity: 3,
  stock: 30
}];
export default function Cart(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [cartItems, setCartItems] = useState(mockCartItems);
  const handleQuantityChange = (id, type) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        if (type === 'increase' && item.quantity < item.stock) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        } else if (type === 'decrease' && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }
      }
      return item;
    }));
  };
  const handleRemoveItem = id => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: '删除成功',
      description: '商品已从购物车中移除'
    });
  };
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: '购物车为空',
        description: '请先添加商品到购物车',
        variant: 'destructive'
      });
      return;
    }
    $w.utils.navigateTo({
      pageId: 'member/order-confirm'
    });
  };
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginalAmount = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const discount = totalOriginalAmount - totalAmount;
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <h1 className="text-lg font-semibold">购物车</h1>
      </div>

      {cartItems.length === 0 ? <div className="flex flex-col items-center justify-center h-96">
          <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">购物车还是空的</p>
          <Button onClick={() => $w.utils.navigateTo({
        pageId: 'member/products'
      })} className="bg-orange-500 hover:bg-orange-600">
            去逛逛
          </Button>
        </div> : <>
        {/* 购物车列表 */}
        <div className="p-4 space-y-4">
          {cartItems.map(item => <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1 ml-4">
                    <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-orange-600 font-bold">¥{item.price}</span>
                        <span className="text-gray-400 text-xs line-through ml-1">¥{item.originalPrice}</span>
                      </div>
                      <span className="text-xs text-gray-500">库存: {item.stock}件</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, 'decrease')} disabled={item.quantity <= 1}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="mx-3 font-medium">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, 'increase')} disabled={item.quantity >= item.stock}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* 价格汇总 */}
        <Card className="mx-4 mb-4">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">商品总额</span>
                <span>¥{totalOriginalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">优惠金额</span>
                <span className="text-red-500">-¥{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>合计</span>
                <span className="text-orange-600">¥{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 结算按钮 */}
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
          <Button onClick={handleCheckout} className="w-full bg-orange-500 hover:bg-orange-600">
            去结算 ({cartItems.length}件)
          </Button>
        </div>
      </>}

      <TabBar activeTab="cart" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
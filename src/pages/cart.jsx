// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Trash2, Minus, Plus } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent } from '@/components/ui';

import { TabBar } from '@/components/TabBar';
const mockCartItems = [{
  id: '1',
  name: '法国进口黄油',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=100&h=100&fit=crop',
  price: 45.8,
  quantity: 2,
  selected: true
}, {
  id: '2',
  name: '有机高筋面粉',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop',
  price: 18.5,
  quantity: 1,
  selected: true
}, {
  id: '3',
  name: '比利时巧克力豆',
  image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=100&h=100&fit=crop',
  price: 68.0,
  quantity: 1,
  selected: false
}];
export default function Cart(props) {
  const {
    $w
  } = props;
  const [cartItems, setCartItems] = useState(mockCartItems);
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items => items.map(item => item.id === id ? {
      ...item,
      quantity: newQuantity
    } : item));
  };
  const removeItem = id => {
    setCartItems(items => items.filter(item => item.id !== id));
  };
  const toggleSelect = id => {
    setCartItems(items => items.map(item => item.id === id ? {
      ...item,
      selected: !item.selected
    } : item));
  };
  const selectedItems = cartItems.filter(item => item.selected);
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      return;
    }
    $w.utils.navigateTo({
      pageId: 'order-confirm',
      params: {
        items: JSON.stringify(selectedItems)
      }
    });
  };
  return <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white p-4 border-b">
        <h1 className="text-lg font-semibold text-center">购物车</h1>
      </div>

      <div className="p-4">
        {cartItems.length === 0 ? <div className="text-center py-8">
            <p className="text-gray-500">购物车是空的</p>
          </div> : <div className="space-y-4">
            {cartItems.map(item => <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <input type="checkbox" checked={item.selected} onChange={() => toggleSelect(item.id)} className="mt-8" />
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-orange-600 font-bold mt-1">¥{item.price}</p>
                      <div className="flex items-center mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeItem(item.id)} className="ml-auto text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>}
      </div>

      {/* 底部结算栏 */}
      {cartItems.length > 0 && <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-600">合计：</span>
              <span className="text-lg font-bold text-orange-600">¥{totalAmount.toFixed(2)}</span>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleCheckout} disabled={selectedItems.length === 0}>
              结算 ({selectedItems.length})
            </Button>
          </div>
        </div>}

      <TabBar activeTab="cart" onTabChange={path => $w.utils.navigateTo({
      pageId: path.slice(1)
    })} />
    </div>;
}
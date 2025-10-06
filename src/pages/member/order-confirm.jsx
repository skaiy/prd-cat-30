// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/components/ui';
// @ts-ignore;
import { MapPin, Phone, User, CreditCard } from 'lucide-react';

import { TabBar } from '@/components/TabBar';
const mockOrderItems = [{
  id: '1',
  name: '法国进口黄油',
  image: 'https://images.unsplash.com/photo-1589985270958-bf087be2a319?w=100&h=100&fit=crop',
  price: 45.8,
  originalPrice: 52.0,
  quantity: 2
}, {
  id: '2',
  name: '有机高筋面粉',
  image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop',
  price: 18.5,
  originalPrice: 22.0,
  quantity: 1
}];
const mockAddresses = [{
  id: '1',
  name: '张三',
  phone: '138****1234',
  address: '北京市朝阳区幸福路123号',
  isDefault: true
}, {
  id: '2',
  name: '李四',
  phone: '139****5678',
  address: '北京市海淀区中关村大街456号',
  isDefault: false
}];
export default function OrderConfirm(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [orderItems] = useState(mockOrderItems);
  const [addresses] = useState(mockAddresses);
  const [selectedAddress, setSelectedAddress] = useState(mockAddresses.find(addr => addr.isDefault));
  const [remark, setRemark] = useState('');
  const handleSubmitOrder = () => {
    if (!selectedAddress) {
      toast({
        title: '请选择收货地址',
        variant: 'destructive'
      });
      return;
    }
    toast({
      title: '订单提交成功',
      description: '订单已提交，请等待商家确认'
    });
    setTimeout(() => {
      $w.utils.navigateTo({
        pageId: 'member/my-orders'
      });
    }, 1500);
  };
  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalOriginalAmount = orderItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const discount = totalOriginalAmount - totalAmount;
  const shippingFee = totalAmount >= 99 ? 0 : 10;
  const finalAmount = totalAmount + shippingFee;
  return <div className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
          返回
        </Button>
        <h1 className="text-lg font-semibold">确认订单</h1>
      </div>

      {/* 收货地址 */}
      <Card className="m-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            收货地址
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {addresses.map(address => <div key={address.id} onClick={() => setSelectedAddress(address)} className={`p-3 border rounded-lg cursor-pointer ${selectedAddress?.id === address.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="font-medium">{address.name}</span>
                    {address.isDefault && <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded">默认</span>}
                  </div>
                  <Phone className="w-4 h-4 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600 ml-6">{address.phone}</p>
                <p className="text-sm text-gray-700 mt-1 ml-6">{address.address}</p>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* 商品清单 */}
      <Card className="mx-4 mb-4">
        <CardHeader>
          <CardTitle>商品清单</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orderItems.map(item => <div key={item.id} className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1 ml-3">
                  <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="text-orange-600 font-bold">¥{item.price}</span>
                      <span className="text-gray-400 text-xs line-through ml-1">¥{item.originalPrice}</span>
                    </div>
                    <span className="text-sm text-gray-600">x{item.quantity}</span>
                  </div>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>

      {/* 订单备注 */}
      <Card className="mx-4 mb-4">
        <CardHeader>
          <CardTitle>订单备注</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="请输入订单备注（选填）" value={remark} onChange={e => setRemark(e.target.value)} />
        </CardContent>
      </Card>

      {/* 价格明细 */}
      <Card className="mx-4 mb-20">
        <CardHeader>
          <CardTitle>价格明细</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">商品总额</span>
              <span>¥{totalOriginalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">优惠金额</span>
              <span className="text-red-500">-¥{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">运费</span>
              <span>{shippingFee === 0 ? '免运费' : `¥${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t">
              <span>实付金额</span>
              <span className="text-orange-600">¥{finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 提交订单按钮 */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">实付金额：</span>
          <span className="text-xl font-bold text-orange-600">¥{finalAmount.toFixed(2)}</span>
        </div>
        <Button onClick={handleSubmitOrder} className="w-full bg-orange-500 hover:bg-orange-600">
          提交订单
        </Button>
      </div>

      <TabBar activeTab="cart" onTabChange={path => $w.utils.navigateTo({
      pageId: path
    })} />
    </div>;
}
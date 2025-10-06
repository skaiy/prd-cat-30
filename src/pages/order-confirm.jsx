// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { MapPin, Phone, User } from 'lucide-react';
// @ts-ignore;
import { Button, Input, Card, CardContent } from '@/components/ui';

export default function OrderConfirm(props) {
  const {
    $w
  } = props;
  const [address, setAddress] = useState('北京市朝阳区幸福路123号');
  const [phone, setPhone] = useState('13812345678');
  const [name, setName] = useState('张三');
  const [note, setNote] = useState('');

  // 模拟订单商品
  const orderItems = [{
    name: '法国进口黄油',
    price: 45.8,
    quantity: 2
  }, {
    name: '有机高筋面粉',
    price: 18.5,
    quantity: 1
  }];
  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const handleSubmitOrder = () => {
    // 模拟提交订单
    console.log('提交订单:', {
      address,
      phone,
      name,
      note,
      items: orderItems
    });
    $w.utils.navigateTo({
      pageId: 'my-orders'
    });
  };
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-4 border-b">
        <h1 className="text-lg font-semibold text-center">确认订单</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* 收货地址 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">收货信息</h3>
            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="收货人姓名" value={name} onChange={e => setName(e.target.value)} className="pl-10" />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input type="tel" placeholder="联系电话" value={phone} onChange={e => setPhone(e.target.value)} className="pl-10" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="详细地址" value={address} onChange={e => setAddress(e.target.value)} className="pl-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 商品列表 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">商品清单</h3>
            <div className="space-y-3">
              {orderItems.map((item, index) => <div key={index} className="flex justify-between">
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">x{item.quantity}</p>
                  </div>
                  <p className="text-sm">¥{(item.price * item.quantity).toFixed(2)}</p>
                </div>)}
            </div>
            <div className="border-t mt-3 pt-3">
              <div className="flex justify-between">
                <span className="font-semibold">总计</span>
                <span className="font-bold text-orange-600">¥{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 备注 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">订单备注</h3>
            <Input placeholder="请输入订单备注（选填）" value={note} onChange={e => setNote(e.target.value)} />
          </CardContent>
        </Card>

        {/* 提交按钮 */}
        <Button className="w-full bg-orange-600 hover:bg-orange-700" onClick={handleSubmitOrder}>
          提交订单
        </Button>
      </div>
    </div>;
}
// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Phone, Lock, UserPlus } from 'lucide-react';

export default function Login(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = () => {
    if (!phone || !password) {
      toast({
        title: '提示',
        description: '请填写完整信息',
        variant: 'destructive'
      });
      return;
    }

    // 模拟登录/注册成功
    toast({
      title: isLogin ? '登录成功' : '注册成功',
      description: `欢迎${isLogin ? '回来' : '加入'}！`
    });
    $w.utils.navigateTo({
      pageId: 'products'
    });
  };
  return <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? '会员登录' : '会员注册'}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              {isLogin ? '欢迎回来，请登录您的账号' : '加入我们，享受会员服务'}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!isLogin && <div>
                  <Input placeholder="请输入姓名" value={name} onChange={e => setName(e.target.value)} className="pl-10" />
                  <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>}
              
              <div className="relative">
                <Input type="tel" placeholder="请输入手机号" value={phone} onChange={e => setPhone(e.target.value)} className="pl-10" />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              
              <div className="relative">
                <Input type="password" placeholder="请输入密码" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              
              <Button onClick={handleSubmit} className="w-full bg-orange-600 hover:bg-orange-700">
                {isLogin ? '登录' : '注册'}
              </Button>
              
              <div className="text-center">
                <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-orange-600 hover:underline">
                  {isLogin ? '没有账号？立即注册' : '已有账号？立即登录'}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}
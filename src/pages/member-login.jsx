// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Smartphone, Lock, User, ArrowLeft } from 'lucide-react';

export default function MemberLogin(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleLogin = async () => {
    // 验证输入
    if (!formData.phone.trim()) {
      toast({
        title: '请输入手机号',
        description: '手机号不能为空',
        variant: 'destructive'
      });
      return;
    }
    if (!formData.password.trim()) {
      toast({
        title: '请输入密码',
        description: '密码不能为空',
        variant: 'destructive'
      });
      return;
    }

    // 手机号格式验证
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      toast({
        title: '手机号格式错误',
        description: '请输入正确的11位手机号',
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 登录成功
      toast({
        title: '登录成功',
        description: '欢迎回来！'
      });

      // 跳转到会员首页
      setTimeout(() => {
        $w.utils.navigateTo({
          pageId: 'member/index'
        });
      }, 1000);
    } catch (error) {
      toast({
        title: '登录失败',
        description: '手机号或密码错误，请重试',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegister = () => {
    toast({
      title: '功能开发中',
      description: '注册功能正在开发中，敬请期待'
    });
  };
  const handleForgotPassword = () => {
    toast({
      title: '功能开发中',
      description: '忘记密码功能正在开发中，敬请期待'
    });
  };
  const handleSocialLogin = type => {
    toast({
      title: '功能开发中',
      description: `${type}登录功能正在开发中，敬请期待`
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col">
      {/* 顶部导航 */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">会员登录</h1>
      </div>

      {/* 主要内容 */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              欢迎回来
            </CardTitle>
            <p className="text-gray-600 mt-2">
              登录您的会员账户，享受专属服务
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* 手机号输入 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                手机号
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input type="tel" placeholder="请输入11位手机号" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="pl-10" maxLength={11} />
              </div>
            </div>

            {/* 密码输入 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input type={showPassword ? 'text' : 'password'} placeholder="请输入密码" value={formData.password} onChange={e => handleInputChange('password', e.target.value)} className="pl-10 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 记住密码和忘记密码 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={formData.rememberMe} onChange={e => handleInputChange('rememberMe', e.target.checked)} className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                <span className="text-sm text-gray-600">记住我</span>
              </label>
              <button onClick={handleForgotPassword} className="text-sm text-orange-600 hover:text-orange-700">
                忘记密码？
              </button>
            </div>

            {/* 登录按钮 */}
            <Button onClick={handleLogin} disabled={isLoading} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3">
              {isLoading ? <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  登录中...
                </div> : '登录'}
            </Button>

            {/* 分割线 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">或</span>
              </div>
            </div>

            {/* 社交登录 */}
            <div className="space-y-3">
              <Button variant="outline" onClick={() => handleSocialLogin('微信')} className="w-full">
                <div className="w-5 h-5 bg-green-500 rounded mr-2"></div>
                微信登录
              </Button>
              <Button variant="outline" onClick={() => handleSocialLogin('支付宝')} className="w-full">
                <div className="w-5 h-5 bg-blue-500 rounded mr-2"></div>
                支付宝登录
              </Button>
            </div>

            {/* 注册链接 */}
            <div className="text-center pt-4">
              <span className="text-sm text-gray-600">还没有账户？</span>
              <button onClick={handleRegister} className="text-sm text-orange-600 hover:text-orange-700 font-medium ml-1">
                立即注册
              </button>
            </div>

            {/* 管理员登录入口 */}
            <div className="text-center pt-2 border-t">
              <button onClick={() => $w.utils.navigateTo({
              pageId: 'login'
            })} className="text-xs text-gray-500 hover:text-gray-700">
                管理员登录入口
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部信息 */}
      <div className="bg-white p-4 text-center border-t">
        <p className="text-xs text-gray-500">
          登录即表示您同意我们的
          <a href="#" className="text-orange-600 hover:text-orange-700 mx-1">
            服务条款
          </a>
          和
          <a href="#" className="text-orange-600 hover:text-orange-700 mx-1">
            隐私政策
          </a>
        </p>
      </div>
    </div>;
}
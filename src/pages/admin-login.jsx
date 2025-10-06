// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { useToast, Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
// @ts-ignore;
import { Eye, EyeOff, Shield, Lock, User, AlertTriangle, ArrowLeft } from 'lucide-react';

export default function AdminLogin(props) {
  const {
    $w
  } = props;
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    username: '',
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
    if (!formData.username.trim()) {
      toast({
        title: '请输入用户名',
        description: '用户名不能为空',
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

    // 用户名格式验证（字母数字组合，3-20位）
    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    if (!usernameRegex.test(formData.username.trim())) {
      toast({
        title: '用户名格式错误',
        description: '用户名应为3-20位字母或数字组合',
        variant: 'destructive'
      });
      return;
    }

    // 密码强度验证（至少8位，包含字母和数字）
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast({
        title: '密码强度不足',
        description: '密码至少8位，需包含字母和数字',
        variant: 'destructive'
      });
      return;
    }
    setIsLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 登录成功
      toast({
        title: '登录成功',
        description: '欢迎进入管理后台'
      });

      // 跳转到管理后台控制台
      setTimeout(() => {
        $w.utils.navigateTo({
          pageId: 'admin/dashboard'
        });
      }, 1000);
    } catch (error) {
      toast({
        title: '登录失败',
        description: '用户名或密码错误，请重试',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleForgotPassword = () => {
    toast({
      title: '联系系统管理员',
      description: '请联系系统管理员重置密码',
      variant: 'warning'
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* 顶部导航 */}
      <div className="bg-white p-4 flex items-center shadow-sm">
        <Button variant="ghost" onClick={() => $w.utils.navigateBack()} className="mr-4">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-lg font-semibold">管理后台登录</h1>
      </div>

      {/* 主要内容 */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              管理后台登录
            </CardTitle>
            <p className="text-gray-600 mt-2">
              请使用管理员账户登录系统
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* 安全提示 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">安全提示</p>
                  <p>此页面仅限授权管理员访问，请妥善保管您的登录凭证。</p>
                </div>
              </div>
            </div>

            {/* 用户名输入 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                用户名
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input type="text" placeholder="请输入管理员用户名" value={formData.username} onChange={e => handleInputChange('username', e.target.value)} className="pl-10" />
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

            {/* 记住登录状态 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={formData.rememberMe} onChange={e => handleInputChange('rememberMe', e.target.checked)} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-600">保持登录状态</span>
              </label>
              <button onClick={handleForgotPassword} className="text-sm text-blue-600 hover:text-blue-700">
                忘记密码？
              </button>
            </div>

            {/* 登录按钮 */}
            <Button onClick={handleLogin} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3">
              {isLoading ? <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  验证中...
                </div> : '登录管理后台'}
            </Button>

            {/* 分割线 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">系统信息</span>
              </div>
            </div>

            {/* 系统信息 */}
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 mb-1">
                烘焙原料商城管理系统
              </p>
              <p className="text-xs text-gray-500">
                版本 v1.0.0 | 最后更新：2024-03-15
              </p>
            </div>

            {/* 会员登录入口 */}
            <div className="text-center pt-2 border-t">
              <button onClick={() => $w.utils.navigateTo({
              pageId: 'member-login'
            })} className="text-xs text-gray-500 hover:text-gray-700">
                会员用户登录入口
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部信息 */}
      <div className="bg-white p-4 text-center border-t">
        <p className="text-xs text-gray-500">
          © 2024 烘焙原料商城管理系统. 保留所有权利.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          本系统受法律保护，未经授权禁止访问
        </p>
      </div>
    </div>;
}
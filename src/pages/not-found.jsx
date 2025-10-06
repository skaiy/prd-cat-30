// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Button } from '@/components/ui';
// @ts-ignore;
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';

export default function NotFound(props) {
  const {
    $w
  } = props;
  const handleGoHome = () => {
    $w.utils.navigateTo({
      pageId: 'member/index'
    });
  };
  const handleGoBack = () => {
    $w.utils.navigateBack();
  };
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">页面未找到</h1>
          <p className="text-gray-600 mb-6">
            抱歉，您访问的页面不存在或已被移除。
          </p>
          
          <div className="space-y-3">
            <Button onClick={handleGoHome} className="w-full bg-orange-600 hover:bg-orange-700">
              <Home className="w-4 h-4 mr-2" />
              返回首页
            </Button>
            
            <Button onClick={handleGoBack} variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回上一页
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>如果问题持续存在，请联系客服</p>
          </div>
        </div>
      </div>
    </div>;
}
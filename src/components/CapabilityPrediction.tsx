import React from 'react';
import { BarChart, LineChart } from 'lucide-react';

const CapabilityPrediction: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
      <h2 className="text-2xl font-semibold mb-6">您的个性化能力提升预测</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <BarChart className="mr-2" /> 月份提升柱状图
        </h3>
        <div className="bg-gray-100 h-64 flex items-end justify-around p-4">
          {[1, 2, 3, 4, 5, 6].map((month) => (
            <div
              key={month}
              className="bg-blue-500 w-12"
              style={{ height: `${Math.random() * 80 + 20}%` }}
            ></div>
          ))}
        </div>
        <div className="flex justify-around mt-2">
          {[1, 2, 3, 4, 5, 6].map((month) => (
            <span key={month} className="text-sm">
              月{month}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <LineChart className="mr-2" /> 四周能力提升曲线图
        </h3>
        <div className="bg-gray-100 h-64 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M0,100 Q25,70 50,80 T100,20"
              fill="none"
              stroke="blue"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm">第1周</span>
          <span className="text-sm">第2周</span>
          <span className="text-sm">第3周</span>
          <span className="text-sm">第4周</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">结果解析</h3>
        <p className="text-gray-700">
          根据您的回答，我们预测您的AI创作能力将在未来6个月内稳步提升。
          特别是在第3个月和第6个月，您可能会经历显著的成长。
          我们建议您重点关注...
        </p>
      </div>
    </div>
  );
};

export default CapabilityPrediction;
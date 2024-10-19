import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, Loader, BarChart, Flame, Star, Clock, Book } from 'lucide-react';
import RadarChart from './RadarChart';

interface ReportAnalysisProps {
  answers: Record<number, string | string[]>;
}

const ReportAnalysis: React.FC<ReportAnalysisProps> = ({ answers }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const analyzeReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/analyze', { answers });
      if (response.data && response.data.analysis) {
        setAnalysis(response.data.analysis);
      } else {
        throw new Error('服务器响应无效');
      }
    } catch (err) {
      setError('报告分析失败。请稍后再试。');
      console.error('报告分析错误:', err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const renderIPProfile = () => (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">AI创作变现能力评估报告</h2>
      <div className="flex items-center mb-4">
        <span className="text-lg font-semibold mr-2">AI创作潜力指数：</span>
        <span className="bg-green-500 text-white px-3 py-1 rounded-full">高潜力</span>
      </div>
      <p className="text-gray-700 mb-4">
        根据您的回答，我们发现您在AI创作领域展现出了显著的潜力。您对新技术的开放态度和学习能力令人印象深刻。
        您的创意思维和对AI工具的初步了解为您的AI创作之路奠定了良好的基础。继续深入学习和实践，您有望在短时间内
        迅速提升自己的AI创作能力，并在个人IP建设和商业变现方面取得显著成果。
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Flame className="text-red-500 mr-2" />
          <span>学习动机：高</span>
        </div>
        <div className="flex items-center">
          <Star className="text-yellow-500 mr-2" />
          <span>创作潜力：高</span>
        </div>
        <div className="flex items-center">
          <Clock className="text-blue-500 mr-2" />
          <span>时间投入：中等</span>
        </div>
        <div className="flex items-center">
          <Book className="text-green-500 mr-2" />
          <span>AI知识储备：待提升</span>
        </div>
      </div>
    </div>
  );

  const renderRadarChart = () => {
    const radarData = {
      aiKnowledge: 60,
      contentCreation: 75,
      adaptability: 85,
      timeManagement: 70,
      entrepreneurialSpirit: 80,
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">AI创作变现能力雷达图</h3>
        <RadarChart data={radarData} />
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">能力雷达图解读（500字）：</h4>
          <p className="text-gray-700">
            您的AI创作变现能力雷达图展示了五个关键维度的评估结果，让我们深入分析每个方面：
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-2">
            <li>
              <span className="font-semibold">AI知识（60分）：</span>这个分数表明您对AI技术有一定了解，但仍有很大的提升空间。建议您系统性地学习AI基础知识，包括机器学习原理、深度学习基础等。可以通过在线课程、技术博客和实践项目来增强这方面的能力。
            </li>
            <li>
              <span className="font-semibold">内容创作（75分）：</span>您在内容创作方面表现不错，显示出良好的创意和表达能力。为了进一步提高，可以尝试结合AI工具来增强创作效率和质量，如使用GPT模型辅助写作或使用AI图像生成工具丰富视觉内容。
            </li>
            <li>
              <span className="font-semibold">适应能力（85分）：</span>这是您的最强项之一，表明您能够快速适应新技术和变化。在AI快速发展的环境中，这是一个巨大的优势。继续保持对新技术的开放态度，并积极尝试将新工具融入您的创作过程。
            </li>
            <li>
              <span className="font-semibold">时间管理（70分）：</span>您的时间管理能力处于中上水平，但还有提升空间。建议使用一些项目管理工具或时间追踪应用来优化您的工作流程，提高创作效率。
            </li>
            <li>
              <span className="font-semibold">创业精神（80分）：</span>您展现出强烈的创业精神，这对于在AI创作领域取得成功至关重要。继续培养这种精神，同时也要注意平衡风险和机遇，制定清晰的商业计划。
            </li>
          </ol>
          <p className="mt-4 text-gray-700">
            总体而言，您的能力分布相对均衡，特别是在适应能力和创业精神方面表现出色。这为您在AI创作领域的发展奠定了良好基础。重点关注AI知识的积累和时间管理能力的提升，将有助于您更好地利用AI工具进行创作，并在商业变现方面取得更大成功。建议您制定一个针对性的学习计划，重点提升AI知识，同时继续发挥您在内容创作和适应新技术方面的优势，这将帮助您在AI创作变现的道路上走得更远。
          </p>
        </div>
      </div>
    );
  };

  const renderFutureCapabilityChart = () => {
    const currentMonth = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const startMonth = months[currentMonth];
    const nextMonths = [
      months[(currentMonth + 1) % 12],
      months[(currentMonth + 2) % 12],
      months[(currentMonth + 3) % 12],
    ];

    const userGoal = answers[25] as string; // 假设第25题是用户选择的目标

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart className="mr-2" /> AI创作能力提升预测
        </h3>
        <div className="h-64 flex items-end justify-around">
          {[startMonth, ...nextMonths].map((month, index) => (
            <div key={month} className="flex flex-col items-center">
              <div 
                className={`w-16 bg-blue-${500 - index * 100} rounded-t-lg ${animate ? 'animate-draw-path' : ''}`} 
                style={{height: `${(index + 1) * 25}%`, transition: 'height 1s ease-out'}}
              ></div>
              <span className="mt-2">{month}</span>
              {index === 0 && <span className="mt-1 text-sm">初学者</span>}
              {index === 2 && <span className="mt-1 text-sm">AI高手</span>}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="font-semibold">您的目标：<span className="text-blue-600 font-bold">{userGoal}</span></p>
          <p className="mt-2 text-gray-700">
            基于您的学习计划和目标，我们预计您将在三个月内从AI创作初学者成长为AI高手。
            继续保持学习热情和实践，相信您一定能实现 <span className="font-bold">{userGoal}</span> 的目标！
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg w-full max-w-4xl mt-8">
      {renderIPProfile()}
      {renderRadarChart()}
      {renderFutureCapabilityChart()}
      <div className="mt-8">
        <button
          onClick={analyzeReport}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-4"
        >
          {loading ? <Loader className="animate-spin" /> : '获取AI解读'}
        </button>
        {analysis && (
          <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">AI解读结果：</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{analysis}</p>
          </div>
        )}
      </div>
      {error && (
        <div className="text-red-500 flex items-center mb-4">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      )}
    </div>
  );
};

export default ReportAnalysis;
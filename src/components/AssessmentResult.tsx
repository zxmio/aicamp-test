import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AssessmentResultProps {
  onContinue: () => void;
}

const AssessmentResult: React.FC<AssessmentResultProps> = ({ onContinue }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl text-center">
      <h2 className="text-2xl font-semibold mb-4">您的自由职业能力等级</h2>
      <div className="text-4xl font-bold text-blue-600 mb-6">熟练</div>
      <p className="mb-6">
        继续完成剩余7个问题，获取详细的能力提升预测
      </p>
      <button
        onClick={onContinue}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors flex items-center mx-auto"
      >
        继续 <ArrowRight className="ml-2" size={18} />
      </button>
    </div>
  );
};

export default AssessmentResult;
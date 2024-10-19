import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import ReportAnalysis from './components/ReportAnalysis';
import SimpleOpenAITest from './components/SimpleOpenAITest';
import { ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'questionnaire' | 'analysis' | 'test'>('test');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});

  const handleAnswer = (questionNumber: number, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionNumber]: answer }));
    if (questionNumber === 25) {
      setCurrentStep('analysis');
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 'analysis') {
      setCurrentStep('questionnaire');
      setCurrentQuestion(25);
    } else if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const renderBackButton = () => (
    <button
      onClick={handleBack}
      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors flex items-center"
    >
      <ArrowLeft className="mr-2" size={18} /> 返回
    </button>
  );

  console.log('Current step:', currentStep); // 调试信息

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">AI创作训练营</h1>
      {currentStep === 'test' && <SimpleOpenAITest />}
      {currentStep === 'questionnaire' && (
        <>
          <Questionnaire
            currentQuestion={currentQuestion}
            totalQuestions={25}
            onAnswer={handleAnswer}
          />
          {currentQuestion > 1 && renderBackButton()}
        </>
      )}
      {currentStep === 'analysis' && (
        <>
          <ReportAnalysis answers={answers} />
          {renderBackButton()}
        </>
      )}
      {/* 添加调试信息 */}
      <div className="mt-4 text-sm text-gray-500">
        Current step: {currentStep}, Current question: {currentQuestion}
      </div>
    </div>
  );
};

export default App;
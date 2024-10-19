import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader, AlertCircle } from 'lucide-react';

const OpenAITest: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const testOpenAI = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending request to OpenAI API');
      const result = await axios.post('/.netlify/functions/openai', {
        prompt: '用中文说"欢迎来到AI创作训练营！"'
      });
      console.log('Received response:', result.data);
      setResponse(result.data.message);
    } catch (err) {
      console.error('Error details:', err);
      let errorMessage = '调用OpenAI API失败。';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage += ` 错误: ${err.response.data.error || err.message}`;
        if (err.response.data.details) {
          errorMessage += ` 详情: ${err.response.data.details}`;
        }
      } else if (err instanceof Error) {
        errorMessage += ` 错误: ${err.message}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">OpenAI API 测试</h2>
      <button
        onClick={testOpenAI}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        {loading ? <Loader className="animate-spin" /> : '测试 OpenAI API'}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">API 响应：</h3>
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div className="text-red-500 flex items-center mt-4">
          <AlertCircle className="mr-2" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default OpenAITest;
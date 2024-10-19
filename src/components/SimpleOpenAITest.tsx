import React, { useState } from 'react';
import axios from 'axios';

const SimpleOpenAITest: React.FC = () => {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const testOpenAI = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending request to test-openai function');
      const result = await axios.get('/.netlify/functions/test-openai');
      console.log('Received response:', result.data);
      setResponse(result.data.message);
    } catch (err) {
      console.error('Error details:', err);
      let errorMessage = 'OpenAI API 测试失败。';
      if (axios.isAxiosError(err) && err.response) {
        errorMessage += ` 错误: ${err.response.data.error || err.message}`;
        if (err.response.data.details) {
          errorMessage += ` 详情: ${err.response.data.details}`;
        }
        if (err.response.data.response) {
          errorMessage += ` OpenAI响应: ${JSON.stringify(err.response.data.response)}`;
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
      <h2 className="text-2xl font-bold mb-4">简单 OpenAI API 测试</h2>
      <p className="mb-4">这是一个简单的 OpenAI API 测试组件。点击下面的按钮来测试 API 连接。</p>
      <button
        onClick={testOpenAI}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        {loading ? '测试中...' : '测试 OpenAI API'}
      </button>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">API 响应：</h3>
          <p>{response}</p>
        </div>
      )}
      {error && (
        <div className="text-red-500 mt-4 p-4 bg-red-100 rounded">
          <h3 className="font-semibold mb-2">错误：</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleOpenAITest;
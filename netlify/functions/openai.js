const axios = require('axios');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { prompt } = JSON.parse(event.body);

  if (!process.env.OPENAI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'OpenAI API key is not set' }) };
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt }
        ],
        max_tokens: 150
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: response.data.choices[0].message.content.trim() })
    };
  } catch (error) {
    console.error('OpenAI API error:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error calling OpenAI API', details: error.message })
    };
  }
};
const axios = require('axios');

exports.handler = async function(event, context) {
  console.log('Function invoked');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set');
    return { statusCode: 500, body: JSON.stringify({ error: 'OpenAI API key is not set' }) };
  }

  console.log('API Key exists (not logging for security reasons)');

  try {
    console.log('Sending request to OpenAI API');
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "Say 'Hello, AI Creation Camp!' in Chinese." }
        ],
        max_tokens: 50
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Received response from OpenAI API');
    return {
      statusCode: 200,
      body: JSON.stringify({ message: response.data.choices[0].message.content.trim() })
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error calling OpenAI API', 
        details: error.message,
        response: error.response ? error.response.data : null
      })
    };
  }
};
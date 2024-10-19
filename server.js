const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 添加一个简单的测试路由
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

app.post('/api/openai', async (req, res) => {
  console.log('Received request to /api/openai');
  const { prompt } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is not set');
    return res.status(500).json({ error: 'OpenAI API key is not set' });
  }

  try {
    console.log('Sending request to OpenAI API');
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

    console.log('Received response from OpenAI API');
    res.json({ message: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('OpenAI API error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error calling OpenAI API', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
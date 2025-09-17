const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({limit: '10mb'}));
app.use(express.static('public')); // Serve your HTML file

app.post('/api/extract', async (req, res) => {
  try {
    const { image } = req.body;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{
          role: 'user',
          content: [{
            type: 'text',
            text: 'Extract numerical data from this table. Return only a JSON array of [x,y] pairs.'
          }, {
            type: 'image_url',
            image_url: { url: image }
          }]
        }]
      })
    });
    
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

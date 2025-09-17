exports.handler = async (event, context) => {
  const { image } = JSON.parse(event.body);
  
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
  
  return {
    statusCode: 200,
    body: JSON.stringify(await response.json())
  };
};

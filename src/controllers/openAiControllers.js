const openAi = require('../config/openAi');

async function handleRewrite(req, res) {
  const { content } = req.body;

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content is required and must be a string.' });
  }

  const prompt = `I am creating a SAAS application and I am going to use open AI to correct and generate texts for me in the below field and I need a prompt for each one of them to apply from the backend

Project Description
Sprint Description
Task Description
Acceptance Criteria 
${content}
`;

  try {
    const response = await openAi.chat.completions.create({
      model: 'gpt-4', // or fallback to gpt-3.5-turbo
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    const corrected = response.choices[0].message.content.trim();
    res.json({ corrected });

  } catch (error) {
    console.error('OpenAI Error:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Failed to rewrite content.' });
  }
}

module.exports = { handleRewrite };

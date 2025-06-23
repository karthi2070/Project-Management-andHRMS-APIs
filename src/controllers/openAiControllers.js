const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Service + Controller in one
async function handleRewrite(req, res) {
    const { content } = req.body;

    if (!content || typeof content !== 'string') {
        return res.status(400).json({ error: 'Content is required and must be a string.' });
    }

    const prompt = `
You are a writing assistant. Please rewrite and correct the following content for grammar, spelling, and clarity only.
Do not change the original meaning. Do not add or remove information. Keep formatting similar.

Content:
${content}
`;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
        });
        const corrected = response.choices[0].message.content.trim();
        res.json({ corrected });
    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ error: 'Failed to rewrite content.' });
    }
}

module.exports = { handleRewrite };
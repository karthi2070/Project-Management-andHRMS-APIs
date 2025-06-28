const openAi = require('../config/openAi');
const { projectDescriptionPrompt,
   sprintDescriptionPrompt,
    taskDescriptionPrompt,
     acceptanceCriteriaPrompt } = require('../helper/promtTemplate');
     
function generatePrompt(template, userInput) {
  return template.replace('{{user_input}}', userInput);
}

// Controller function
async function handleRewrite(req, res) {
  const { content, type } = req.body;

  if (!content || typeof content !== 'string') {
    return res.status(400).json({ error: 'Content is required and must be a string.' });
  }

  if (!type || !['project', 'sprint', 'task', 'acceptance'].includes(type)) {
    return res.status(400).json({ error: 'Type must be one of: project, sprint, task, acceptance' });
  }

  let promptTemplate;

  switch (type) {
    case 'project':
      promptTemplate = projectDescriptionPrompt;
      break;
    case 'sprint':
      promptTemplate = sprintDescriptionPrompt;
      break;
    case 'task':
      promptTemplate = taskDescriptionPrompt;
      break;
    case 'acceptance':
      promptTemplate = acceptanceCriteriaPrompt;
      break;
    default:
      return res.status(400).json({ error: 'Invalid type provided.' });
  }

  const prompt = generatePrompt(promptTemplate, content);
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

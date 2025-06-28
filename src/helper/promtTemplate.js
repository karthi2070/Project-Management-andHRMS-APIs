
const projectDescriptionPrompt = `You are a professional product manager. Based on the following keywords or title, write a clear, concise,
 and compelling Project Description suitable for a SaaS project planning tool. Focus on goals, purpose, and expected outcome. Keep the tone 
 formal and informative.
Input: {{user_input}}`

const sprintDescriptionPrompt = `You are an agile coach helping a team document their sprint. Based on the following keywords or notes,
 generate a Sprint Description that summarizes the sprint goal, duration, and what the team aims to achieve.

Input: {{user_input}}

Output a well-written, concise Sprint Description ready for a project management tool.
`;

const taskDescriptionPrompt = `You are a senior software developer. Improve or generate a Task Description based on the given title or user input.
 Ensure clarity, technical relevance, and actionable language that makes the task easy to understand for an engineering team.

Input: {{user_input}}

Output a clean, technical, and structured Task Description.
`;

const acceptanceCriteriaPrompt = `You are a QA engineer working with product managers. Given the user story or task,
 write Acceptance Criteria in bullet point format using the Gherkin-style (Given, When, Then) or clear condition statements.
Make sure the criteria are testable and unambiguous.

Input: {{user_input}}

Output a list of well-defined Acceptance Criteria.
`;
    
module.exports = {
  projectDescriptionPrompt,
  sprintDescriptionPrompt,
  taskDescriptionPrompt,
  acceptanceCriteriaPrompt
}  ;
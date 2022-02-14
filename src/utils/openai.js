require('dotenv').config();
const { store } = require('./Store');

// Initializing open ai
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/**
 * Get GPT-3 response for the given input
 * @param {string} prompt input
 * @param {string} id Member id
 */
async function getResponse(prompt, id) {
  const response = await openai
    .createCompletion('text-davinci-001', {
      prompt,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    })
    .catch(console.error);

  if (!response)
    return '> An error occurred while trying to get a response from GPT-3. As far as the developer knows, this error is caused when the token limit is reached.';

  const answer = response.data.choices[0].text;

  store[id] += answer;

  return answer.replace('AI: ', '');
}

const defaultPrompt =
  'The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: Hello\nAI: How can I help you today?\nHuman: ';

module.exports = {
  openai,
  getResponse,
  defaultPrompt,
};

const fetch = require('node-fetch');
const OpenAI = require('openai');
require('dotenv').config();
globalThis.fetch = fetch;   
const openai = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY,

});

module.exports = openai;
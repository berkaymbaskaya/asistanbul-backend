const { OpenAI } = require("openai");
const { apikeys } = require("./apikey");
const createThread = async (req, res) => {
  const apiKey = apikeys.ai;
  const openai = new OpenAI({ apiKey: apiKey });
  const myAssistant = await openai.beta.assistants.retrieve(
    "asst_AxR9vNwmzpR8CmVthW24uCqC"
  );
  const myThread = await openai.beta.threads.create();
  res.status(200).json(myThread);
};
module.exports = {
  createThread,
};

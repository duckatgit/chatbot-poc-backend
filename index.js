const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: "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",
});
async function main() {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo',
    });
  }
  
  main();
  

app.post("/", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "you are gpt.you can write email ",
      },
      ...chats,
    ],
  });
  response.json({
    output: result.choices[0]
  });
});

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});

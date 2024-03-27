require('dotenv').config()
const OpenAI = require("openai");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.BOTAPIKEY,
});


app.post("/chat", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "you are gpt.you will give result only related to invozio.com ",
      },
      ...chats,
    ],
  });
  response.json({
    output: result.choices[0],
  });
});

app.listen(port, () => {
  console.log(`Connected on port ${port}`);
});

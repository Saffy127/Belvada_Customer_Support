import express from 'express';
import { OpenAIApi } from 'openai';

const app = express();
const port = 3000;

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.static('public'));
app.use(express.json());

app.post('/generate-text', async (req, res) => {
  try {
    const messages = req.body.messages;
    const response = await openai.chatCompletions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// import express from 'express';
// import cors from 'cors';
// import { config } from 'dotenv';
// import { createClient } from '@supabase/supabase-js';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import axios from 'axios';

// config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;
// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('Missing SUPABASE_URL or SUPABASE_KEY environment variables');
// }
// const supabase = createClient(supabaseUrl, supabaseKey);


// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
// if (!slackWebhookUrl) {
//   console.warn('Warning: SLACK_WEBHOOK_URL is not set, Slack posting will fail.');
// }

// app.post('/todos', async (req, res) => {
//   const { title } = req.body;
//   if (!title) return res.status(400).json({ error: 'Title is required' });

//   const { data, error } = await supabase.from('todos').insert([{ title }]).select();
//   if (error) return res.status(500).json({ error: error.message });

//   res.status(201).json(data[0]);
// });

// app.delete('/todos/:id', async (req, res) => {
//   const { id } = req.params;
//   const { error } = await supabase.from('todos').delete().eq('id', id);
//   if (error) return res.status(500).json({ error: error.message });

//   res.status(204).send();
// });

// app.post('/summarize', async (req, res) => {
//   try {
//     const { data: todos, error } = await supabase.from('todos').select('*');
//     if (error) return res.status(500).json({ error: error.message });
//     if (!todos || todos.length === 0) return res.status(400).json({ error: 'No todos to summarize' });

//     const todoText = todos.map((t, i) => `${i + 1}. ${t.title}`).join('\n');
//     const prompt = `Summarize these todos:\n${todoText}`;

//     const apiKey = process.env.GOOGLE_API_KEY;
//     const modelName = 'gemini-2.0-flash';
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

//     const requestBody = {
//       contents: [
//         {
//           parts: [
//             { text: prompt }
//           ]
//         }
//       ]
//     };

//     const response = await axios.post(url, requestBody, {
//       headers: { 'Content-Type': 'application/json' }
//     });

//     console.log('Google Generative AI response data:', JSON.stringify(response.data, null, 2));

//     const summary = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
//     if (!summary) throw new Error('No summary returned from Google Generative AI');

//     if (slackWebhookUrl) {
//       await axios.post(slackWebhookUrl, { text: summary });
//     }

//     res.json({ success: true, summary });

//   } catch (err) {
//     console.error('Error in /summarize route:', err.response?.data || err.message || err);
//     res.status(500).json({ error: 'Failed to summarize or post to Slack', details: err.message });
//   }
// });


// app.get('/todos', async (req, res) => {
//   const { data, error } = await supabase.from('todos').select('*').order('created_at', { ascending: true });
//   if (error) return res.status(500).json({ error: error.message });

//   res.json(data);
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';

config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase client with env variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_KEY environment variables');
}
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
if (!slackWebhookUrl) {
  console.warn('Warning: SLACK_WEBHOOK_URL is not set, Slack posting will fail.');
}

// Routes

app.post('/todos', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const { data, error } = await supabase.from('todos').insert([{ title }]).select();
  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data[0]);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });

  res.status(204).send();
});


// Node.js + Express example
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
console.log('UPDATE REQUEST:', id, title);

  try {
    const { data, error } = await supabase
      .from('todos')
      .update({ title })
      .eq('id', id);

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




app.post('/summarize', async (req, res) => {
  try {
    const { data: todos, error } = await supabase.from('todos').select('*');
    if (error) return res.status(500).json({ error: error.message });
    if (!todos || todos.length === 0) return res.status(400).json({ error: 'No todos to summarize' });

    const todoText = todos.map((t, i) => `${i + 1}. ${t.title}`).join('\n');
    const prompt = `Summarize these todos:\n${todoText}`;

    // Prepare REST API call
    const apiKey = process.env.GOOGLE_API_KEY;
    const modelName = 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ]
    };

    // Call Google Generative Language REST API with axios
    const response = await axios.post(url, requestBody, {
      headers: { 'Content-Type': 'application/json' }
    });

    // console.log('Google Generative AI response data:', JSON.stringify(response.data, null, 2));

    // Correctly extract the summary text
    const summary = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!summary) throw new Error('No summary returned from Google Generative AI');

    // Post summary to Slack if webhook is set
    if (slackWebhookUrl) {
      await axios.post(slackWebhookUrl, { text: summary });
    }

    res.json({ success: true, summary });

  } catch (err) {
    console.error('Error in /summarize route:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'Failed to summarize or post to Slack', details: err.message });
  }
});








app.get('/todos', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*').order('created_at', { ascending: true });
  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));





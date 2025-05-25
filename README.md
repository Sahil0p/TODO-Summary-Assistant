# TODO-Summary-Assistant

Project Output:

![Screenshot 2025-05-25 223814](https://github.com/user-attachments/assets/909727ac-9b6e-4231-bb6d-de4c56c9f749)

Summary Display
![Screenshot 2025-05-25 182934](https://github.com/user-attachments/assets/addad84e-8c78-42de-acb0-28d33c22b201)

Slack message in action

![Screenshot 2025-05-25 182949](https://github.com/user-attachments/assets/02a5b9c4-f31b-49e8-bcfa-21bc64ca8ef3)
# 📝 Todo Summary Assistant

A full-stack application to manage personal to-do items, summarize pending tasks using an LLM (Google Generative AI via Gemini API), and send the summary to a Slack channel.

---

## 🚀 Features

- ✅ Add, edit, and delete personal to-do items.
- ✅ View the list of all current todos.
- ✅ Summarize pending todos using a real LLM.
- ✅ Send the summary to a Slack channel via Incoming Webhooks.
- ✅ Real-time feedback and clear status messages on success/failure.

---

## 🛠 Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | React + Vite                |
| Backend     | Node.js + Express           |
| LLM         | Google Generative AI (Gemini) |
| Messaging   | Slack Incoming Webhook      |
| Database    | Supabase (PostgreSQL)       |
| Hosting     | Render (frontend) |

--


### 1. Clone the Repository

git clone https://github.com/ShivamIsHere/todo-summary-assistant.git
cd todo-summary-assistant


2. Configure Environment Variables

✅ Backend (backend/.env)

env
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_google_generative_ai_key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...


✅ Frontend (frontend/.env)

env
VITE_REACT_APP_API_URL=http://localhost:3001



3. Install Dependencies

# Backend
cd backend
npm install


# Frontend
cd frontend
npm install


4. Run the App

# Backend (Port 3001)
node index.js

# Frontend (Port 5173)

npm run dev


---

## ✨ Slack Integration Setup

1. Go to https://api.slack.com/messaging/webhooks
2. Create a new *Incoming Webhook* and select your workspace + channel.
3. Copy the *Webhook URL* and set it in .env as SLACK_WEBHOOK_URL.

---

## 🤖 LLM Integration (Google Gemini)

1. Go to https://makersuite.google.com/app/apikey
2. Generate your *API Key*.
3. Set it as GEMINI_API_KEY in the backend .env.

> The summary uses Gemini's text-generative model to meaningfully summarize the pending todos.

---

## 🗃 Supabase Setup

1. Go to [https://supabase.com](https://supabase.com)
2. Create a project and a todos table:

sql
create table todos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  created_at timestamp with time zone default now()
);


3. Enable Row Level Security (RLS) and set up anonymous key access.
4. Set your project URL and key in server/.env.

---

## 📌 API Endpoints

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| GET    | /todos           | Fetch all todos              |
| POST   | /todos           | Add a new todo               |
| DELETE | /todos/:id       | Delete a todo by ID          |
| POST   | /todos/summarize | Summarize and send to Slack  |


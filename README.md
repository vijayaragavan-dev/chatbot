# 🤖 AI Chatbot Platform: Full-Stack Generative AI Application with Groq & LangChain

A production-grade, full-stack conversational AI platform built using **FastAPI**, **React**, **Groq LLM API**, and **LangChain**. This project demonstrates practical implementation of **Generative AI (GenAI)**, **Large Language Models (LLMs)**, and **modern AI application engineering**.

The system provides both:

* **Direct LLM Integration using Groq SDK**
* **LangChain-based Conversational AI Pipeline**

The application supports real-time token streaming, multi-turn conversation memory, responsive UI, API-driven architecture, and secure environment-based configuration.

---

## 🚀 Key Highlights

* 🤖 AI-powered conversational chatbot
* ⚡ Ultra-fast inference using Groq API
* 🧠 Context-aware multi-turn conversations
* 🔄 Real-time streaming responses (SSE)
* 🔗 LangChain integration for LLM orchestration
* 🖥️ Full-stack architecture (FastAPI + React)
* 🔒 Secure API key management using `.env`
* 📱 Fully responsive and modern UI
* 🐳 Docker-ready backend deployment
* ☁️ Cloud deployment support (Railway, Render, Vercel)

---

## 🧠 AI/ML & GenAI Concepts Demonstrated

This project demonstrates hands-on implementation of:

* Large Language Models (LLMs)
* Generative AI (GenAI)
* Prompt Engineering
* Conversational AI
* Context Window Management
* Multi-turn Chat Memory
* Streaming Token Generation
* AI API Integration
* LangChain Framework
* Stateful AI Systems
* Real-time Inference Systems

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │     React Frontend  │
                    │  (TypeScript + UI)  │
                    └──────────┬──────────┘
                               │ HTTP/SSE
                               ▼
                    ┌─────────────────────┐
                    │    FastAPI Backend  │
                    │ REST API Endpoints  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Chat Engine       │
                    │  Session Manager    │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┴────────────────┐
             │                                  │
             ▼                                  ▼
 ┌─────────────────────┐             ┌─────────────────────┐
 │ Direct Groq SDK     │             │ LangChain Pipeline  │
 │ (Without Framework) │             │ ChatGroq Wrapper    │
 └─────────────────────┘             └─────────────────────┘
                     \                 /
                      \               /
                       ▼             ▼
                    ┌─────────────────────┐
                    │  Groq LLM Service   │
                    │ Llama-3.1-8B-Instant│
                    └─────────────────────┘
```

---

## ✨ Features

### AI Features

* Large Language Model integration
* Real-time token streaming
* Context-aware conversations
* Conversation memory handling
* LangChain orchestration
* Prompt engineering
* Stateful chat sessions

### Software Engineering Features

* FastAPI REST architecture
* React + TypeScript frontend
* Reusable UI components
* Custom React hooks
* Pydantic validation
* Logging middleware
* Error handling and recovery
* Responsive design
* Accessibility support
* Docker containerization

---

## 🧠 Chatbot Implementations

### 1. Direct Groq SDK Chatbot (Without LangChain)

Implemented using the native Groq Python SDK.

**Concepts Applied:**

* API Integration
* Prompt Engineering
* Manual Memory Management
* Streaming Responses
* Stateful Conversations

### 2. LangChain-Based Chatbot

Implemented using LangChain abstractions.

**Concepts Applied:**

* LLM Orchestration
* Message Abstractions
* Chat History Management
* Enterprise AI Architecture
* Scalable AI Pipelines

---

## 🛠️ Tech Stack

| Layer               | Technology                               |
| ------------------- | ---------------------------------------- |
| Frontend            | React 19, TypeScript, Tailwind CSS, Vite |
| Backend             | FastAPI, Python 3.13, Uvicorn            |
| AI Framework        | LangChain                                |
| LLM Provider        | Groq                                     |
| Model               | Llama-3.1-8B-Instant                     |
| Validation          | Pydantic v2                              |
| Environment         | python-dotenv                            |
| Deployment          | Docker, Railway, Vercel                  |
| Icons               | Lucide React                             |
| Markdown            | react-markdown                           |
| Syntax Highlighting | react-syntax-highlighter                 |

---

## 📂 Project Structure

```text
chatbot/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── schemas/
│   │   ├── config.py
│   │   └── main.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
│
├── bot.py               # Direct Groq SDK chatbot
├── bot_langchain.py     # LangChain chatbot
├── .env
├── .gitignore
└── README.md
```

---

## 👨‍💻 Developer

**Vijayaragavan**

Computer Science Engineering Student | Full Stack Developer | AI/ML & GenAI Enthusiast

### Areas of Interest

* Artificial Intelligence
* Machine Learning
* Deep Learning
* Generative AI
* Agentic AI
* Full Stack Development

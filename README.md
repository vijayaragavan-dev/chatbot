# AI Chatbot — Full-Stack SaaS Application

A production-quality AI chatbot with a FastAPI backend and React + TypeScript frontend, powered by Groq's ultra-fast inference.

## Architecture

```
chatbot/
├── bot.py                   # Core chatbot logic (Groq API)
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI entry point
│   │   ├── config.py        # Environment config (Pydantic)
│   │   ├── schemas/         # Request/response models
│   │   ├── routes/          # API endpoints
│   │   ├── services/        # Business logic (session manager)
│   │   └── middleware/      # Logging middleware
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── api/             # API client
│   │   ├── types/           # TypeScript interfaces
│   │   ├── App.tsx          # Root component
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── .env                     # API key (not committed)
├── .gitignore
└── README.md
```

## Quick Start

### 1. Backend

```bash
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```

The API runs at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` and proxies API calls to the backend.

## Features

- **Streaming responses** — tokens arrive in real-time (SSE)
- **Markdown rendering** — with syntax-highlighted code blocks
- **Session management** — multi-turn conversations with history
- **Responsive design** — mobile-first, works on all screen sizes
- **Dark theme** — modern dark UI by default
- **Accessibility** — ARIA labels, keyboard navigation, focus management
- **Error handling** — rate limits, timeouts, network failures
- **Stop generation** — abort in-progress responses
- **Copy messages** — one-click copy for any response

## Deployment

### Backend (Railway / Render)

```bash
docker build -f backend/Dockerfile -t ai-chatbot-api .
docker run -p 8000:8000 ai-chatbot-api
```

### Frontend (Vercel)

```bash
cd frontend
npm run build
npx vercel deploy
```

Set the `VITE_API_URL` environment variable to your deployed backend URL.

## Environment Variables

Create a `.env` file in the project root:

```
api_key="gsk_your_groq_api_key_here"
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Tailwind CSS, Vite |
| Backend | FastAPI, Python 3.13, Uvicorn |
| AI | Groq SDK (llama-3.1-8b-instant) |
| Validation | Pydantic v2 |
| Icons | Lucide React |
| Markdown | react-markdown, remark-gfm |
| Code Highlighting | react-syntax-highlighter |

## License

MIT

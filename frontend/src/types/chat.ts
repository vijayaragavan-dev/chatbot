export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface Session {
  id: string;
  title: string;
  created_at: string;
  message_count: number;
}

export interface ChatRequest {
  session_id: string | null;
  message: string;
}

export interface ChatResponse {
  session_id: string;
  reply: string;
  timestamp: string;
}

export interface StreamData {
  token?: string;
  session_id?: string;
  done?: boolean;
  error?: string;
}

export interface SessionListResponse {
  sessions: Session[];
}

export interface HistoryResponse {
  messages: {
    role: string;
    content: string;
    timestamp: string;
  }[];
}

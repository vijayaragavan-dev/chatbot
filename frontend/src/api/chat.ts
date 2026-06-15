import type {
  ChatRequest,
  ChatResponse,
  SessionListResponse,
  HistoryResponse,
  StreamData,
} from "@/types/chat";

const BASE_URL = "/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error((body as { detail?: string }).detail ?? `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function sendMessage(data: ChatRequest): Promise<ChatResponse> {
  return request<ChatResponse>("/chat", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function* sendMessageStream(
  data: ChatRequest,
  signal?: AbortSignal,
): AsyncGenerator<StreamData, void, unknown> {
  const response = await fetch(`${BASE_URL}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    signal,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error((body as { detail?: string }).detail ?? `Stream failed (${response.status})`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data: ")) continue;
      try {
        const parsed = JSON.parse(trimmed.slice(6)) as StreamData;
        yield parsed;
      } catch {
        // skip malformed lines
      }
    }
  }
}

export async function listSessions(): Promise<SessionListResponse> {
  return request<SessionListResponse>("/sessions");
}

export async function getHistory(sessionId: string): Promise<HistoryResponse> {
  return request<HistoryResponse>(`/sessions/${sessionId}/history`);
}

export async function deleteSession(sessionId: string): Promise<void> {
  await request(`/sessions/${sessionId}`, { method: "DELETE" });
}

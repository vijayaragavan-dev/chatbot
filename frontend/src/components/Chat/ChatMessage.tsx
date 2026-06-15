import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, User, Bot } from "lucide-react";
import type { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3 rounded-xl overflow-hidden border border-surface-700">
      <div className="flex items-center justify-between px-4 py-2 bg-surface-850 text-xs text-gray-400">
        <span>{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-surface-700 transition-colors"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "text"}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.875rem",
          padding: "1rem",
        }}
        showLineNumbers={false}
        wrapLines
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className ?? "");
          const text = String(children).replace(/\n$/, "");

          if (match) {
            return <CodeBlock language={match[1] ?? ""}>{text}</CodeBlock>;
          }

          return (
            <code
              className="bg-surface-800 px-1.5 py-0.5 rounded-md text-sm text-primary-300"
              {...props}
            >
              {children}
            </code>
          );
        },
        pre({ children }) {
          return <div className="my-0">{children}</div>;
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
            >
              {children}
            </a>
          );
        },
        ul({ children }) {
          return <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>;
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-400 my-2">
              {children}
            </blockquote>
          );
        },
        h1({ children }) {
          return <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>;
        },
        h2({ children }) {
          return <h2 className="text-lg font-bold mt-3 mb-2">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-base font-bold mt-2 mb-1">{children}</h3>;
        },
        p({ children }) {
          return <p className="my-1.5 leading-relaxed">{children}</p>;
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto my-3">
              <table className="min-w-full border-collapse border border-surface-700 text-sm">
                {children}
              </table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="border border-surface-700 px-3 py-2 bg-surface-800 font-semibold text-left">
              {children}
            </th>
          );
        },
        td({ children }) {
          return <td className="border border-surface-700 px-3 py-2">{children}</td>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover/message:opacity-100 transition-opacity duration-200
        p-1.5 rounded-lg hover:bg-surface-800 text-gray-500 hover:text-gray-300
        focus:outline-none focus:ring-2 focus:ring-primary-500/50"
      aria-label={copied ? "Copied" : "Copy message"}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" aria-hidden="true" />
      ) : (
        <Copy className="w-3.5 h-3.5" aria-hidden="true" />
      )}
    </button>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 px-4 py-3 animate-fade-in group/message ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-primary-600 text-white"
            : "bg-gradient-to-br from-purple-500 to-primary-600 text-white"
        }`}
        aria-hidden="true"
      >
        {isUser ? (
          <User className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Bot className="w-4 h-4" aria-hidden="true" />
        )}
      </div>

      <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-gray-500">
            {isUser ? "You" : "Assistant"}
          </span>
          <span className="text-[10px] text-gray-600">
            {formatTime(message.timestamp)}
          </span>
        </div>

        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-primary-600 text-white rounded-tr-sm"
              : "bg-surface-800 text-gray-200 rounded-tl-sm border border-surface-700/50"
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : message.content ? (
            <div className="prose prose-invert prose-sm max-w-none">
              <MarkdownContent content={message.content} />
            </div>
          ) : (
            <div className="flex gap-1 py-1" aria-label="Typing">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce-dot" style={{ animationDelay: "0s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce-dot" style={{ animationDelay: "0.16s" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce-dot" style={{ animationDelay: "0.32s" }} />
            </div>
          )}
        </div>

        {!isUser && message.content && (
          <div className="flex items-center gap-1 mt-1.5">
            <CopyButton text={message.content} />
          </div>
        )}
      </div>
    </div>
  );
}

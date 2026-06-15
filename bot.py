from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()


class ChatBot:
    def __init__(self):
        self.api_key = os.getenv("api_key")
        if not self.api_key:
            raise ValueError("api_key not found in .env file")
        self.client = Groq(api_key=self.api_key)
        self.messages = []

    def send_message(self, user_input: str) -> str:
        if not user_input.strip():
            return ""

        self.messages.append({"role": "user", "content": user_input})

        try:
            response = self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=self.messages
            )
            reply = response.choices[0].message.content
            self.messages.append({"role": "assistant", "content": reply})
            return reply

        except Exception as e:
            return f"Error: Unable to get response from Groq API.\nDetails: {str(e)}"

    def send_message_stream(self, user_input: str):
        if not user_input.strip():
            return

        self.messages.append({"role": "user", "content": user_input})
        full_content = ""

        try:
            stream = self.client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=self.messages,
                stream=True
            )

            for chunk in stream:
                delta = chunk.choices[0].delta.content or ""
                full_content += delta
                yield delta

            self.messages.append({"role": "assistant", "content": full_content})

        except Exception as e:
            yield f"\n\nError: {str(e)}"

    def clear_history(self):
        self.messages = []

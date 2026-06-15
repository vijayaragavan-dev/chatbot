from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage, AIMessage
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("api_key")

llm = ChatGroq(
    model="llama-3.1-8b-instant",
    api_key=api_key
)

chat_history = []

while True:
    user_input = input("You: ")

    if user_input.lower() == "quit":
        print("Bye!")
        break

    # Add user message to history
    chat_history.append(HumanMessage(content=user_input))

    # Send entire conversation to LLM
    response = llm.invoke(chat_history)

    # Add AI response to history
    chat_history.append(AIMessage(content=response.content))

    print("Bot:", response.content)
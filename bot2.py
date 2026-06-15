from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("api_key")
client = Groq(api_key=api_key)
messages = []

while True:
    user_input = input("you: ")
    
    if(user_input.lower() == 'quit'):
        print("Bye!")
        break
    
    messages.append({"role":"user","content":user_input})

    response = client.chat.completions.create(
        model = "llama-3.1-8b-instant",
        messages = messages
    )

    reply =  response.choices[0].message.content
    messages.append({"role":"assistant","content":reply})
    print(f"Bot: {reply}\n")
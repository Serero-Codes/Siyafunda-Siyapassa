from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import groq
import os
from flask import send_from_directory

from behaviors.behavior_Obj import behavior
from behaviors.English import English_Support
from behaviors.Zulu import Zulu_Support
from behaviors.xhosa import xhosa_Support

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise RuntimeError("GROQ_API_KEY is not set in your environment")

client = groq.Groq(api_key=api_key)

FRONTEND_FOLDER = os.path.join(os.path.dirname(__file__), "../frontend")
app = Flask(__name__)
# Allow requests from your React (Vite) dev server (multiple ports for development)
# Allow requests from your frontend (adjust port if needed)
CORS(app, origins=["http://localhost:5000", "http://localhost:5500", "http://127.0.0.1:5500"])

def get_prompt_agent(language: str):
    """Pick the right behavior based on language."""
    lang = (language or "").strip().lower()

    if lang == "zulu":
        return behavior(
            name=Zulu_Support.name,
            instruction=Zulu_Support.instruction
        )
    if lang == "xhosa":
        return behavior(
            name=xhosa_Support.name,
            instruction=xhosa_Support.instruction
        )
    # default to English
    return behavior(
        name=English_Support.name,
        instruction=English_Support.instruction
    )
@app.route("/")
def home():
    return send_from_directory(FRONTEND_FOLDER, "index.html")


@app.route("/<path:path>")
def files(path):
    return send_from_directory(FRONTEND_FOLDER, path)

@app.route("/chatbot", methods=["GET", "POST"])
def chat():
    
    data = request.get_json(force=True)

    messages = data.get("messages", [])
    language = data.get("language", "english")
    difficulty = data.get("difficulty", "medium")
    user_name = data.get("userName", "Student")

    # Pick behavior for this language
    prompt_agent = get_prompt_agent(language)

    # Build conversation history string
    conversation_history = []
    for msg in messages:
        role = msg.get("role")
        content = msg.get("content", "")
        if role in ("user", "assistant"):
            conversation_history.append({"role": role, "content": content})

    # Add user context to personalize responses
    user_context = f"\n\nUser Context:\n"
    user_context += f"- Student Name: {user_name}\n"
    user_context += f"- Difficulty Level: {difficulty}\n\n"

    # Add difficulty-specific instructions
    if difficulty == "easy":
        user_context += "Instructions: Use simple language, break down concepts step-by-step, and provide plenty of examples. Avoid complex terminology.\n"
    elif difficulty == "hard":
        user_context += "Instructions: Use advanced terminology, provide in-depth explanations, challenge with complex concepts, and expect higher understanding.\n"
    else:  # medium (default)
        user_context += "Instructions: Use clear explanations with moderate detail, relevant examples, and balanced complexity.\n"

    user_context += f"Address the student as {user_name} when appropriate.\n\n"

    prompt = prompt_agent.name + "\n" + prompt_agent.instruction + user_context
    for msg in conversation_history:
        prompt += f"{msg['role'].capitalize()}: {msg['content']}\n"

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}]
 
        )

        # Using the helper that was in your original code
        assistant_reply = response.choices[0].message.content.strip()

        # Return JSON to frontend
        return jsonify({"reply": assistant_reply})
    except Exception as e:
        print("Error from Groq:", e)
        return jsonify({"error": "Error talking to AI"}), 500

if __name__ == "__main__":
    # Run Flask dev server
    app.run(host="0.0.0.0", port=5000, debug=True)


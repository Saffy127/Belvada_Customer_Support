import time
import threading
import os
import openai
from openai import OpenAI

client = OpenAI()
client.api_key = os.getenv('OPENAI_API_KEY')

from flask import Flask, request, jsonify

app = Flask(__name__)

# Configure your OpenAI API key

# Endpoint to create an assistant
@app.route('/create_assistant', methods=['POST'])
def create_assistant():
    response = openai.Assistant.create(
        name="Math Tutor",
        instructions="You are a personal math tutor. Write and run code to answer math questions.",
        tools=[{"type": "code_interpreter"}],
        model="gpt-4-1106-preview"
    )
    return jsonify(response)

# Endpoint to create a thread
@app.route('/create_thread', methods=['POST'])
def create_thread():
    response = openai.Thread.create()
    return jsonify(response)

# Endpoint to add a message to a thread
@app.route('/add_message', methods=['POST'])
def add_message():
    data = request.json
    response = openai.ThreadMessage.create(
        thread_id=data['thread_id'],
        role="user",
        content=data['content']
    )
    return jsonify(response)

# Endpoint to run the assistant
@app.route('/run_assistant', methods=['POST'])
def run_assistant():
    data = request.json
    response = openai.ThreadRun.create(
        thread_id=data['thread_id'],
        assistant_id=data['assistant_id'],
        instructions=data.get('instructions', "")
    )
    return jsonify(response)

# Endpoint to check the run status
@app.route('/check_run', methods=['GET'])
def check_run():
    thread_id = request.args.get('thread_id')
    run_id = request.args.get('run_id')
    response = openai.ThreadRun.retrieve(thread_id=thread_id, run_id=run_id)
    return jsonify(response)

# Endpoint to get the assistant's response
@app.route('/get_responses', methods=['GET'])
def get_responses():
    thread_id = request.args.get('thread_id')
    response = openai.ThreadMessage.list(thread_id=thread_id)
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

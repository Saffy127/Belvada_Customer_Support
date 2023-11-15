from flask_cors import CORS
import os
from flask import Flask, request, jsonify
from openai import OpenAI  # Import the OpenAI class

# Instantiate the OpenAI client with your API key
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json['message']
        # Use the instantiated client object to call the completions method
        response = client.completions.create(
            model="ft-gpt-3.5-turbo-0613:personal::8JRvA22T",
            messages=[
                {"role": "system", "content": "You are Belvada, a Customer Service Chat Bot."},
                {"role": "user", "content": user_input}
            ]
        )
        # Extract the message content from the response
        # If response is a pydantic model, you can use .dict() to convert it to dictionary
        message_content = response.choices[0].message['content']
        return jsonify({"message": message_content})
    except Exception as e:
        print(e)
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(debug=True)

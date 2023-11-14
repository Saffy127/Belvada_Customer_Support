import os
from flask import Flask, request, jsonify
import openai
openai.api_key = os.environ.get('OPENAI_API_KEY')


app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['message']
    response = openai.ChatCompletion.create(
        model="ft:gpt-3.5-turbo-0613:personal::8JRvA22T",
        messages=[{"role": "system", "content": "You are Belvada a Customer Service Chat Bot."},
                  {"role": "user", "content": user_input}]
    )
    return jsonify({"reply": response.choices[0].message['content']})

if __name__=='__main__':
    app.run(debug=True)


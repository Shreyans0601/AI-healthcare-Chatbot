from time import sleep
import json

from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

@app.route('/', methods = ['POST', 'GET'])
def home():
   if request.method == 'GET':
      return render_template('./home.html')
   else:
      user_resp = request.form['text']
      if user_resp != '':
         with open('communication.txt', 'w') as file:
            json_str = json.dumps({'flag': 'ml', 'type': 'answer', 'content': user_resp})
            file.write(json_str)
      while True:
         with open('communication.txt', 'r') as file:
            data = json.loads(file.read())
         if data['flag'] == 'web':
            break
         else:
            sleep(0.1)
      return jsonify({
         'type': data['type'],
         'content': data['content']
      })
         
		  

if __name__ == '__main__':
    app.run()

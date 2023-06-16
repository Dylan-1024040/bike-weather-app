from flask import Flask, render_template, jsonify, url_for, redirect, request, session
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#@app.route('/')
@app.route('/api/info')
def api():
    data = {"location": "Rotterdam"}
    return jsonify(data)




if __name__ == '__main__':
    app.run(debug=True)
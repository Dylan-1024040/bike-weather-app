from flask import Flask, request, jsonify
import requests
import json
import os


app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello Dylan!'

if __name__ == '__main__':
    app.run(debug=True)
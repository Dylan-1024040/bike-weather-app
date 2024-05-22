from flask import Flask, request, jsonify
import requests
import json
import os


app = Flask(__name__)

@app.route('/')
def index():
    print('het is gelukt!')
    return jsonify ({'Name': 'Dylan', 'Age': 23, 'location': 'New York'})

@app.route('/api/weather')
def weather_get():
    pass

@app.route('/api/settings', methods=['GET', 'POST'])
def settings():
    pass

if __name__ == '__main__':
    app.run(debug=True)
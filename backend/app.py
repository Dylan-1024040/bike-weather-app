from flask import Flask, render_template, jsonify, url_for, redirect, request, session
from flask_cors import CORS
import json
import urllib.request

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def weer():
    if request.method == 'POST':
        city = request.form['city']
    else:
        city = 'Atlantis'

    source = urllib.request.urlopen('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=11.00&appid=7448d089b3ccc0fd86b7a71672c3cf9c')

@app.route('/api/info')
def api():
    data = {"location": "Rotterdam",
            "temperature": "20"}
    return jsonify(data)




if __name__ == '__main__':
    app.run(debug=True)
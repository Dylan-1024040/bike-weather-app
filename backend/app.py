import json
from flask import Flask, jsonify, request
from flask_cors import CORS
import urllib
import urlopen

app = Flask(__name__)
CORS(app)


@app.route('/api/weer', methods=['GET', 'POST'])
def weer():
    url = 'https://api.openweathermap.org/data/2.5/weather?lat=50&lon=-175&appid=7448d089b3ccc0fd86b7a71672c3cf9c'
    res = urllib.request.urlopen(url)
    data = json.loads(res.read())
    return data


@app.route('/api/info')
def api():
    data = {"location": "Rotterdam",
            "temperature": "20"}
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)

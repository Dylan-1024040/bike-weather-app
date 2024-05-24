from flask import Flask, request, jsonify
import requests
import json
import os


app = Flask(__name__)
file_with_settings = os.path.join(os.path.dirname(__file__), 'settings.json')


def init_settings():
    if not os.path.exists(file_with_settings):
        settings_at_default = {
            "location": "",
            "knockOutFactors": {
                "wind": 0,
                "rain": 0,
                "cold": 0,
                "hot": 0,
                "snow": 0 
            }
        }
        with open(file_with_settings, 'w') as f:
            json.dump(settings_at_default, f, indent=3)
            
            
def settings_load():
    with open(file_with_settings, 'r') as f:
        return json.load(f)
    
def settings_save(settings):
    with open(file_with_settings, 'w') as f:
        json.dump(settings, f, indent=3)
    
@app.route('/')
def index():
    print('het is gelukt!')
    return jsonify ({'Name': 'Dylan', 'Age': 23, 'location': 'New York'})

@app.route('/api/weather')
def weather_get():
    settings = settings_load()
    location = settings.get('location')
    if not location:
        return 'Locatie is niet ingesteld', 404


@app.route('/api/settings', methods=['GET', 'POST'])
def settings():
    return file_with_settings

if __name__ == '__main__':
    init_settings()
    app.run(debug=True, port=3001)
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import json
import os
import uuid


app = Flask(__name__, static_folder='../client/build', static_url_path='/')
CORS(app)

base_dir = os.path.dirname(__file__)


settings_dir = os.path.join(base_dir, 'settings')

print(f"settings dir path: {settings_dir}")

if not os.path.exists(settings_dir):
    print('settings directory does not exist, creating it now...')
    os.makedirs(settings_dir)
    print('settings directory created')
else:
    print('settings directory already exists')
    
def settings_load(user_id):
    file_with_settings = os.path.join(settings_dir, f'{user_id}.json')
    if os.path.exists(file_with_settings):
        with open(file_with_settings, 'r') as file:
            return json.load(file)
    return {
        'location': '',
        'knockOutFactors': {
            'wind': 0.0,
            'rain': 25,
            'cold': 0,
            'hot': 0,
            'snow': 0
        },
        'timePreferred': '08:00'
    }
    
def settings_save(user_id, settings):
    file_with_settings = os.path.join(settings_dir, f'{user_id}.json')
    with open(file_with_settings, 'w') as file:
        json.dump(settings, file)
        
        
@app.route('/api/settings', methods=['GET'])
def settings_get():
    user_id = request.cookies.get('user_id')
    if user_id:
        return jsonify(settings_load(user_id))
    else:
        return jsonify(settings_load(None))

@app.route('/api/settings', methods=['POST'])
def settings_update():
    user_id = request.cookies.get('user_id')
    if not user_id:
        user_id = str(uuid.uuid4())
        
    settings = request.json
    settings_save(user_id, settings)
    
    response = jsonify({'status': 'success', 'user_id': user_id})
    response.set_cookie('user_id', user_id)
    return response


@app.route('/api/weather/<user_id>', methods=['GET'])
def weather_get(user_id):
    
    settings = settings_load(user_id)
    location = settings['location']
    time_preferred = settings['timePreferred']
    
    key = '7448d089b3ccc0fd86b7a71672c3cf9c'
    url = f'https://api.openweathermap.org/v1/forecast.json?key={key}&q={location}&days=3'
    
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        forecast = data['list']
        weather_data = {
            "id": user_id,
            "location": location,
            "departure": time_preferred,
            "okay_to_bike": []
        }
        for item in forecast:
            date = item['dt_txt'].split(' ')[0]
            time = item['dt_txt'].split(' ')[1]
            if time.startswith(time_preferred):
                bike_okay = True
                if item['wind']['speed'] > settings['knockOutFactors']['wind']:
                    bike_okay = False
                if item['pop'] > settings['knockOutFactors']['rain'] / 100:
                    bike_okay = False
                if item['main']['temp'] > settings['knockOutFactors']['cold']:
                    bike_okay = False
                if item['main']['temp'] > settings['knockOutFactors']['hot']:
                    bike_okay = False
                weather_data["okay_to_bike"].append({
                    "date": date,
                    "bike_okay": bike_okay
                })
        return jsonify(weather_data)
    else:
        return jsonify({'error': 'weer data kan niet worden opgehaald'}), 500

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=3001)
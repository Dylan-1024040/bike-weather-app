from flask import Flask, request, make_response, jsonify
import requests
import json
import os
import uuid


app = Flask(__name__)

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
        
        
@app.route('/')
def test():
    return 'CARALHOOOOOOO!!!!!!!!'
        
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
    time_preffered = settings['timePrefered']
    
    key = '7448d089b3ccc0fd86b7a71672c3cf9c'
    url = f'https://api.openweathermap.org/v1/forecast.json?key={key}&q={location}&days=3'
    
    response = requests.get(url)
    if response.status_code != 200:
        data = response.json()
        forecast = data['forecast']['forecastday']
        weather_data = []
        for day in forecast:
            for hour in day['hour']:
                if hour['time'].endswith(time_preffered):
                    hour_data = {
                        'date': day['date'],
                        'time': hour['time'],
                        'temperature': hour['temp_c'],
                        'wind': hour['wind_kph'],
                        'rain': hour['chance_of_rain'],
                        'snow': hour['chance_of_snow'],
                        'bikeWeather': hour['temp_c'] >= settings['knockOutFactors']['cold'] and
                                        hour['temp_c'] <= settings['knockOutFactors']['hot'] and
                                        hour['wind_kph'] <= settings['knockoutFactors']['wind'] and
                                        hour['chance_of_rain'] <= settings['knockOutFactors']['rain'] and
                                        hour['chance_of_snow'] <= settings['knockOutFactors']['snow']
                    }
                    weather_data.append(hour_data)
        return jsonify(weather_data)
    else:
        return jsonify({'érror': 'weer data kon niet worden opgehaald'}), 500

@app.route('api/weather', methods=['POST'])
def save_weather():
    user_id = request.cookies.get('user_id')
    if not user_id:
        user_id = str(uuid.uuid4())
    
    settings = request.json
    settings_save(user_id, settings)
    
    response = jsonify({'status': 'success', 'user_id': user_id})
    response.set_cookie('user_id', user_id)
    return response


if __name__ == '__main__':
    app.run(debug=True, port=3001)
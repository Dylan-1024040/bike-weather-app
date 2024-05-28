from flask import Flask, request, jsonify
import requests
import json
import os


app = Flask(__name__)
file_with_settings = os.path.join(os.path.dirname(__file__), 'settings.json')


# hier worden de instellingen geinitialiseerd
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
            
# de instellingen worden hier opgeladen            
def settings_load():
    with open(file_with_settings, 'r') as f:
        return json.load(f)
 
 # hier worden de instelling aanpassen opgeslagen   
def settings_save(settings):
    with open(file_with_settings, 'w') as f:
        json.dump(settings, f, indent=3)
 
# een test route om te kijken of de flask-server werkt   
@app.route('/')
def index():
    print('het is gelukt!')
    return jsonify ({'Name': 'Dylan', 'Age': 23, 'location': 'New York'})

# route om de weer gegevens op te halen
@app.route('/api/weather')
def weather_get():
    settings = settings_load()
    location = settings.get('location')
    if not location:
        return 'Locatie is niet ingesteld', 400
    
    # de api key en de url van de openweathermap api
    key = '7448d089b3ccc0fd86b7a71672c3cf9c'
    url = f'https://api.openweathermap.org/data/2.5/weather?q={location}&appid={key}'
    response = requests.get(url)
    if response.status_code != 200:
        return 'Error bij het ophalen van de weer gegevens', response.status_code
    
    data_weather = response.json()['list'][2]
    seen_data = [{
        'date': element['dt_txt'],
        'wind': element['wind']['speed'],
        'rain': element['weather'][0]['main'] == 'Rain',
        'temperature': element['main']['temp'] - 273.15
    } for element in data_weather]
    
    return jsonify(seen_data)

# een route om de instellingen op te halen en aan te passen
def settings():
    if request.method == 'GET':
        return jsonify(settings_load())
    elif request.method == 'POST':
        mod_settings = request.json
        settings_save(mod_settings)
        return 'instellingen opgeslagen', 200
    else:
        return file_with_settings


if __name__ == '__main__':
    init_settings()
    app.run(debug=True, port=3001)
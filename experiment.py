



def evaluate_weather(day, settings):
    temp = day['main']['temp']
    wind_speed = day['wind']['speed']
    rain_chance = day.get('rain', {}).get('3h', 0)
    snow_chance = day.get('snow', {}).get('3h', 0)
    
    if temp < float(settings['knockOutFactors']['cold']) or temp > float(settings['knockOutFactors']['hot']):
        return False
    if wind_speed > float(settings['knockOutFactors']['wind']):
        return False
    if rain_chance > float(settings['knockOutFactors']['rain']) / 100:
        return False
    if snow_chance > float(settings['knockOutFactors']['snow']) / 100:
        return False
    
    return True
    
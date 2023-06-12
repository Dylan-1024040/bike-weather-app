import sqlite3

conn = sqlite3.connect('weather.db')

c = conn.cursor()

c.execute("""CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT,
        departure TEXT,
        max_wind_speed REAL,
        max_rain_chance REAL,
        min_temp REAL,
        max_temp REAL,
        max_snow_chance REAL
        
)""")

conn.commit()
conn.close()

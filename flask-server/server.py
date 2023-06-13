from flask import Flask, render_template, jsonify, url_for, redirect, request, session, flash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api')
def api():
    return {"name": "Dylan",
            "age": 22,
            "hobbies": ["guitar", "going to the gym", "music", "football"],
            "gender": "male",
            "location": "Rotterdam",
            "fav cities": ["Lisboa", "Paris", "Barcelona", "New York City", "Brussel/Bruxelles", "Valencia/Valéncia",
                           "Bordeaux"]


            }


if __name__ == '__main__':
    app.run(debug=True)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
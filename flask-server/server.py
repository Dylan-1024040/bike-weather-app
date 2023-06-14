from flask import Flask, render_template, jsonify, url_for, redirect, request, session, flash
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api')
def api():
    return {"name": "Dylan",
            "gender": "male",
            "location": "Rotterdam"
            }


if __name__ == '__main__':
    app.run(debug=True)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
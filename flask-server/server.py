from flask import Flask, render_template, jsonify, url_for, redirect, request, session, flash

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello"
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/

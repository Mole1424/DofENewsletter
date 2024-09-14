from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    num_events = request.cookies.get("numEvents")
    if num_events is None:
        num_events = 1
    return render_template("main.html", num_events=int(num_events))

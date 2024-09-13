from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    links = request.cookies.get("links")
    if links is not None:
        links = links.split(",")
    else:
        links = [""] * 5
    return render_template("main.html", links=links)

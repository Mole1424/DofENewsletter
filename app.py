from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    num_events = request.cookies.get("numEvents")
    if num_events is None:
        num_events = 1
    return render_template("main.html", num_events=int(num_events))


@app.route("/createEmail", methods=["POST"])
def create_email():
    json = request.get_json()
    week_no = json["weekNo"]
    introduction = json["introduction"]
    events = json["events"]
    conclusion = json["conclusion"]
    name = json["name"]
    whatsapp = json["whatsapp"]
    instagram = json["instagram"]
    email = json["email"]
    facebook = json["facebook"]
    website = json["website"]
    return render_template(
        "newsletter.html",
        week_no=week_no,
        introduction=introduction,
        events=events,
        conclusion=conclusion,
        name=name,
        whatsapp=whatsapp,
        instagram=instagram,
        email=email,
        facebook=facebook,
        website=website,
    )

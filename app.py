from flask import Flask, render_template, request
from markdown import markdown
from markdown.inlinepatterns import InlineProcessor
from markdown.extensions import Extension
from markupsafe import escape
import xml.etree.ElementTree as etree

app = Flask(__name__)


@app.route("/")
def index():
    num_events = request.cookies.get("numEvents")
    if num_events is None:
        num_events = 1
    return render_template("main.html", num_events=int(num_events))


# shamelessly stolen from docs (https://python-markdown.github.io/extensions/api/#example_3)
class DelInlineProcessor(InlineProcessor):
    def handleMatch(self, m, data):
        el = etree.Element("del")
        el.text = m.group(1)
        return el, m.start(0), m.end(0)


class DelExtension(Extension):
    def extendMarkdown(self, md):
        DEL_PATTERN = r"~~(.*?)~~"  # like ~~del~~
        md.inlinePatterns.register(DelInlineProcessor(DEL_PATTERN, md), "del", 175)


@app.route("/createEmail", methods=["POST"])
def create_email():
    json = request.get_json()
    week_no = json["weekNo"]
    introduction = json["introduction"]
    events = json["events"]
    for event in events:
        event["description"] = markdown(
            escape(event["description"]), extensions=[DelExtension()]
        )
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

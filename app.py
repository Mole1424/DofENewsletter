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


@app.route("/createEmail", methods=["POST"])
def create_email():
    json = request.get_json()
    week_no = sanitize(json["weekNo"])
    introduction = sanitize(json["introduction"])
    events = json["events"]
    # apply markdown to the escaped description
    for event in events:
        event["title"] = sanitize(event["title"])
        event["description"] = sanitize(event["description"])
        event["tldr"] = sanitize(event["tldr"])
    conclusion = sanitize(json["conclusion"])
    name = sanitize(json["name"])
    whatsapp = sanitize(json["whatsapp"])
    instagram = sanitize(json["instagram"])
    email = sanitize(json["email"])
    facebook = sanitize(json["facebook"])
    website = sanitize(json["website"])
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


def sanitize(input):
    return markdown(escape(input), extensions=[DelExtension()])

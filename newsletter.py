from flask import Flask, render_template
import re

# create flask app
app = Flask(__name__, template_folder="")

# app.app_context() so can use rend1er_template
with app.app_context():
    # event object
    class Event:
        title = ""
        description = ""
        tldr = ""

        def __init__(self, title, description, tldr):
            self.title = title
            self.description = description
            self.tldr = tldr

    # add anchor tags to URLs (https://... etc)
    def add_anchor(input_text):
        # Define a regular expression pattern to match URLs
        url_pattern = r"https?://\S+"

        # Use re.sub to replace matched URLs with anchor tags
        def replace_url(match):
            url = match.group(0)
            return f'<a href="{url}">{url}</a>'

        # Use re.sub to find and replace URLs with anchor tags
        return re.sub(url_pattern, replace_url, input_text)

    week_no = int(input("Enter the week number: "))
    introduction = add_anchor(input("Enter the introduction: "))
    event_no = int(input("Enter the number of events: "))
    events = []  # list of events
    # iterate over events and add to list
    for i in range(event_no):
        title = input("Enter the title of the event: ")
        description = add_anchor(input("Enter the description of the event: "))
        tldr = input("Enter the TLDR of the event: ")
        event = Event(title, description, tldr)
        events.append(event)
    conclusion = add_anchor(input("Enter the conclusion: "))

    # render html template with flask
    newsletter = render_template(
        "newsletter.html",
        week_no=week_no,
        introduction=introduction,
        events=events,
        conclusion=conclusion,
    )

    # write to file
    with open("newsletter.txt", "w") as f:
        f.write(newsletter)

    print("Newsletter generated successfully!")

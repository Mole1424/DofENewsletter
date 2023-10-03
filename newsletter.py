from flask import Flask, render_template

app = Flask(__name__, template_folder="")

with app.app_context():
    # event object
    class Event:
        title = ""
        description = ""
        tldr = ""

        def __init__(self, title, description, tldr) -> None:
            self.title = title
            self.description = description
            self.tldr = tldr

    week_no = int(input("Enter the week number: "))
    introduction = input("Enter the introduction: ")
    event_no = int(input("Enter the number of events: "))
    events = []
    for i in range(event_no):
        title = input("Enter the title of the event: ")
        description = input("Enter the description of the event: ")
        tldr = input("Enter the TLDR of the event: ")
        event = Event(title, description, tldr)
        events.append(event)
    conclusion = input("Enter the conclusion: ")

    newsletter = render_template(
        "newsletter.html",
        week_no=week_no,
        introduction=introduction,
        events=events,
        conclusion=conclusion,
    )
    with open("newsletter.txt", "w") as f:
        f.write(newsletter)

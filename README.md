# DofE Newsletter generator

Because the SU generator is a pain in the ass

## Install

1. First install python from [https://www.python.org/downloads/](https://www.python.org/downloads/) (the first link should be the correct one for your system)
2. Double click the exe file downloaded and follow the instructions on screen **MAKE SURE TO TICK `add to PATH` WHEN AVAILABLE**
3. Open a terminal by either typing `cmd` in the search bar in Windows or `command+space -> terminal` on macOS
4. Type `pythom -m pip install flask`
5. At [https://github.com/Mole1424/DofENewsletter](https://github.com/Mole1424/DofENewsletter) click on the green `Code` button and download in ZIP format
6. Unzip the file (`Right click -> extact all` on windows `double click` on mac)

(ps if you have linux you should know how to do this)

## Run
1. Navigate to the `DofENewsletter` folder in either file explorer (windows) or finder (mac)
2. `right click -> open with terminal`
3. type `python newsletter.py`
4. Follow prompts in program
5. Events will require title, description and tl;dr (see example email)
6. Copy output in `newsletter.txt` into source page at [https://www.warwicksu.com/organisation/messages/4141/](https://www.warwicksu.com/organisation/messages/4141/)
7. Add title
8. Double check everything looks good (maybe even send as a test email just to you)
9. Send

## Edits

This was made in about half an hour so there are probably some flaws in it. The template is cloned from mailchimp and slightly edited by me to include icons and jinja scripting so sorry if its a bit cursed. To next secretary need to change name on line 1049 in `newsletter.html` from my name.

## If everything breaks

Contact me

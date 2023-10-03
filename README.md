# DofE Newsletter generator

Because the SU generator is a pain in the ass

## Install

  `git clone https://github.com/Mole1424/DofENewsletter`<br>
    `pip install flask`

## Run
 `python newsletter.py`<br>
 Follow prompts in program<br>
 Events will require title, description and tl;dr (see example email)<br>
 Copy output in `newsletter.txt` into source page at [https://www.warwicksu.com/organisation/messages/4141/](https://www.warwicksu.com/organisation/messages/4141/)<br>
 Add title<br>
 Double check everything looks good (maybe even send as a test email just to you)<br>
 Send

 ## Edits

 This was made in about half an hour so there are probably some flaws in it. The template is cloned from mailchimp and slightly edited by me to include icons and jinja scripting so sorry if its a bit cursed. To next secreatry need to change name on line 1049 in `newsletter.html` from my name.

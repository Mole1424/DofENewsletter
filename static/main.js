// Set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (name.endsWith('Link')) {
        days = 365; // default to 1 year for links
    }
    const date = new Date();
    date.setTime(date.getTime() + ((days || 31) * 24 * 60 * 60 * 1000)); // default to 31 days
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        // loop each cookie to find the one with the name
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Update cookie when input field changes
function updateCookieOnInput(inputElement) {
    const inputId = inputElement.id;
    inputElement.addEventListener('input', function () {
        setCookie(inputId, inputElement.value);
    });
}

// Initialise inputs from cookies
function initialiseInputsFromCookies() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        const cookieValue = getCookie(input.id);
        if (cookieValue) {
            input.value = cookieValue;
        }
    });
}

// Initialise event listeners on all input and textarea fields
function initialiseEventListeners() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        updateCookieOnInput(input);
    });
}

// Initialise the form by loading cookies and setting up listeners
document.addEventListener('DOMContentLoaded', function () {
    initialiseInputsFromCookies();
    initialiseEventListeners();
});

// Create an event
function createCustomEvent() {
    numEvents = parseInt(getCookie('numEvents') || 1) + 1;
    setCookie('numEvents', numEvents);
    const eventHtml = `
        <div class="event" id="event${numEvents}">
            <input type="text" class="event-name" id="event${numEvents}Name" name="event${numEvents}Name" placeholder="Event ${numEvents} Name">
            <button class="event-close" id="event${numEvents}Close" onclick="closeCustomEvent(${numEvents});">x</button>
            <textarea class="event-description" id="event${numEvents}Description" placeholder="Event ${numEvents} Description"></textarea>
            <input type="text" class="event-tldr" id="event${numEvents}tldr" name="event${numEvents}tldr" placeholder="Event ${numEvents} tldr">
        </div>
    `;
    // apppend after last event element
    const lastEvents = document.querySelectorAll('.event');
    const lastEvent = lastEvents[lastEvents.length - 1];
    lastEvent.insertAdjacentHTML('afterend', eventHtml);
    // set listeners
    const newLastEvents = document.querySelectorAll('.event');
    const newEvent = newLastEvents[newLastEvents.length - 1];
    updateCookieOnInput(newEvent.querySelector('.event-name'));
    updateCookieOnInput(newEvent.querySelector('.event-description'));
    updateCookieOnInput(newEvent.querySelector('.event-tldr'));
}

// Cancel an event
function closeCustomEvent(eventId) {
    // remove event from dom
    const event = document.getElementById(`event${eventId}`);
    event.remove();
    setCookie('numEvents', parseInt(getCookie('numEvents')) - 1);
    // update all events after this one
    for (let i = eventId + 1; i <= parseInt(getCookie('numEvents')) + 1; i++) {
        console.log('updating event', i);
        const event = document.getElementById(`event${i}`);
        event.id = `event${i - 1}`;
        event.querySelector('.event-name').id = `event${i - 1}Name`;
        event.querySelector('.event-name').name = `event${i - 1}Name`;
        event.querySelector('.event-name').placeholder = `Event ${i - 1} Name`;
        event.querySelector('.event-close').id = `event${i - 1}Close`;
        event.querySelector('.event-close').onclick = function () { closeCustomEvent(i - 1); };
        event.querySelector('.event-description').id = `event${i - 1}Description`;
        event.querySelector('.event-description').placeholder = `Event ${i - 1} Description`;
        event.querySelector('.event-tldr').id = `event${i - 1}tldr`;
        event.querySelector('.event-tldr').name = `event${i - 1}tldr`;
        event.querySelector('.event-tldr').placeholder = `Event ${i - 1} tldr`;

        setCookie(`event${i - 1}Name`, getCookie(`event${i}Name`));
        setCookie(`event${i - 1}Description`, getCookie(`event${i}Description`));
        setCookie(`event${i - 1}tldr`, getCookie(`event${i}tldr`));
    }
    // remove non-existent last event cookies
    setCookie(`event${parseInt(getCookie('numEvents')) + 1}Name`, null, -1);
    setCookie(`event${parseInt(getCookie('numEvents')) + 1}Description`, null, -1);
    setCookie(`event${parseInt(getCookie('numEvents')) + 1}tldr`, null, -1);
}

// Generate email
function generateEmail() {
    // start new request
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/createEmail", true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    // create json object
    var json = {
        "weekNo": document.getElementById("weekNumber").value,
        "introduction": document.getElementById("introduction").value,
        "events": [],
        "conclusion": document.getElementById("conclusion").value,
        "name": document.getElementById("name").value,
        "whatsapp": document.getElementById("whatsappLink").value,
        "instagram": document.getElementById("instagramLink").value,
        "email": document.getElementById("emailLink").value,
        "facebook": document.getElementById("facebookLink").value,
        "website": document.getElementById("urlLink").value
    };
    // append events
    var events = document.getElementsByClassName("event");
    for (var i = 0; i < events.length; i++) {
        var event = events[i];
        json.events.push({
            "title": event.querySelector(".event-name").value,
            "description": event.querySelector(".event-description").value,
            "tldr": event.querySelector(".event-tldr").value
        });
    }
    // send request
    xmlhttp.send(JSON.stringify(json));
    // recieve response and update dom + clipboard
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var email = xmlhttp.responseText;
            document.getElementById("email").innerHTML = email;
            navigator.clipboard.writeText(email);
        }
    };
}
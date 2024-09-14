// Set a cookie
function setCookie(name, value) {
    let expires = "";
    const date = new Date();
    date.setTime(date.getTime() + (31 * 24 * 60 * 60 * 1000)); // 31 days
    expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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
        setCookie(inputId, inputElement.value); // Save cookie
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

// Function to initialise event listeners on all input and textarea fields
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
    numEvents = getCookie('numEvents');
    if (!numEvents) {
        numEvents = 2;
    }
    else {
        numEvents = parseInt(numEvents) + 1;
    }
    setCookie('numEvents', numEvents);
    const eventHtml = `
        <div class="event">
            <input type="text" class="event-name" id="event${numEvents}Name" name="event${numEvents}Name" placeholder="Event ${numEvents} Name">
            <button class="event-close" id="event${numEvents}Close" onclick="xEvent(${numEvents});">x</button>
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
}
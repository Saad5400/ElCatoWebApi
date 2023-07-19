
const body = document.body;

function genrateClock(seconds, minutes, hours) {
    /** 
    <div class="clock__circle">


        <div class="clock__hour" id="clock-hour"></div>
        <div class="clock__minutes" id="clock-minutes"></div>
        <div class="clock__seconds" id="clock-seconds"></div>
    </div>
    */

    const clockCircle = document.createElement("div");
    clockCircle.classList += "clock__circle inlineClock";
    clockCircle.style.opacity = 0.5;
    clockCircle.innerHTML += `        
    <span class="clock__twelve"></span>
    <span class="clock__three"></span>
    <span class="clock__six"></span>
    <span class="clock__nine"></span>
    
    <div class="clock__rounder"></div>`;

    const clockHour = document.createElement("div");
    clockHour.classList += "clock__hour";
    clockCircle.appendChild(clockHour);

    const clockMinutes = document.createElement("div");
    clockMinutes.classList += "clock__minutes";
    clockCircle.appendChild(clockMinutes);

    const clocSeconds = document.createElement("div");
    clocSeconds.classList += "clock__seconds";
    clockCircle.appendChild(clocSeconds);

    body.appendChild(clockCircle);

    //console.log(`${hours}:${minutes}:${seconds}`)
    let hh = hours * 30,
        mm = minutes * 6,
        ss = seconds * 6;

    clockCircle.id = `${ss}${mm}${hh}`;

    clockHour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
    clockMinutes.style.transform = `rotateZ(${mm}deg)`;
    clocSeconds.style.transform = `rotateZ(${ss}deg)`;
}

for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 60; j++) {
        for (let k = 0; k < 60; k++) {
            genrateClock(k, j, i);
        }
    }
}

function focusOnClock() {
    const clocks = document.getElementsByClassName("clock__circle");
    for (let i = 0; i < clocks.length; i++) {
        clocks[i].style.opacity = 0.5;
    }

    let date = new Date();
    let hours = date.getHours();
    hours = hours % 12;
    let hh = hours * 30,
    mm = date.getMinutes() * 6,
    ss = date.getSeconds() * 6;

    let targetId = `${ss}${mm}${hh}`;
    let target = document.getElementById(targetId);
    target.style.opacity = 1;
    target.scrollIntoView();
}

setInterval(focusOnClock, 500);
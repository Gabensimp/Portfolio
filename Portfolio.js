// ------------------ About Tabs ------------------
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, event) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


// ------------------ Mobile Menu ------------------
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}


// ------------------ Contact Form ------------------
const scriptURL =
    "https://script.google.com/macros/s/AKfycbwlmCQCTzTuWWtEXTBcACJILzv9ro8MXNwtG1xNWyEQk4u0IH8FxGFrFbo2JVOo3rrfiw/exec";

const form = document.forms["submit-to-google-sheet"];
const ms = document.getElementById("ms");

let canSubmit = true;

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!canSubmit) {
            ms.innerHTML = "Please wait 10 seconds before sending another message.";
            setTimeout(() => (ms.innerHTML = ""), 3000);
            return;
        }

        canSubmit = false;

        ms.innerHTML = "Sending...";

        fetch(scriptURL, {
            method: "POST",
            body: new FormData(form),
        })
            .then((response) => response.text())
            .then(() => {
                ms.innerHTML = "Message has been sent!";
                form.reset();

                setTimeout(() => {
                    ms.innerHTML = "";
                }, 5000);

                setTimeout(() => {
                    canSubmit = true;
                }, 10000);
            })
            .catch((error) => {
                console.error("Error!", error);
                ms.innerHTML = "There was an error sending your message.";

                setTimeout(() => {
                    ms.innerHTML = "";
                }, 5000);

                setTimeout(() => {
                    canSubmit = true;
                }, 10000);
            });
    });
}
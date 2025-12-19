// JARVIS Text Speech
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// BOT Response typing animation
function addMessage(message, sender = "bot") {
    const chatBox = document.getElementById("chat-box");

    const msg = document.createElement("div");
    msg.className = sender === "user" ? "user-message" : "bot-message";
    chatBox.appendChild(msg);

    let i = 0;
    function type() {
        if (i < message.length) {
            msg.textContent += message.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }
    type();

    chatBox.scrollTop = chatBox.scrollHeight;
}

// JARVIS Commands
function processCommand(command) {
    command = command.toLowerCase();

    if (command.includes("hello") || command.includes("hi")) {
        speak("Hello sir, how can I help you?");
        addMessage("Hello sir, how can I help you?");
    }

    else if (command.includes("time")) {
        const time = new Date().toLocaleTimeString();
        speak("The time is " + time);
        addMessage("The time is " + time);
    }

    else if (command.includes("open google")) {
        speak("Opening Google sir.");
        addMessage("Opening Google...");
        window.open("https://google.com", "_blank");
    }

    else if (command.includes("open youtube")) {
        speak("Opening YouTube sir.");
        addMessage("Opening YouTube...");
        window.open("https://youtube.com", "_blank");
    }

    else {
        speak("Sorry, I did not understand that command.");
        addMessage("Sorry, I didn't understand.");
    }
}

// Voice recognition
let recognition;
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        const userText = event.results[0][0].transcript;
        addMessage(userText, "user");
        processCommand(userText);
    };

    recognition.onerror = function () {
        speak("Sorry, I could not hear you.");
        addMessage("Could not hear you.");
    };
}

// Voice button
function startListening() {
    if (recognition) {
        recognition.start();
        speak("Listening...");
    }
}

const button = document.querySelector("button");
const section = document.querySelector("section");

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
        window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const orders = [
        "dark mode",
        "white mode",
        "login",
        "google",
        "metamask",
        "task",
        "add",
        "hello",
        "green",
        "one",
        "two",
        "three",
        "four",
];
const grammar = `#JSGF V1.0; grammar orders; public <color> = ${orders.join(
        " | "
)};`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

button.addEventListener("click", () => {
        readOutLoud("sound control activated ");
        console.log("clicked");
        doOrder();
});

function doOrder() {
        recognition.start();
        recognition.onresult = (event) => {
                console.log(event);
                const word = event.results[0][0].transcript;
                console.log("color: ", word);
                section.textContent = `Result received: ${word}.`;
                console.log(`Confidence: ${event.results[0][0].confidence}`);
        };

        recognition.onspeechend = () => {
                recognition.stop();
                console.log("onspeechend: ");
        };
        recognition.onnomatch = (event) => {
                section.textContent = "I didn't recognize that word.";
                console.log("I didnt recognize that word ");
        };

        recognition.onerror = (event) => {
                section.textContent = `Error occurred in recognition: ${event.error}`;
                console.log("onerror: ");
        };
}

function readOutLoud(message) {
        var speech = new SpeechSynthesisUtterance();

        // Set the text and voice attributes.
        speech.text = message;
        speech.volume = 1;
        speech.rate = 0.9;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
}

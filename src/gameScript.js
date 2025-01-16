let timer;
let score;
let currLetters;
let currFreq;
let usedWords;
let interval;

const numLetters = localStorage.getItem("numLetters");
const mode = (new URLSearchParams(window.location.search)).get("mode") || "normal";

/// gets the dictionary from the json file
async function fetchDictionary() {
    const response = await fetch("words.json");
    const words = await response.json();
    return words;
}

/// generates numLetters random letters as a single string
function genLetters() {
    // skew the alphabet letter frequencies for better anagram combinations
    const alphabet = "aaabbccddeeeeeeffghiiijkklllmmnnnooooppqrrrsssttttuuvwwxyyz"

    let letters = "";
    for (let i = 0; i < numLetters; i++) {
        let newLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        // ensure letters are distinct in Extended mode
        while (mode !== "normal" && letters.includes(newLetter)) {
            newLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        console.log(alphabet);
        letters += newLetter;
    }

    return letters;
}

/// initialises the game 
function initGame() {
    document.getElementById("header").innerText = `ANAGRAMS: ${mode.toUpperCase()}`;

    score = 0;
    usedWords = new Set();
    currLetters = genLetters();
    currFreq = getFreqs(currLetters);

    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("word-input").value = "";
    document.getElementById("letters").innerText = currLetters;

    document.getElementById("word-input").focus();

    startTimer();
    writeToLog("Game Start!\n");
}

/// creates and returns a HashMap frequency table for the letters of string s
function getFreqs(s) {
    let freqs = {};
    for (let i = 0; i < s.length; i++) {
        let key = s[i];
        if (freqs[key] === undefined) {
            freqs[key] = 1;
        } else {
            freqs[key]++;
        }
    }

    return freqs;
}

/// starts the timer, counting down from numSeconds and ending the game when finishing
function startTimer() {
    timer = localStorage.getItem("numSeconds");
    document.getElementById("timer").innerText = `Time left: ${timer}s`;
    clearInterval(interval);
    
    interval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = `Time left: ${timer}s`;
        if (timer === 0) {
            clearInterval(interval);
            endGame();
        }

    }, 1000);
}

/// submits a word; calculates its points, updates score and logs the submission
async function submitWord() {
    const word = document.getElementById("word-input").value.trim().toLowerCase();
    const wordScore = await calculateWordScore(word);
    score += wordScore;
    
    // log the submission, update score, clear text input
    writeToLog(`${word} is worth ${wordScore} points\n`);
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("word-input").value = "";
    
    // if word is valid, add it to the set of usedWords
    if (wordScore > 0) {
        usedWords.add(word);

        // if challenge mode, regenerate the letters
        if (mode === "challenge") {
            currLetters = genLetters();
            document.getElementById("letters").innerText = currLetters;
        }
    }
}

/// calculates the number of points a word is worth;
/// 0 if invalid, floor(length * 1.5) * 175
async function calculateWordScore(word) {
    if (!word || usedWords.has(word)
        || (mode === "normal" && word.length > numLetters)
    ) {
        return 0;
    }
    
    // if normal mode, ensure unique use of letters
    if (mode === "normal") {
        let wordFreq = getFreqs(word);
        for (let i = 0; i < word.length; i++) {
            let key = word[i];
            
            if (!currFreq[key] || wordFreq[key] > currFreq[key]) {
                return 0;
            }
        }
    // if extended or challenge mode, ensure letters used are in the current selection
    } else {
        if (!word.split("").every((letter) => currLetters.includes(letter))) {
            return 0;
        }
    }
    
    // validate English word, and reward longer words more
    const dictionary = await fetchDictionary();
    return dictionary[word] ? Math.floor(1.5* word.length) * 175: 0;
}

/// terminates the round
function endGame() {
    localStorage.setItem("finalScore", score);
    window.location.href = "index.html";
}

/// helper function to write a msg to the log
function writeToLog(message) {
    const logElem = document.getElementById("word-log");
    logElem.innerText += message + "\n";

    setTimeout(() => {
        logElem.scrollTop = logElem.scrollHeight;
    }, 10);
}

document.getElementById("end-game").addEventListener("click", endGame);

// users can submit by clicking the button or pressing enter
document.getElementById("submit-word").addEventListener("click", submitWord);
document.getElementById("word-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("submit-word").click();
    }
});

// initialise game on page load
document.addEventListener("DOMContentLoaded", initGame);
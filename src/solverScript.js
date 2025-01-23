async function solve() {
    const response = await fetch("words.json");
    const dictionary = await response.json();
    const wordsContainer = document.getElementById("words-container");
    wordsContainer.innerText = "";
    const wordInput = document.getElementById("word-input");
    let letters = wordInput.value;
    
    // longer than 9 takes too long to run
    // perhaps change validation method to iterating over dictionary as 500k < 10!
    if (letters.length < 1 || letters.length > 9) {
        wordInput.value = "";
        wordsContainer.innerText = "Please enter 1-9 letters";
        return;
    }

    const words = new Set();
    function recurseSolve(curr, remaining) {
        if (curr && dictionary[curr]) {
            words.add(curr);
        }

        for (let i = 0; i < remaining.length; i++) {
            recurseSolve(
                curr + remaining[i],
                remaining.slice(0, i) + remaining.slice(i + 1)
            );
        }
    }

    recurseSolve("", letters);
    const wordsSorted = Array.from(words).sort((a, b) => b.length - a.length);

    wordsSorted.forEach(word => {
        wordsContainer.innerText += word + "\n";
    });

    wordInput.value = "";
}

// users can submit by clicking the "Submit" button or pressing enter
document.getElementById("enter-letters").addEventListener("click", solve);
document.getElementById("word-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("enter-letters").click();
    }
});

document.getElementById("home-button").addEventListener("click", () => {
    window.location.href = "../index.html";
});

document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("word-input");
    const letters = localStorage.getItem("letters");
    if (letters) {
        textInput.value = letters;
    }

    textInput.focus();
});
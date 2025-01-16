function onButtonClick(mode) {
    localStorage.setItem("numLetters", parseInt(document.getElementById("num-letters").value));
    localStorage.setItem("numSeconds", parseInt(document.getElementById("num-seconds").value));
    // NOTE: links are relative to the location of the html file running the script, not the script itself
    window.location.href = `src/game.html?mode=${mode}`;
}

document.getElementById("normal-game-button").addEventListener("click", () => {
    onButtonClick("normal");
});

document.getElementById("extended-game-button").addEventListener("click", () => {
    onButtonClick("extended");
});

document.getElementById("challenge-game-button").addEventListener("click", () => {
    onButtonClick("challenge");
});

document.addEventListener("DOMContentLoaded", () => {
    const finalScore = localStorage.getItem("finalScore");
    const wordLog = localStorage.getItem("wordLog");

    if (finalScore && wordLog) {
        document.getElementById("text-content").innerText = `Final Score: ${finalScore}`;
        document.getElementById("word-log").innerText = wordLog;
    } else {
        document.getElementById("word-log").style.display = "none";
        document.getElementById("log-box").style.display = "none";
    }

    localStorage.removeItem("finalScore");
    localStorage.removeItem("wordLog");
});
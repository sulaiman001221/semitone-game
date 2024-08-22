const { JamBuddy } = require("./jam_buddy");

const setupDOM = (document, jamBuddy) => {
  const note1Element = document.getElementById("note1");
  const note2Element = document.getElementById("note2");
  const messageElement = document.getElementById("message");

  const updateCurrentNotesDisplay = () => {
    const notes = jamBuddy.getCurrentNotes();
    note1Element.value = notes.length ? notes[0] : "";
    note2Element.value = notes.length ? notes[1] : "";
  };

  document
    .getElementById("randomizeNotesButton")
    .addEventListener("click", () => {
      jamBuddy.randomizeCurrentNotes();
      updateCurrentNotesDisplay();
      messageElement.textContent = "";
      messageElement.className = "message";
    });

  document.getElementById("checkAnswerButton").addEventListener("click", () => {
    const answerInput = document.getElementById("answerInput");
    const answer = parseInt(answerInput.value, 10);

    if (isNaN(answer)) {
      messageElement.textContent = "Please enter a valid number.";
      messageElement.className = "message error";
      return;
    }
    try {
      const isCorrect = jamBuddy.checkAnswer(answer);
      messageElement.textContent = isCorrect
        ? "Correct! Well done!"
        : "Incorrect. Try again.";
      messageElement.className = isCorrect
        ? "message success"
        : "message error";
    } catch (error) {
      messageElement.textContent = error.message;
      messageElement.className = "message error";
    }
  });
  jamBuddy.randomizeCurrentNotes();
  updateCurrentNotesDisplay();
};

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const jamBuddy = new JamBuddy();
    setupDOM(document, jamBuddy);
  });
}

module.exports = { setupDOM };

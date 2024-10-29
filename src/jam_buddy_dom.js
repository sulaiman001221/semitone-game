const { JamBuddy } = require("./jam_buddy");

let streak = 0; // Track the user's correct answer streak

const setupDOM = (document, jamBuddy) => {
  const note1Element = document.getElementById("note1");
  const note2Element = document.getElementById("note2");
  const messageElement = document.getElementById("message");
  const answerInput = document.getElementById("answerInput");
  const randomizeNotesButton = document.getElementById("randomizeNotesButton");
  const checkAnswerButton = document.getElementById("checkAnswerButton");
  const quitButton = document.getElementById("quitButton");
  const allNotesElement = document.querySelector(".allNotes");
  const streakElement = document.getElementById("streak");

  jamBuddy.randomizeCurrentNotes();
  updateCurrentNotesDisplay(jamBuddy, note1Element, note2Element);

  randomizeNotesButton.addEventListener("click", () =>
    handleRandomizeClick(jamBuddy, note1Element, note2Element, messageElement)
  );
  checkAnswerButton.addEventListener("click", () =>
    handleCheckAnswerClick(jamBuddy, answerInput, messageElement, streakElement, allNotesElement)
  );
  quitButton.addEventListener("click", () =>
    generateAllNotes(document, jamBuddy, allNotesElement)
  );
};

const updateCurrentNotesDisplay = (jamBuddy, note1Element, note2Element) => {
  const notes = jamBuddy.getCurrentNotes();
  note1Element.value = notes[0] || "";
  note2Element.value = notes[1] || "";
};

const resetMessage = (messageElement) => {
  messageElement.textContent = "";
  messageElement.className = "message";
};

const displayMessage = (messageElement, message, isSuccess) => {
  messageElement.textContent = message;
  messageElement.className = isSuccess ? "message success" : "message error";
};

const updateStreakDisplay = (streakElement) => {
  streakElement.textContent = `Streak: ${streak}`;
};

const handleRandomizeClick = (
  jamBuddy,
  note1Element,
  note2Element,
  messageElement
) => {
  jamBuddy.randomizeCurrentNotes();
  updateCurrentNotesDisplay(jamBuddy, note1Element, note2Element);
  resetMessage(messageElement);
  streak = 0; // Reset streak when randomizing notes
  updateStreakDisplay(streakElement);
};

const handleCheckAnswerClick = (jamBuddy, answerInput, messageElement, streakElement, allNotesElement) => {
  const answer = parseInt(answerInput.value, 10);

  if (isNaN(answer)) {
    displayMessage(messageElement, "Please enter a valid number.", false);
    return;
  }
  try {
    const isCorrect = jamBuddy.checkAnswer(answer);
    if (isCorrect) {
      streak += 1; // Increment streak for correct answer
      displayMessage(messageElement, "Correct! Well done!", true);
      generateAllNotes(document, jamBuddy, allNotesElement); // Highlight the notes in the explanation
    } else {
      streak = 0; // Reset streak for incorrect answer
      displayMessage(messageElement, "Incorrect. Try again.", false);
    }
    updateStreakDisplay(streakElement); // Update the streak display
  } catch (error) {
    displayMessage(messageElement, error.message, false);
  }
};

const generateAllNotes = (document, jamBuddy, allNotesElement) => {
  const notes = [
    "A",
    "A#|Bb",
    "B",
    "C",
    "C#|Db",
    "D",
    "D#|Eb",
    "E",
    "F",
    "F#|Gb",
    "G",
    "G#|Ab",
  ];

  allNotesElement.innerHTML = ""; // Clear previous notes
  notes.forEach((note) => {
    createNoteElement(document, jamBuddy, allNotesElement, note);
  });
};

const highlightNote = (jamBuddy, element, currentNote) => {
  const [note1, note2] = jamBuddy.getCurrentNotes();
  if (currentNote.length > 2) {
    const [sharpNote, flatNote] = currentNote.split("|");
    if (
      note1 === sharpNote ||
      note2 === sharpNote ||
      note1 === flatNote ||
      note2 === flatNote
    ) {
      element.classList.add("shade-note");
    }
  } else if (note1 === currentNote || note2 === currentNote) {
    element.classList.add("shade-note");
  }
};

const createNoteElement = (document, jamBuddy, allNotesElement, note) => {
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = note;
  inputElement.className = "note-input";
  inputElement.readOnly = true;

  highlightNote(jamBuddy, inputElement, note);
  allNotesElement.appendChild(inputElement);
};

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const jamBuddy = new JamBuddy();
    setupDOM(document, jamBuddy);
  });
}

module.exports = { setupDOM };

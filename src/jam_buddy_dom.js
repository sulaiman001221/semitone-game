const { JamBuddy } = require("./jam_buddy");

const setupDOM = (document, jamBuddy) => {
  const note1Element = document.getElementById("note1");
  const note2Element = document.getElementById("note2");
  const messageElement = document.getElementById("message");
  const answerInput = document.getElementById("answerInput");
  const randomizeNotesButton = document.getElementById("randomizeNotesButton");
  const checkAnswerButton = document.getElementById("checkAnswerButton");
  const allNotesElement = document.querySelector(".allNotes");

  randomizeNotesButton.addEventListener("click", () =>
    handleRandomizeClick(jamBuddy, note1Element, note2Element, messageElement)
  );
  checkAnswerButton.addEventListener("click", () =>
    handleCheckAnswerClick(jamBuddy, answerInput, messageElement)
  );
  generateAllNotes(document, jamBuddy, allNotesElement);
  jamBuddy.randomizeCurrentNotes();
  updateCurrentNotesDisplay(jamBuddy, note1Element, note2Element);
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

const handleRandomizeClick = (
  jamBuddy,
  note1Element,
  note2Element,
  messageElement
) => {
  jamBuddy.randomizeCurrentNotes();
  updateCurrentNotesDisplay(jamBuddy, note1Element, note2Element);
  resetMessage(messageElement);
};

const handleCheckAnswerClick = (jamBuddy, answerInput, messageElement) => {
  const answer = parseInt(answerInput.value, 10);

  if (isNaN(answer)) {
    displayMessage(messageElement, "Please enter a valid number.", false);
    return;
  }
  try {
    const isCorrect = jamBuddy.checkAnswer(answer);
    displayMessage(
      messageElement,
      isCorrect ? "Correct! Well done!" : "Incorrect. Try again.",
      isCorrect
    );
  } catch (error) {
    displayMessage(messageElement, error.message, false);
  }
};

const filterNotes = (notes, preferredType = "sharp") => {
  const enharmonicPairs = {
    "A#": "Bb",
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab",
  };

  return notes.map((note) => {
    if (preferredType === "sharp" && enharmonicPairs[note]) {
      return note;
    } else if (preferredType === "flat" && enharmonicPairs[note]) {
      return enharmonicPairs[note];
    }
    return note;
  });
};

const generateAllNotes = (
  document,
  jamBuddy,
  allNotesElement,
  preferredType = "sharp"
) => {
  const flatNotes = ["Bb", "Db", "Eb", "Gb", "Ab"];
  const commonNotes = jamBuddy.notes.filter(
    (note) => !flatNotes.includes(note)
  );
  const filteredNotes = filterNotes(commonNotes, preferredType);
  filteredNotes.forEach((note) => {
    createNoteElement(document, allNotesElement, note);
  });
};

const createNoteElement = (document, allNotesElement, note) => {
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = note;
  inputElement.className = "note-input";
  inputElement.readOnly = true;

  allNotesElement.appendChild(inputElement);
  return inputElement;
};

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const jamBuddy = new JamBuddy();
    setupDOM(document, jamBuddy);
  });
}

module.exports = { setupDOM };

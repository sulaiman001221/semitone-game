const { JamBuddy } = require("./jam_buddy");

let streak = 0;

const messages = {
  enterNumber: "Please enter a valid number.",
  correctAnswer: "Correct! Well done!",
  incorrectAnswer: "Incorrect. Try again.",
  incorrectRange: "Answer should be between 0 & 11",
  singleAnswer: (answer) => `Correct answer is ${answer}`,
  doubleAnswer: (answer1, answer2) =>
    `Correct answers clockwise and counter are ${answer1} & ${answer2}`,
};

const setupDOM = (document, jamBuddy) => {
  const elements = {
    note1: document.getElementById("note1"),
    note2: document.getElementById("note2"),
    message: document.getElementById("message"),
    secondMessage: document.getElementById("secondMessage"),
    answerInput: document.getElementById("answerInput"),
    randomizeButton: document.getElementById("randomizeNotesButton"),
    checkAnswerButton: document.getElementById("checkAnswerButton"),
    quitButton: document.getElementById("quitButton"),
    allNotes: document.getElementById("allNotes"),
    streakDisplay: document.getElementById("streak"),
    restartButton: document.getElementById("restartButton"),
  };

  jamBuddy.randomizeCurrentNotes();
  updateCurrentNotesDisplay(jamBuddy, elements.note1, elements.note2);
  updateStreakDisplay(elements.streakDisplay);

  elements.randomizeButton.addEventListener("click", () =>
    handleRandomizeClick(jamBuddy, elements)
  );
  elements.checkAnswerButton.addEventListener("click", () =>
    handleCheckAnswerClick(document, jamBuddy, elements)
  );
  elements.quitButton.addEventListener("click", () =>
    handleQuitClick(document, jamBuddy, elements)
  );
  elements.restartButton.addEventListener("click", () =>
    handleRestartClick(jamBuddy, elements)
  );
};

const updateCurrentNotesDisplay = (jamBuddy, note1, note2) => {
  const notes = jamBuddy.getCurrentNotes();
  note1.value = notes[0] || "";
  note2.value = notes[1] || "";
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

const handleRandomizeClick = (jamBuddy, elements) => {
  jamBuddy.randomizeCurrentNotes();
  updateCurrentNotesDisplay(jamBuddy, elements.note1, elements.note2);
  resetMessage(elements.message);
  resetMessage(elements.secondMessage);
  enableButton(elements.checkAnswerButton);
  enableButton(elements.quitButton);
  elements.answerInput.disabled = false;
  elements.answerInput.value = "";
  elements.allNotes.innerHTML = "";
};

const handleCheckAnswerClick = (document, jamBuddy, elements) => {
  const answer = parseInt(elements.answerInput.value, 10);

  try {
    validateAnswer(elements, answer);
    const isCorrect = jamBuddy.checkAnswer(answer);
    if (isCorrect) {
      streak++;
      displayCorrectAnswers(jamBuddy, elements.secondMessage);
      displayMessage(elements.message, messages.correctAnswer, true);
      generateAllNotes(document, jamBuddy, elements.allNotes);
      disableButton(elements.checkAnswerButton);
      disableButton(elements.quitButton);
      elements.answerInput.disabled = true;
    } else {
      streak = 0;
      displayMessage(elements.message, messages.incorrectAnswer, false);
    }
    updateStreakDisplay(elements.streakDisplay);
  } catch (error) {
    displayMessage(elements.message, error.message, false);
  }
};

const handleQuitClick = (document, jamBuddy, elements) => {
  streak = 0;
  updateStreakDisplay(elements.streakDisplay);
  generateAllNotes(document, jamBuddy, elements.allNotes);
  elements.quitButton.hidden = true;
  elements.restartButton.hidden = false;
  disableButton(elements.checkAnswerButton);
  disableButton(elements.randomizeButton);
  elements.answerInput.disabled = true;
  displayCorrectAnswers(jamBuddy, elements.message);
};

const handleRestartClick = (jamBuddy, elements) => {
  elements.allNotes.innerHTML = "";
  jamBuddy.randomizeCurrentNotes();
  updateCurrentNotesDisplay(jamBuddy, elements.note1, elements.note2);
  elements.restartButton.hidden = true;
  elements.quitButton.hidden = false;
  enableButton(elements.checkAnswerButton);
  enableButton(elements.randomizeButton);
  elements.answerInput.disabled = false;
  elements.answerInput.value = "";
  resetMessage(elements.message);
};

const validateAnswer = (elements, answer) => {
  if (elements.answerInput.value < 0 || elements.answerInput.value > 11) {
    throw new Error(messages.incorrectRange);
  }
  if (isNaN(answer)) {
    throw new Error(messages.enterNumber);
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

  allNotesElement.innerHTML = "";
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
      element.classList.add("shadeNote");
    }
  } else if (note1 === currentNote || note2 === currentNote) {
    element.classList.add("shadeNote");
  }
};

const createNoteElement = (document, jamBuddy, allNotes, note) => {
  const inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.value = note;
  inputElement.className = "noteInput";
  inputElement.readOnly = true;

  highlightNote(jamBuddy, inputElement, note);
  allNotes.appendChild(inputElement);
};

const disableButton = (button) => {
  button.disabled = true;
  button.style.backgroundColor = "#b08bc3";
  button.style.cursor = "not-allowed";
  button.style.opacity = "0.6";
};

const enableButton = (button) => {
  button.disabled = false;
  button.style.backgroundColor = "";
  button.style.cursor = "";
  button.style.opacity = "";
};

const displayCorrectAnswers = (jamBuddy, message) => {
  const correctAnswers = [];

  let answer = 0;
  while (correctAnswers.length < 2) {
    const isCorrect = jamBuddy.checkAnswer(answer);
    if (isCorrect) correctAnswers.push(answer);
    if (correctAnswers[0] === 0) break;
    answer++;
  }

  if (correctAnswers.length === 1) {
    displayMessage(message, messages.singleAnswer(correctAnswers[0]), true);
  } else {
    displayMessage(
      message,
      messages.doubleAnswer(correctAnswers[0], correctAnswers[1]),
      true
    );
  }
};

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const jamBuddy = new JamBuddy();
    setupDOM(document, jamBuddy);
  });
}

module.exports = { setupDOM, messages };

const errorMessage = {
  invalidNotes:
    "Invalid notes provided. Notes should be one of A, A#, B, C, C#, D, D#, E, F, F#, G, G#.",
  notesNotSet:
    "Current notes not set, you should set two notes before checking the answer",
  invalidDataType: "All the provided notes should be strings",
  invalidArray: "Notes should be provided as an array",
  similarNotes: "Notes should not be similar",
  invalidLength: "You should provide exactly two notes",
};

const VALID_NOTE_COUNT = 2;

function validateNotes(notes, validNotes) {
  if (!Array.isArray(notes)) {
    throw new Error(errorMessage.invalidArray);
  }
  if (notes.length !== VALID_NOTE_COUNT) {
    throw new Error(errorMessage.invalidLength);
  }
  for (let i = 0; i < notes.length; i++) {
    if (typeof notes[i] !== "string") {
      throw new Error(errorMessage.invalidDataType);
    }
    if (!validNotes.includes(notes[i])) {
      throw new Error(errorMessage.invalidNotes);
    }
  }

  if (notes[0] === notes[1]) {
    throw new Error(errorMessage.similarNotes);
  }
}

function getRandomNote(notes) {
  return notes[Math.floor(Math.random() * notes.length)];
}

class JamBuddy {
  constructor() {
    this.notes = [
      "A",
      "A#",
      "B",
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
    ];
    this.currentNotes = [];
  }

  setCurrentNotes(notes) {
    if (!Array.isArray(notes)) {
      throw new Error(errorMessage.invalidArray);
    }
    for (let i = 0; i < notes.length; i++) {
      if (typeof notes[i] === "string") {
        notes[i] = notes[i].toUpperCase();
      }
    }
    validateNotes(notes, this.notes);
    this.currentNotes = notes;
  }

  getCurrentNotes() {
    return this.currentNotes;
  }

  randomizeCurrentNotes() {
    let note1 = getRandomNote(this.notes);
    let note2 = getRandomNote(this.notes);
    while (note1 === note2) {
      note2 = getRandomNote(this.notes);
    }
    this.currentNotes = [note1, note2];
  }

  checkAnswer(distance) {
    if (this.currentNotes.length !== VALID_NOTE_COUNT) {
      throw new Error(errorMessage.notesNotSet);
    }
    const indexOfFirstNote = this.notes.indexOf(this.currentNotes[0]);
    const noteCircle = [...this.notes.slice(indexOfFirstNote), ...this.notes];

    const currentIndex = noteCircle.indexOf(this.currentNotes[0]);
    const targetIndex = noteCircle.indexOf(this.currentNotes[1]);

    const clockwiseDistance = targetIndex - currentIndex;
    const counterClockwiseDistance = this.notes.length - targetIndex;

    return (
      distance === clockwiseDistance || distance === counterClockwiseDistance
    );
  }
}

typeof window !== "undefined"
  ? (window.JamBuddy = JamBuddy)
  : (module.exports = { JamBuddy, errorMessage });

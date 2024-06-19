const { errorMessage } = require("./helper_object");
const {
  isCorrectLength,
  isString,
  isArray,
  areValidNotes,
  areSimilarNotes,
} = require("./helper_functions");

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
    for (let i = 0; i < notes.length; i++) {
      if (Array.isArray(notes)) {
        if (typeof notes[i] === "string") {
          notes[i] = notes[i].toUpperCase();
        }
      }
    }

    switch (true) {
      case !isArray(notes):
        throw new Error(errorMessage.invalidArray);
      case !isCorrectLength(notes):
        throw new Error(errorMessage.invalidLength);
      case !isString(notes):
        throw new Error(errorMessage.invalidDataType);
      case !areValidNotes(notes, this.notes):
        throw new Error(errorMessage.invalidNotes);
      case areSimilarNotes(notes):
        throw new Error(errorMessage.similarNotes);
      default:
        this.currentNotes = notes;
    }
  }

  getCurrentNotes() {
    return this.currentNotes;
  }

  randomizeCurrentNotes() {
    let note1 = this.notes[Math.floor(Math.random() * this.notes.length)];
    let note2 = this.notes[Math.floor(Math.random() * this.notes.length)];
    while (note1 === note2) {
      note2 = this.notes[Math.floor(Math.random() * this.notes.length)];
    }
    this.currentNotes = [note1, note2];
  }

  checkAnswer(distance) {
    if (this.currentNotes.length !== 2) {
      throw new Error(errorMessage.notesNotSet);
    }
    const indexOfFirstNote = this.notes.indexOf(this.currentNotes[0]);
    const noteCircle = `${this.notes.slice(
      indexOfFirstNote
    )},${this.notes.slice(0)}`.split(",");

    const currentIndex = noteCircle.indexOf(this.currentNotes[0]);
    const targetIndex = noteCircle.indexOf(this.currentNotes[1]);

    const clockwiseDistance = targetIndex - currentIndex;
    const counterClockwiseDistance = this.notes.length - targetIndex;

    return (
      distance === clockwiseDistance || distance === counterClockwiseDistance
    );
  }
}

module.exports = { JamBuddy };

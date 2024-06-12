const { errorMassage } = require("./helper_object");

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

  isValidNote(note) {
    return this.notes.includes(note);
  }

  setCurrentNotes(notes) {
    if (notes.length !== 2) {
      throw new Error(errorMassage.invalidLength);
    }

    if (!this.isValidNote(notes[0]) || !this.isValidNote(notes[1])) {
      throw new Error(errorMassage.invalidNotes);
    }

    if (notes[0] === notes[1]) {
      throw new Error(errorMassage.similarNotes);
    }
    this.currentNotes = notes;
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
      throw new Error(errorMassage.notesNotSet);
    }
    const index1 = this.notes.indexOf(this.currentNotes[0]);
    const index2 = this.notes.indexOf(this.currentNotes[1]);
    const clockwiseDistance =
      (index2 - index1 + this.notes.length) % this.notes.length;
    const counterClockwiseDistance =
      (index1 - index2 + this.notes.length) % this.notes.length;
    return (
      distance === clockwiseDistance || distance === counterClockwiseDistance
    );
  }
}

module.exports = { JamBuddy };

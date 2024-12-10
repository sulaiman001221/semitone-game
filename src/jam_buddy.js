const errorMessage = {
  invalidNotes:
    "Invalid notes provided. Notes should be one of A, A#, Bb, B, C, C#, Db, D, D#, Eb, E, F, F#, Gb, G, G#, Ab.",
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
  if (notes[0] === notes[1]) {
    throw new Error(errorMessage.similarNotes);
  }
  for (let i = 0; i < notes.length; i++) {
    if (typeof notes[i] !== "string") {
      throw new Error(errorMessage.invalidDataType);
    }
    if (!validNotes.includes(notes[i])) {
      throw new Error(errorMessage.invalidNotes);
    }
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
      "Bb",
      "B",
      "C",
      "C#",
      "Db",
      "D",
      "D#",
      "Eb",
      "E",
      "F",
      "F#",
      "Gb",
      "G",
      "G#",
      "Ab",
    ];
    this.enharmonicPairs = {
      Bb: "A#",
      Db: "C#",
      Eb: "D#",
      Gb: "F#",
      Ab: "G#",
    };
    this.currentNotes = [];
  }
  normalizeNote(note) {
    return this.enharmonicPairs[note] || note;
  }

  setCurrentNotes(notes) {
    validateNotes(notes, this.notes);
    this.currentNotes = notes;
  }

  getCurrentNotes() {
    return this.currentNotes;
  }

  randomizeCurrentNotes() {
    const note1 = getRandomNote(this.notes);
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
    const normalizedNotes = this.notes.filter((note) => !note.includes("b"));
    const firstNote = this.normalizeNote(this.currentNotes[0]);
    const secondNote = this.normalizeNote(this.currentNotes[1]);

    const indexOfFirstNote = normalizedNotes.indexOf(firstNote);
    const noteCircle = [
      ...normalizedNotes.slice(indexOfFirstNote),
      ...normalizedNotes,
    ];

    const currentIndex = noteCircle.indexOf(firstNote);
    const targetIndex = noteCircle.indexOf(secondNote);

    const clockwiseDistance = targetIndex - currentIndex;
    const counterClockwiseDistance = normalizedNotes.length - targetIndex;

    return (
      distance === clockwiseDistance || distance === counterClockwiseDistance
    );
  }
}

export { JamBuddy, errorMessage };

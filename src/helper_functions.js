const { errorMessage } = require("./helper_object");

function isCorrectLength(notes) {
  return notes.length === 2;
}

function isString(notes) {
  return typeof notes[0] === "string" && typeof notes[1] === "string";
}

function isArray(notes) {
  return Array.isArray(notes);
}

function isValidNote(note, validNotes) {
  return validNotes.includes(note);
}

function areValidNotes(notes, validNotes) {
  return isValidNote(notes[0], validNotes) && isValidNote(notes[1], validNotes);
}

function areSimilarNotes(notes) {
  return notes[0] === notes[1];
}

function validateNotes(notes, validNotes) {
  switch (true) {
    case !isArray(notes):
      throw new Error(errorMessage.invalidArray);
    case !isCorrectLength(notes):
      throw new Error(errorMessage.invalidLength);
    case !isString(notes):
      throw new Error(errorMessage.invalidDataType);
    case !areValidNotes(notes, validNotes):
      throw new Error(errorMessage.invalidNotes);
    case areSimilarNotes(notes):
      throw new Error(errorMessage.similarNotes);
  }
}

module.exports = { validateNotes };

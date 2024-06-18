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

module.exports = { errorMessage };

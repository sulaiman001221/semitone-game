const { errorMassage } = require("../src/helper_object");
const { JamBuddy } = require("../src/jam_buddy");

describe("JamBuddy", () => {
  let jamBuddy;

  beforeEach(() => {
    jamBuddy = new JamBuddy();
  });

  describe("setCurrentNotes", () => {
    it("should set the current notes if valid notes are provided", () => {
      jamBuddy.setCurrentNotes(["C", "D"]);
      expect(jamBuddy.getCurrentNotes()).toEqual(["C", "D"]);
    });

    it("should throw an error if invalid notes are provided", () => {
      expect(() => {
        jamBuddy.setCurrentNotes(["Z", "D"]);
      }).toThrowError(errorMassage.invalidNotes);
    });

    it("should throw an error if only one note is provided", () => {
      expect(() => {
        jamBuddy.setCurrentNotes(["C"]);
      }).toThrowError(errorMassage.invalidLength);
    });

    it("should throw an error if more two notes are provided", () => {
      expect(() => {
        jamBuddy.setCurrentNotes(["C", "D", "B"]);
      }).toThrowError(errorMassage.invalidLength);
    });

    it("should throw an error if the provided notes are similar", () => {
      expect(() => {
        jamBuddy.setCurrentNotes(["C", "C"]);
      }).toThrowError(errorMassage.similarNotes);
    });
  });

  describe("randomizeCurrentNotes", () => {
    it("should set two different random notes", () => {
      jamBuddy.randomizeCurrentNotes();
      const notes = jamBuddy.getCurrentNotes();
      expect(notes[0]).not.toEqual(notes[1]);
    });
  });

  describe("checkAnswer", () => {
    let index1, index2, clockwiseDistance, counterClockwiseDistance;

    beforeEach(() => {
      index1 = jamBuddy.notes.indexOf("C");
      index2 = jamBuddy.notes.indexOf("D");
      clockwiseDistance =
        (index2 - index1 + jamBuddy.notes.length) % jamBuddy.notes.length;

      index2 = jamBuddy.notes.indexOf("B");
      counterClockwiseDistance =
        (index1 - index2 + jamBuddy.notes.length) % jamBuddy.notes.length;
    });

    it("should return true if the distance is correct clockwise", () => {
      jamBuddy.setCurrentNotes(["C", "D"]);
      expect(jamBuddy.checkAnswer(clockwiseDistance)).toBeTruthy();
    });

    it("should return true if the distance is correct counter-clockwise", () => {
      jamBuddy.setCurrentNotes(["C", "B"]);
      expect(jamBuddy.checkAnswer(counterClockwiseDistance)).toBeTruthy();
    });

    it("should return false if the distance is incorrect", () => {
      jamBuddy.setCurrentNotes(["C", "D"]);
      const incorrectDistance = 3;
      expect(jamBuddy.checkAnswer(incorrectDistance)).toBeFalsy();
    });

    it("should throw an error if current notes are not set", () => {
      expect(() => {
        jamBuddy.checkAnswer(1);
      }).toThrowError(errorMassage.notesNotSet);
    });
  });

  describe("isValidNote", () => {
    it("should return true for valid notes", () => {
      expect(jamBuddy.isValidNote("C")).toBeTruthy();
      expect(jamBuddy.isValidNote("G#")).toBeTruthy();
    });

    it("should return false for invalid notes", () => {
      expect(jamBuddy.isValidNote("Z")).toBeFalsy();
      expect(jamBuddy.isValidNote("H")).toBeFalsy();
    });
  });
});

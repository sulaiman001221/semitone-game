import { JamBuddy } from "../src/jam_buddy";
import { errorMessage } from "../src/jam_buddy";

describe("JamBuddy Class", () => {
  let jamBuddy;

  beforeEach(() => {
    jamBuddy = new JamBuddy();
  });

  describe("setCurrentNotes method", () => {
    it("should convert lower case notes to upper case", () => {
      jamBuddy.setCurrentNotes(["a", "a#"]);
      expect(jamBuddy.getCurrentNotes()).toEqual(["A", "A#"]);
    });

    it("should set the current notes if valid notes are provided", () => {
      jamBuddy.setCurrentNotes(["C", "D"]);
      expect(jamBuddy.getCurrentNotes()).toEqual(["C", "D"]);
    });

    it("should throw an error if invalid notes are provided", () => {
      expect(() => {
        jamBuddy.setCurrentNotes(["B#", "D"]);
      }).toThrowError(errorMessage.invalidNotes);
    });

    it("should throw an error if the provided notes are not exactly two", () => {
      expect(() => {
        jamBuddy.setCurrentNotes(["C", "D", "B"]);
      }).toThrowError(errorMessage.invalidLength);
    });

    it("should throw an error if the provided notes are similar", () => {
      expect(() => {
        jamBuddy.setCurrentNotes(["C", "C"]);
      }).toThrowError(errorMessage.similarNotes);
    });

    it("should throw an error if the input is not an array", () => {
      expect(() => {
        jamBuddy.setCurrentNotes("C, D");
      }).toThrowError(errorMessage.invalidArray);
    });

    it("should throw an error if the notes array contains non-string values", () => {
      expect(() => {
        jamBuddy.setCurrentNotes(["C", 2]);
      }).toThrowError(errorMessage.invalidDataType);
    });
  });

  describe("getCurrentNotes method", () => {
    it("should return the notes set by the 'setCurrentNotes method'", () => {
      jamBuddy.setCurrentNotes(["A", "D"]);
      expect(jamBuddy.getCurrentNotes()).toEqual(["A", "D"]);
    });
  });

  describe("randomizeCurrentNotes method", () => {
    it("should set two different random notes", () => {
      jamBuddy.randomizeCurrentNotes();
      const notes = jamBuddy.getCurrentNotes();
      expect(notes[0]).not.toEqual(notes[1]);
    });
  });

  describe("checkAnswer method", () => {
    it("should return true if the distance is correct clockwise", () => {
      jamBuddy.setCurrentNotes(["C", "F"]);
      expect(jamBuddy.checkAnswer(5)).toBeTruthy();
    });

    it("should return true if the distance is correct counter-clockwise", () => {
      jamBuddy.setCurrentNotes(["C", "F"]);
      expect(jamBuddy.checkAnswer(7)).toBeTruthy();
    });
  });

  it("should return a boolean if a jam was set randomly", () => {
    jamBuddy.randomizeCurrentNotes();
    expect(typeof jamBuddy.checkAnswer(4)).toBe("boolean");
  });

  it("should return false if the distance is incorrect", () => {
    jamBuddy.setCurrentNotes(["C", "D"]);
    const incorrectDistance = 3;
    expect(jamBuddy.checkAnswer(incorrectDistance)).toBeFalsy();
  });

  it("should throw an error if current notes are not set", () => {
    expect(() => {
      jamBuddy.checkAnswer(1);
    }).toThrowError(errorMessage.notesNotSet);
  });
});

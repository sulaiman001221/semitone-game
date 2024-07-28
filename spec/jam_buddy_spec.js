const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { JamBuddy, errorMessage } = require("../src/jam_buddy");
const { setupDOM } = require("../src/jam_buddy_dom");

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

describe("JamBuddy Class with DOM", () => {
  let dom;
  let document;
  let jamBuddy;

  beforeEach(() => {
    const html = fs.readFileSync(
      path.resolve(__dirname, "../index.html"),
      "utf8"
    );
    dom = new JSDOM(html);
    document = dom.window.document;
    jamBuddy = new JamBuddy();

    setupDOM(document, jamBuddy);
  });

  describe("DOM Interaction Tests", () => {
    it("should have the header element", () => {
      const header = document.querySelector(".header");
      expect(header).not.toBeNull();
      expect(header.textContent).toBe("Hello, I'm your Jam Buddy");
    });

    it("should have the image element", () => {
      const image = document.querySelector(".image img");
      expect(image).not.toBeNull();
      expect(image.getAttribute("alt")).toBe("Piano image");
    });

    it("should have the note input elements", () => {
      const note1 = document.getElementById("note1");
      const note2 = document.getElementById("note2");
      expect(note1).not.toBeNull();
      expect(note2).not.toBeNull();
    });

    it("should have the randomize notes button", () => {
      const randomizeButton = document.getElementById("randomizeNotesButton");
      expect(randomizeButton).not.toBeNull();
      expect(randomizeButton.textContent).toBe("Randomize Notes");
    });

    it("should have the answer input element", () => {
      const answerInput = document.getElementById("answerInput");
      expect(answerInput).not.toBeNull();
      expect(answerInput.getAttribute("placeholder")).toBe("Enter distance");
    });

    it("should have the check answer button", () => {
      const checkAnswerButton = document.getElementById("checkAnswerButton");
      expect(checkAnswerButton).not.toBeNull();
      expect(checkAnswerButton.textContent).toBe("Check Answer");
    });

    it("should have the message element", () => {
      const messageElement = document.getElementById("message");
      expect(messageElement).not.toBeNull();
    });

    it("should display the randomized notes in the input fields", () => {
      document.getElementById("randomizeNotesButton").click();
      const notes = jamBuddy.getCurrentNotes();
      expect(document.getElementById("note1").value).toBe(notes[0]);
      expect(document.getElementById("note2").value).toBe(notes[1]);
    });

    it("should display a success message with correct answer", () => {
      jamBuddy.setCurrentNotes(["C", "F"]);
      document.getElementById("answerInput").value = "5";
      document.getElementById("checkAnswerButton").click();
      expect(document.getElementById("message").textContent).toBe(
        "Correct! Well done!"
      );
      expect(document.getElementById("message").className).toBe(
        "message success"
      );
    });

    it("should display an error message with incorrect answer", () => {
      jamBuddy.setCurrentNotes(["C", "D"]);
      document.getElementById("answerInput").value = "3";
      document.getElementById("checkAnswerButton").click();
      expect(document.getElementById("message").textContent).toBe(
        "Incorrect. Try again."
      );
      expect(document.getElementById("message").className).toBe(
        "message error"
      );
    });

    it("should display a validation message for invalid number input", () => {
      document.getElementById("answerInput").value = "abc";
      document.getElementById("checkAnswerButton").click();
      expect(document.getElementById("message").textContent).toBe(
        "Please enter a valid number."
      );
      expect(document.getElementById("message").className).toBe(
        "message error"
      );
    });
  });
});

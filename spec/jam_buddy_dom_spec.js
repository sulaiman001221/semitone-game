const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { JamBuddy } = require("../src/jam_buddy.js");
const { setupDOM } = require("../src/jam_buddy_dom.js");

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

  describe("setupDOM function", () => {
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

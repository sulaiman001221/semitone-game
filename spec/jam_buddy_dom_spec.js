const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const { JamBuddy } = require("../src/jam_buddy.js");
const { setupDOM, messages } = require("../src/jam_buddy_dom.js");

describe("JamBuddy Class with DOM", () => {
  let dom;
  let document;
  let jamBuddy;

  const getElement = (id) => document.getElementById(id);
  const clickElement = (id) => getElement(id).click();
  const setInputValue = (id, value) => {
    getElement(id).value = value;
  };

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
    it("should initialize header with title and streak", () => {
      const header = document.querySelector("#header");
      expect(header).not.toBeNull();
      expect(header.querySelector("#title").textContent).toBe(
        "Hello, I'm your Jam Buddy"
      );
      expect(header.querySelector("#streak").textContent).toContain("Streak:");
    });

    it("should display image with correct alt attribute", () => {
      const image = document.querySelector("#image img");
      expect(image).not.toBeNull();
      expect(image.getAttribute("alt")).toBe("Piano image");
    });

    it("should have note input elements and buttons", () => {
      [
        "note1",
        "note2",
        "randomizeNotesButton",
        "answerInput",
        "checkAnswerButton",
        "message",
      ].forEach((id) => {
        expect(getElement(id)).not.toBeNull();
      });
    });

    it("should randomize notes on button click and update display", () => {
      clickElement("randomizeNotesButton");
      const notes = jamBuddy.getCurrentNotes();
      expect(getElement("note1").value).toBe(notes[0]);
      expect(getElement("note2").value).toBe(notes[1]);
    });

    it("should show success message and update streak with correct answer", () => {
      jamBuddy.setCurrentNotes(["C", "F"]);
      setInputValue("answerInput", "5");
      clickElement("checkAnswerButton");
      expect(getElement("message").textContent).toBe(messages.correctAnswer);
      expect(getElement("message").className).toBe("message success");
      expect(getElement("streak").textContent).toContain("Streak: 1");

      const allNotes = Array.from(
        getElement("allNotes").querySelectorAll(".noteInput")
      );
      const highlightedNotes = allNotes.filter((note) =>
        note.classList.contains("shadeNote")
      );
      expect(highlightedNotes.length).toBeGreaterThan(0); 
    });

    it("should show error message and reset streak with incorrect answer", () => {
      jamBuddy.setCurrentNotes(["C", "D"]);
      setInputValue("answerInput", "3");
      clickElement("checkAnswerButton");
      expect(getElement("message").textContent).toBe(messages.incorrectAnswer);
      expect(getElement("message").className).toBe("message error");
      expect(getElement("streak").textContent).toContain("Streak: 0");
    });

    it("should validate non-numeric input and show error", () => {
      setInputValue("answerInput", "abc");
      clickElement("checkAnswerButton");
      expect(getElement("message").textContent).toBe(messages.enterNumber);
      expect(getElement("message").className).toBe("message error");
    });

    it("should display all notes with correct answers highlighted on quit", () => {
      jamBuddy.setCurrentNotes(["C", "G"]);
      clickElement("quitButton");

      const allNotes = Array.from(
        getElement("allNotes").querySelectorAll(".noteInput")
      );
      expect(allNotes.length).toBe(12); 

      const highlightedNotes = allNotes.filter((note) =>
        note.classList.contains("shadeNote")
      );
      expect(highlightedNotes.length).toBe(2); 

      expect(getElement("message").textContent).toContain(
        messages.doubleAnswer("5", "7")
      );
    });

    it("should restart game and reset elements correctly on restart button click", () => {
      clickElement("quitButton");
      clickElement("restartButton");

      expect(getElement("message").textContent).toBe("");
      expect(getElement("answerInput").disabled).toBe(false);
      expect(getElement("quitButton").hidden).toBe(false);
      expect(getElement("restartButton").hidden).toBe(true);

      expect(getElement("streak").textContent).toContain("Streak: 0");
      const notes = jamBuddy.getCurrentNotes();
      expect(getElement("note1").value).toBe(notes[0]);
      expect(getElement("note2").value).toBe(notes[1]);
    });
  });
});

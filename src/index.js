import { JamBuddy } from "./jam_buddy";
import { setupDOM } from "./jam_buddy_dom";

document.addEventListener("DOMContentLoaded", () => {
  const jamBuddy = new JamBuddy();
  setupDOM(document, jamBuddy);
});

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/jam_buddy.js":
/*!**************************!*\
  !*** ./src/jam_buddy.js ***!
  \**************************/
/***/ ((module) => {

eval("function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar errorMessage = {\n  invalidNotes: \"Invalid notes provided. Notes should be one of A, A#, B, C, C#, D, D#, E, F, F#, G, G#.\",\n  notesNotSet: \"Current notes not set, you should set two notes before checking the answer\",\n  invalidDataType: \"All the provided notes should be strings\",\n  invalidArray: \"Notes should be provided as an array\",\n  similarNotes: \"Notes should not be similar\",\n  invalidLength: \"You should provide exactly two notes\"\n};\nvar VALID_NOTE_COUNT = 2;\nfunction validateNotes(notes, validNotes) {\n  if (!Array.isArray(notes)) {\n    throw new Error(errorMessage.invalidArray);\n  }\n  if (notes.length !== VALID_NOTE_COUNT) {\n    throw new Error(errorMessage.invalidLength);\n  }\n  for (var i = 0; i < notes.length; i++) {\n    if (typeof notes[i] !== \"string\") {\n      throw new Error(errorMessage.invalidDataType);\n    }\n    if (!validNotes.includes(notes[i])) {\n      throw new Error(errorMessage.invalidNotes);\n    }\n  }\n  if (notes[0] === notes[1]) {\n    throw new Error(errorMessage.similarNotes);\n  }\n}\nfunction getRandomNote(notes) {\n  return notes[Math.floor(Math.random() * notes.length)];\n}\nvar JamBuddy = /*#__PURE__*/function () {\n  function JamBuddy() {\n    _classCallCheck(this, JamBuddy);\n    this.notes = [\"A\", \"A#\", \"B\", \"C\", \"C#\", \"D\", \"D#\", \"E\", \"F\", \"F#\", \"G\", \"G#\"];\n    this.currentNotes = [];\n  }\n  return _createClass(JamBuddy, [{\n    key: \"setCurrentNotes\",\n    value: function setCurrentNotes(notes) {\n      if (!Array.isArray(notes)) {\n        throw new Error(errorMessage.invalidArray);\n      }\n      for (var i = 0; i < notes.length; i++) {\n        if (typeof notes[i] === \"string\") {\n          notes[i] = notes[i].toUpperCase();\n        }\n      }\n      validateNotes(notes, this.notes);\n      this.currentNotes = notes;\n    }\n  }, {\n    key: \"getCurrentNotes\",\n    value: function getCurrentNotes() {\n      return this.currentNotes;\n    }\n  }, {\n    key: \"randomizeCurrentNotes\",\n    value: function randomizeCurrentNotes() {\n      var note1 = getRandomNote(this.notes);\n      var note2 = getRandomNote(this.notes);\n      while (note1 === note2) {\n        note2 = getRandomNote(this.notes);\n      }\n      this.currentNotes = [note1, note2];\n    }\n  }, {\n    key: \"checkAnswer\",\n    value: function checkAnswer(distance) {\n      if (this.currentNotes.length !== VALID_NOTE_COUNT) {\n        throw new Error(errorMessage.notesNotSet);\n      }\n      var indexOfFirstNote = this.notes.indexOf(this.currentNotes[0]);\n      var noteCircle = [].concat(_toConsumableArray(this.notes.slice(indexOfFirstNote)), _toConsumableArray(this.notes));\n      var currentIndex = noteCircle.indexOf(this.currentNotes[0]);\n      var targetIndex = noteCircle.indexOf(this.currentNotes[1]);\n      var clockwiseDistance = targetIndex - currentIndex;\n      var counterClockwiseDistance = this.notes.length - targetIndex;\n      return distance === clockwiseDistance || distance === counterClockwiseDistance;\n    }\n  }]);\n}();\nmodule.exports = {\n  JamBuddy: JamBuddy,\n  errorMessage: errorMessage\n};\n\n//# sourceURL=webpack://sulaiman-ndlovu-199-semitone-difference-basic-algorithm-javascript/./src/jam_buddy.js?");

/***/ }),

/***/ "./src/jam_buddy_dom.js":
/*!******************************!*\
  !*** ./src/jam_buddy_dom.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _require = __webpack_require__(/*! ./jam_buddy */ \"./src/jam_buddy.js\"),\n  JamBuddy = _require.JamBuddy;\nvar setupDOM = function setupDOM(document, jamBuddy) {\n  var note1Element = document.getElementById(\"note1\");\n  var note2Element = document.getElementById(\"note2\");\n  var messageElement = document.getElementById(\"message\");\n  var updateCurrentNotesDisplay = function updateCurrentNotesDisplay() {\n    var notes = jamBuddy.getCurrentNotes();\n    note1Element.value = notes.length ? notes[0] : \"\";\n    note2Element.value = notes.length ? notes[1] : \"\";\n  };\n  document.getElementById(\"randomizeNotesButton\").addEventListener(\"click\", function () {\n    jamBuddy.randomizeCurrentNotes();\n    updateCurrentNotesDisplay();\n    messageElement.textContent = \"\";\n    messageElement.className = \"message\";\n  });\n  document.getElementById(\"checkAnswerButton\").addEventListener(\"click\", function () {\n    var answerInput = document.getElementById(\"answerInput\");\n    var answer = parseInt(answerInput.value, 10);\n    if (isNaN(answer)) {\n      messageElement.textContent = \"Please enter a valid number.\";\n      messageElement.className = \"message error\";\n      return;\n    }\n    try {\n      var isCorrect = jamBuddy.checkAnswer(answer);\n      messageElement.textContent = isCorrect ? \"Correct! Well done!\" : \"Incorrect. Try again.\";\n      messageElement.className = isCorrect ? \"message success\" : \"message error\";\n    } catch (error) {\n      messageElement.textContent = error.message;\n      messageElement.className = \"message error\";\n    }\n  });\n  jamBuddy.randomizeCurrentNotes();\n  updateCurrentNotesDisplay();\n};\nif (typeof document !== \"undefined\") {\n  document.addEventListener(\"DOMContentLoaded\", function () {\n    var jamBuddy = new JamBuddy();\n    setupDOM(document, jamBuddy);\n  });\n}\nmodule.exports = {\n  setupDOM: setupDOM\n};\n\n//# sourceURL=webpack://sulaiman-ndlovu-199-semitone-difference-basic-algorithm-javascript/./src/jam_buddy_dom.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/jam_buddy_dom.js");
/******/ 	
/******/ })()
;
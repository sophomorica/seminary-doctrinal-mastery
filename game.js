import { passages } from "./passages.js";

const button = document.getElementById("startButton");
const question = document.getElementById("question");
const score = document.getElementById("currentScore");
const quizContainer = document.getElementById("quizContainer");
const result = document.getElementById("result");
let currentScore = 0;

const getRandomChoices = (correctReference, allReferences) => {
  const choices = [correctReference];
  while (choices.length < 4) {
    const randomReference =
      allReferences[Math.floor(Math.random() * allReferences.length)];
    if (!choices.includes(randomReference)) {
      choices.push(randomReference);
    }
  }
  return choices.sort(() => Math.random() - 0.5);
};
function startGame(passages) {
  const allReferences = passages.map((passage) => passage.reference);

  button.onclick = function () {
    const currentIndex = Math.floor(Math.random() * passages.length);
    const currentPassage = passages[currentIndex];
    question.innerHTML = currentPassage.passage;
    score.innerHTML = currentScore;
    const choices = getRandomChoices(currentPassage.reference, allReferences);

    $("#choices").empty();
    choices.forEach((choice) => {
      const choiceElement = $("<div>")
        .addClass("choice btn btn-outline-secondary")
        .text(choice)
        .click(function () {
          if (choice === currentPassage.reference) {
            currentScore++;
            score.innerHTML = currentScore;
            result.text("Correct!").show();
            setTimeout(() => {
              button.trigger("click");
            }, 1000);
          } else {
            result.text("Try again!").show();
            setTimeout(() => {
              button.trigger("click");
            }, 1000);
          }
        });
      $("#choices").append(choiceElement);
    });
  };
  // $("#startButton").addClass("d-none");
  $("#quizContainer").removeClass("d-none");
  $("#result").hide();
}
$(document).ready(function () {
  startGame(passages);
});

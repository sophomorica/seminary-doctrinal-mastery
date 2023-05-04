function getRandomChoices(correctReference, allReferences) {
  const choices = [correctReference];
  while (choices.length < 4) {
    const randomReference =
      allReferences[Math.floor(Math.random() * allReferences.length)];
    if (!choices.includes(randomReference)) {
      choices.push(randomReference);
    }
  }
  return choices.sort(() => Math.random() - 0.5);
}

// function startTimer() {
//   startTime = new Date().getTime();
// }
// function getTimeElapsed() {
//   return new Date().getTime() - startTime;
// }

function startGame(passages) {
  const allReferences = passages.map((passage) => passage.reference);
  let currentIndex;
  let score = 0;

  function updateScoreDisplay() {
    $("#currentScore").text(score);
  }

  $("#startButton").click(function () {
    $("#startButton").addClass("d-none");
    currentIndex = Math.floor(Math.random() * passages.length);
    const currentPassage = passages[currentIndex];
    console.log(currentPassage);
    $("#question").text(currentPassage.passage);
    const choices = getRandomChoices(currentPassage.reference, allReferences);
    $("#choices").empty();
    choices.forEach((choice) => {
      const choiceElement = $("<div>")
        .addClass("choice btn btn-outline-secondary")
        .text(choice)
        .click(function () {
          if (choice === currentPassage.reference) {
            score++;
            updateScoreDisplay();
            $("#result").text("Correct!").show();
            setTimeout(() => {
              $("#startButton").trigger("click");
            }, 1000);
          } else {
            $("#result").text("NOPE!").show();
            console.log(choices);
            console.log(choices.indexOf(choice));
            const index = choices.indexOf(choice);
            if (index > -1) {
              choices.splice(index, 1);
            }
            choiceElement.remove();
          }
        });
      $("#choices").append(choiceElement);
    });

    $("#quizContainer").removeClass("d-none");
    $("#result").hide();
  });
}

$(document).ready(function () {
  fetch("passages.json")
    .then((response) => response.json())
    .then((passages) => startGame(passages));
});

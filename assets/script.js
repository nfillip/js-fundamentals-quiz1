//:::GLOBAL VERIABLES
////start page
var headerLink = document.querySelector("#topHead");
var headerTimer = document.querySelector("#timer");
var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
////quiz page
var quizSection = document.querySelector("#quiz-section");
var questionTitle = document.querySelector("#question-title");
var quizChoices = document.querySelector("#div-quiz");
var buttonA = document.querySelector("#buttonA");
var buttonB = document.querySelector("#buttonB");
var buttonC = document.querySelector("#buttonC");
var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");
////quiz page - (reassurance - saying if it was correct or not)
var tag = document.createElement("h2");
document.body.appendChild(tag);
var answerReassurance = document.querySelector("h2");
////results page
var resultsSection = document.querySelector("#results");
var pointsFinal = document.querySelector("#points");
var submitButton = document.querySelector("#submit-score");
var yourInitials = document.querySelector("#initials");
////highscores page
var highScoreTable;
var finalSection = document.querySelector("#highscore");
var finalDiv = document.querySelector("#finalDiv");
var resetButton = document.querySelector("#reset-button");
////timer Variables
var secondsLeft = prompt("How many seconds do you want on the quiz?");
var answerReassuranceTimer = 3; 
////quiz answerKey array
var finalScore;
var i = 0;
var j = 0;
var answerKey = [
  {
    title: "What value does 9%2 yield?",
    choice: ["1", "0", "4.5"],
    answer: "1",
  },
  {
    title: "Which is a boolean value?",
    choice: ["true", "green", "1"],
    answer: "true",
  },
  {
    title: "Which method removes last value of an array?",
    choice: [".pop()", ".concat()", ".push()"],
    answer: ".pop()",
  },
  {
    title: "what does i++ do to the variable i?",
    choice: ["adds 2", "adds 1", "undefined"],
    answer: "adds 1",
  },
  {
    title: "local storage can only store a:",
    choice: ["object", "array", "string"],
    answer: "string",
  },
  {
    title: "DOM stands for?",
    choice: ["Dominican Republic", "Domestic violence", "Document Object Model"],
    answer: "Document Object Model",
  },
];

//:::FUNCTIONS
//displayQuiz: (displays first question of quiz and turns start page display to none)
function displayQuiz() {
  setTime();
  startPage.setAttribute("style", "display: none");
  quizSection.setAttribute(
    "style",
    "display: flex; flex-direction: column; justify-content: center; align-items: center"
  );
  answerReassurance.textContent = "";
  quizChoices.setAttribute(
    "style",
    "display: grid; grid-template-columns: 1fr 1fr"
  );
  questionTitle.textContent = answerKey[0].title;
  choiceA.textContent = answerKey[0].choice[0];
  choiceB.textContent = answerKey[0].choice[1];
  choiceC.textContent = answerKey[0].choice[2];
}

//displayResults: (displays result screen with your score after the quiz)
function displayResults() {
  quizSection.setAttribute("style", "display: none");
  resultsSection.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center; justify-content: center"
  );
  pointsFinal.textContent = "Your Final Point Total: " + finalScore;
}

//testAnswer: (compare answer choice with the correct answer in the answerKey object)
function testAnswer(answerChoice) {
  if (i === answerKey.length - 1) {
    finalScore = secondsLeft;
    j = 1;
    if (answerChoice !== answerKey[i].answer) {
      //incorrect final answer choice
      finalScore -= 10;
      if (finalScore < 0) {
        finalScore = 0;
      }
      answerReassurance.setAttribute("style", "color: red; font-size: 2em");
      answerReassuranceTimer = 3;
      var h2Timer = setInterval(function () {
        answerReassurance.textContent = "That was incorrect.";
        if (answerReassuranceTimer <= 0 ){
            clearInterval(h2Timer);
            answerReassurance.textContent = "";
            displayResults();
        }
        answerReassuranceTimer--;
        }, 1000);
      
      
    //   var h2Timer = setInterval(function () {
    //     answerReassurance.textContent = "";
    //   }, 3000);
    } else {
      //correct final answerchoice
      answerReassurance.setAttribute("style", "color: green; font-size: 2em");
      answerReassuranceTimer = 3;
      var h2Timer = setInterval(function () {
        answerReassurance.textContent = "That was correct.";
        if (answerReassuranceTimer <= 0) {
           clearInterval(h2Timer)
           answerReassurance.textContent = ""; 
           displayResults();
        }
        answerReassuranceTimer--;
      }, 1000);
    }
    
  } else if (answerChoice === answerKey[i].answer) {
    //correct answer but not last question
    i++;
    questionTitle.textContent = answerKey[i].title;
    choiceA.textContent = answerKey[i].choice[0];
    choiceB.textContent = answerKey[i].choice[1];
    choiceC.textContent = answerKey[i].choice[2];
    answerReassurance.setAttribute("style", "color: green; font-size: 2em");
    answerReassuranceTimer = 3;
    var h2Timer = setInterval(function () {
        answerReassurance.textContent ="That was correct! Here's the next question...";
        if (answerReassuranceTimer <=0) {
            clearInterval(h2Timer);
            answerReassurance.textContent = "";
        }
        answerReassuranceTimer--;
        }, 1000);

    
    
  } else {
    //incorrect answer but not last question
    i++;
    secondsLeft -= 10;
    questionTitle.textContent = answerKey[i].title;
    choiceA.textContent = answerKey[i].choice[0];
    choiceB.textContent = answerKey[i].choice[1];
    choiceC.textContent = answerKey[i].choice[2];
    if (secondsLeft > 0) {
      answerReassurance.setAttribute("style", "color: red; font-size: 2em");
      answerReassuranceTimer = 3;
      var h2Timer = setInterval(function () {
        answerReassurance.textContent = "That was incorrect. Here's the next question...";
        if (answerReassuranceTimer <=0) {
            clearInterval(h2Timer);
            answerReassurance.textContent = "";
        }
        answerReassuranceTimer--;
        }, 1000);
      
    } else {
      answerReassurance.setAttribute("style", "color: red; font-size: 2em");
      answerReassuranceTimer = 3;
      var h2Timer = setInterval(function () {
        answerReassurance.textContent = "That was incorrect. GAMEOVER.";
        if (answerReassuranceTimer <=0) {
            clearInterval(h2Timer);
            answerReassurance.textContent = "";
        }
        answerReassuranceTimer--;
        }, 1000);
      
    }
    
  }
}

//function: setTime() - sets a timer once the begin quiz button is clicked
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    headerTimer.setAttribute("style", "font-size: 3rem;");
    headerTimer.textContent = secondsLeft;
    if (secondsLeft <= 0) {
      //ends the timer on a LOSS when we drop to 0 points or less. Calls results page.
      clearInterval(timerInterval);
      headerTimer.textContent = "Timer:";
      headerTimer.setAttribute("style", "font-size: 1.5rem;");
      finalScore = 0;
      displayResults();
    } else if (j === 1) {
      //ends the timer when we complete the final question
      clearInterval(timerInterval);
      headerTimer.textContent = "Timer:";
      headerTimer.setAttribute("style", "font-size: 1.5rem;");
    }
  }, 1000);
}

//function: addtoLocal - takes the input value from the input element and stores locally
function addToLocal() {
  var mostRecent = {
    initials: yourInitials.value,
    score: finalScore,
  };
  if (localStorage.getItem("initial") === null) {
    localStorage.setItem("initial", JSON.stringify([mostRecent]));
  } else {
    var temp = JSON.parse(localStorage.getItem("initial"));
    temp.push(mostRecent);
    localStorage.setItem("initial", JSON.stringify(temp));
  }
  addToHighScorePage();
}

//function: addtoHighScorePage - sets other pages to display none, calls teh sort object array, takes localStorage and displays it by building List Items
function addToHighScorePage() {
  finalSection.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center; jusify-content: space-around"
  );
  finalDiv.setAttribute(
    "style",
    "display: grid; grid-template-columns: 1fr 1fr"
  );
  resetButton.setAttribute("style", "margin-top: 2em");

  resultsSection.setAttribute("style", "display: none");
  quizSection.setAttribute("style", "display: none");
  startPage.setAttribute("style", "display: none");
  headerLink.textContent = "retake the quiz";
  highScoreTable = JSON.parse(localStorage.getItem("initial"));
  sortArrayofObjects();

  for (var h = 0; h < highScoreTable.length; h++) {
    var tag1 = document.createElement("li");
    var tag2 = document.createElement("li");
    finalDiv.appendChild(tag1);
    finalDiv.appendChild(tag2);
    tag1.textContent = highScoreTable[h].initials;
    tag2.textContent = highScoreTable[h].score;
  }
}

//function sortArrayofObjects: puts the top score with respective initial at top of high scoers page
function sortArrayofObjects() {
  for (var j = 0; j < highScoreTable.length - 1; j++) {
    largest = highScoreTable[j].score;
    largestObject = highScoreTable[j];
    // console.log("largest: " + largest);
    indexLargestInitial = -1;
    for (var h = j + 1; h < highScoreTable.length; h++) {
      if (highScoreTable[h].score > largest) {
        largest = highScoreTable[h].score;
        largestObject = highScoreTable[h];
        // console.log("largest: " + largest);
        indexLargestInitial = h;
        // console.log("largestInitiral: " + h);
      }
    }
    if (indexLargestInitial !== -1) {
      temp2 = highScoreTable[j];
      // console.log("temp: " + temp2)
      highScoreTable[j] = largestObject;
      // console.log("array2[j]: " + array2[j]);
      highScoreTable[indexLargestInitial] = temp2;
      // console.log("array2[h]: " + array2[indexLargestInitial]);
    }
  }
}

//:::EVENT LISTENERS
////start button
startButton.addEventListener("click", displayQuiz);

////buttonA
buttonA.addEventListener("click", function (event) {
  event.stopPropagation();
  var element = event.target;
  if (element.matches("button")) {
    testAnswer(choiceA.textContent);
  }
});
////buttonB
buttonB.addEventListener("click", function (event) {
  event.stopPropagation();
  var element = event.target;
  if (element.matches("button")) {
    testAnswer(choiceB.textContent);
  }
});
////buttonC
buttonC.addEventListener("click", function (event) {
  event.stopPropagation();
  var element = event.target;
  if (element.matches("button")) {
    testAnswer(choiceC.textContent);
  }
});

////submitButton
submitButton.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
  var element = event.target;
  if (element.matches("button")) {
    addToLocal();
  }
  //   addToHighScorePage();
});

////headerLink - takes you to highscores page
headerLink.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
  var element = event.target;
  if (element.matches("div")) {
    if (headerLink.textContent === "Go To HighScores") {
      j = 1;
      addToHighScorePage();
      headerTimer.textContent = "Timer:";
      headerTimer.setAttribute("style", "font-size: 1.5rem");
    } else {
      location.reload();
    }
  }
});

resetButton.addEventListener("click", function (event) {
  event.stopPropagation();
  event.preventDefault();
  var element = event.target;
  if (element.matches("button")) {
    localStorage.removeItem("initial");
    location.reload();
  }
});

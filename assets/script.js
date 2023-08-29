//GLOBAL VERIABLES
var score = 0;
var secondsLeft = 60;
//pulling from HTML ids
var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var quizSection = document.querySelector("#quiz-section");
var headerTimer = document.querySelector("#timer");
var quizChoices = document.querySelector("#div-quiz");
var resultsSection = document.querySelector("#results");
var pointsFinal = document.querySelector("#points");
var questionTitle = document.querySelector("#question-title");
var buttonA = document.querySelector("#buttonA");
var buttonB = document.querySelector("#buttonB");
var buttonC = document.querySelector("#buttonC");
var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");
var submitButton = document.querySelector("#submit-score");
var tag = document.createElement("h2");
document.body.appendChild(tag);
var answerReassurance = document.querySelector("h2");
var yourInitials = document.querySelector("#initials");
var highScoreTable;
//quiz answerKey array
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
    title: "what does i++ do the variable i?",
    choice: ["adds 2", "adds 1", "undefined"],
    answer: "adds 1",
  },
];

//:::FUNCTIONS
//displayQuiz: displays first question of quiz and turns start page display to none
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

  //start timer
}

//displayResults: displays result screen with your score after the quiz
function displayResults() {
  quizSection.setAttribute("style", "display: none");
  resultsSection.setAttribute(
    "style",
    "display: flex; flex-direction: column; align-items: center; justify-content: center"
  );
  pointsFinal.textContent = "Your Final Point Total: " + finalScore;
}

//testAnswer: compare answer choice with the correct answer in the answer object
function testAnswer(answerChoice) {
  if (i === answerKey.length - 1) {
    finalScore = secondsLeft;
    j = 1;
    if (answerChoice !== answerKey[i].answer) {
      finalScore -= 10;
      j = 1;
      answerReassurance.textContent = "That was incorrect.";
    var h2Timer = setInterval(function () {
      answerReassurance.textContent = "";
    }, 3000);
    } else {
      j = 1;
      answerReassurance.textContent = "That was correct.";
    var h2Timer = setInterval(function () {
      answerReassurance.textContent = "";
    }, 3000);
    }
    displayResults();
    //go to the results page
  } else if (answerChoice === answerKey[i].answer) {
    i++;
    score++;

    questionTitle.textContent = answerKey[i].title;
    choiceA.textContent = answerKey[i].choice[0];
    choiceB.textContent = answerKey[i].choice[1];
    choiceC.textContent = answerKey[i].choice[2];
    answerReassurance.textContent =
      "That was correct! Here's the next question...";
    var h2Timer = setInterval(function () {
      answerReassurance.textContent = "";
    }, 3000);
  } else {
    i++;
    secondsLeft -= 10;
    questionTitle.textContent = answerKey[i].title;
    choiceA.textContent = answerKey[i].choice[0];
    choiceB.textContent = answerKey[i].choice[1];
    choiceC.textContent = answerKey[i].choice[2];
    answerReassurance.textContent = "That was incorrect. Here's the next question...";
    var h2Timer = setInterval(function () {
      answerReassurance.textContent = "";
    }, 3000);
    
  }
}

//function: setTime() - sets a timer once the begin quiz button is clicked
function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    headerTimer.setAttribute("style", "text-align: center; font-size: 3rem;");
    headerTimer.textContent = secondsLeft;
    if (secondsLeft === 0 || j === 1) {
      clearInterval(timerInterval);
    }
  }, 1000);
}


//function: addtoLocal - takes the input value from the input element and stores locally
function addToLocal() {
    console.log(yourInitials.value);
    var mostRecent = {
        initials: yourInitials.value,
        score: finalScore 
    }
    if(localStorage.getItem("initial") === null){
        localStorage.setItem("initial", JSON.stringify([mostRecent]));
        
    } else {
        var temp = JSON.parse(localStorage.getItem("initial"));
        temp.push(mostRecent);
        console.log(temp);
        localStorage.setItem("initial" , JSON.stringify(temp));
        
    }
    // goToResultsPage
    // localStorage.setItem("initial", x)
}

function addToHighScorePage() {
    highScoreTable = JSON.parse(localStorage.getItem("initial"));
    // for (var k = 0; k<highScoreTable.length; k++){
    //     if (highScoreTable[k+1].score<highScoreTable[k].score) {
    //         highScoreTable.splice(k,0,highScoreTable[k+1]);
    //     }
    // }
    for (var h = 0; h<highScoreTable.length; h++) {
        var tag1 = document.createElement("li");
        "#html2".appendChild(tag1);
        var scoreindex = document.querySelector("#html2");
        scoreindex.textContent = highScoreTable[h];
        
    }
}

//:::EVENT LISTENERS
startButton.addEventListener("click", displayQuiz);

//when quiz button is clicked, I want to use textContent to change what is on each p value. I want to check if the button choice was equal to the answer key on the answer variable. I want to increment index by 1 of the answer key.
buttonA.addEventListener("click", function (event) {
  event.stopPropagation();
  var element = event.target;
  if (element.matches("button")) {
    testAnswer(choiceA.textContent);
  }
});

buttonB.addEventListener("click", function (event) {
  event.stopPropagation();
  var element = event.target;
  if (element.matches("button")) {
    testAnswer(choiceB.textContent);
  }
});

buttonC.addEventListener("click", function (event) {
  event.stopPropagation();
  var element = event.target;
  if (element.matches("button")) {
    testAnswer(choiceC.textContent);
  }
});


submitButton.addEventListener("click", function (event){
    event.stopPropagation();
    event.preventDefault();
    var element = event.target;
    if (element.matches("button")){
        addToLocal();
    }
    addToHighScorePage();
}
)
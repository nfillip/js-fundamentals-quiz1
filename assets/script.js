//GLOBAL VERIABLES
var score = 0;
var secondsLeft = 60;
//pulling from HTML ids
var headerLink = document.querySelector("#topHead");
var headerTimer = document.querySelector("#timer");
var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var quizSection = document.querySelector("#quiz-section");
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
var finalSection = document.querySelector("#highscore");
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
    headerTimer.setAttribute("style", "font-size: 3rem;");
    headerTimer.textContent = secondsLeft;
    if (secondsLeft === 0 || j === 1) {
      clearInterval(timerInterval);
      headerTimer.textContent = "Timer:"
      headerTimer.setAttribute("style", "font-size: 1.5rem;");
    }
  }, 1000);
}


//function: addtoLocal - takes the input value from the input element and stores locally
function addToLocal() {
    
    var mostRecent = {
        initials: yourInitials.value,
        score: finalScore 
    }
    if(localStorage.getItem("initial") === null){
        localStorage.setItem("initial", JSON.stringify([mostRecent]));
        
    } else {
        var temp = JSON.parse(localStorage.getItem("initial"));
        temp.push(mostRecent);
        
        localStorage.setItem("initial" , JSON.stringify(temp));
        
    }
    // goToResultsPage
    // localStorage.setItem("initial", x)
}

function addToHighScorePage() {
    finalSection.setAttribute("style", "display: grid; grid-template-columns: 1fr 1fr");
    resultsSection.setAttribute("style", "display: none");
    quizSection.setAttribute("style", "display: none");
    startPage.setAttribute("style", "display: none");
    headerLink.textContent = "retake the quiz"
    highScoreTable = JSON.parse(localStorage.getItem("initial"));
    // console.log(highScoreTable);
    
    //sort the array
    var array2 = [1,5,7,3,6,4];
    var temp2;
    var largest;
    var indexLargestInitial = -1;
   
    for(var j = 0; j<array2.length-1; j++) {
        largest = array2[j];
            // console.log("largest: " + largest);
        indexLargestInitial = -1;
        for (var h = j+1; h<array2.length; h++) {
            if (array2[h] > largest) {
            largest = array2[h];
            // console.log("largest: " + largest);
            indexLargestInitial = h;
            // console.log("largestInitiral: " + h);
            } 
        }
        if (indexLargestInitial !== -1){
        temp2 = array2[j];
        // console.log("temp: " + temp2)
        array2[j] = largest;
        // console.log("array2[j]: " + array2[j]);
        array2[indexLargestInitial] = temp2;
        // console.log("array2[h]: " + array2[indexLargestInitial]);
         
        console.log(array2);
        }
        
    }
    console.log(array2);

    for(var j = 0; j<highScoreTable.length-1; j++) {
        largest = highScoreTable[j].score;
        largestObject = highScoreTable[j];
            // console.log("largest: " + largest);
        indexLargestInitial = -1;
        for (var h = j+1; h<highScoreTable.length; h++) {
            if (highScoreTable[h].score > largest) {
            largest = highScoreTable[h].score;
            largestObject = highScoreTable[h];
            // console.log("largest: " + largest);
            indexLargestInitial = h;
            // console.log("largestInitiral: " + h);
            } 
        }
        if (indexLargestInitial !== -1){
        temp2 = highScoreTable[j];
        // console.log("temp: " + temp2)
        highScoreTable[j] = largestObject;
        // console.log("array2[j]: " + array2[j]);
        highScoreTable[indexLargestInitial] = temp2;
        // console.log("array2[h]: " + array2[indexLargestInitial]);
         
        console.log(highScoreTable);
        }
        
    }
    console.log(array2);

    for (var h = 0; h<highScoreTable.length; h++) {
        
        var tag1 = document.createElement("li");
        var tag2 = document.createElement("li");
        finalSection.appendChild(tag1);
        finalSection.appendChild(tag2);
        tag1.textContent = highScoreTable[h].initials;
        tag2.textContent = highScoreTable[h].score;
        
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

headerLink.addEventListener("click", function(event) {
    
    event.stopPropagation();
    event.preventDefault();
    var element = event.target;
    if (element.matches("div")){
       if (headerLink.textContent === "Go To HighScores"){
            j = 1 ;
            addToHighScorePage();
            headerTimer.textContent = "Timer:"
            headerTimer.setAttribute("style", "font-size: 1.5rem")
       } else {
            location.reload();
       }
    }
})

if (secondsLeft <=0) {
    finalScore = 0;
    displayResults();
}
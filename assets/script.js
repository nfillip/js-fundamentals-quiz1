//GLOBAL VERIABLES
var score = 0;
//pulling from HTML ids
var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var quizSection = document.querySelector("#quiz-section");
var quizChoices = document.querySelector("#div-quiz");
var resultsSection = document.querySelector("#results");
var questionTitle = document.querySelector("#question-title");
var buttonA = document.querySelector("#buttonA");
var buttonB = document.querySelector("#buttonB");
var buttonC = document.querySelector("#buttonC");
var choiceA = document.querySelector("#choiceA");
var choiceB = document.querySelector("#choiceB");
var choiceC = document.querySelector("#choiceC");


var resultsHTML;
//quiz answerKey array
var i = 0; 
var answerKey = [
    {
        title: 'What value does 9%2 yield?',
        choice: ["1", "0", "4.5"],
        answer: "1"
    },
    {
        title: 'Which is a boolean value?',
        choice: ["true", "green", "1"],
        answer: "true"
    },
    {
        title: 'Which method removes last value of an array?',
        choice: [".pop()", ".concat()", ".push()"],
        answer: ".pop()"
    },
    {
        title: 'what does i++ do the variable i?',
        choice: ["adds 2", "adds 1", "undefined"],
        answer: "adds 1"
    }
]
    

//FUNCTIONS
//displayQuiz: displays first question of quiz and turns start page display to none
function displayQuiz(){
    startPage.setAttribute("style", "display: none");
    quizSection.setAttribute("style", "display: flex; flex-direction: column; justify-content: center; align-items: center");
    quizChoices.setAttribute("style", "display: grid; grid-template-columns: 1fr 1fr");
    questionTitle.textContent = answerKey[0].title;
    choiceA.textContent = answerKey[0].choice[0];
    choiceB.textContent = answerKey[0].choice[1];
    choiceC.textContent = answerKey[0].choice[2];
    
    //start timer
}

//displayResults: displays result screen with your score after the quiz
function displayResults(){
    quizSection.setAttribute("style", "display: none");
    resultsSection.setAttribute("style", "display: flex");

}

//testAnswer: compare answer choice with the correct answer in the answer object
function testAnswer(answerChoice){
    if(i === answerKey.length-1){
        
        displayResults();
        //go to the results page
    }
    console.log(i + "is the index");
    if(answerChoice === answerKey[i].answer) {
        console.log(answerChoice);
        console.log(answerKey[i].answer)
        i++;
        score++;
        
        questionTitle.textContent = answerKey[i].title;
        choiceA.textContent = answerKey[i].choice[0];
        choiceB.textContent = answerKey[i].choice[1];
        choiceC.textContent = answerKey[i].choice[2];
        
        var tag = document.createElement("h2");
        document.body.appendChild(tag);
        document.querySelector("h2").textContent = "That was correct! Here's the next question...";
    } else {
        i++; 
        questionTitle.textContent = answerKey[i].title;
        choiceA.textContent = answerKey[i].choice[0];
        choiceB.textContent = answerKey[i].choice[1];
        choiceC.textContent = answerKey[i].choice[2];
        //reduce timer

        var tag = document.createElement("h2");
        document.body.appendChild(tag);
        document.querySelector("h2").textContent = "That was incorrect. Here's the next question...";
        
    }


 }
//EVENT LISTENERS
startButton.addEventListener("click", displayQuiz);

//when quiz button is clicked, I want to use textContent to change what is on each p value. I want to check if the button choice was equal to the answer key on the answer variable. I want to increment index by 1 of the answer key. 
buttonA.addEventListener("click", function(event){
    event.stopPropagation();
    var element = event.target;
    if (element.matches("button")){
        testAnswer(choiceA.textContent);
    }
}
);

buttonB.addEventListener("click", function(event){
    event.stopPropagation();
    var element = event.target;
    if (element.matches("button")){
        testAnswer(choiceB.textContent);
    }
}
);

buttonC.addEventListener("click", function(event){
    event.stopPropagation();
    var element = event.target;
    if (element.matches("button")){
        testAnswer(choiceC.textContent);
    }
}
);

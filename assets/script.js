//GLOBAL VERIABLES

//pulling from HTML ids
var startButton = document.querySelector("#start-button");
var startPage = document.querySelector("#start-page");
var quizSection = document.querySelector("#quiz-section");
var quizChoices = document.querySelector("#div-quiz");
var resultsSection = document.querySelector("#results");

startButton.addEventListener("click", displayQuiz);


//FUNCTIONS
function displayQuiz(){
    console.log("hello");
    startPage.setAttribute("style", "display: none");
    quizSection.setAttribute("style", "display: flex; flex-direction: column; justify-content: center; align-items: center");
    quizChoices.setAttribute("style", "display: grid; grid-template-columns: 1fr 1fr");
}
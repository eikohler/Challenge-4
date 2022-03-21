const quiz = document.getElementsByClassName("quiz-section");
const quizSubmit = document.getElementsByClassName("quiz-submit");
const start = document.getElementById("start");
const displayResult = document.getElementById("result");
const displayFinalResult = document.getElementById("finalResult");
const finalScore = document.getElementById("finalScore");
const timeLeft = document.getElementById("timeLeft");
const submitScore = document.querySelector("#scoreSubmit");
const hsList = document.getElementById("high-scores-list");
const quizContainer = document.getElementById("quiz-container");
const hsContainer = document.getElementById("high-score-container");
var timeLimit = 0;
var countdown;

updateTime();
buildHighScoresList();

function startQuiz(){
    timeLimit = 75;
    var num = 0;
    start.style.display = "none";
    quiz[num].style.display = "block";
    updateTime();
    countdown = setInterval(timer, 1000);
    quizSubmit[num].addEventListener("click", function(event){
        event.preventDefault();
        nextQuiz(num);
    });
}

function reset(){
    timeLimit = 0;
    updateTime();
    displayResult.innerHTML = "";
    displayFinalResult.innerHTML = "";
    finalScore.style.display = "none";
    start.style.display = "block";
    var choices = document.getElementsByTagName('input');
    for (i = 0; i < choices.length; i++) {
        if(choices[i].type == 'radio' && choices[i].checked){
            choices[i].checked = false;
        }
    }
}

function nextQuiz(num){
    var isTrue = document.querySelector('#true-'+num).checked;
    if(validateSubmission(num)){
        quiz[num].style.display = "none";
        if(isTrue){
            displayResult.innerHTML = "Correct";
        }else{
            displayResult.innerHTML = "Incorrect";
            timeLimit = timeLimit - 10;
            updateTime();
        }

        if(num+1>=quiz.length){
            endGame();
        }else{
            quiz[num+1].style.display = "block";
            quizSubmit[num+1].addEventListener("click", function(event){
                event.preventDefault();
                nextQuiz(num+1);
            });
        }
    }else alert("Please Select an Option!");
}

function validateSubmission(num){
    var choices = document.getElementsByName("selection-"+num);

    for (var i = 0, length = choices.length; i < length; i++) {
        if (choices[i].checked) {
            return true;
        }
    }

    return false;
}

function timer(){
    timeLimit--
    timeLeft.innerHTML = timeLimit;
    if(timeLimit<=0){
        endGame();
    }
}

function updateTime(){
    timeLeft.innerHTML = timeLimit;
}

function stopTime(){
    clearInterval(countdown);
}

function endGame(){
    stopTime();
    for (let index = 0; index < quiz.length; index++) {
        quiz[index].style.display = "none";        
    }
    displayFinalResult.innerHTML = "Final Score: "+timeLimit;
    finalScore.style.display = "block";
}

submitScore.addEventListener("click", function(event){
    event.preventDefault();
    if(playerName.value == ""){
        alert("Please enter your name!");
    }else{
        var player = {
            name: playerName.value,
            score: timeLimit
        }

        window.localStorage.setItem('player'+Math.floor(Math.random() * 10000), JSON.stringify(player));
        console.log(getSavedScores());
        updateHS();
        reset();
    }
});

function getSavedScores(){
    var values = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]));
    }
    return values;
}

function buildHighScoresList(){
    var players = getSavedScores();
    for (let i = 0; i < players.length; i++) {     
        var player = JSON.parse(players[i]);
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(player.name+": "+player.score));
        hsList.appendChild(li);
    }
}

function viewHighScores(){
    quizContainer.style.display = "none";
    hsContainer.style.display = "block";
    document.getElementById("highscores").style.display = "none";
    document.getElementById("clearHS").style.display = "block";
    document.getElementById("quiz-game").style.display = "block";
}

function returnToGame(){
    quizContainer.style.display = "block";
    hsContainer.style.display = "none";
    document.getElementById("highscores").style.display = "block";
    document.getElementById("clearHS").style.display = "none";
    document.getElementById("quiz-game").style.display = "none";
}

function updateHS(){
    hsList.innerHTML = '';
    buildHighScoresList();
}

function clearHS(){
    localStorage.clear();
    updateHS();
}
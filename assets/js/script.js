const quiz = document.getElementsByClassName("quiz-section");
const quizSubmit = document.getElementsByClassName("quiz-submit");
var timeLimit = 75;
var countdown;


function startQuiz(){
    var num = 0;
    document.getElementById("start").style.display = "none";
    quiz[num].style.display = "block";
    updateTime();
    countdown = setInterval(timer, 1000);
    quizSubmit[num].addEventListener("click", function(event){
        event.preventDefault();
        nextQuiz(num);
    });
}

function nextQuiz(num){
    var displayResult = document.getElementById("result");
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
            stopTime();
            displayResult.innerHTML = "Final Score: "+timeLimit;
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
    document.getElementById("timeLeft").innerHTML = timeLimit;
}

function updateTime(){
    document.getElementById("timeLeft").innerHTML = timeLimit;
}

function stopTime(){
    clearInterval(countdown);
}
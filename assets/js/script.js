const quiz = document.getElementsByClassName("quiz-section");
const quizSubmit = document.getElementsByClassName("quiz-submit");
const start = document.getElementById("start");

function startQuiz(){
    var num = 0;
    document.getElementById("start").style.display = "none";
    quiz[num].style.display = "block";
    quizSubmit[num].addEventListener("click", function(event){
        event.preventDefault();
        nextQuiz(num);
    });
}

function nextQuiz(num){

    console.log(document.querySelector('input[name="false-'+num+'"]').checked);

    quiz[num].style.display = "none";
    quiz[num+1].style.display = "block";
    quizSubmit[num+1].addEventListener("click", function(event){
        event.preventDefault();
        nextQuiz(num+1);
    });
}

function validateSubmission(num){
    var radios = document.getElementsByName("false-"+num);

    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) {
        return true;
        }
    }

    return false;
}
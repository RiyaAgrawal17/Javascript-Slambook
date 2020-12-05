// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "How do you find the minimum of x and y using JavaScript?",
        imgSrc : "img/js.png",
        choiceA : "min(x,y);",
        choiceB : "Math.min(x,y)",
        choiceC : "Math.min(xy)",
        choiceD : "min(xy);",
        correct : "B"
    },{
        question : "Which JavaScript label catches all the values, except for the ones specified?",
        imgSrc : "img/js.png",
        choiceA : "catch",
        choiceB : "label",
        choiceC : "try",
        choiceD : "default",
        correct : "D"
    },{
        question : "Which are the correct 'if' statements to execute certain code if “x” is equal to 2?",
        imgSrc : "img/js.png",
        choiceA : "if(x 2)",
        choiceB : "if(x = 2)",
        choiceC : "if(x == 2)",
        choiceD : "if(x != 2)",
        correct : "C"
    },{
        question : "Which of the following is not a reserved word in JavaScript?",
        imgSrc : "img/js.png",
        choiceA : "interface",
        choiceB : "throws",
        choiceC : "program",
        choiceD : "short",
        correct : "C"
    },{
        question : " In JavaScript, we do not have datatypes like integer and float. What is the function that can be used to check if the number is an integer or not?",
        imgSrc : "img/js.png",
        choiceA : "Integer(val)",
        choiceB : "ifInteger(val)",
        choiceC : "isInteger(val)",
        choiceD : "ifinteger(val)",
        correct : "C"
    },{
        question : "What will the code return?   Boolean(3 < 7)",
        imgSrc : "img/js.png",
        choiceA : "true",
        choiceB : "false",
        choiceC : "NaN",
        choiceD : "Error",
        correct : "A"
    },{
        question : "Which function of an Array object calls a function for each element in the array?",
        imgSrc : "img/js.png",
        choiceA : "forEach()",
        choiceB : "every()",
        choiceC : "forEvery()",
        choiceD : "each()",
        correct : "A"
    },{
        question : "Which was the first browser to support JavaScript?",
        imgSrc : "img/js.png",
        choiceA : "Mozilla Firefox",
        choiceB : "Netscape",
        choiceC : "Google Chrome",
        choiceD : "IE",
        correct : "B"
    },{
        question : "JavaScript is a ________ Side Scripting Language.",
        imgSrc : "img/js.png",
        choiceA : " Server",
        choiceB : "ISP",
        choiceC : "Browser",
        choiceD : "None of the above",
        correct : "C"
    },{
        question : "What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?",
        imgSrc : "img/js.png",
        choiceA : "strip()",
        choiceB : "trim()",
        choiceC : "stripped()",
        choiceD : "trimmed()",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

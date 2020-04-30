
// Create and assign variables.
var start = document.getElementById("start"),
    onStart = document.getElementById("onStart"),
    quiz = document.getElementById("quiz"),
    quizHd = document.getElementById("quizHd"),
    question = document.getElementById("question"),
    choiceBtns = document.getElementById("choiceBtns"),
    choiceA = document.getElementById("A"),
    choiceB = document.getElementById("B"),
    choiceC = document.getElementById("C"),
    choiceD = document.getElementById("D"),
    choiceE = document.getElementById("E"),
    counter = document.getElementById("counter"),
    timeGauge = document.getElementById("timeGauge"),
    progress = document.getElementById("progress"),
    scoreDiv = document.getElementById("scoreContainer"),
    highScores = document.getElementById("highScores"),
    quizFt = document.getElementById("quizFt"),
    reset = document.createElement("button"),
    head2 = document.createElement("h2"),
    timer = document.getElementById("timer");
    
// Create the questions and answers.
let questions = [
    {
        question : "What does CSS stand for?",
        choiceA : "Cascading Style Sheets",
        choiceB : "Critical Sumo Smash",
        choiceC : "Corndog Salty Sauce",
        choiceD : "Creepy Single Steve",
        choiceE : "Current Sleep State",
        correct : "A"
    },
    {
        question : "Which starts a conditional statement?",
        choiceA : "let",
        choiceB : "if",
        choiceC : "function",
        choiceD : "div",
        choiceE : "var",
        correct : "B"
    },
    {
        question : "How do you write to the console?",
        choiceA : "function()",
        choiceB : "write()",
        choiceC : "console.log()",
        choiceD : "return",
        choiceE : ".length",
        correct : "C"
    },
    {
        question : "Which of these is needed to access jQuery?",
        choiceA : "*",
        choiceB : "/",
        choiceC : "&",
        choiceD : "$",
        choiceE : "@",
        correct : "D"
    },
    {
        question : "Where are the title tags located in an HTML document?",
        choiceA : "div",
        choiceB : "body",
        choiceC : "main",
        choiceD : "header",
        choiceE : "head",
        correct : "E"
    }
];

var lastQuestion = questions.length - 1;
let runningQuestion = 0,
    count = 60;
var questionTime = 15,
    gaugeWidth = 37, 
    gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

start.addEventListener("click",startQuiz);

// Start the quiz.
function startQuiz(){
    choiceBtns.style.display = 'block';
    start.style.display = "none";
    onStart.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
}

// Display a question.
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
    choiceE.innerHTML = q.choiceE;
}

// Display the progress circles.
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// Display the counter.
function renderCounter() {    
    if (count >= 0) {
        counter.innerHTML = "<p>You have " + count + " seconds remaining.</p>";
        timeGauge.style.width = count * gaugeUnit + "px";
        count--
    }
    else {
        counter.innerHTML = "<p> Time is up!</>";
        // Change the progress color to red.
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        }
        else {
            // End the quiz and give the user a score.
            clearInterval(TIMER);
            scoreRender();
            resetBtn();
            storeScores();
        }
    }
}

// Verify the answer.
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        // The answer is correct.
        score++;
        // Change the progress color to green.
        answerIsCorrect();
    }
    else {
        // The answer is incorrect.
        // Change the progress color to red.
        // Take off 10 seconds for an incorrect answer.
        count = count - 10;
        answerIsWrong();
    }
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    }
    else {
        // Show the score once the quiz has ended.
        clearInterval(TIMER);
        scoreRender();
        // Needs completeing!!!!
        resetBtn();
        storeScores();
    }
}

function resetBtn() {
        
        timer.style.display = "none";
        question.style.display = "none";
        choiceBtns.style.display = "none";
        head2.innerHTML = "Would you like to take the quiz again?";
        head2.setAttribute("id", "head2")
        quizHd.appendChild(head2);
        reset.innerHTML = "Reset!";
        reset.setAttribute("id", "reset");
        reset.setAttribute("type", "reset");
        reset.classList.add("btn");
        quizFt.appendChild(reset);

        reset.addEventListener("click", function(e) {
            location.reload();
        }, false);
}

/*function storeScores(event) {
    
    event.preventDefault();
    $("#highScores").hide();

    var userInitials = $
}*/

// The answer is correct.
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "mediumseagreen";
}

// The answer is wrong.
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red";
}

// Display the score.
function scoreRender() {
    scoreDiv.style.display = "block";
    
    // Calculate score based on number of correct answers.
    var scorePerCent = Math.round(100 * score/questions.length);

    if (scorePerCent >= 90) {   
        scoreDiv.innerHTML += "<p>"+ scorePerCent +"% = A</p>";
    }
    else if (scorePerCent >= 80) {
        scoreDiv.innerHTML += "<p>"+ scorePerCent +"% = B</p>";
    }
    else if (scorePerCent >= 70) {
        scoreDiv.innerHTML += "<p>"+ scorePerCent +"% = C</p>";
    }
    else if (scorePerCent >= 60) {
        scoreDiv.innerHTML += "<p>"+ scorePerCent +"% = D</p>";
    }
    else if (scorePerCent < 60) {
        scoreDiv.innerHTML += "<p>"+ scorePerCent +"% = F</p>";
    }
    
}


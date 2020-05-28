// Create and assign variables.
let start = document.getElementById("start"),
    onStart = document.getElementById("on-start"),
    quiz = document.getElementById("quiz"),
    quizHd = document.getElementById("quiz-hd"),
    question = document.getElementById("question"),
    choiceBtns = document.getElementById("choice-btns"),
    choiceA = document.getElementById("A"),
    choiceB = document.getElementById("B"),
    choiceC = document.getElementById("C"),
    choiceD = document.getElementById("D"),
    choiceE = document.getElementById("E"),
    counter = document.getElementById("counter"),
    timeGauge = document.getElementById("time-gauge"),
    progress = document.getElementById("progress"),
    scoreDiv = document.getElementById("score-container"),
    allScores = JSON.parse(localStorage.getItem("scores")) || [],
    highScoresDef = [],
    nameScore = document.getElementById("name-score"),
    modal = document.getElementById("score-modal"),
    hsBtn = document.getElementById("high-scores-btn"),
    quizFt = document.getElementById("quiz-ft"),
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

let lastQuestion = questions.length - 1,
    runningQuestion = 0,
    count = 60,
    questionTime = 15,
    gaugeWidth = 37, 
    gaugeUnit = gaugeWidth / questionTime,
    TIMER,
    score = 0;

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

// The answer is correct.
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "mediumseagreen";
}

// The answer is wrong.
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "red";
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
        resetBtn();
    }
}

// Reset the quiz to retake.
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
    
    setTimeout(function() {
        var userInitials = prompt("What are your first and last initials?"),
            userScore = Math.round(100 * score/questions.length) + "%";
            
            allScores.push({name: userInitials, score: userScore});
    }, 250);
        
    reset.addEventListener("click", function(e) {
        location.reload(false);
    }, false);
}

function compareScore(a,b) {
    if (a.score > b.score) {
        result = -1;
    }
    else if (b.score > a.score) {
        result = 1;
    }
    else {
        result = 0;
    }
    return result;
}

function setScores() {
    allScores.sort(compareScore);
    if (allScores.length > 10) {
        allScores.pop();
    }
    
    localStorage.setItem("scores", JSON.stringify(allScores));
    nameScore.innerHTML = "";
    for (var value of allScores) {
        var li = document.createElement("li");
        li.textContent = value.name + ": " + value.score;
        nameScore.appendChild(li);
    }
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

hsBtn.onclick = function() {
    modal.style.display = "block";
    setScores();
} 
    
window.onclick = function(event) { 
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

// 1. Connect HTML elements
const startBtn = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const questionNumber = document.getElementById("question-number");


// 2. Quiz variables
let questions = [];
let currentQuestion = 0;
let score = 0;


// 3. Start button
startBtn.addEventListener("click", startQuiz);


// 4. Get live questions from API
async function startQuiz() {
    try {
        const response = await fetch(
            "https://opentdb.com/api.php?amount=10&type=multiple"
        );

        const data = await response.json();

        questions = data.results;

        currentQuestion = 0;
        score = 0;

        startBtn.classList.add("hidden");
        scoreElement.textContent = "Score: 0";

        showQuestion();

    } catch (error) {
        questionElement.textContent = "Something went wrong. Try again!";
        console.log(error);
    }
}


// 5. Show current question
function showQuestion() {

    const currentQuestionData = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    questionElement.innerHTML = currentQuestionData.question;

    answersElement.innerHTML = "";

    nextBtn.classList.add("hidden");


    // 6. Create answer buttons
    const allAnswers = [
        currentQuestionData.correct_answer,
        ...currentQuestionData.incorrect_answers
    ];

    allAnswers.sort(() => Math.random() - 0.5);


    allAnswers.forEach(answer => {

        const button = document.createElement("button");

        button.classList.add("answer-btn");

        button.innerHTML = answer;

        button.addEventListener("click", () => {
            checkAnswer(answer, currentQuestionData.correct_answer);
        });

        answersElement.appendChild(button);
    });
}


// 7. Check answer
function checkAnswer(selectedAnswer, correctAnswer) {

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.innerHTML === correctAnswer) {
            button.classList.add("correct");
        }

        if (button.innerHTML === selectedAnswer && selectedAnswer !== correctAnswer) {
            button.classList.add("wrong");
        }
    });


    if (selectedAnswer === correctAnswer) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }

    nextBtn.classList.remove("hidden");
}


// 8. Next question
nextBtn.addEventListener("click", nextQuestion);


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

n        showQuestion();

n    } else {

n        showFinalScore();
    }
}


// 9. Final score
function showFinalScore() {

n    questionElement.textContent = "🎉 Quiz Complete!";

n    questionNumber.textContent = "Finished!";

    answersElement.innerHTML = "";

    nextBtn.classList.add("hidden");

n    scoreElement.textContent =
        `Final Score: ${score} / ${questions.length}`;

n    startBtn.textContent = "Play Again";

n    startBtn.classList.remove("hidden");
}
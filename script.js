const questions = [
    {
        question: 'Which is not programming language?',
        answers: [
            { text: 'Javascript', correct: false},
            { text: 'HTML', correct: true},
            { text: 'Python', correct: false},
            { text: 'Java', correct: false},
        ]
    },
    {
        question: 'Which programming language we are using create mobile apps?',
        answers: [
            { text: 'Javascript', correct: false},
            { text: 'C#', correct: false},
            { text: 'Python', correct: false},
            { text: 'Java', correct: true},
        ]
    },
    {
        question: 'Who is founder of Apple Company?',
        answers: [
            { text: 'Stiv Jobs', correct: true},
            { text: 'Bill Gates', correct: false},
            { text: 'Elon Musk', correct: false},
            { text: 'Pavel Durov', correct: false},
        ]
    },
    {
        question: 'What is the ChatGPT?',
        answers: [
            { text: 'Programming language', correct: false},
            { text: 'Mobile App', correct: false},
            { text: 'AI', correct: true},
            { text: 'Website', correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML  = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
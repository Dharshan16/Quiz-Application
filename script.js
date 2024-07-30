// Creating array for passing questions and choices


const questions = [
    {
        question: "Who is credited with the invention of REST?",
        answers: [
            {
                text: "Roy Fielding",
                correct: true,
            },
            {
                text: "Kohsuke Kawaguchi",
                correct: false,
            },
            {
                text: "James Gosling",
                correct: false,
            },
            {
                text: "Linus Torvalds",
                correct: false,
            },
        ],
    },
    {
        question: "Which of the following is not an HTTP method?",
        answers: [
            {
                text: "POST",
                correct: false,
            },
            {
                text: "PUT",
                correct: false,
            },
            {
                text: "OPTION",
                correct: false,
            },
            {
                text: "CREATE",
                correct: true,
            },
        ],
    },
    {
        question: "Which of the following best describes REST?",
        answers: [
            {
                text: "REST is a web service standard",
                correct: false,
            },
            {
                text: "A constructor function has a prototype property, while a regular function does not.",
                correct: false,
            },
            {
                text: "REST is an architectural style",
                correct: true,
            },
            {
                text: "REST is a cloud-native API framework",
                correct: false,
            },
        ],
    },
    {
        question: "The insistence that RESTful APIs have URLs that identify resources in a consistent and predictable manner is known as:",
        answers: [
            {
                text: "The RESTful naming convention",
                correct: false,
            },
            {
                text: "The uniform interface constraint",
                correct: true,
            },
            {
                text: "The RESTful consistency constraint",
                correct: false,
            },
            {
                text: "The RESTful pattern matching convention",
                correct: false,
            },
        ],
    },
    {
        question: "How would you configure a RESTful URL parameter that supports a search for a book based on its ID",
        answers: [
            {
                text: "GET /books/{id}",
                correct: true,
            },
            {
                text: "GET /{id}/books/",
                correct: false,
            },
            {
                text: "GET /book?id={id}",
                correct: false,
            },
            {
                text: "GET /books?id={id}",
                correct: false,
            },
        ],
    },
    {
        question: "Which option is not a RESTful API constraint?",
        answers: [
            {
                text: "Code on demand",
                correct: false,
            },
            {
                text: "The use of a client-server model",
                correct: false,
            },
            {
                text: "Service orchestration",
                correct: true,
            },
            {
                text: "A stateless request-response cycle",
                correct: false,
            },
        ],
    },
    {
        question: "The ability to invoke a RESTful method multiple times without changing the state of the server on subsequent invocations is known as:",
        answers: [
            {
                text: "Immutability",
                correct: false,
            },
            {
                text: "Idempotence",
                correct: true,
            },
            {
                text: "Statefulness",
                correct: false,
            },
            {
                text: "Uniformity",
                correct: false,
            },
        ],
    },
    {
        question: "What must be enabled in order for a RESTful web service to receive invocations from different domains, subdomains or ports?",
        answers: [
            {
                text: "SSL",
                correct: false,
            },
            {
                text: "Headers",
                correct: false,
            },
            {
                text: "Cache control",
                correct: false,
            },
            {
                text: "CORS",
                correct: true,
            },
        ],
    },
    {
        question: "Which header should be configured to tell the server XML is preferred over JSON?",
        answers: [
            {
                text: "Accept",
                correct: true,
            },
            {
                text: "Content-Type",
                correct: false,
            },
            {
                text: "User-Agent",
                correct: false,
            },
            {
                text: "GET",
                correct: false,
            },
        ],
    },
    {
        question: "Which year was the dissertation that described how to build RESTful APIs delivered",
        answers: [
            {
                text: "2000",
                correct: true,
            },
            {
                text: "1990",
                correct: false,
            },
            {
                text: "2010",
                correct: false,
            },
            {
                text: "2020",
                correct: false,
            },
        ],
    },
];


// const welcomeScreen = document.getElementById("welcome-scrn");
// const startButton = document.getElementById("startbtn");
// const quizScreen = document.getElementById("quiz-scrn");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timer =document.getElementById("timer");


let currentQuestionIndex = 0;
let score = 0;
let timerId;
let timeLeft;
const seconds = 10;

//startQuiz
function startQuiz() {
    // welcomeScreen.style.display ='none';
    // quizScreen.style.display ='block';
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//display Questions, choices

function showQuestion() {
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
    startTimer(); //starts timer for every ques
}

//Resetting to next ques after 10s
function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

    clearInterval(timerId); //clears existing timer 
    timer.textContent= " "; 
}

//Evaluating Selected Answer

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        // console.log("answerCorrect")
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        // console.log("answerIncorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    clearInterval(timerId); //stops when option is selected
}


//Next Button function

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
        //console.log("next button worrking");
    }else{
        showScore();
    }
}

//Timer function

function startTimer() {
    timeLeft = seconds;
    timer.textContent = `${timeLeft}s`;
    
    //setInterval function
    timerId = setInterval(() => {
        timeLeft--;
        timer.textContent =`${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timerId);
            // selectAnswer(null); //select answer if not selected
            displayCorrectAnswer(); //to display the correct answer

            setTimeout(handleNextButton, 3000); //displays correct answer for 3secs and moved on to next ques
        }
    }, 1000);
}


//Function to display correct answer for 3 secs
function displayCorrectAnswer() {
    const buttons = Array.from(answerButtons.children);
    buttons.forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add("correct");

            //console.log("the correct answer displaying works")
        }
        button.disabled = true;
    });
    nextButton.style.display ='block';
}

//Display Score and play again

function showScore(){
    resetState();
    questionElement.innerHTML = `Congratulations! You have Successfully completed this Quiz and You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

//Next button click event

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
});

startQuiz();
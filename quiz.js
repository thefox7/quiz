let currentQuestionIndex = 0; // Индекс текущего вопроса
let score = 0; // Баллы

// Функция для случайного перемешивания ответов
function shuffleAnswers(answers) {
    return [...answers].sort(() => Math.random() - 0.5);
}

// Функция для отображения текущего вопроса
function displayQuestion(question) {
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const nextButton = document.getElementById('next-button');
    const questionNumber = document.getElementById('question-number');

    questionNumber.innerHTML = `${currentQuestionIndex + 1} из ${selectedQuestions.length}`;
    questionText.innerHTML = `${question.question}`;
    answersContainer.innerHTML = '';

    const shuffledAnswers = shuffleAnswers(Object.entries(question.answers));

    shuffledAnswers.forEach(([key, value]) => {
        const answerContainer = document.createElement('div');
        answerContainer.classList.add('answer-container');
        answerContainer.dataset.answer = key;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('answer-checkbox');

        const label = document.createElement('label');
        label.textContent = value;
        
        answerContainer.appendChild(checkbox);
        answerContainer.appendChild(label);
        answersContainer.appendChild(answerContainer);
    });

    nextButton.style.display = 'none';

    const answerContainers = answersContainer.querySelectorAll('.answer-container');
    answerContainers.forEach(container => {
        container.addEventListener('click', function() {
            checkAnswer(question, container);
            lockAnswers();
            nextButton.style.display = 'block';
        });
    });
}

function checkAnswer(question, selectedContainer) {
    const answersContainer = document.getElementById('answers-container');
    const selectedAnswer = selectedContainer.dataset.answer;
    const isCorrect = selectedAnswer === question.correctAnswer;

    const answerContainers = answersContainer.querySelectorAll('.answer-container');
    answerContainers.forEach(container => {
        const checkbox = container.querySelector('.answer-checkbox');
        const label = container.querySelector('label');
        const isAnswerCorrect = container.dataset.answer === question.correctAnswer;
        const isSelectedAnswer = container === selectedContainer;

        checkbox.checked = isSelectedAnswer;

        if (isSelectedAnswer) {
            if (isAnswerCorrect) {
                container.style.backgroundColor = 'green';
                label.style.color = 'white';
            } else {
                container.style.backgroundColor = 'red';
                label.style.color = 'white';
            }
        } else {
            if (isAnswerCorrect) {
                container.style.backgroundColor = 'green';
                label.style.color = 'white';
            }
        }
    });

    if (isCorrect) {
        score++;
    }
}

function nextQuestion() {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(selectedQuestions[currentQuestionIndex]);
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById('score').style.display = 'block';
    document.getElementById('score').innerHTML = `Ваш балл: ${score} из ${selectedQuestions.length}`;
    document.getElementById('result-message').innerHTML = score < selectedQuestions.length / 2 ? 'Тест провален' : 'Ай харош';
    document.getElementById('restart-button-container').style.display = 'block';
}

function restartTest() {
    score = 0;
    currentQuestionIndex = 0;
    selectedQuestions = [...myQuestions].sort(() => 0.5 - Math.random()); // Все вопросы, перемешанные
    displayQuestion(selectedQuestions[currentQuestionIndex]);
    document.getElementById('score').style.display = 'none';
    document.getElementById('result-message').innerHTML = '';
    document.getElementById('restart-button-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'block';
}

function lockAnswers() {
    document.querySelectorAll('.answer-container').forEach(container => {
        container.style.pointerEvents = 'none';
    });
}

document.getElementById('next-button').addEventListener('click', nextQuestion);
document.getElementById('restart-button').addEventListener('click', restartTest);

// Загружаем все вопросы и перемешиваем
let selectedQuestions = [...myQuestions].sort(() => 0.5 - Math.random());

document.addEventListener('DOMContentLoaded', function() {
    displayQuestion(selectedQuestions[currentQuestionIndex]);
});

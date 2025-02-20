let currentQuestionIndex = 0; // Индекс текущего вопроса
let score = 0; // Баллы

// Функция для случайного выбора 50 вопросов из 100
function getRandomQuestions(questions, numQuestions) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
}

// Функция для случайного перемешивания ответов
function shuffleAnswers(answers) {
    const shuffledAnswers = [...answers];
    for (let i = shuffledAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]]; // Перемешиваем элементы
    }
    return shuffledAnswers;
}

// Функция для отображения текущего вопроса
function displayQuestion(question) {
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const nextButton = document.getElementById('next-button');
    const questionNumber = document.getElementById('question-number');

    // Обновляем счетчик вопросов
    questionNumber.innerHTML = `${currentQuestionIndex + 1} из 50`;

    questionText.innerHTML = `${question.question}`;
    answersContainer.innerHTML = ''; // Очистить предыдущие ответы

    const shuffledAnswers = shuffleAnswers(Object.entries(question.answers)); // Перемешиваем ответы

    // Отображаем ответы в контейнерах
    shuffledAnswers.forEach(([key, value]) => {
        const answerContainer = document.createElement('div');
        answerContainer.classList.add('answer-container');
        answerContainer.dataset.answer = key;
        answerContainer.innerHTML = `
            <label>${value}</label>
        `;
        answersContainer.appendChild(answerContainer);
    });

    nextButton.style.display = 'none'; // Скрыть кнопку "Следующий вопрос" до ответа

    // Добавляем обработчик кликов по каждому ответу
    const answerContainers = answersContainer.querySelectorAll('.answer-container');
    answerContainers.forEach(container => {
        container.addEventListener('click', function() {
            checkAnswer(question, container); // Проверка выбранного ответа
            lockAnswers(); // Блокируем все ответы
            nextButton.style.display = 'block'; // Показать кнопку после выбора ответа
        });
    });
}

// Функция для проверки ответа
function checkAnswer(question, selectedContainer) {
    const answersContainer = document.getElementById('answers-container');
    const selectedAnswer = selectedContainer.dataset.answer;
    const isCorrect = selectedAnswer === question.correctAnswer;

    // Обработка правильных и неправильных ответов
    const answerContainers = answersContainer.querySelectorAll('.answer-container');
    answerContainers.forEach(container => {
        const label = container.querySelector('label');
        const isAnswerCorrect = container.dataset.answer === question.correctAnswer;
        const isSelectedAnswer = container === selectedContainer;

        // Меняем цвет контейнера и текста
        if (isSelectedAnswer) {
            if (isAnswerCorrect) {
                container.style.backgroundColor = 'green';
                label.style.color = 'white';
                label.innerHTML += ' <span style="color: white;">✔</span>'; // Галочка для правильного ответа
            } else {
                container.style.backgroundColor = 'red';
                label.style.color = 'white';
                label.innerHTML += ' <span style="color: white;">✘</span>'; // Крестик для неправильного ответа
            }
        } else {
            if (isAnswerCorrect) {
                container.style.backgroundColor = 'green';
                label.style.color = 'white';
                label.innerHTML += ' <span style="color: white;">✔</span>'; // Галочка для правильного ответа
            }
        }
    });

    if (isCorrect) {
        score++;
    }
}

// Функция для перехода к следующему вопросу
function nextQuestion() {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(selectedQuestions[currentQuestionIndex]);
    } else {
        showFinalScore();
    }
}

// Функция для отображения итогового результата
function showFinalScore() {
    const scoreContainer = document.getElementById('score');
    const resultMessage = document.getElementById('result-message');
    const restartButtonContainer = document.getElementById('restart-button-container');
    
    scoreContainer.style.display = 'block';
    scoreContainer.innerHTML = `Ваш балл: ${score} из ${selectedQuestions.length}`;
    
    // Отображаем сообщение в зависимости от набранных баллов
    if (score < 25) {
        resultMessage.innerHTML = 'Тест провален';
    } else {
        resultMessage.innerHTML = 'Ай харош';
    }

    // Показать кнопку "Заново"
    restartButtonContainer.style.display = 'block';
}

// Функция для перезапуска теста
function restartTest() {
    score = 0;
    currentQuestionIndex = 0;
    selectedQuestions = getRandomQuestions(myQuestions, 50);
    displayQuestion(selectedQuestions[currentQuestionIndex]);

    // Скрыть результат и кнопку "Заново"
    document.getElementById('score').style.display = 'none';
    document.getElementById('result-message').innerHTML = '';
    document.getElementById('restart-button-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'block';
}

document.getElementById('next-button').addEventListener('click', nextQuestion);

// Загружаем вопросы и начинаем тест
let selectedQuestions = getRandomQuestions(myQuestions, 50);
displayQuestion(selectedQuestions[currentQuestionIndex]);

// Обработчик для кнопки "Заново"
document.getElementById('restart-button').addEventListener('click', restartTest);

// Функция для блокировки всех ответов после выбора
function lockAnswers() {
    const answerContainers = document.querySelectorAll('.answer-container');
    answerContainers.forEach(container => {
        container.style.pointerEvents = 'none'; // Блокировка кликов
    });
}

// Запускаем тест с первым вопросом и блокируем ответы
document.addEventListener('DOMContentLoaded', function() {
    displayQuestion(selectedQuestions[currentQuestionIndex]);
});

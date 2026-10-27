/* ==========================================
   1. DATOS DEL JUEGO
========================================== */

const Characters = [
    {
        name: "Mickey Mouse",
        imageUrl: "https://static.wikia.nocookie.net/disney/images/2/2e/Disney_Mickey_Mouse.png"
    },
    {
        name: "Baloo",
        imageUrl: "https://static.wikia.nocookie.net/disney/images/3/31/Profile_-_Baloo.jpeg"
    },
    {
        name: "Capitán Amelia",
        imageUrl: "https://static.wikia.nocookie.net/disney/images/0/0c/Profile_-_Captain_Amelia.png"
    },
    {
        name: "Aquiles",
        imageUrl: "https://static.wikia.nocookie.net/disney/images/6/67/HATS_Achilles.png"
    },
    {
        name: "Reina Atenea",
        imageUrl: "https://static.wikia.nocookie.net/disney/images/4/41/Athena_TLM.jpg"
    }
];


/* ==========================================
   2. GENERACIÓN DE PREGUNTAS Y RESPUESTAS
========================================== */

// Seleccionar un personaje aleatorio.
function randomCharacter(charactersList) {
    let character = charactersList[Math.floor(Math.random() * charactersList.length)];

    return character;
}


// Seleccionar una categoría disponible del personaje.
function randomCategory(chosenCharacter) {
    let questionCategorys = Object.keys(chosenCharacter);

    questionCategorys.splice(questionCategorys.indexOf("imageUrl"), 1);

    let availableCategorys = questionCategorys.filter(
        Category => chosenCharacter[Category].length > 0
    );

    let Category = availableCategorys[Math.floor(Math.random() * availableCategorys.length)];

    return Category;
}


// Generar el enunciado de la pregunta.
function generateQuestion(chosenCategory) {
    const questions = {
        name: "¿Cómo se llama este personaje?",
        films: "¿En qué película aparece este personaje?",
        videoGames: "¿En qué videojuego aparece este personaje?"
    };

    let question = questions[chosenCategory];

    return question;
}


// Seleccionar una respuesta correcta.
function getCorrectAnswer(chosenCharacter, chosenCategory) {
    let possibleCorrectAnswers = chosenCharacter[chosenCategory];

    // Convertir el valor en array si todavía no lo es.
    if (Array.isArray(possibleCorrectAnswers) === false) {
        possibleCorrectAnswers = [possibleCorrectAnswers];
    }

    let correctAnswer = possibleCorrectAnswers[
        Math.floor(Math.random() * possibleCorrectAnswers.length)
    ];

    return correctAnswer;
}


// Obtener hasta tres respuestas incorrectas diferentes.
function getWrongAnswers(chosenCharacter, chosenCategory) {
    const wrongAnswersAmount = 3;

    let possibleWrongAnswers = [];
    let wrongAnswers = [];

    let possibleCorrectAnswers = chosenCharacter[chosenCategory];

    if (Array.isArray(possibleCorrectAnswers) === false) {
        possibleCorrectAnswers = [possibleCorrectAnswers];
    }

    // Reunir las respuestas de todos los personajes.
    for (let i = 0; i < Characters.length; i++) {
        possibleWrongAnswers.push(Characters[i][chosenCategory]);
    }

    possibleWrongAnswers = possibleWrongAnswers.flat();

    // Descartar las respuestas válidas del personaje elegido.
    for (let a = 0; a < possibleWrongAnswers.length; a++) {
        if (possibleCorrectAnswers.includes(possibleWrongAnswers[a])) {
            possibleWrongAnswers.splice(a, 1);
            a--;
        }
    }

    // Eliminar respuestas duplicadas.
    let availableWrongAnswers = possibleWrongAnswers.slice();
    availableWrongAnswers = [...new Set(availableWrongAnswers)];

    // Elegir hasta tres respuestas incorrectas.
    if (availableWrongAnswers.length <= wrongAnswersAmount) {
        for (let b = 0; b < availableWrongAnswers.length; b++) {
            wrongAnswers.push(availableWrongAnswers[b]);
        }
    } else {
        for (let b = 0; b < wrongAnswersAmount; b++) {
            let randomWrongAnswer = availableWrongAnswers[
                Math.floor(Math.random() * availableWrongAnswers.length)
            ];

            wrongAnswers.push(randomWrongAnswer);

            availableWrongAnswers.splice(
                availableWrongAnswers.indexOf(randomWrongAnswer), 1
            );
        }
    }

    return wrongAnswers;
}


// Unir y mezclar las respuestas.
function shuffleAnswers(chosenCorrectAnswer, chosenWrongAnswers) {
    let answers = [];

    answers.push(chosenCorrectAnswer);
    answers.push(...chosenWrongAnswers);

    for (let c = 0; c < answers.length; c++) {
        let randomIndex = Math.floor(Math.random() * answers.length);
        let positionChange = answers[c];

        answers[c] = answers[randomIndex];
        answers[randomIndex] = positionChange;
    }

    return answers;
}


// Construir el objeto con todos los datos de una ronda.
function generateRound(charactersList) {
    let chosenCharacter = randomCharacter(charactersList);
    let chosenCategory = randomCategory(chosenCharacter);
    let chosenQuestion = generateQuestion(chosenCategory);

    let chosenCorrectAnswer = getCorrectAnswer(chosenCharacter, chosenCategory);
    let chosenWrongAnswers = getWrongAnswers(chosenCharacter, chosenCategory);

    let finalAnswers = shuffleAnswers(chosenCorrectAnswer, chosenWrongAnswers);

    let gameRound = {
        character: chosenCharacter,
        question: chosenQuestion,
        correctAnswer: chosenCorrectAnswer,
        options: finalAnswers,
        answerClicked: false
    };

    return gameRound;
}


/* ==========================================
   3. INTERFAZ: MOSTRAR INFORMACIÓN
========================================== */

// Mostrar la pregunta.
function showQuestion(round) {
    let questionElement = document.getElementById("question");

    questionElement.textContent = round.question;
}


// Mostrar la imagen del personaje.
function showCharacter(round) {
    let imageElement = document.getElementById("characterImage");

    imageElement.src = round.character.imageUrl;
    imageElement.alt = round.character.name;
}


// Crear y mostrar los botones de respuesta.
function showOptions(round, nextRound) {
    let optionsElement = document.getElementById("answerOptions");

    optionsElement.textContent = "";

    let answers = round.options;

    for (let i = 0; i < answers.length; i++) {
        let answerButton = document.createElement("button");

        answerButton.textContent = answers[i];

        answerButton.addEventListener("click", function () {
            handleAnswer(answers[i], round);
        });

        optionsElement.appendChild(answerButton);
    }
}


// Mostrar si el jugador ha acertado o fallado.
function showResult(isCorrect, correctAnswer) {
    let resultMessage = document.getElementById("resultMessage");

    if (isCorrect === true) {
        resultMessage.textContent = "¡Respuesta correcta!";
    } else {
        resultMessage.textContent =
            "Oooh... :(" + "\n" + "La respuesta correcta era " +
            correctAnswer.toUpperCase() + ".";
    }
}


function showScore() {
    let score = document.getElementById("score");
    score.textContent = game.score.rightAnswered + " / " + game.score.totalAnswered;
}

function showGameOver() {

}
/* ==========================================
   4. LÓGICA DE RESPUESTAS
========================================== */

// Comprobar la respuesta seleccionada.
function checkAnswer(selectedAnswer, correctAnswer) {
    let isCorrect;

    if (selectedAnswer === correctAnswer) {
        isCorrect = true;
    } else {
        isCorrect = false;
    }

    return isCorrect;
}


// Coordinar la comprobación y el resultado.
function handleAnswer(selectedAnswer, round) {

    if (round.answerClicked === false) {
        round.answerClicked = true;
        game.score.totalAnswered++;


        let correctAnswer = round.correctAnswer;
        let isCorrect = checkAnswer(selectedAnswer, correctAnswer);

        if (isCorrect === true) {
            game.score.rightAnswered++;
        }

        showScore();
        showResult(isCorrect, correctAnswer);
        setTimeout(newRound, 2000);
    }
}


/* ==========================================
   5. GESTIÓN DE RONDAS Y PARTIDA
========================================== */


// Mostrar una ronda.
function showRound(round) {
    showQuestion(round);
    showCharacter(round);
    showOptions(round);

    //Limpiar el resultado de la ronda anterior
    let resultMessage = document.getElementById("resultMessage");
    resultMessage.textContent = "";

}


// Generar una nueva ronda sin repetir personajes.
function newRound() {
    // Recuperar personajes cuando se agotan.
    if (game.availableCharacters.length === 0) {
        endGame();
        return;
    }

    let round = generateRound(game.availableCharacters);

    // Retirar al personaje que acaba de aparecer.
    game.availableCharacters.splice(
        game.availableCharacters.indexOf(round.character), 1
    );

    showRound(round);
}


// Inicializar una partida.
function startGame() {

    // Preparar los personajes disponibles
    game.availableCharacters = Characters.slice();

    // Reiniciar el marcador
    game.score.rightAnswered = 0;
    game.score.totalAnswered = 0;

    // Mostrar el marcador inicial
    showScore();

    // Comenzar la primera ronda
    newRound();
}


function endGame() {
    sessionStorage.setItem("rightAnswered",game.score.rightAnswered);
    sessionStorage.setItem("totalAnswered",game.score.totalAnswered);
    window.location.href = "./gameResult.html";
}
/* ==========================================
   6. INICIO DEL PROGRAMA
========================================== */


// Establecer datos necesarios que vana recorrer el juego
let game = {
    availableCharacters: [],
    score: {
        rightAnswered: 0,
        totalAnswered: 0
    }
}

startGame();
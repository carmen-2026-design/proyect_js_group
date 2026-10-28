// Recuperar la puntuación guardada
let rightAnswered = sessionStorage.getItem("rightAnswered");
let totalAnswered = sessionStorage.getItem("totalAnswered");

// Mostrar el resultado final
function showFinalScore() {
    let finalScore = document.getElementById("finalScore");
    finalScore.textContent = rightAnswered + " / " + totalAnswered;
}

// Ejecutar al cargar la página
showFinalScore();
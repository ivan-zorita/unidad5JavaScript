document.addEventListener("DOMContentLoaded", function () {
    const preguntas = [
        { enunciado: "¿Cuál es el planeta más grande del sistema solar?", respuestas: ["Tierra", "Marte", "Júpiter", "Venus"], correcta: 2 },
        { enunciado: "¿Cuánto es 5 * 5?", respuestas: ["10", "20", "25", "30"], correcta: 2 },
        { enunciado: "¿En qué año llegó el hombre a la Luna?", respuestas: ["1965", "1969", "1972", "1980"], correcta: 1 },
        { enunciado: "¿Quién pintó la Mona Lisa?", respuestas: ["Van Gogh", "Picasso", "Da Vinci", "Miguel Ángel"], correcta: 2 },
        { enunciado: "¿Cuál es el metal más abundante en la corteza terrestre?", respuestas: ["Hierro", "Aluminio", "Cobre", "Plata"], correcta: 1 }
    ];

    let preguntaActual = 0;
    let respuestasCorrectas = 0;
    let respuestaSeleccionada = null;
    let bloqueado = false;

    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const nextBtn = document.getElementById("next-btn");

    function cargarPregunta() {
        respuestaSeleccionada = null;
        bloqueado = false;
        nextBtn.style.display = "none";
        answersEl.innerHTML = "";

        let pregunta = preguntas[preguntaActual];
        questionEl.textContent = pregunta.enunciado;

        pregunta.respuestas.forEach((respuesta, index) => {
            let btn = document.createElement("button");
            btn.textContent = respuesta;
            btn.classList.add("btn");
            btn.onclick = () => seleccionarRespuesta(index, btn);
            answersEl.appendChild(btn);
        });
    }

    function seleccionarRespuesta(index, btn) {
        if (bloqueado) return;
        bloqueado = true;
        respuestaSeleccionada = index;

        document.querySelectorAll(".btn").forEach(b => b.classList.remove("selected", "correct", "incorrect"));

        if (index === preguntas[preguntaActual].correcta) {
            btn.classList.add("correct");
            respuestasCorrectas++;
        } else {
            btn.classList.add("incorrect");
        }

        nextBtn.style.display = "block";
    }

    nextBtn.addEventListener("click", () => {
        preguntaActual++;

        if (preguntaActual < preguntas.length) {
            cargarPregunta();
        } else {
            mostrarResultado();
        }
    });

    function mostrarResultado() {
        questionEl.textContent = `¡Quiz terminado! Respuestas correctas: ${respuestasCorrectas} de ${preguntas.length}`;
        answersEl.innerHTML = "";
        nextBtn.style.display = "none";
    }

    cargarPregunta();
});
document.addEventListener("DOMContentLoaded", function () {
    const preguntas = [
        { enunciado: "¿Quien fue el primer presidente de esta, nuestra comunidad?", respuestas: ["Juan Cuesta", "Don Bartolomé Mendez Zuloaga", "Marisa Benito", "Doña Carmen Desengaño Sierra"], correcta: 1 },
        { enunciado: "¿Cual era el nombre pugilistico de Roberto?", respuestas: ["La Mosca de arabia", "el Leon de Montepinar", "El Puma de Cancun", "Robert Patinson "], correcta: 2 },
        { enunciado: "¿Siguiendo con Roberto.. cual era su famosa muletilla?", respuestas: ["Hombre, pues ya que estamos..", "Para hacer por hacer es mejor deshacer", "Vamos no me jodas", "Venga coño"], correcta: 2 },
        { enunciado: "Hablando de muletillas... ¿recuerdas cual era la famosa frase de Emilio?", respuestas: ["Un poquito de por favor", "Que pasa niño", "Que te enchufo con la vaporeta", "No me pises lo fregao"], correcta: 0 },
        { enunciado: "El amor es libre, y mas en esta comunidad,¿pero donde era donde mas se practicaba?", respuestas: ["En la porteria", "En el videoclub", "En casa de las supernenas", "En el cuarto de contadores"], correcta: 3 },
        { enunciado: "¿Quien era el chechu?", respuestas: ["Un amigo del barrio de Josemi", "El nieto de Concha", "El hijo adoptivo de Mauri y Fernando", "El primo de Josemi"], correcta: 2 },
        { enunciado: "Pero vamos a ver ignorante de la vida...¿Sabrias decir de quien era?", respuestas: ["Bea", "Belen", "Mariano", "Carlos "], correcta: 2 },
        { enunciado: "Que mona va esta chica siempre.¿Que chica iba mona siempre?", respuestas: ["Marisa ", "Ana ", "Alicia", "Lucia"], correcta: 3 },
        { enunciado: "¿Te sabes el eslogan? Deportes Guerra...", respuestas: ["Gimnasio, Casa y Tierra", "Para correr o sacar a la perra", "Playa, Campo y Sierra", "Equipese, y evite una tragedia"], correcta: 2 },
        { enunciado: "Cuando el coche de Mariano no arranca para perseguir a Juan y tienen que tomar las uvas en el coche,¿quienes estan dentro?", respuestas: ["Mariano y Roberto", "Mariano, Concha y Belen", "Mariano, Andres Guerra, Isabel y pablo", "Mariano, Paloma, Vicenta y Marisa"], correcta: 3 }
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
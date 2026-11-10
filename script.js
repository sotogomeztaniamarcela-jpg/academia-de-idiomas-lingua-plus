
/* ==========================================
   LINGUAPLUS - ACADEMIA DE IDIOMAS
   TEST, ACORDEÓN, FORMULARIO Y MENÚ
========================================== */

// ==========================================
// 1. TEST DE NIVEL
// ==========================================

const preguntas = [
    {
        pregunta: "1. What is your name?",
        opciones: ["My name is Ana", "I am fine", "I am 20 years"],
        correcta: 0
    },
    {
        pregunta: "2. She _____ a student.",
        opciones: ["are", "is", "am"],
        correcta: 1
    },
    {
        pregunta: "3. What is the past of 'go'?",
        opciones: ["Goed", "Going", "Went"],
        correcta: 2
    },
    {
        pregunta: "4. I _____ English every day.",
        opciones: ["study", "studies", "studied"],
        correcta: 0
    },
    {
        pregunta: "5. Choose the correct sentence:",
        opciones: [
            "He don't like coffee",
            "He doesn't like coffee",
            "He not likes coffee"
        ],
        correcta: 1
    },
    {
        pregunta: "6. If I _____ rich, I would travel the world.",
        opciones: ["am", "was", "were"],
        correcta: 2
    },
    {
        pregunta: "7. She has lived here _____ 2018.",
        opciones: ["since", "for", "during"],
        correcta: 0
    },
    {
        pregunta: "8. What does 'although' mean?",
        opciones: ["Porque", "Aunque", "Entonces"],
        correcta: 1
    },
    {
        pregunta: "9. By the time we arrived, the film _____.",
        opciones: ["started", "has started", "had started"],
        correcta: 2
    },
    {
        pregunta: "10. Choose the correct sentence:",
        opciones: [
            "If I had known, I would have helped",
            "If I knew, I will helped",
            "If I have known, I would help"
        ],
        correcta: 0
    }
];

let preguntaActual = 0;
let puntuacion = 0;
let respuestaSeleccionada = null;

const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("nextQuestion");
const questionCounter = document.getElementById("questionCounter");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const quizContent = document.getElementById("quizContent");
const quizResult = document.getElementById("quizResult");

// Mostrar pregunta

function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];

    questionText.textContent = pregunta.pregunta;
    answersContainer.innerHTML = "";

    respuestaSeleccionada = null;
    nextButton.disabled = true;

    questionCounter.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    const progreso =
        ((preguntaActual + 1) / preguntas.length) * 100;

    progressPercent.textContent = `${Math.round(progreso)}%`;
    progressFill.style.width = `${progreso}%`;

    pregunta.opciones.forEach(function(opcion, index) {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "answer-option";
        boton.textContent = opcion;

        boton.addEventListener("click", function() {
            seleccionarRespuesta(index);
        });

        answersContainer.appendChild(boton);
    });
}

// Seleccionar respuesta

function seleccionarRespuesta(index) {
    respuestaSeleccionada = index;

    const botones = document.querySelectorAll(".answer-option");

    botones.forEach(function(boton, posicion) {
        boton.classList.toggle("selected", posicion === index);
    });

    nextButton.disabled = false;
}

// Siguiente pregunta

nextButton.addEventListener("click", function() {
    if (respuestaSeleccionada === null) {
        return;
    }

    if (respuestaSeleccionada === preguntas[preguntaActual].correcta) {
        puntuacion++;
    }

    preguntaActual++;

    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultado();
    }
});

// Mostrar resultado

function mostrarResultado() {
    quizContent.classList.add("hidden");
    quizResult.classList.remove("hidden");

    document.getElementById("scoreText").textContent =
        `${puntuacion} / ${preguntas.length}`;

    const levelText = document.getElementById("levelText");
    const resultMessage = document.getElementById("resultMessage");

    if (puntuacion <= 3) {
        levelText.textContent = "Nivel básico 🌱";
        resultMessage.textContent =
            "¡Excelente comienzo! Te recomendamos iniciar con nuestro curso básico para construir una base sólida.";
    } else if (puntuacion <= 7) {
        levelText.textContent = "Nivel intermedio 🚀";
        resultMessage.textContent =
            "¡Vas por buen camino! Nuestro curso intermedio te ayudará a mejorar tu comunicación y confianza.";
    } else {
        levelText.textContent = "Nivel avanzado 🎓";
        resultMessage.textContent =
            "¡Excelente dominio! Te recomendamos nuestro programa avanzado para perfeccionar tus habilidades.";
    }

    progressFill.style.width = "100%";
    progressPercent.textContent = "100%";
}

// Reiniciar test

document.getElementById("restartQuiz").addEventListener("click", function() {
    preguntaActual = 0;
    puntuacion = 0;
    respuestaSeleccionada = null;

    quizContent.classList.remove("hidden");
    quizResult.classList.add("hidden");

    mostrarPregunta();
});

// Iniciar test

mostrarPregunta();


// ==========================================
// 2. ACORDEÓN DE PREGUNTAS FRECUENTES
// ==========================================

const preguntasFaq = document.querySelectorAll(".faq-question");

preguntasFaq.forEach(function(pregunta) {
    pregunta.addEventListener("click", function() {
        const item = pregunta.parentElement;
        const respuesta = item.querySelector(".faq-answer");

        const estabaAbierto = item.classList.contains("active");

        // Cerrar todos los acordeones
        document.querySelectorAll(".faq-item").forEach(function(faq) {
            faq.classList.remove("active");
            faq.querySelector(".faq-answer").style.maxHeight = null;
        });

        // Abrir el seleccionado
        if (!estabaAbierto) {
            item.classList.add("active");
            respuesta.style.maxHeight = respuesta.scrollHeight + "px";
        }
    });
});


// ==========================================
// 3. VALIDACIÓN DEL FORMULARIO
// ==========================================

const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const idioma = document.getElementById("idioma");
    const nivel = document.getElementById("nivel");

    // Expresiones regulares
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,60}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const regexTelefono = /^\+?[0-9\s-]{10,15}$/;

    let errores = [];

    // Limpiar errores anteriores
    document.querySelectorAll(".registration-form input, .registration-form select")
        .forEach(function(campo) {
            campo.classList.remove("invalid");
        });

    if (!regexNombre.test(nombre.value.trim())) {
        errores.push("Escribe un nombre válido.");
        nombre.classList.add("invalid");
    }

    if (!regexCorreo.test(correo.value.trim())) {
        errores.push("Escribe un correo electrónico válido.");
        correo.classList.add("invalid");
    }

    if (!regexTelefono.test(telefono.value.trim())) {
        errores.push("Escribe un teléfono válido de 10 a 15 dígitos.");
        telefono.classList.add("invalid");
    }

    if (idioma.value === "") {
        errores.push("Selecciona un idioma.");
        idioma.classList.add("invalid");
    }

    if (nivel.value === "") {
        errores.push("Selecciona tu nivel.");
        nivel.classList.add("invalid");
    }

    // Mostrar errores
    if (errores.length > 0) {
        formMessage.style.color = "#e74c3c";
        formMessage.innerHTML = errores.join("<br>");
        return;
    }

    // Formulario válido
    formMessage.style.color = "#16a085";
    formMessage.textContent =
        "¡Preinscripción completada correctamente! Gracias por elegir LinguaPlus.";

    registrationForm.reset();

    document.querySelectorAll(".registration-form input, .registration-form select")
        .forEach(function(campo) {
            campo.classList.remove("invalid");
        });
});


// ==========================================
// 4. MENÚ PARA CELULARES
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function() {
    mainNav.classList.toggle("active");
});

// Cerrar menú al seleccionar un enlace

mainNav.querySelectorAll("a").forEach(function(enlace) {
    enlace.addEventListener("click", function() {
        mainNav.classList.remove("active");
    });
});
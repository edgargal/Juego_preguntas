//preguntas

const preguntas = [
    {
        pregunta: "¿Quien es el maximo anotador de la seleccíon argentina?",
        opciones: ["Angel di maria.", "Lionel Messi.", "Sergio Aguero.", "Gabriel Batistuta. "],
        respuesta: "Lionel Messi."
    },

    {
        pregunta: "¿En que año ganó la seleccion argentina su primer mundial?",
        opciones: [" año 2010.", " año 1978.", " año 2002.", " año 1986."],
        respuesta: " año 1978."
    },

    {
        pregunta: "¿De quien es la famosa Mano de dios?",
        opciones: [" Dibu martinez.", " Lionel messi.", " Diego maradona.", " Carlos tevez."],
        respuesta: " Diego maradona."
    },

    {
        pregunta: "¿Donde se jugo el mundial de 2022?",
        opciones: [" Quatar.", " Argentina.", " España.", " Francia."],
        respuesta: " Quatar."
    },

    {
        pregunta: "¿Cuantas Champions League tiene Lionel Messi?",
        opciones: ["1", "4", "6", "2"],
        respuesta: "4"
    },

    {
        pregunta: "¿Cuantas Copa America tiene la seleccion argentina?",
        opciones: ["5", "10", "12", "16"],
        respuesta: "16"
    },

    {
        pregunta: "¿A que jugador de la seleccion se le apoda 'El fideo'? ",
        opciones: ["Rodrigo de paul", "Enzo Fernandez", "Lionel Messi", "Angel di Maria"],
        respuesta: "Angel di Maria"
    }
];


let indiceDePreguntas = 0;
let respuestaDelUsuario = [];


// Función para cargar una pregunta en el HTML
function cargarPregunta() {
    const datosDePregunta = preguntas[indiceDePreguntas];
    document.getElementById('pregunta').textContent = datosDePregunta.pregunta;
    const opciones = document.getElementById('opciones');
    opciones.innerHTML = '';

    datosDePregunta.opciones.forEach(opcion => {
        const boton = document.createElement('button');
        boton.textContent = opcion;
        boton.className = 'opcion';
        boton.onclick = () => seleccionarRespuesta(opcion);
        opciones.appendChild(boton);
    });
}

// Función para seleccionar una respuesta
function seleccionarRespuesta(respuesta) {
    respuestaDelUsuario[indiceDePreguntas] = respuesta;
    document.getElementById('boton-siguiente').disabled = false;
}

// Función para pasar a la siguiente pregunta
function nuevaPregunta() {
    indiceDePreguntas++;
    if (indiceDePreguntas < preguntas.length) {
        cargarPregunta();
        document.getElementById('boton-siguiente').disabled = true;
    } else {
        mostrarResultado();
    }
}

// Función para mostrar el resultado y guardar el récord
function mostrarResultado() {
    const respuestaCorrecta = preguntas.map(q => q.respuesta);
    let record = 0;

    respuestaDelUsuario.forEach((respuesta, index) => {
        if (respuesta === respuestaCorrecta[index]) {
            record++;
        }
    });

    localStorage.setItem('respuestaDelUsuario', JSON.stringify(respuestaDelUsuario));

    // Comparar y actualizar el récord
    let mejorRecord = localStorage.getItem('mejorRecord');
    if (!mejorRecord || record > parseInt(mejorRecord)) {
        localStorage.setItem('mejorRecord', record);
        mejorRecord = record;
    }

   
    document.getElementById('contenedor-de-preguntas').style.display = 'none';
    document.getElementById('boton-siguiente').style.display = 'none';
    const resultText = `Has acertado ${record} de ${preguntas.length} preguntas. Récord: ${mejorRecord}`;
    document.getElementById('resultado').textContent = resultText;
    document.getElementById('contenedor-resultado').style.display = 'block';
    document.getElementById('reiniciar-juego').style.display = 'block';
}

// Función para reiniciar el juego
function reiniciar() {
    const reiniciarboton = document.querySelector('#reiniciar-juego');

    if (reiniciarboton) {
        reiniciarboton.addEventListener("click", () => {
            Swal.fire({
                title: 'Volver a jugar?',
                icon: 'question',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    resetearJuego();
                }
            })
        })
    }
}

function resetearJuego() {
    document.getElementById('contenedor-de-preguntas').style.display = 'block';
    document.getElementById('boton-siguiente').style.display = 'block';
    document.getElementById("reiniciar-juego").style.display = 'none';

    indiceDePreguntas = 0;
    respuestaDelUsuario = [];
    cargarPregunta();
}

// Función para mostrar el récord al cargar nuevamente el juego
function mostrarRecord() {
    const mejorRecord = localStorage.getItem('mejorRecord');
    if (mejorRecord) {
        document.getElementById('record').textContent = `Récord actual: ${mejorRecord}`;
    } else {
        document.getElementById('record').textContent = 'No tienes récord aún.';
    }
}

//  Eventos
document.getElementById('reiniciar-juego').addEventListener('click', reiniciar);
document.getElementById('boton-siguiente').onclick = nuevaPregunta;

// Iniciar juego y mostrar el récord
cargarPregunta();
document.getElementById('boton-siguiente').disabled = true;
mostrarRecord();
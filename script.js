document.addEventListener('DOMContentLoaded', function () {
    const DateTime = luxon.DateTime;

    // Elementos del DOM
    let zonaDeJuego = document.querySelector('.zonaDeJuego');
    let inputUsuario = document.getElementById('usuarioInput');
    let botonEnviar = document.getElementById('enviarButton');
    let contadorPuntos = document.getElementById('contadorPuntos');
    let botonReset = document.getElementById('resetButton');
    let highscoreHistorico = document.getElementById('highscoreHistorico');
    let botonResetearHighscore = document.getElementById('resetearStats');
    let puntos = 0;
    let nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    let highscore = JSON.parse(localStorage.getItem('highscore')) || { score: 0, user: '', date: '' };

    // Función para crear un nuevo punto
    function crearPunto() {
        let punto = document.createElement('div');
        punto.classList.add('punto');

        let maxX = zonaDeJuego.clientWidth - 50;
        let maxY = zonaDeJuego.clientHeight - 50;
        let x = Math.floor(Math.random() * maxX);
        let y = Math.floor(Math.random() * maxY);
        punto.style.left = `${x}px`;
        punto.style.top = `${y}px`;

        // Evento para cambiar la imagen al hacer clic y esperar antes de crear el siguiente punto
        punto.addEventListener('click', function () {
            if (nombreUsuario === "MatiasGOD") {
                puntos += Math.floor(Math.random() * 5 + 1);
            } else {
                puntos++;
            }
            punto.style.backgroundImage = 'url("./assets/img/dead_trump.png")';
            actualizarContador();

            // Esperar tiempo
            setTimeout(function () {
                zonaDeJuego.removeChild(punto);
                crearPunto();
                actualizarHighscore();
            }, 50);
        });

        zonaDeJuego.appendChild(punto);
    }

    // Función para reiniciar el juego
    function resetearJuego() {
        while (zonaDeJuego.firstChild) {
            zonaDeJuego.removeChild(zonaDeJuego.firstChild);
        }
        crearPunto();
    }

    // Función para actualizar el contador de puntos en pantalla
    function actualizarContador() {
        contadorPuntos.textContent = 'Actualmente ' + nombreUsuario + ' tiene puntos: ' + puntos;
    }

    // Función para actualizar el highscore
    function actualizarHighscore() {
        if (puntos > highscore.score) {
            let fecha = DateTime.now().toLocaleString(DateTime.DATETIME_short);
            highscore = { score: puntos, user: nombreUsuario, date: fecha };
            localStorage.setItem('highscore', JSON.stringify(highscore));
            highscoreHistorico.textContent = `El highscore es ${highscore.score} por ${highscore.user} en la fecha ${highscore.date}.`;
        }
    }

    // Función para manejar el clic en el área de juego
    function manejarClicEnZonaDeJuego(event) {
        if (!event.target.classList.contains('punto')) {
            alertify.alert(nombreUsuario + ' perdiste x.x', 'Pero tu puntaje fue de: ' + puntos + '.');
            // alert('Tu puntaje fue de: ' + puntos);
            puntos = 0;
            actualizarContador();
            resetearJuego();
        }
    }

    // Función para manejar el ingreso del nombre de usuario
    function manejarIngresoUsuario() {
        nombreUsuario = inputUsuario.value.trim();

        if (nombreUsuario) {
            localStorage.setItem('nombreUsuario', nombreUsuario);
            inputUsuario.value = '';
            puntos = 0;
            actualizarContador();
            notificaciones("Bienvenido " + nombreUsuario + "!!")
        }
    }

    // Función para manejar el clic en el botón de resetear
    function manejarReset() {
        if (nombreUsuario) {
            puntos = 0;
            actualizarContador();
        }
    }

    // Configuración de eventos
    zonaDeJuego.addEventListener('click', manejarClicEnZonaDeJuego);
    botonEnviar.addEventListener('click', manejarIngresoUsuario);
    botonReset.addEventListener('click', manejarReset);

    // Inicialización del juego
    crearPunto();

    // Mostrar el nombre de usuario y el contador de puntos si hay un nombre almacenado
    if (nombreUsuario) {
        actualizarContador();
    }

    function mostrarHighscore() {
        if (highscore.score <= 0 || !highscore.user) {
            highscoreHistorico.textContent = 'Aún no hay highscore :o';
        } else {
            highscoreHistorico.textContent = `El highscore es ${highscore.score} por ${highscore.user} en la fecha ${highscore.date}.`;
        }
    }


    // Mostrar el highscore almacenado
    mostrarHighscore();

    // Resetear Stats (solo el highscore)
    botonResetearHighscore.addEventListener('click', () => {
        localStorage.removeItem('highscore');
        highscore = { score: 0, user: '', date: '' };
        notificaciones("Se borro el highscore jiji")
        manejarReset();
        mostrarHighscore();
    });

    //Funcion notificaciones con toastify
    function notificaciones(text) {
        Toastify({
            text: text,
            className: "tostify",
            duration: 4000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();

    }
});

//Cronometro de tiempo segun dificultad
// facil = no pierde por tiempo
//medio = pierde en menos de 600 ms
//pro = pierde en menos de 300 ms
//aimbot = pierde en menos de 100 ms 
// para la versión 2 de la pag
function dificultadLevel(nivel) {
    if (nivel === "facil") {
    }
    else if (nivel === "medio") {
    }
    else if (nivel === "pro") {
    }
    //aimbot
    else {
    }

}





document.addEventListener('DOMContentLoaded', function () {
    // Elementos del DOM
    let zonaDeJuego = document.querySelector('.zonaDeJuego');
    let inputUsuario = document.getElementById('usuarioInput');
    let botonEnviar = document.getElementById('enviarButton');
    let mensajeBienvenida = document.getElementById('mensajeBienvenida');
    let contadorPuntos = document.getElementById('contadorPuntos');
    let botonReset = document.getElementById('resetButton');
    let highscoreHistorico = document.getElementById('highscoreHistorico');

    let puntos = 0;
    let nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    let highscore = JSON.parse(localStorage.getItem('highscore')) || { score: 0, user: '' };

    // Función para crear un nuevo punto
    function crearPunto() {
        let punto = document.createElement('div');
        punto.classList.add('punto');
        let maxX = zonaDeJuego.clientWidth - 10;
        let maxY = zonaDeJuego.clientHeight - 10;
        let x = Math.floor(Math.random() * maxX);
        let y = Math.floor(Math.random() * maxY);
        punto.style.left = `${x}px`;
        punto.style.top = `${y}px`; 

        punto.addEventListener('click', function () {
            if (nombreUsuario === "MatiasGOD") {
                puntos += Math.floor(Math.random() * 5 + 1);
            } else {
                puntos++;
            }
            actualizarContador();
            zonaDeJuego.removeChild(punto);
            crearPunto();
            actualizarHighscore();
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
            highscore = { score: puntos, user: nombreUsuario };
            localStorage.setItem('highscore', JSON.stringify(highscore));
            highscoreHistorico.textContent = 'El highscore es ' + highscore.score + ' por ' + highscore.user + '.';
        }
    }

    // Función para manejar el clic en el área de juego
    function manejarClicEnZonaDeJuego(event) {
        if (!event.target.classList.contains('punto')) {
            alert('Tu puntaje fue de: ' + puntos);
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
            mensajeBienvenida.textContent = '¡Bienvenido, ' + nombreUsuario + '!';
            inputUsuario.value = '';
            puntos = 0;
            actualizarContador();
        } else {
            mensajeBienvenida.textContent = 'Por favor, ingresa un nombre.';
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
        mensajeBienvenida.textContent = '¡Bienvenido de nuevo, ' + nombreUsuario + '!';
        actualizarContador();
    }

    // Mostrar el highscore almacenado
    highscoreHistorico.textContent = 'El highscore es ' + highscore.score + ' por ' + highscore.user + '.';
});

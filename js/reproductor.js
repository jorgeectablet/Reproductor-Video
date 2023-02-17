const videoFiles = document.getElementById("video-files"); // Input con los videos
const startButton = document.getElementById("start-button"); // Boton reproducir
const videoPlayer = document.getElementById("video-player"); // Reproductor

const anterior = document.getElementById("previous-button"); // Boton anterior
const siguiente = document.getElementById("next-button"); // Boton siguiente

const playlist = document.getElementById("playlist"); // Div Lista playlist para mostrar
const itemplaylist = document.getElementById("itemplaylist"); 

const random = document.getElementById("randomCheckbox"); // Boton reproducir aleatorio


const botonsubtitulos = document.getElementById("subtitulos");
const subtitlesContainer = document.getElementById('subtitles-container');

const datosPlaylist = []; // Array playlist
var contador = 0; // Contador
var files; // Archivos de video


startButton.addEventListener("click", () => { // SE EJECUTA AL DARLE AL PLAY

	if (videoPlayer.paused) {
		files = videoFiles.files;
		videoPlayer.src = URL.createObjectURL(files[contador]);
		console.log("Se va a reproducir el siguiente video: "+files[contador].name)
		videoPlayer.load();

		for (let i = 0; i < files.length; i++) {
			datosPlaylist.push(files[i].name);
			console.log("Se han cargado en la playlist: "+files[i].name);
		}

		/* El método URL.createObjectURL() crea un string 
		que contiene una URL que representa al objeto pasado como parámetro*/
		videoPlayer.play();

		videoPlayer.addEventListener("ended", () => { // SI HA TERMINADO DE REPRODUCIR
			contador++;
			if (contador < files.length) {
				videoPlayer.src = URL.createObjectURL(files[contador]);
				videoPlayer.load();
				videoPlayer.play();
			}
		});

		videoPlayer.addEventListener("error", () => { // SI DA ERROR
			errorMessage.innerHTML = "El fichero de video no existe";
		});

	} else {
		videoPlayer.pause();
	}

	for (let i = 0; i < datosPlaylist.length; i++) {
		if (!itemplaylist.innerHTML.includes(datosPlaylist[i])) {
		  itemplaylist.innerHTML += ` 🎧 Cancion en posicion ${i}: ${datosPlaylist[i]} 🎧 `;
		}
	  }
});

anterior.addEventListener("click", () => {
	contador--;
	if (contador < 0) {
		contador = datosPlaylist.length - 1;
	}
	videoPlayer.src = URL.createObjectURL(files[contador]);
	videoPlayer.load();
	videoPlayer.addEventListener("loadedmetadata", () => {
		videoPlayer.play();
	});
});

siguiente.addEventListener("click", () => {
	contador++;
	if (contador >= datosPlaylist.length) {
		contador = 0;
	}
	videoPlayer.src = URL.createObjectURL(files[contador]);
	videoPlayer.load();
	videoPlayer.addEventListener("loadedmetadata", () => {
		videoPlayer.play();
	});
});

random.addEventListener("click", () => {

	if (random.checked) {
		files = videoFiles.files;
		var videoAleatorio = files[Math.floor(Math.random() * files.length)];
		videoPlayer.src = URL.createObjectURL(videoAleatorio);
		videoPlayer.load();
		videoPlayer.play();

		for (let i = 0; i < files.length; i++) {
			datosPlaylist.push(files[i].name);
			document.getElementById("itemplaylist").innerHTML += (` | Cancion en posicion ${i}: ${datosPlaylist[i]}`);
		}
	}
});

/*
function loadSubtitles() {
	// Obtener el archivo de subtítulos
	fetch('mi_subtitulo.vtt')
		.then(response => response.text())
		.then(data => {
			// Crear un objeto Track para el elemento <video>
			const track = document.createElement('track');
			track.kind = 'subtitles';
			track.label = 'Español';
			track.srclang = 'es';
			track.src = 'mi_subtitulo.vtt';
			// Añadir el objeto Track al elemento <video>
			video.appendChild(track);
		});
}

toggleSubtitlesBtn.addEventListener('click', () => {
	if (video.textTracks[0].mode === 'showing') {
		video.textTracks[0].mode = 'hidden';
	} else {
		video.textTracks[0].mode = 'showing';
	}
});

loadSubtitles();*/
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

		videoPlayer.play();

		videoPlayer.addEventListener("ended", () => { // SI HA TERMINADO DE REPRODUCIR
			contador++;
			if (contador < files.length) {
				videoPlayer.src = URL.createObjectURL(files[contador]);
				videoPlayer.load();
				videoPlayer.play();
			}
		});

	} else {
		videoPlayer.pause();
	}

	for (let i = 0; i < datosPlaylist.length; i++) {
		if (!itemplaylist.innerHTML.includes(datosPlaylist[i])) {
		  const listItem = document.createElement("li");
		  const songText = document.createTextNode(`🎧 Cancion en posición ${i}: ${datosPlaylist[i]} 🎧`);
		  const playButton = document.createElement("button");
		  const deleteButton = document.createElement("button");
	  
		  playButton.innerHTML = "Reproducir";
		  deleteButton.innerHTML = "Eliminar";

		  playButton.classList.add("btn", "btn-primary", "m-2");
		  deleteButton.classList.add("btn", "btn-primary", "m-2");
	  
		  listItem.appendChild(songText);
		  listItem.appendChild(playButton);
		  listItem.appendChild(deleteButton);
	  
		  itemplaylist.appendChild(listItem);

		  playButton.addEventListener("click", (event) => {
			const listItem = event.target.closest("li");
			const fileIndex = (Array.from(listItem.parentNode.children).indexOf(listItem))-1;
			files = videoFiles.files;
			const songUrl = URL.createObjectURL(files[fileIndex]);
			videoPlayer.setAttribute("src", songUrl);
			videoPlayer.play();
		  });

		  deleteButton.addEventListener("click", (event) => {
			const listItem = event.target.parentNode;
			itemplaylist.removeChild(listItem);
		  })
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
	}
});
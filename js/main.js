let data = "{}";
const listOfMovies = document.querySelector(`#gallery`);
const apiKey = `1af0c47628b411de73a1ff9f56cf0335`;

let xhr = new XMLHttpRequest();
xhr.addEventListener("readystatechange", function () {
  if (xhr.readyState == 4) {
	  const jsonData = JSON.parse(xhr.responseText);
    listOfMovies.innerHTML = (`${jsonData.results.overview}`)
  }
});

xhr.open("GET", `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-CAN`);

xhr.send(data);
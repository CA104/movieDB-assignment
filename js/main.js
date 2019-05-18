const displayMovies = document.querySelector(`#movies`) // calls the #movies <a> that will have an event listener
const xhr = new XMLHttpRequest(); // creates HTTP request
let listOfMovies = `{}` // empty array to add list of current movies

	const endPoint = // request to the API to get currently playing list of movies
	`https://api.themoviedb.org/3/movie/now_playing?api_key=1af0c47628b411de73a1ff9f56cf0335&language=en-CAN&page=1`; 
	
	xhr.open("GET", endPoint);
	xhr.send(listOfMovies);
	xhr.addEventListener('readystatechange', playingNow);

function playingNow() { // verifies if the request was approved and displays the content fed by the API
if (xhr.readyState == 4) {
	const displayGallery = document.querySelector('#gallery');

	const jsonData = JSON.parse(xhr.responseText);

	displayGallery.innerHTML = (`${jsonData.results.original_title}`)
}};
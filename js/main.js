const displayMovies = document.querySelector(`#movies`)
const xhr = new XMLHttpRequest();

displayMovies.addEventListener(`click`, function() {
	const endPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=1af0c47628b411de73a1ff9f56cf0335&language=en-CAN&page=1`;
	alert(`Jon Snow!`)
	
	xhr.open("GET", endPoint);
	xhr.send();
	xhr.addEventListener('readystatechange', playingNow)
});

function playingNow() {
if (xhr.readyState == 4) {
	const displayGallery = document.querySelector('#gallery');

	const jsonData = JSON.parse(xhr.responseText);

	displayGallery.innerHTML = (`${jsonData.results.original_title}`)
}}
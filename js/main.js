const displayMovies = document.querySelector(`#movies`) // calls the #movies <a> that will have an event listener
const displayGallery = document.querySelector('#gallery');
const apiKey = `1af0c47628b411de73a1ff9f56cf0335`;
const xhr = new XMLHttpRequest(); // creates HTTP request

window.addEventListener(`load`, function(){
    const endPoint = // request to the API to get currently playing list of movies
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-CAN`; 
    console.log(`${endPoint}`)
    
    xhr.open("GET", endPoint);
    xhr.send(listOfMovies);
    xhr.addEventListener('readystatechange', playingNow);
})

function playingNow() { // verifies if the request was approved and displays the content fed by the API
if (xhr.readyState == 4) {
    const jsonData = JSON.parse(xhr.responseText);
    console.log(`${jsonData.results.overview}`)
}};

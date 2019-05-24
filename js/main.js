const displayMovies = document.querySelector(`#movies`) // calls the #movies <a> that will have an event listener
const apiKey = `1af0c47628b411de73a1ff9f56cf0335`;
const xhr = new XMLHttpRequest(); // creates HTTP request

window.addEventListener(`load`, function(){
    const endPoint = // request to the API to get currently playing list of movies
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-CAN`; 
    console.log(`${endPoint}`)
    
    xhr.open("GET", endPoint);
    xhr.send();
    xhr.addEventListener('readystatechange', playingNow);
})

function playingNow() { // verifies if the request was approved and displays the content fed by the API
if (xhr.readyState == 4) {
    const displayGallery = document.querySelector('#galleryOfMovies');
    const jsonData = JSON.parse(xhr.responseText);

    displayGallery.innerHTML = // prints the content from the API
    `<h2>${jsonData.results[length].original_title}</h2>
    <br>
    <p>${jsonData.results[length].overview}</p>
    <br>
    <img src= "${jsonData.results[0].poster_path}">`; 
}};

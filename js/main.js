const displayMovies = document.querySelector(`#movies`)  // calls the #movies <a> that will have an event listener
const apiKey = `1af0c47628b411de73a1ff9f56cf0335`;
const xhr = new XMLHttpRequest();  // creates HTTP request

window.addEventListener(`load`, function(){
    const endPoint =  // request to the API to get currently playing list of movies
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`; 
    console.log(`${endPoint}`)
    
    xhr.open("GET", endPoint);
    xhr.send();
    xhr.addEventListener('readystatechange', playingNow);
})

function playingNow() {   // verifies if the request was approved and displays the content fed by the API
  if (xhr.readyState == 4) {
  const jsonData = JSON.parse(xhr.responseText);
  const displayGallery = document.querySelector('#galleryOfMovies');

  let i;
  for( i = 0; i < jsonData.results.length; i++) {
    console.log(`${jsonData.results[i].original_title} - ${jsonData.results[i].overview}`);  // prints array of movies on the console 

  displayGallery.innerHTML +=  // prints the array objects on the DOM
  `<div class= "movie"><h2>${jsonData.results[i].original_title}</h2> 
  <p>${jsonData.results[i].vote_average}</p> 
  <p>${jsonData.results[i].release_date}</p> 
  <div><p>${jsonData.results[i].overview}</p></div> 
  <img class= "poster" src= "http://image.tmdb.org/t/p/w200/${jsonData.results[i].poster_path}"></div>`; 
  }
}};
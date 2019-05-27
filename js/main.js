const displayMovies = document.querySelector(`#movies`)  // calls the #movies <a> that will have an event listener
const apiKey = `1af0c47628b411de73a1ff9f56cf0335`;
const xhr = new XMLHttpRequest();  // creates HTTP request

const createRequest = (page=1) => {
window.addEventListener(`load`, e => {
    const endPoint =  // request to the API to get currently playing list of movies
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`; 
    console.log(`${endPoint}`)
    
    xhr.open("GET", endPoint);
    xhr.send();
    xhr.addEventListener('readystatechange', playingNow);
})
}
createRequest();

function playingNow() {   // verifies if the request was approved and displays the content fed by the API
  if (xhr.readyState == 4) {
  const jsonData = JSON.parse(xhr.responseText);
  const displayGallery = document.querySelector('#galleryOfMovies');

  let i;
  for( i = 0; i < jsonData.results.length; i++) {

  displayGallery.innerHTML +=  // prints the array objects on the DOM
  `<div class= "movie"><h2>${jsonData.results[i].original_title}</h2> 
  <p>Rating: ${jsonData.results[i].vote_average}</p> 
  <p>${jsonData.results[i].release_date}</p> 
  <div><p>${jsonData.results[i].overview}</p></div> 
  <img id="moreInfo" class= "poster" src= "http://image.tmdb.org/t/p/w200/${jsonData.results[i].poster_path}"></div>`; 
  }
}};

const changePage = document.getElementById(`pagination`);
changePage.addEventListener(`click`, event => {
  if( !event.target.matches(`li`) ) {
    return;
  }
  createRequest( event.target.dataset.page);
  console.log(`event.target.page`)
})

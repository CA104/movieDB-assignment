/*****  calls the #movies <a> that will have an event listener  *****/
const apiKey = `1af0c47628b411de73a1ff9f56cf0335`;
const xhr = new XMLHttpRequest();  // creates HTTP request
const displayGallery = document.querySelector('#galleryOfMovies');
const singleMovieView = document.querySelector(`#single-movie`);
const movies = document.querySelector(`#movies`);

/*****  sends request to the API for content  *****/
const createRequest = (page=1) => {
    const endPoint = 
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`; 
    console.log(`${endPoint}`)
    
    xhr.open("GET", endPoint);
    xhr.send();
    xhr.addEventListener('readystatechange', playingNow);
}

/*****  verifies if the request was approved and displays the content fed by the API  *****/
function playingNow() {   
  if (xhr.readyState == 4) {
  const jsonData = JSON.parse(xhr.responseText);
  displayGallery.innerHTML = ``;

/*****  loops through the array and prints the movie titles, overview, rating, release date and poster   *****/
  for( let i = 0; i < jsonData.results.length; i++) {
  displayGallery.innerHTML +=  // prints the array objects on the DOM
  `<div class= "movie"><h2 class= "animated fadeIn" data-movie>${jsonData.results[i].original_title}</h2> 
  <p class= "animated fadeIn">Rating: ${jsonData.results[i].vote_average}</p> 
  <p class= "animated fadeIn">${jsonData.results[i].release_date}</p> 
  <p class= "overview animated fadeIn">${jsonData.results[i].overview}</p>
  <img id="moreInfo" class= "poster animated fadeIn" src= "http://image.tmdb.org/t/p/w200/${jsonData.results[i].poster_path}"></div>`; 
  }
}};

/*****  prints the list of now playing movies  *****/
createRequest();

/*****  resend the reuest to the API for the page number for the event fired  *****/
const changePage = document.getElementById(`pagination`);
changePage.addEventListener(`click`, event => {
  if( !event.target.matches(`li`) ) {
    return;
  }
  createRequest( event.target.dataset.page);
  console.log(`event.target.page`)
})


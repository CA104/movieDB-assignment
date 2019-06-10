/*****  calls the #movies <a> that will have an event listener  *****/
const apiKey = `1af0c47628b411de73a1ff9f56cf0335`;
const xhr = new XMLHttpRequest();  // creates HTTP request
const displayGalleryAsHTML = document.querySelector('#galleryOfMovies');
const movies = document.querySelector(`#movies`);
const singleMovieView = document.querySelector(`#singleMovie`);

/*****  sends request to the API for content  *****/
const createRequestForMovies = (page=1) => {
    const endPoint = 
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`; 
    console.log(`${endPoint}`)
    
    xhr.open("GET", endPoint);
    xhr.send();
    xhr.addEventListener('readystatechange', playingNow);
}

/*****  verifies if the request was approved and displays the content fed by the API  *****/
const playingNow = () => {   
  if (xhr.readyState == 4) {
  const jsonData = JSON.parse(xhr.responseText);
  displayGalleryAsHTML.innerHTML = ``;

/*****  loops through the array and prints the movie titles, overview, rating, release date and poster   *****/
  for( let i = 0; i < jsonData.results.length; i++) {
    displayGalleryAsHTML.innerHTML +=
  `<div class="movie" data-id="${jsonData.results[i].id}">
  <h2 class= "animated fadeIn">${jsonData.results[i].original_title}</h2> 
  <p class= "animated fadeIn">Rating: ${jsonData.results[i].vote_average}</p> 
  <p class= "animated fadeIn">${jsonData.results[i].release_date}</p> 
  <p class= "overview animated fadeIn">${jsonData.results[i].overview}</p>
  <img data-movie=${jsonData.results[i].id} id="${jsonData.results[i].id}" class= "poster animated fadeIn" src= "http://image.tmdb.org/t/p/w500/${jsonData.results[i].poster_path}">
  </div>
  `; 
  }
}};

createRequestForMovies();

/*****  resend the reuest to the API for the page number for the event fired  *****/
const changePage = document.getElementById(`pagination`);
changePage.addEventListener(`click`, event => {
  if( !event.target.matches(`li`) ) {
    return;
  }
  createRequestForMovies( event.target.dataset.page);
  console.log(`event.target.page`)
  window.scrollTo(0, 0);
})

/*****  gets the ele ID when poster is clicked  *****/
displayGalleryAsHTML.addEventListener(`click`, event => {
  if(event.target.matches(`img`)) {
  let getMovieId = event.target.closest(`.movie`);
  const xhrForSingleMovie = new XMLHttpRequest();
  
  const singleMovieEndPoint = `https://api.themoviedb.org/3/movie/${getMovieId.dataset.id}?api_key=${apiKey}&language=en-US`;
  console.log(`${singleMovieEndPoint}`);

  xhrForSingleMovie.open(`GET`, singleMovieEndPoint);
  xhrForSingleMovie.send();
  xhrForSingleMovie.addEventListener(`readystatechange`, singleMovie);
  }
});

const singleMovie = () => {
  if (this.readyState == 4) {
    const jsonDataForMovie = JSON.parse(xhrForSingleMovie.responseText);
    displayGalleryAsHTML.innerHTML = ``;

    for( let i = 0; i < jsonData.results.length; i++) {
      singleMovieView.innerHTML = `
      <div class= "movie"><h2 class= "animated fadeIn" data-movie=${jsonDataForMovie.results[i].id}>${jsonDataForMovie.results[i].original_title}</h2> 
      <p class= "animated fadeIn">${jsonDataForMovie.results[i].release_date}</p> 
      <p class= "overview animated fadeIn">${jsonDataForMovie.results[i].overview}</p>
      <img class= "poster animated fadeIn" src= "http://image.tmdb.org/t/p/w200/${jsonDataForMovie.results[i].poster_path}"></div>
      `
    }
}};


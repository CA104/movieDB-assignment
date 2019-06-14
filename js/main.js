/*****  calls the #movies <a> that will have an event listener  *****/
const apiKey = `1af0c47628b411de73a1ff9f56cf0335`;
const xhr = new XMLHttpRequest();  // creates HTTP request
const displayGalleryAsHTML = document.querySelector('#galleryOfMovies');
const movies = document.querySelector(`#movies`);
const singleMovieView = document.querySelector(`#singleMovie`);
const movieTrailer = document.querySelector(`#watch-trailer`);

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
  window.scrollTo(0,0);
})

/*****  gets the ele ID when poster is clicked and hides the list of movies from the DOM *****/
displayGalleryAsHTML.addEventListener(`click`, event => {
  if(event.target.matches(`img`)) {

  let getMovieId = event.target.closest(`.movie`);
  const xhrForSingleMovie = new XMLHttpRequest();
  
  const singleMovieEndPoint = `https://api.themoviedb.org/3/movie/${getMovieId.dataset.id}?api_key=${apiKey}&language=en-US`;
  console.log(singleMovieEndPoint);
  displayGalleryAsHTML.innerHTML = ``;

  xhrForSingleMovie.open(`GET`, singleMovieEndPoint);
  xhrForSingleMovie.send();
  xhrForSingleMovie.onreadystatechange = function() {
    if (this.readyState == 4) {
      const jsonDataForMovie = JSON.parse(this.responseText);

      singleMovieView.innerHTML = 
      `<div class= "single-movie animated fadeIn">
      <h2 data-movie=${jsonDataForMovie.id}>${jsonDataForMovie.original_title}</h2> 
      <p>${jsonDataForMovie.release_date}</p> 
      <p>${jsonDataForMovie.overview} <br> 
      <button>Watch Trailer</button></p>
      <img src= "http://image.tmdb.org/t/p/w500/${jsonDataForMovie.poster_path}">
      </div>`
      changePage.innerHTML = ``;
      window.scrollTo(0,260);
    }}}
});

/*****  listens to the movie link to display the full list of movies and reloads page *****/
movies.addEventListener(`click`, event => {
  createRequestForMovies();
  window.location.reload();
})

/*****  listener to request API videos request *****/
displayGalleryAsHTML.addEventListener(`click`, event => {
  if(event.target.matches(`img`)) {

    let getTrailer = event.target.closest(`.movie`);
    const xhrForTrailer = new XMLHttpRequest();

    const trailerEndPoint = `https://api.themoviedb.org/3/movie/${getTrailer.dataset.id}/videos?api_key=${apiKey}&language=en-US`;
    console.log(trailerEndPoint);
    displayGalleryAsHTML.innerHTML = ``;

    xhrForTrailer.open(`GET`, trailerEndPoint);
    xhrForTrailer.send();
    xhrForTrailer.onreadystatechange = function() {
      if (this.readyState == 4) {
        const jsonDataTrailer = JSON.parse(this.responseText);

      }}}
}); 
import locationsData from '../../helpers/data/locationsData';
import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

let movieArray = [];
let locationArray = [];
let selectedMovie = [];

const domStringBuilder = (values) => {
  let domString = '';
  domString += '<div class="container">';
  domString += '<div class="row">';
  values.forEach((location) => {
    domString += '<div class="card col-2 location-cards">';
    domString += `<div id=${location.id}><p>${location.id}</p>`;
    domString += `<img src="${location.imageUrl}" class="card-img-top"></img>`;
    domString += `<p>${location.address}</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  domString += '</div>';
  domString += '</div>';
  util.printToDom('locations', domString);
};

const movieStringBuilder = (movieObj) => {
  const clearString = '';
  let domString = '';
  domString += '<div class="container">';
  domString += '<div class="card col-6 movie-card">';
  domString += `<h3 class="card-header">${movieObj.name}</h3>`;
  domString += `<div id=${movieObj.id}</div>`;
  domString += `<h3>Genre: ${movieObj.genre}</h3>`;
  domString += `<h3>Release Date: ${movieObj.releaseDate}</h3>`;
  domString += `<h3>Description: ${movieObj.description}</h3>`;
  domString += `<h3>Locations: ${movieObj.locations.length}</h3>`;
  domString += '<button id="back" class="btn btn-danger text-align-center">Back</button>';
  domString += '</div>';
  domString += '</div>';
  domString += '</div>';
  util.printToDom('movies', domString);
  util.printToDom('filters', clearString);
};

const locationMovieFilter = () => {
  const tempArray = [];
  selectedMovie.forEach((movieLocation) => {
    const newCards = locationArray.filter((x) => {
      const hasLocation = x.id.includes(movieLocation);
      if (x.id === movieLocation) {
        tempArray.push(x);
      }
      return hasLocation;
    });
    console.error(newCards);
    domStringBuilder(tempArray);
  });
};

const backEvent = () => {
  document.location.reload();
};

const backButtonEvent = () => {
  document.getElementById('back').addEventListener('click', backEvent);
};

const movieTest = (e) => {
  const buttonId = e.target.id;
  const movieId = movieArray.filter(x => x.id === buttonId);
  switch (buttonId) {
    case 'movie1':
      selectedMovie = movieId[0].locations;
      movieStringBuilder(movieId[0]);
      locationMovieFilter();
      backButtonEvent();
      break;
    case 'movie2':
      selectedMovie = movieId[0].locations;
      movieStringBuilder(movieId[0]);
      locationMovieFilter();
      backButtonEvent();
      break;
    case 'movie3':
      selectedMovie = movieId[0].locations;
      movieStringBuilder(movieId[0]);
      locationMovieFilter();
      backButtonEvent();
      break;
    case 'movie4':
      selectedMovie = movieId[0].locations;
      movieStringBuilder(movieId[0]);
      locationMovieFilter();
      backButtonEvent();
      break;
    default:
      console.error('default');
  }
};

const movieEvents = () => {
  document.getElementById('movie1').addEventListener('click', movieTest);
  document.getElementById('movie2').addEventListener('click', movieTest);
  document.getElementById('movie3').addEventListener('click', movieTest);
  document.getElementById('movie4').addEventListener('click', movieTest);
};

const moviesInit = () => {
  moviesData.getMoviesData()
    .then((resp) => {
      const movieResults = resp.data.movies;
      movieArray = movieResults;
      return movieResults;
    })
    .catch(err => console.error(err));
};

const locationsInit = () => {
  locationsData.getLocationsData()
    .then((resp) => {
      const locationResults = resp.data.locations;
      locationArray = locationResults;
      return locationResults;
    })
    .catch(err => console.error(err));
};

export default { moviesInit, movieEvents, locationsInit };

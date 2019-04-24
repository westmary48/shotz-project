import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';
import location from '../locations/locations';
import locationData from '../../helpers/data/locationsData';

import './movies.scss';

let movies = [];

const domStringBuilder = (moviesArray) => {
  let domString = '';
  moviesArray.forEach((movie) => {
    domString += `<div class ="movie-card col- 3">`;
    domString += '<input type="button" value="Back" onClick="location.href=location.href"></button>';
    domString += `<h3 class= "card-header">${movie.name}</h3>`;
    domString += '<div class="card-body">';
    domString += `<h3>${movie.genre}</h3>`;
    domString += `<button id = "${movie.id}" class = "btn btn-danger ${movie.id}" >Click Here </button>`;
    domString += `<h3>${movie.releaseDate}</h3>`;
    domString += `<h3>${movie.description}</h3>`;
    domString += `<div id ="${movie.locations.length}" class ="${movie.locations.length}">Locations</div>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('movies', domString);
};

const removeDummy = () => {
  const filter = document.getElementById('filters');
  filter.parentNode.removeChild(filter);
  const loc = document.getElementById('locations');
  loc.parentNode.removeChild(loc);
  const h = document.getElementById('locations-h');
  h.parentNode.removeChild(h);
 }

//  const filterButtonMovieLocations = (e) => {
//   const buttonId = e.target.id;
//   const mlOne = movies.filter(x => x.locations.length === 'movie1');
//   const mlTwo = movies.filter(x => x.locations.length === 'movie2');
//   const mlThree = movies.filter(x => x.locations.length === 'movie3');
//   const mlFour =  movies.filter(x => x.locations.length === 'movie4');
//   switch (buttonId) {
//     case 'movie1':
//    location.domStringBuilderLocations(mlOne);
//     filterButtonMovieLocations();
//       break;
//     case 'movie2':
//     location.domStringBuilderLocations(mlTwo);
//     filterButtonMovieLocations();
//       break;
//     case 'movie3':
//     location.domStringBuilderLocations(mlThree);
//     filterButtonMovieLocations();
//       break;
//     case 'movie4':
//     location.domStringBuilderLocations(mlFour);
//     filterButtonMovieLocations();
//       break;
//     default:
//     location.domStringBuilder(movieOne);
//     filterButtonMovieLocations();
//   }
// };

const getData = () => {
  locationData.getLocationsData()
    .then((response) => {
      const locationsArray = response.data.locations;
      locations = locationsArray;
      domStringBuilder();
    })
    .catch((error) => {
      console.error(error);
    });
};


const filterButtonEventMovies = (e) => {
  const buttonId = e.target.id;
  const movieOne = movies.filter(x => x.id === 'movie1');
  const movieTwo = movies.filter(x => x.id === 'movie2');
  const movieThree = movies.filter(x => x.id === 'movie3');
  const movieFour =  movies.filter(x => x.id === 'movie4');
  switch (buttonId) {
    case 'movie1':
    domStringBuilder(movieOne);
    // filterButtonMovieLocations();
    getData();
    removeDummy();
      break;
    case 'movie2':
    domStringBuilder(movieTwo);
    getData();
    // filterButtonMovieLocations();
    removeDummy();
      break;
    case 'movie3':
    domStringBuilder(movieThree);
    getData();
    // filterButtonMovieLocations();
    removeDummy();
      break;
    case 'movie4':
    domStringBuilder(movieFour);
    getData();
    // filterButtonMovieLocations();
    removeDummy();
      break;
    default:
    domStringBuilder(movieOne);
    // filterButtonMovieLocations();
  }
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((response) => {
      const movieResults = response.data.movies;
      movies = movieResults;
      domStringBuilder(movies);
      document.getElementById('movie1').addEventListener('click', filterButtonEventMovies);
      document.getElementById('movie2').addEventListener('click', filterButtonEventMovies);
      document.getElementById('movie3').addEventListener('click', filterButtonEventMovies);
      document.getElementById('movie4').addEventListener('click', filterButtonEventMovies);
      getData();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };

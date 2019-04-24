import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';

let movies = [];

const domStringBuilder = (moviesArray) => {
  let domString = '';
  moviesArray.forEach((movie) => {
    domString += `<div class ="movie-card col- 3">`;
    domString += `<h3 class= "card-header">${movie.name}</h3>`;
    domString += '<div class="card-body">';
    domString += `<h3>${movie.genre}</h3>`;
    domString += `<button id = "${movie.id}" class = "btn btn-danger ${movie.id}" >Click Here </button>`;
    domString += `<h3>${movie.releaseDate}</h3>`;
    domString += `<h3>${movie.description}</h3>`;
    domString += `<p>${movie.locations.length} Locations </p>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('movies', domString);
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
      break;
    case 'movie2':
    domStringBuilder(movieTwo);
      break;
    case 'movie3':
    domStringBuilder(movieThree);
      break;
    case 'movie4':
    domStringBuilder(movieFour);
      break;
    default:
    domStringBuilder(movieOne);
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
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };

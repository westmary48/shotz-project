import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';

let movies = [];

const domStringBuilder = () => {
  let domString = '';
  movies.forEach((movie) => {
    domString += `<div id = ${movie.id} class ="movie-card col- 3">`;
    domString += `<h3 class "card-header">${movie.name}</h3>`;
    domString += '</div>';
    domString += '<div class="card-body">';
    domString += `<h3>${movie.genre}</h3>`;
    domString += `<h3>${movie.releaseDate}</h3>`;
    domString += `<h3>${movie.description}</h3>`;
    domString += `<p>${movie.locations.length}</p>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('movies', domString);
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((response) => {
      const movieResults = response.data.movies;
      movies = movieResults;
      domStringBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeMovies };

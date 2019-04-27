import moviesData from '../../helpers/data/moviesData';
import movies from '../movies/movies';

const movieLocationPrint = () => {
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

const filterLocationMovieEvent = (e) => {
  const buttonId = e.target.id;
  const showLocations = movies.filter(x => x.id === buttonId);
  switch (buttonId) {
    case 'movie1':
    showAllLocation = showLocations[i].locations
    movieLocationBuilder(showLocations[i]);
    movies.removeDummy();
      break;
    case ' movie2':
    showAllLocation = showLocations[i].locations;
    movieLocationBuilder(showAllLocation);
    movies.removeDummy();
      break;
    case 'movie3':
    showAllLocation = showLocations[i].locations;
    movieLocationBuilder(showAllLocation[i]);
    movies.removeDummy();
      break;
    case 'movie4':
    showAllLocation = showLocations[i].locations;
    movieLocationBuilder(showAllLocation);
    movies.removeDummy();
      break;
    default:
    movieLocationBuilder(showAllLocation);
  }
};

const movieLocationBuilder = (loc) => {
  let domString = '';
  loc.forEach((selectedMovie) => {
    domString += `<div class ="movie-locations-card col- 3">`;
    domString += `<h3 class= "card-header">${selectedMovie.name}</h3>`;
    domString += '<div class="card-body" id = "movie-locations-body">';
    domString += `<h3>${selectedMovie.genre}</h3>`;
    domString += `<button id ="${selectedMovie.id}" class = "btn btn-danger ${tempArray.id}" >Click Here </button>`;
    domString += `<h3>${selectedMovie.releaseDate}</h3>`;
    domString += `<h3>${selectedMovie.description}</h3>`;
    domString += `<div id ="${selectedMovie.locations.length}" class ="${selectedMovie.locations.length}">Locations</div>`;
    domString += '</div>';
    domString += '</div>';
    domString += '<h2>Locations</h2>'
  });
  util.printToDom('movies-locations', domString);
};

const initializeLocationsMovies = () => {
  moviesData.getMoviesData()
    .then((response) => {
      const locationMovieResults = response.data.movies.locations;
      movieLocations = locationMovieResults;
      filterByLocationsEvent();
      movieLocationPrint();
      filterLocationMovieEvent();
    })
    .catch(err => console.error(err));
};
export default { initializeLocationsMovies }

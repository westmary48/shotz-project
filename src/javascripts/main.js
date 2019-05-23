import '../styles/main.scss';
import 'bootstrap';
import movies from './components/movies/movies';
import locations from './components/locations/locations';
import locationMovies from './components/locationMovies/locationMovies';

const init = () => {
  movies.initializeMovies();
  locations.initializeLocations();
  locationMovies.moviesInit();
  locationMovies.locationsInit();
};

init();

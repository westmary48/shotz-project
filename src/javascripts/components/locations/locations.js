import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const shootTimeClass = (shootTime) => {
  let selectedClass = '';
  switch (shootTime) {
    case 'Morning':
      selectedClass = 'bg-secondary';
      break;
    case 'Afternoon':
      selectedClass = 'bg-success';
      break;
    case 'Evening':
      selectedClass = 'bg-info';
      break;
    case 'After Dark':
      selectedClass = 'bg-danger';
      break;
    default:
      selectedClass = '';
  }
  return selectedClass;
};

const domStringBuilderLocations = (locArray) => {
  let domString = '';
  locArray.forEach((location) => {
    domString += `<div id = ${location.id} class ="locations-card" col- 2">`;
    domString += `<h3 class ="card-header ${shootTimeClass(location.shootTime)}">${location.name}</h3>`;
    domString += '<div class="card-body">';
    domString += `<img class = "img"src = "${location.imageUrl}"</img>`;
    domString += `<h3>${location.address}</h3>`;
    domString += `<h3>${location.shootTime}</h3>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('locations', domString);
};

const filterButtonEvent = (e) => {
  const buttonId = e.target.id;
  const darkLocations = locations.filter(x => x.shootTime === 'After Dark');
  const morningLocations = locations.filter(x => x.shootTime === 'Morning');
  const afternoonLocations = locations.filter(x => x.shootTime === 'Afternoon');
  const eveningLocations = locations.filter(x => x.shootTime === 'Evening');
  switch (buttonId) {
    case 'morning':
      domStringBuilderLocations(morningLocations);
      break;
    case 'afternoon':
      domStringBuilderLocations(afternoonLocations);
      break;
    case 'evening':
      domStringBuilderLocations(eveningLocations);
      break;
    case 'dark':
      domStringBuilderLocations(darkLocations);
      break;
    default:
      domStringBuilderLocations(locations);
  }
};

const filterByTextEvent = (e) => {
  const searchText = e.target.value;
  const searchLocations = locations.filter((x) => {
    const hasName = x.name.includes(searchText);
    const hasAddress = x.address.includes(searchText);
    return hasName || hasAddress;
  });
  domStringBuilderLocations(searchLocations);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((response) => {
      const locationResults = response.data.locations;
      locations = locationResults;
      domStringBuilderLocations(locations);
      document.getElementById('dark').addEventListener('click', filterButtonEvent);
      document.getElementById('afternoon').addEventListener('click', filterButtonEvent);
      document.getElementById('evening').addEventListener('click', filterButtonEvent);
      document.getElementById('morning').addEventListener('click', filterButtonEvent);
      document.getElementById('all').addEventListener('click', filterButtonEvent);
      document.getElementById('search-input').addEventListener('keyup', filterByTextEvent);
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };

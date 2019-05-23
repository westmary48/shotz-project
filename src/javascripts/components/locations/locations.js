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

const sort = (e) => {
  const buttonId = e.target.id;
  let filterArray = [];
  locations.forEach((location) => {
    if (location.shootTime === 'After Dark' && buttonId === 'dark') {
      filterArray.push(location);
    } else if (location.shootTime === 'Morning' && buttonId === 'morning') {
      filterArray.push(location);
    } else if (location.shootTime === 'Evening' && buttonId === 'evening') {
      filterArray.push(location);
    } else if (location.shootTime === 'Afternoon' && buttonId === 'afternoon') {
      filterArray.push(location);
    } else if (buttonId === 'all') {
      filterArray = locations;
    }
    domStringBuilderLocations(filterArray);
  });
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
      document.getElementById('dark').addEventListener('click', sort);
      document.getElementById('afternoon').addEventListener('click', sort);
      document.getElementById('evening').addEventListener('click', sort);
      document.getElementById('morning').addEventListener('click', sort);
      document.getElementById('all').addEventListener('click', sort);
      document.getElementById('search-input').addEventListener('keyup', filterByTextEvent);
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };

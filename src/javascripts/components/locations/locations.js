import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const domStringBuilderLocations = () => {
  let domString = '';
  locations.forEach((location) => {
    domString += `<div id = ${location.id} class ="locations-card" col- 2">`;
    domString += `<h3 class ="card-header">${location.name}</h3>`;
    domString += '<div class="card-body">';
    domString += `<img class = "img"src = "${location.imageUrl}"</img>`;
    domString += `<h3>${location.address}</h3>`;
    domString += `<h3>${location.shootTime}</h3>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('locations', domString);
};

const initializeLocations = () => {
  locationsData.getLocationsData()
    .then((response) => {
      const locationResults = response.data.locations;
      locations = locationResults;
      domStringBuilderLocations();
    })
    .catch(err => console.error(err));
};

export default { initializeLocations };

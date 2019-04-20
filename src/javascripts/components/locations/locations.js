import locationsData from '../../helpers/data/locationsData';
import util from '../../helpers/util';

import './locations.scss';

let locations = [];

const domStringBuilderLocations = () => {
  let domString = '';
  locations.forEach((location) => {
    domString += `<h3>${location.name}</h3>`;
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

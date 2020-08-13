import {TOWNS} from '../consts';

const getUniqueTowns = (arrayOfTowns) => {
  return [...new Set(arrayOfTowns)];
};
const uniqTowns = getUniqueTowns(TOWNS);
const renderEventTowns = (uniqTownsArray) => {
  let result = ``;
  const length = uniqTownsArray.length;
  const separator = `&mdash;`;
  if (length <= 3) {
    for (let i = 0; i < length; i += 1) {
      if (i < length - 1) {
        result += `${uniqTownsArray[i]} ${separator} `;
      } else {
        result += `${uniqTownsArray[i]}`;
      }
    }
    return result;
  }
  const first = uniqTownsArray[0];
  const last = uniqTownsArray[length - 1];
  return `${first} ${separator} ... ${separator} ${last}`;
};

export const createTripInfoTemplate = () => {
  return (`
    <div class="trip-info__main">
      <h1 class="trip-info__title">${renderEventTowns(uniqTowns)}</h1>

      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
    </div>
  `);
};

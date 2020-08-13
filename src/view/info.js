import {TOWNS} from '../consts';

const getUniqueTowns = (arrayOfTowns) => {
  return [...new Set(arrayOfTowns)];
};
const uniqTowns = getUniqueTowns(TOWNS);
const renderEventTowns = (uniqTownsArray) => {
  const separator = `&mdash;`;
  if (uniqTownsArray.length <= 3) {
    const [one, two, three] = uniqTownsArray;
    return `${one} ${separator} ${two} ${separator} ${three}`;
  }
  const first = uniqTownsArray[0];
  const last = uniqTownsArray[uniqTownsArray.length - 1];
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

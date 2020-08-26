import {TOWNS} from '../consts';
import {createElement} from '../utils/render';
import {humanizeEventDate} from '../utils/event';

const compareTripDates = (start, end) => {

  const startMonth = start ? start.getMonth() : ``;
  const endMonth = end ? end.getMonth() : ``;

  return startMonth < endMonth ? humanizeEventDate(end) : end.getDate();
};

const getUniqueTowns = (arrayOfTowns) => {
  return [...new Set(arrayOfTowns)];
};

const uniqTowns = getUniqueTowns(TOWNS);

const renderEventTowns = (uniqTownsArray) => {
  let result = ``;
  const length = uniqTownsArray.length;
  const separator = `&mdash;`;
  if (length <= 3) {
    uniqTownsArray.forEach((town, index) => {
      if (index < length - 1) {
        result += `${town} ${separator} `;
      } else {
        result += `${town}`;
      }
    });
    return result;
  }
  const first = uniqTownsArray[0];
  const last = uniqTownsArray[length - 1];
  return `${first} ${separator} ... ${separator} ${last}`;
};

const createTripInfoTemplate = (startTrip, endTrip) => {
  const tripStartDate = humanizeEventDate(startTrip);
  const tripEndDate = compareTripDates(startTrip, endTrip);

  return `<div class="trip-info__main">
      <h1 class="trip-info__title">${renderEventTowns(uniqTowns)}</h1>

      <p class="trip-info__dates">${tripStartDate}&nbsp;&mdash;&nbsp;${tripEndDate}</p>
    </div>`
  ;
};

export default class TripInfo {
  constructor(tripStartDate, tripEndDate, eventsLength) {
    this._tripStartDate = tripStartDate;
    this._tripEndDate = tripEndDate;
    this._eventsLength = eventsLength.length;
    this._element = null;
  }

  _getTemplate() {
    return createTripInfoTemplate(this._tripStartDate, this._tripEndDate);
  }

  getElement() {
    if (!this._element && this._eventsLength) {
      this._element = createElement(this._getTemplate());
    }

    return this._element ? this._element : ``;
  }

  removeElement() {
    this._element = null;
  }
}

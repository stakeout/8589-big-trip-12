import {TOWNS} from '../consts';
import {humanizeEventDate} from '../utils/event';
import {createElement} from '../utils/render';
import AbstractView from './abstract';

const compareTripDates = (start, end) => {
  if (!start || !end) {
    return false;
  }

  const startMonth = start.getMonth();
  const endMonth = end.getMonth();

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

export default class TripInfo extends AbstractView {
  constructor(tripStartDate, tripEndDate) {
    super();
    this._tripStartDate = tripStartDate;
    this._tripEndDate = tripEndDate;
  }

  _getTemplate() {
    return createTripInfoTemplate(this._tripStartDate, this._tripEndDate);
  }

  getElement(events) {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return events.length ? this._element : ``;
  }
}

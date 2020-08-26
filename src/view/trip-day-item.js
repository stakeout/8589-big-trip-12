import {createElement} from '../utils/render';

const createTripDayContainerTemplate = () => {
  return `<li class="trip-days__item day"></li>`;
};

export default class TripDayItem {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createTripDayContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

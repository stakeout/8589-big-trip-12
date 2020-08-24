import {createElement} from '../utils';

const createTripContainerTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class TripDaysContainer {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createTripContainerTemplate();
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

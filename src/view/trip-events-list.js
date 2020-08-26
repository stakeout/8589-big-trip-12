import {createElement} from '../utils/render';

const createTripEventsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripEventsList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createTripEventsListTemplate();
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

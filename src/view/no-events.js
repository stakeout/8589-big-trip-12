import {createElement} from '../utils/render';

const createNoTripEventsTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoEvents {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createNoTripEventsTemplate();
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

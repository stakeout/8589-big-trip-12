import {createElement} from '../utils/render';

const createHeaderTemplate = () => {
  return `<h2 class="visually-hidden">Trip events</h2>`;
};

const createTripContainerTemplate = () => {
  return `<section class="trip-events"></section>`;
};

export default class TripContainer {
  constructor() {
    this._element = null;
    this._header = null;
  }

  _headerTemplate() {
    return createHeaderTemplate();
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

  getHeaderElement() {
    if (!this._header) {
      this._header = createElement(this._headerTemplate());
    }

    return this._header;
  }

  removeElement() {
    this._element = null;
  }
}

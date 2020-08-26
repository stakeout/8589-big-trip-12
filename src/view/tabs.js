import {createElement} from '../utils/render';

const createHeaderTemplate = () => {
  return `<h2 class="visually-hidden">Switch trip view</h2>`;
};

const createTripTabsTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  ;
};

export default class TripTabs {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
    this._header = null;
  }

  _headerTemplate() {
    return createHeaderTemplate();
  }

  _getTemplate() {
    return createTripTabsTemplate(this._filters);
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

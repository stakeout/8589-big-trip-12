import {createElement} from '../utils/render';
import AbstractView from './abstract';

const createHeaderTemplate = () => {
  return `<h2 class="visually-hidden">Trip events</h2>`;
};

const createTripContainerTemplate = () => {
  return `<section class="trip-events"></section>`;
};

export default class TripContainer extends AbstractView {
  constructor() {
    super();
    this._header = null;
  }

  _headerTemplate() {
    return createHeaderTemplate();
  }

  _getTemplate() {
    return createTripContainerTemplate();
  }

  getHeaderElement() {
    if (!this._header) {
      this._header = createElement(this._headerTemplate());
    }

    return this._header;
  }
}

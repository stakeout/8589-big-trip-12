import {createElement} from '../utils/render';

const createTripCostTemplate = () => {
  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>
  `;
};

export default class TripCost {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createTripCostTemplate();
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

import AbstractView from './abstract';

const createTripCostTemplate = (events) => {
  const totalCost = events.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>
  `;
};

export default class TripCost extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  _getTemplate() {
    return createTripCostTemplate(this._events);
  }
}

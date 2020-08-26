import AbstractView from './abstract';

const createTripCostTemplate = () => {
  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1000</span>
    </p>
  `;
};

export default class TripCost extends AbstractView {

  _getTemplate() {
    return createTripCostTemplate();
  }
}

import AbstractView from './abstract';

const createTripContainerTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class TripDaysContainer extends AbstractView {

  _getTemplate() {
    return createTripContainerTemplate();
  }
}

import AbstractView from './abstract';

const createTripDayContainerTemplate = () => {
  return `<li class="trip-days__item day"></li>`;
};

export default class TripDayItem extends AbstractView {

  _getTemplate() {
    return createTripDayContainerTemplate();
  }
}

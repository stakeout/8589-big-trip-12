import AbstractView from './abstract';

const createTripEventsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class TripEventsList extends AbstractView {

  _getTemplate() {
    return createTripEventsListTemplate();
  }
}

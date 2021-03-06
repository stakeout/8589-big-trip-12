import AbstractView from './abstract';

const createTripDayInfoTemplate = (date, counter) => {
  const eventDate = new Date(date);
  const year = eventDate.getFullYear();
  const month = eventDate.toLocaleString(`en-US`, {month: `2-digit`});
  const day = eventDate.getDate();

  return `<div class="day__info">
    <span class="day__counter">${++counter}</span>
    <time class="day__date" datetime="${year}-${month}-${day}">${eventDate.toLocaleString(`en-US`, {day: `numeric`, month: `short`})}</time>
  </div>`;
};

export default class TripDayInfo extends AbstractView {
  constructor(date, counter) {
    super();
    this._date = date;
    this._counter = counter;
  }

  _getTemplate() {
    return createTripDayInfoTemplate(this._date, this._counter);
  }
}

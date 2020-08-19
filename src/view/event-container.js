import {createEventTemplate as event} from './event';

export const createTripDayItemTemplate = (arrayOfdays) => {
  const result = [];
  let counter = 0;
  for (const [key, value] of arrayOfdays) {
    const date = new Date(key);
    result.push(`
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${counter += 1}</span>
          <time class="day__date" datetime="2019-03-18">${date.toLocaleString(`en-US`, {day: `numeric`, month: `short`})}</time>
        </div>

        <ul class="trip-events__list">
          ${value.map((item) => event(item)).join(``)}
        </ul>
      </li>
    `);
  }
  return result.join(``);
};

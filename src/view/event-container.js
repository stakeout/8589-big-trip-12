
import {createEventTemplate as event} from './event';

export const createTripDayItemTemplate = (arrayOfdays) => {
  const result = [];
  let counter = 0;
  for (const [key, value] of arrayOfdays) {
    const eventDate = new Date(key);
    const year = eventDate.getFullYear();
    const month = eventDate.toLocaleString(`en-US`, {month: `2-digit`});
    const date = eventDate.getDate();

    result.push(`
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${counter += 1}</span>
          <time class="day__date" datetime="${year}-${month}-${date}">${eventDate.toLocaleString(`en-US`, {day: `numeric`, month: `short`})}</time>
        </div>

        <ul class="trip-events__list">
          ${value.map((item) => event(item)).join(``)}
        </ul>
      </li>
    `);
  }
  return result.join(``);
};

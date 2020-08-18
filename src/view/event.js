import {addZero, shuffleArray} from '../utils';

const getEventTypeEnding = (type) => {
  const exclude = [`check-in`, `sightseeing`, `restaurant`];

  return exclude.includes(type.toLowerCase())
    ? `${type[0].toUpperCase()}${type.slice(1)} in`
    : `${type[0].toUpperCase()}${type.slice(1)} to`;
};

const renderOffer = (offer) => {
  const {title, price} = offer;
  console.log(title, price);
  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>
  `;
};

const getHoursAndMinutes = (timeObject) => {
  return {
    minutes: addZero(timeObject.getMinutes()),
    hours: addZero(timeObject.getHours()),
  };
};

const getEventTimeDiff = (startTime, endTime) => {
  const start = startTime.getTime();
  const end = endTime.getTime();

  let sec = Math.abs(end - start) / 1000;
  const result = {};
  const s = {
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  Object.keys(s).forEach((key) => {
    result[key] = Math.floor(sec / s[key]);
    sec -= result[key] * s[key];
  });
  return result;
};

const renderTimeDiff = (diffObj) => {
  const {day, hour, minute} = diffObj;
  let result = ``;
  if (day) {
    result += addZero(day) + `D `;
  }
  if (hour) {
    result += addZero(hour) + `H `;
  }
  if (minute) {
    result += addZero(minute) + `M`;
  }
  return result;
};

export const createEventTemplate = (obj) => {
  const {
    type,
    town,
    options,
    price,
    dateFrom,
    dateTo,
  } = obj;

  const titleTextDirection = getEventTypeEnding(type);
  const eventOffers = (limit) => {
    const result = [];
    const items = shuffleArray(options.slice(0, limit));
    items.map((item) => {
      result.push(renderOffer(item));
    });
    return result.join(``);
  };
  const startTime = getHoursAndMinutes(dateFrom);
  const endTime = getHoursAndMinutes(dateTo);
  const timeDiff = getEventTimeDiff(dateFrom, dateTo);

  return (`
    <div class="event">
      <div class="event__type">
        <img
          class="event__type-icon"
          width="42"
          height="42"
          src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${titleTextDirection} ${town}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${startTime.hours}:${startTime.minutes}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${endTime.hours}:${endTime.minutes}</time>
        </p>
        <p class="event__duration">${renderTimeDiff(timeDiff)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${eventOffers(3)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  `);
};

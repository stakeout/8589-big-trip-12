const someFn = (type) => {
  const exclude = [`check-in`, `sightseeing`, `restaurant`];

  return exclude.includes(type.toLowerCase())
    ? `${type} in`
    : `${type} to`;
};

const renderOffers = (options) => {
  return options.map(({title, price}) => `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>
  `).join(``);
};

const getHoursAndMinutes = (timeObject) => {
  return {
    minutes: timeObject.getMinutes(),
    hours: timeObject.getHours(),
  };
};

const getEventTimeDiff = (startTime, endTime) => {
  const start = startTime.getTime();
  const end = endTime.getTime();

  let sec = Math.abs(end - start) / 1000;
  const result = {};                                                                // result
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

export const createEventTemplate = (obj) => {
  const {
    type,
    town,
    options,
    price,
    dateFrom,
    dateTo,
  } = obj;

  const titleTextDirection = someFn(type);
  const eventOffers = renderOffers(options);
  const startTime = getHoursAndMinutes(dateFrom);
  const endTime = getHoursAndMinutes(dateTo);
  const timeDiff = getEventTimeDiff(dateFrom, dateTo);

  const addZero = (digit) => {
    return digit < 10
      ? `0` + digit
      : digit;
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
        ${eventOffers}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  `);
};

const renderFormEventOffers = (options) => {

  return options.length
    ? `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${options.map(({id, title, price}) => `
          <div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}">
            <label class="event__offer-label" for="event-offer-${id}-1">
              <span class="event__offer-title">${title}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${price}</span>
            </label>
          </div>
        `).join(``)}
        </div>
      </section>`
    : ``;
};

const renderFormEventDescription = (description) => {
  const {text, photos} = description;

  return text !== `` && photos.length
    ? `
      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${text}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photos.map((src) => `
              <img class="event__photo" src="${src}" alt="Event photo">
            `).join(``)}
          </div>
        </div>
      </section>`
    : ``;
};

export const createEventDetails = (options, description) => {
  const eventOffers = renderFormEventOffers(options);
  const eventDescription = renderFormEventDescription(description);
  return (`
    <section class="event__details">
      ${eventOffers}

      ${eventDescription}
    </section>
  `);
};

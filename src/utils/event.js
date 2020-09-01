const getCurrentDate = () => {
  const currentDate = new Date();

  return currentDate;
};

const humanizeEventDate = (dateObject) => {
  return dateObject.toLocaleString(`en-US`, {day: `numeric`, month: `short`});
};


const isFutureEvent = (dateFrom) => {

  const currentDate = getCurrentDate();

  return currentDate.getTime() < dateFrom.getTime();
};

const isPastEvent = (dateTo) => {

  const currentDate = getCurrentDate();

  return currentDate.getTime() > dateTo.getTime();
};

const getEventsByDay = (arrayOfMocks) => {
  const eventsList = new Map();
  arrayOfMocks.forEach((eventItem) => {
    const dateFrom = eventItem.dateFrom;
    const eventDate = new Date(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate());
    const key = eventDate.getTime();
    if (!eventsList.has(key)) {
      eventsList.set(key, []);
    }
    eventsList.get(key).push(eventItem);
  });
  return eventsList;
};

const flatpickrOptions = {
  enableTime: true,
  // eslint-disable-next-line camelcase
  time_24hr: true,
  altInput: true,
  altFormat: `d/m/y H:i`,
  dateFormat: `d/m/y H:i`,
  minDate: `today`,
  onReady(selectedDates, dateStr, instance) {
    instance._input.placeholder = instance.formatDate(new Date(), `d/m/y H:i`);
  },
};

const sortEventsByTime = (a, b) => (b.dateTo.getTime() - b.dateFrom.getTime()) - (a.dateTo.getTime() - a.dateFrom.getTime());
const sortEventsByCost = (a, b) => b.price - a.price;

export {
  getCurrentDate,
  humanizeEventDate,
  isFutureEvent,
  isPastEvent,
  getEventsByDay,
  flatpickrOptions,
  sortEventsByTime,
  sortEventsByCost,
};

import flatpickr from "flatpickr";
import {renderHtmlElement, calendars} from './utils';
import {createTripInfoTemplate as info} from './view/info';
import {createTripCostTemplate as cost} from './view/cost';
import {createTripSortsTemplate as sort} from './view/sort';
import {createTripTabsTemplate as tabs} from './view/tabs';
import {createTripFiltersTemplate as filter} from './view/filter';
import {createTripDayItemTemplate as eventContainer} from './view/event-container';
import {createEventTemplate as event} from './view/event';
import {createTripFormTemplate as form} from './view/form';
import {createEventTemplate} from './mocks/event';

const EVENT_AMOUNT = 10;
const tripContainer = document.querySelector(`.trip-main`);
const tripInfo = tripContainer.querySelector(`.trip-info`);
const tripControls = tripContainer.querySelector(`.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripDaysContainer = tripEventsContainer.querySelector(`.trip-days`);

const events = new Array(EVENT_AMOUNT).fill().map(createEventTemplate);
console.log(events);

const tripStartDate = events[0].dateFrom;
const tripEndDate = events[events.length - 1].dateTo;
// set last event mpnth for comparison
tripEndDate.setMonth(11);

const addTripEvents = () => {
  const container = document.querySelector(`.trip-events__list`);
  const length = events.length - 1;
  for (let i = 1; i <= length; i += 1) {
    renderHtmlElement(container, event(events[i]), `beforeend`);
  }
};

// render elems
renderHtmlElement(tripInfo, info(tripStartDate, tripEndDate), `beforeend`);
renderHtmlElement(tripInfo, cost(), `beforeend`);
renderHtmlElement(tripControls, tabs(), `beforeend`);
renderHtmlElement(tripControls, filter(), `beforeend`);
renderHtmlElement(tripDaysContainer, sort(), `beforebegin`);
renderHtmlElement(tripDaysContainer, form(events[0]), `beforebegin`); // remove attribute from form() to have default form data
renderHtmlElement(tripDaysContainer, eventContainer(), `beforeend`);
addTripEvents();

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

const startDateEventField = flatpickr(`#event-start-time-1`, flatpickrOptions);
const endDateEventField = flatpickr(`#event-end-time-1`, flatpickrOptions);



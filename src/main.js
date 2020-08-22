import flatpickr from "flatpickr";
import {renderTemplate, render, RenderPosition} from './utils';
import TripInfoView from './view/info';
import TripCostView from './view/cost';
import FilterEventsView from './view/filter';
import TripContainerView from './view/trip-container';
import SortEventsView from './view/sort';

import {createTripTabsTemplate as tabs} from './view/tabs';
import {createTripDayItemTemplate as eventContainer} from './view/event-container';
import {createTripFormTemplate as form} from './view/form';
import {createEventTemplate} from './mocks/event';
import {generateFilter} from './mocks/filters';

const EVENT_AMOUNT = 20;
const tripContainer = document.querySelector(`.trip-main`);
const tripInfo = tripContainer.querySelector(`.trip-info`);
const tripControls = tripContainer.querySelector(`.trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
// const tripEventsContainer = document.querySelector(`.trip-events`);
// const tripDaysContainer = tripEventsContainer.querySelector(`.trip-days`);


const events = new Array(EVENT_AMOUNT).fill().map(createEventTemplate);
const filters = generateFilter(events);

const filterComponent = new FilterEventsView(filters);
const tripComponnet = new TripContainerView();
// console.log(tripContainerElement);

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

const tripStartDate = events[0].dateFrom;
const tripEndDate = events[events.length - 1].dateTo;
// set last event mpnth for comparison
tripEndDate.setMonth(11);

// render elems
render(tripInfo, new TripInfoView(tripStartDate, tripEndDate).getElement(), RenderPosition.BEFOREEND);
render(tripInfo, new TripCostView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(tripControls, tabs(), `beforeend`);
render(tripControls, filterComponent.getHeaderElement(), RenderPosition.BEFOREEND);
render(tripControls, filterComponent.getElement(), RenderPosition.BEFOREEND);
render(pageMainElement.firstElementChild, tripComponnet.getElement(), RenderPosition.AFTERBEGIN);
render(tripComponnet.getElement(), tripComponnet.getHeaderElement(), RenderPosition.AFTERBEGIN);
render(tripComponnet.getElement(), new SortEventsView().getElement(), RenderPosition.BEFOREEND);
// renderTemplate(tripDaysContainer, form(events[0]), `beforebegin`); // remove attribute from form() to have default form data
// renderTemplate(tripDaysContainer, eventContainer(getEventsByDay(events)), `beforeend`);

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



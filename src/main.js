import {renderHtmlElement} from './utils';
import {createTripInfoTemplate as info} from './view/info';
import {createTripCostTemplate as cost} from './view/cost';
import {createTripSortsTemplate as sort} from './view/sort';
import {createTripTabsTemplate as tabs} from './view/tabs';
import {createTripFiltersTemplate as filter} from './view/filter';
import {createTripDayItemTemplate as eventContainer} from './view/event-container';
import {createEventTemplate as event} from './view/event';
import {createTripFormTemplate as form} from './view/form';

const EVENT_AMOUNT = 3;
const tripContainer = document.querySelector(`.trip-main`);
const tripInfo = tripContainer.querySelector(`.trip-info`);
const tripControls = tripContainer.querySelector(`.trip-controls`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripDaysContainer = tripEventsContainer.querySelector(`.trip-days`);

const addTripEvents = (amount) => {
  const container = document.querySelector(`.trip-events__list`);
  for (let i = 0; i < amount; i += 1) {
    renderHtmlElement(container, event(), `beforeend`);
  }
};

// render elems
renderHtmlElement(tripInfo, info(), `beforeend`);
renderHtmlElement(tripInfo, cost(), `beforeend`);
renderHtmlElement(tripControls, tabs(), `beforeend`);
renderHtmlElement(tripControls, filter(), `beforeend`);
renderHtmlElement(tripDaysContainer, sort(), `beforebegin`);
renderHtmlElement(tripDaysContainer, form(), `beforebegin`);
renderHtmlElement(tripDaysContainer, eventContainer(), `beforeend`);
addTripEvents(EVENT_AMOUNT);

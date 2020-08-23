import flatpickr from "flatpickr";
import {render, RenderPosition, getEventsByDay, flatpickrOptions} from './utils';
import TripInfoView from './view/info';
import TripCostView from './view/cost';
import TripTabsView from './view/tabs';
import FilterEventsView from './view/filter';
import TripContainerView from './view/trip-container';
import SortEventsView from './view/sort';
import TripDaysContainerView from './view/trip-days-container';
import TripDayItemView from './view/trip-day-item';
import TripDayInfoView from './view/trip-day-info';
import TripEventsListView from './view/trip-events-list';
import EventView from './view/event';

import EditFormView from './view/form';
import {createEventTemplate} from './mocks/event';
import {generateFilter} from './mocks/filters';

const EVENT_AMOUNT = 20;
const tripContainer = document.querySelector(`.trip-main`);
const tripInfo = tripContainer.querySelector(`.trip-info`);
const tripControls = tripContainer.querySelector(`.trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);

const events = new Array(EVENT_AMOUNT).fill().map(createEventTemplate);
const filters = generateFilter(events);
const eventsByDays = getEventsByDay(events);
console.log(eventsByDays)

const tabsComponent = new TripTabsView();
const filterComponent = new FilterEventsView(filters);
const tripComponet = new TripContainerView();
const tripDaysComponent = new TripDaysContainerView();

// console.log(tripContainerElement);


const tripStartDate = events[0].dateFrom;
const tripEndDate = events[events.length - 1].dateTo;
// set last event mpnth for comparison
tripEndDate.setMonth(11);

// render elems
render(tripInfo, new TripInfoView(tripStartDate, tripEndDate).getElement(), RenderPosition.BEFOREEND);
render(tripInfo, new TripCostView().getElement(), RenderPosition.BEFOREEND);
render(tripControls, tabsComponent.getHeaderElement(), RenderPosition.BEFOREEND);
render(tripControls, tabsComponent.getElement(), RenderPosition.BEFOREEND);
render(tripControls, filterComponent.getHeaderElement(), RenderPosition.BEFOREEND);
render(tripControls, filterComponent.getElement(), RenderPosition.BEFOREEND);
render(pageMainElement.firstElementChild, tripComponet.getElement(), RenderPosition.AFTERBEGIN);
render(tripComponet.getElement(), tripComponet.getHeaderElement(), RenderPosition.AFTERBEGIN);
render(tripComponet.getElement(), new SortEventsView().getElement(), RenderPosition.BEFOREEND);
render(tripComponet.getElement(), tripDaysComponent.getElement(), RenderPosition.BEFOREEND);

const renderEvent = (eventListContainer, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EditFormView(event);

  const replaceCardToForm = () => {
    eventComponent.getElement().replaceWith(eventEditComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventEditComponent.getElement().replaceWith(eventComponent.getElement());
  };
  const setFlatPicker = () => {
    const startDateEventField = flatpickr(`#event-start-time-1`, flatpickrOptions);
    const endDateEventField = flatpickr(`#event-end-time-1`, flatpickrOptions);
    return [startDateEventField, endDateEventField];
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onFormSubmit = () => {
    eventEditComponent.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    setFlatPicker();
    onFormSubmit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });


  render(eventListContainer, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripDay = (date, arrayOfEvents, index) => {
  const tripDayItemComponent = new TripDayItemView();
  const tripDayInfoComponent = new TripDayInfoView(date, index);
  const tripEventsListComponent = new TripEventsListView();

  render(tripDaysComponent.getElement(), tripDayItemComponent.getElement(), RenderPosition.BEFOREEND);
  render(tripDayItemComponent.getElement(), tripDayInfoComponent.getElement(), RenderPosition.BEFOREEND);
  render(tripDayItemComponent.getElement(), tripEventsListComponent.getElement(), RenderPosition.BEFOREEND);
  arrayOfEvents.forEach((event) => renderEvent(tripEventsListComponent.getElement(), event));
};

Array.from(eventsByDays).forEach(([key, value], index) => {
  renderTripDay(key, value, index);
});

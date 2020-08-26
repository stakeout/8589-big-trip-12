import flatpickr from "flatpickr";
import {render, RenderPosition, replace} from './utils/render';
import {getEventsByDay, flatpickrOptions} from './utils/event';
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
import NoEventsView from './view/no-events';

import {createEventTemplate} from './mocks/event';
import {generateFilter} from './mocks/filters';

const EVENT_AMOUNT = 0;
const tripContainer = document.querySelector(`.trip-main`);
const tripInfo = tripContainer.querySelector(`.trip-info`);
const tripControls = tripContainer.querySelector(`.trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);

const events = new Array(EVENT_AMOUNT).fill().map(createEventTemplate);
const filters = generateFilter(events);
const eventsByDays = getEventsByDay(events);
// console.log(eventsByDays)
const tripStartDate = events.length ? events[0].dateFrom : ``;
const tripEndDate = events.length ? events[events.length - 1].dateTo : ``;
// set last event mpnth for comparison
// tripEndDate.setMonth(11);

const tabsComponent = new TripTabsView();
const filterComponent = new FilterEventsView(filters);
const tripComponet = new TripContainerView();
const tripDaysComponent = new TripDaysContainerView();
const tripInfoComponent = new TripInfoView(tripStartDate, tripEndDate, events);
const tripCostComponent = new TripCostView();

// console.log(tripContainerElement)

const renderEvent = (eventListContainer, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EditFormView(event);

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
    // eventComponent.getElement().replaceWith(eventEditComponent.getElement());
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
    // eventEditComponent.getElement().replaceWith(eventComponent.getElement());
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
    eventEditComponent.setSubmitEditEventHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  };

  eventComponent.setEditEventHandler(() => {
    replaceCardToForm();
    setFlatPicker();
    onFormSubmit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });


  render(eventListContainer, eventComponent, RenderPosition.BEFOREEND);
};

const renderTripDay = (date, arrayOfEvents, index) => {
  const tripDayItemComponent = new TripDayItemView();
  const tripDayInfoComponent = new TripDayInfoView(date, index);
  const tripEventsListComponent = new TripEventsListView();

  render(tripDaysComponent, tripDayItemComponent, RenderPosition.BEFOREEND);
  render(tripDayItemComponent, tripDayInfoComponent, RenderPosition.BEFOREEND);
  render(tripDayItemComponent, tripEventsListComponent, RenderPosition.BEFOREEND);
  arrayOfEvents.forEach((event) => renderEvent(tripEventsListComponent, event));
};

// render common elems. For TripInfoView set third argument, wich
render(tripInfo, tripInfoComponent.getElement(events), RenderPosition.BEFOREEND);
render(tripInfo, tripCostComponent, RenderPosition.BEFOREEND);
render(tripControls, tabsComponent.getHeaderElement(), RenderPosition.BEFOREEND);
render(tripControls, tabsComponent, RenderPosition.BEFOREEND);
render(tripControls, filterComponent.getHeaderElement(), RenderPosition.BEFOREEND);
render(tripControls, filterComponent, RenderPosition.BEFOREEND);
render(pageMainElement.firstElementChild, tripComponet, RenderPosition.AFTERBEGIN);
render(tripComponet, tripComponet.getHeaderElement(), RenderPosition.AFTERBEGIN);
// if no events was added, show a placeholder
if (!events.length) {
  const noEventsPlaceholder = new NoEventsView();
  render(tripComponet, noEventsPlaceholder, RenderPosition.BEFOREEND); // no events placeholder
} else {
  const sortEventsComponent = new SortEventsView();
  render(tripComponet, sortEventsComponent, RenderPosition.BEFOREEND);
  render(tripComponet, tripDaysComponent, RenderPosition.BEFOREEND);

  Array.from(eventsByDays).forEach(([key, value], index) => {
    renderTripDay(key, value, index);
  });
}

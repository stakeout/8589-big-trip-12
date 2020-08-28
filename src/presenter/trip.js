import flatpickr from "flatpickr";
import {render, RenderPosition, replace} from "../utils/render.js";
import {getEventsByDay, flatpickrOptions} from '../utils/event.js';

import TripContainerView from '../view/trip-container.js';
import SortEventsView from '../view/sort.js';
import TripDaysContainerView from '../view/trip-days-container.js';
import TripDayItemView from '../view/trip-day-item.js';
import TripDayInfoView from '../view/trip-day-info.js';
import TripEventsListView from '../view/trip-events-list.js';
import EventView from '../view/event.js';

import EditFormView from '../view/form.js';

export default class Trip {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;

    this._tripComponent = new TripContainerView();
    this._sortComponent = new SortEventsView();
    this._tripDaysComponent = new TripDaysContainerView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();

    render(this._boardContainer.firstElementChild, this._tripComponent, RenderPosition.AFTERBEGIN);
    render(this._tripComponent, this._tripComponent.getHeaderElement(), RenderPosition.AFTERBEGIN); // trip-events header

    this._renderBoard();
  }

  _handleSortTypeChange(sortType) {
    console.log(sortType);
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
  }

  _renderSort() {
    render(this._tripComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripDaysContainer() {
    render(this._tripComponent, this._tripDaysComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(eventsListContainer, event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EditFormView(event);

    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
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


    render(eventsListContainer, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderTripDay(date, dayEventsList, index) {
    const tripDayItemComponent = new TripDayItemView();
    const tripDayInfoComponent = new TripDayInfoView(date, index);
    const tripEventsListComponent = new TripEventsListView();

    render(this._tripDaysComponent, tripDayItemComponent, RenderPosition.BEFOREEND);
    render(tripDayItemComponent, tripDayInfoComponent, RenderPosition.BEFOREEND);
    render(tripDayItemComponent, tripEventsListComponent, RenderPosition.BEFOREEND);
    dayEventsList.forEach((event) => this._renderEvent(tripEventsListComponent, event));
  }

  _renderTripEventList() {
    this._eventsByDays = getEventsByDay(this._events.slice());

    Array.from(this._eventsByDays).forEach(([key, value], index) => {
      this._renderTripDay(key, value, index);
    });
  }

  _renderBoard() {

    this._renderSort();

    this._renderTripDaysContainer();

    this._renderTripEventList();
  }
}

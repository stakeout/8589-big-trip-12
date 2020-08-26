import {render, RenderPosition} from './utils/render';
import TripInfoView from './view/info';
import TripCostView from './view/cost';
import TripTabsView from './view/tabs';
import FilterEventsView from './view/filter';

import TripContainerView from './view/trip-container';
import NoEventsView from './view/no-events';

import {createEventTemplate} from './mocks/event';
import {generateFilter} from './mocks/filters';

import BoardPresenter from "./presenter/board.js";

const EVENT_AMOUNT = 20;
const tripContainer = document.querySelector(`.trip-main`);
const tripInfo = tripContainer.querySelector(`.trip-info`);
const tripControls = tripContainer.querySelector(`.trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);

const events = new Array(EVENT_AMOUNT).fill().map(createEventTemplate);
const filters = generateFilter(events);

const tripStartDate = events.length ? events[0].dateFrom : ``;
const tripEndDate = events.length ? events[events.length - 1].dateTo : ``;
// set last event month for comparison
tripEndDate.setMonth(11);

const tabsComponent = new TripTabsView();
const filterComponent = new FilterEventsView(filters);

const tripComponet = new TripContainerView();
const tripInfoComponent = new TripInfoView(tripStartDate, tripEndDate, events);
const tripCostComponent = new TripCostView();


render(tripInfo, tripInfoComponent.getElement(events), RenderPosition.BEFOREEND); // info
render(tripInfo, tripCostComponent, RenderPosition.BEFOREEND); // cost
render(tripControls, tabsComponent.getHeaderElement(), RenderPosition.BEFOREEND); // tabs header
render(tripControls, tabsComponent, RenderPosition.BEFOREEND); // tabs
render(tripControls, filterComponent.getHeaderElement(), RenderPosition.BEFOREEND); // filter header
render(tripControls, filterComponent, RenderPosition.BEFOREEND); // filter

// if no events was added, show a placeholder

const boardPresenter = new BoardPresenter(pageMainElement);

if (!events.length) {
  const noEventsPlaceholder = new NoEventsView();
  render(tripComponet, noEventsPlaceholder, RenderPosition.BEFOREEND); // no events placeholder
} else {
  boardPresenter.init(events);
}

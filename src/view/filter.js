import {createElement} from '../utils';

const createTripFilterItemTemplate = (filter, isChecked) => {
  const {name} = filter;

  return `<div class="trip-filters__filter">
      <input
      id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${name}"
      ${isChecked ? `checked` : ``}
      >
      <label
      class="trip-filters__filter-label"
      for="filter-${name}">
      ${name[0].toUpperCase()}${name.slice(1)}
      </label>
    </div>`
  ;
};

const createHeaderTemplate = () => {
  return `<h2 class="visually-hidden">Filter events</h2>`;
};

const createTripFiltersTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createTripFilterItemTemplate(filter, index === 0))
    .join(``);

  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export default class FilterEvents {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
    this._header = null;
  }

  _headerTemplate() {
    return createHeaderTemplate();
  }

  _getTemplate() {
    return createTripFiltersTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  getHeaderElement() {
    if (!this._header) {
      this._header = createElement(this._headerTemplate());
    }

    return this._header;
  }

  removeElement() {
    this._element = null;
  }
}

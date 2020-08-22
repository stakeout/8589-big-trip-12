export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const fragment = document.createRange().createContextualFragment(template);

  return fragment;
};

export const getRandomInteger = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getCurrentDate = () => {
  const currentDate = new Date();

  return currentDate;
};

export const shuffleArray = (array) => {
  const length = array.length - 1;
  for (let i = length; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getRandomBoolean = () => Math.random() >= 0.5;

export const humanizeEventDate = (dateObject) => {
  return dateObject.toLocaleString(`en-US`, {day: `numeric`, month: `short`});
};

export const addZero = (digit) => {
  return digit < 10
    ? `0` + digit
    : digit;
};

export const isFutureEvent = (dateFrom) => {

  const currentDate = getCurrentDate();

  return currentDate.getTime() < dateFrom.getTime();
};

export const isPastEvent = (dateTo) => {

  const currentDate = getCurrentDate();

  return currentDate.getTime() > dateTo.getTime();
};

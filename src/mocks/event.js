import {getRandomInteger, getCurrentDate, shuffleArray} from '../utils';

const PHOTOS_AMOUNT = 5;

const towns = [
  `Мадрид`,
  `Бомбей`,
  `Оттава`,
  `Варашава`,
  `Венеция`,
  `Париж`,
  `Хабаровск`,
];

const offers = {
  Taxi: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Train: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Ship: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Transport: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Drive: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Flight: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  [`Check-in`]: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Sightseeing: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
  Restaurant: [
    {
      id: `luggage`,
      title: `Add luggage`,
      price: 30,
    },
    {
      id: `comfort`,
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      id: `meal`,
      title: `Add meal`,
      price: 15,
    },
    {
      id: `seats`,
      title: `Choose seats`,
      price: 5,
    },
    {
      id: `train`,
      title: `Travel by train`,
      price: 30,
    },
  ],
};

const photoSrc = () => {
  return `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`;
};

const eventDescriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const createPhotosArray = new Array(PHOTOS_AMOUNT).fill().map(photoSrc);

const generateFromDate = () => {

  const maxDaysGap = 7;
  const daysGap = getRandomInteger(0, maxDaysGap);
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() - daysGap);
  currentDate.setHours(currentDate.getHours() - daysGap);
  currentDate.setMinutes(currentDate.getMinutes() - daysGap);

  return currentDate;
};

const generateToDate = () => {

  const maxDaysGap = 4;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap) / 2;
  const currentDate = new Date();

  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate.setHours(currentDate.getHours() + daysGap);
  currentDate.setMinutes(currentDate.getMinutes() + daysGap);

  return currentDate;
};

export const createEventTemplate = () => {
  const types = Object.keys(offers);
  const type = types[getRandomInteger(0, types.length - 1)];
  const town = towns[getRandomInteger(0, towns.length - 1)];
  const options = offers[type].slice(0, getRandomInteger(0, offers[type].length - 1));
  const textShallow = shuffleArray(eventDescriptionText.split(`.`).slice());
  const text = textShallow
    .slice(0, getRandomInteger(1, textShallow.length - 1))
    .join(`.`);
  const photos = createPhotosArray;
  const price = [30, 50, 70, 100][getRandomInteger(0, 3)];
  const dateFrom = generateFromDate();
  const dateTo = generateToDate();

  return {
    type,
    town,
    options,
    price,
    description: {
      text,
      photos,
    },
    dateFrom,
    dateTo,
  };
};

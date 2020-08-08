import {getRandomInteger, getCurrentDate} from '../utils';

const PHOTOS_AMOUNT = 5;
const types = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check`,
  `sightseeing`,
  `restaurant`,
];

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
  taxi: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  train: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  ship: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  transport: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  drive: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  flight: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  check: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  sightseeing: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
  restaurant: [
    {
      title: `Add luggage`,
      price: 30,
    },
    {
      title: `Switch to comfort class`,
      price: 100,
    },
    {
      title: `Add meal`,
      price: 15,
    },
    {
      title: `Choose seats`,
      price: 5,
    },
    {
      title: `Travel by train`,
      price: 30,
    },
  ],
};

const photoSrc = () => {
  return `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`;
};

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const createPhotosArray = new Array(PHOTOS_AMOUNT).fill().map(photoSrc);


export const createEventTemplate = () => {
  const type = types[getRandomInteger(0, types.length - 1)];
  const town = towns[getRandomInteger(0, towns.length - 1)];
  const options = offers[type].slice(0, getRandomInteger(0, offers[type].length - 1));
  const descriptionText = description
                        .split(`.`)
                        .map((item) => item.trim())
                        .slice(0, getRandomInteger(1, description.length - 1))
                        .join(`. `);
  const photos = createPhotosArray;

  return {
    type,
    town,
    options,
    description: {
      descriptionText,
      photos,
    },
    time: getCurrentDate(),
  };
};

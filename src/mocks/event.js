import {getRandomInteger, getCurrentDate} from '../utils';

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
  Train: [
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
  Ship: [
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
  Transport: [
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
  Drive: [
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
  Flight: [
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
  [`Check-in`]: [
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
  Sightseeing: [
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
  Restaurant: [
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
  const types = Object.keys(offers);
  const type = types[getRandomInteger(0, types.length - 1)];
  const town = towns[getRandomInteger(0, towns.length - 1)];
  const options = offers[type].slice(0, getRandomInteger(0, offers[type].length - 1));
  const descriptionText = description
                        .split(`.`)
                        .slice(0, getRandomInteger(1, description.length - 1))
                        .join(`.`);
  const photos = createPhotosArray;
  const price = [30, 50, 70, 100][getRandomInteger(0, 3)];

  return {
    type,
    town,
    options,
    price,
    description: {
      descriptionText,
      photos,
    },
    time: getCurrentDate(),
  };
};

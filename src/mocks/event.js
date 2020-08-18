import {TOWNS, PHOTOS_AMOUNT, EVENT_TYPES} from '../consts';
import {getRandomInteger, getRandomBoolean, shuffleArray} from '../utils';

const startEvent = new Date(Date.now());
const startEventTimestamp = startEvent.getTime();
const maxEventDurationDays = 2;
const eventDurationMiliseconds = maxEventDurationDays * 24 * 60 * 60 * 1000;
const endDayTimestamp = getRandomInteger(startEventTimestamp, startEventTimestamp + eventDurationMiliseconds);
let tempStartEvent = startEventTimestamp;

const getEventDateTo = () => {
  const tempEndPoint = getRandomInteger(tempStartEvent, Math.floor(tempStartEvent + (endDayTimestamp - tempStartEvent) / 2));

  tempStartEvent = tempEndPoint + 120 * 60000; // add 120 minutes for each event start time

  return tempEndPoint;
};

const offers = [
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
];


const photoSrc = () => {
  return `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`;
};

const eventDescriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const createPhotosArray = new Array(PHOTOS_AMOUNT).fill().map(photoSrc);

export const createEventTemplate = () => {
  const types = [...EVENT_TYPES.to, ...EVENT_TYPES.in];
  const type = types[getRandomInteger(0, types.length - 1)];
  const town = TOWNS[getRandomInteger(0, TOWNS.length - 1)];
  const options = offers.slice(0, getRandomInteger(0, offers.length));
  const textShallow = shuffleArray(eventDescriptionText.split(`.`).slice());
  const text = textShallow
    .slice(0, getRandomInteger(1, textShallow.length - 1))
    .join(`.`);
  const photos = createPhotosArray;
  const price = [30, 50, 70, 100][getRandomInteger(0, 3)];
  const dateFrom = new Date(tempStartEvent);
  const dateTo = new Date(getEventDateTo());
  const isFavorite = getRandomBoolean();

  return {
    type,
    town,
    options,
    price,
    isFavorite,
    description: {
      text,
      photos,
    },
    dateFrom,
    dateTo,
  };
};

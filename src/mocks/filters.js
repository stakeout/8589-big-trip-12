import {isFutureEvent, isPastEvent} from "../utils";

const eventsToFilterMap = {
  everything: (events) => events.slice(),
  future: (events) => events
    .filter((event) => isFutureEvent(event.dateFrom)),
  past: (events) => events
    .filter((event) => isPastEvent(event.dateTo)),
};

export const generateFilter = (events) => {
  return Object.entries(eventsToFilterMap).map(([filterName, arrayOfEvents]) => {
    return {
      name: filterName,
      arr: arrayOfEvents(events),
    };
  });
};

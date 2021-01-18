import moment from 'moment-timezone';

export default function sort(data) {
  return data
    .sort((a, b) => {
      /* eslint-disable no-else-return */
      const tz = moment.tz.guess();
      const dueDateA = new Date(a.dueDate);
      const dueDateB = new Date(b.dueDate);

      if (moment.tz(dueDateA, tz).isSame(moment.tz(dueDateB, tz))) {
        return 0;
      } else if (a.dueDate === null) {
        return 1;
      } else if (b.dueDate === null) {
        return -1;
      } else if (
        moment.tz(dueDateA, tz).isBefore(moment.tz(dueDateB, tz))
      ) {
        return -1;
      } else if (
        moment.tz(dueDateA, tz).isAfter(moment.tz(dueDateB, tz))
      ) {
        return 1;
      }

      return 0;
    })
    .sort((a, b) => Number(a.isComplete) - Number(b.isComplete));
}

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import styles from './listItem.styles.css';

const ListItem = forwardRef(({ item, completeItem }, ref) => {
  const completionStates = {
    completed: 'completed',
    overdue: 'overdue',
  };

  const formatDate = (date) => {
    if (date) {
      const tz = moment.tz.guess();
      const dueDate = new Date(date);
      const formattedDueDate = moment.tz(dueDate, tz);
      return formattedDueDate.format('L');
    }
    return '';
  };

  const colorCodeItem = (todo) => {
    if (todo && todo.dueDate) {
      const tz = moment.tz.guess();
      const today = new Date();
      const dueDate = new Date(todo.dueDate);

      if (
        moment.tz(dueDate, tz).isBefore(moment.tz(today, tz)) &&
        !todo.isComplete
      ) {
        return styles[`${completionStates.overdue}`];
      }
    }

    return todo.isComplete
      ? styles[`${completionStates.completed}`]
      : '';
  };

  return (
    <div
      key={item.id}
      className={`${styles.listItem} ${colorCodeItem(item)}`}
      ref={ref}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        onChange={completeItem}
        id={item.id}
        checked={item.isComplete ? 'checked' : ''}
      />
      <p className={styles.description}>{item.description}</p>
      <p className={styles.date}>{formatDate(item.dueDate)}</p>
    </div>
  );
});

ListItem.propTypes = {
  completeItem: PropTypes.func.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isComplete: PropTypes.bool.isRequired,
    dueDate: PropTypes.string,
  }).isRequired,
};

export default ListItem;

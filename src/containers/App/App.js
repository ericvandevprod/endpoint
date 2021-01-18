import React, { createRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Actions from '../../constants/actions';
import agent from '../../agent';
import sort from '../../helpers/sort';

import styles from './app.styles.css';
import List from '../List/List';
import ListItem from '../../components/ListItem/ListItem';

const mapStateToProps = (state) => ({
  ...state.todo,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) =>
    dispatch({ type: Actions.GET_ALL_TODOS, payload }),
  onUpdate: (payload) =>
    dispatch({ type: Actions.UPDATE_TODO, payload }),
});

const App = ({ todos, onLoad, onUpdate }) => {
  useEffect(() => {
    onLoad(agent.Todos.getAll());
  }, []);

  const completeItem = (e) => {
    const item = todos.filter((t) => t.id === e.target.id);
    const update = {
      isComplete: !item[0].isComplete,
    };
    onUpdate(
      agent.Todos.updateOne(e.target.id, update).then((d) => {
        if (d && d.status && d.status === 'success') {
          return Promise.resolve({
            ...item[0],
            ...update,
          });
        }
        return Promise.resolve(d);
      })
    );
  };

  return (
    <div className={styles.screen}>
      <div className={styles.list}>
        <List>
          {sort(todos).map((t) => (
            <ListItem
              key={t.id}
              ref={createRef()}
              item={t}
              completeItem={completeItem}
            />
          ))}
        </List>
      </div>
    </div>
  );
};

App.defaultProps = {
  todos: [],
};

App.propTypes = {
  onLoad: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
      dueDate: PropTypes.string,
    })
  ),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

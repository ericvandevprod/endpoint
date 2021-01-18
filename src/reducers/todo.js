import { merge, pick, findIndex, slice } from 'lodash';
import Actions from '../constants/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case Actions.GET_ALL_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case Actions.UPDATE_TODO:
      /* eslint-disable no-case-declarations */
      const updatedTodoId = pick(action.payload, 'id');
      const indexOfNewTodo = findIndex(state.todos, updatedTodoId);
      const updateNewTodo = merge(
        {},
        state.todos[indexOfNewTodo],
        action.payload
      );
      const newTodosList = [
        ...slice(state.todos, 0, indexOfNewTodo),
        updateNewTodo,
        ...slice(state.todos, indexOfNewTodo + 1, state.todos.length),
      ];

      return {
        ...state,
        todos: newTodosList,
      };
    default:
      return state;
  }
};

import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from '../middleware/promiseMiddleware';
import reducers from '../reducers';

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(promiseMiddleware);
  }
  return applyMiddleware(promiseMiddleware, createLogger());
};

const store = createStore(reducers, getMiddleware());

export default store;

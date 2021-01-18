const isPromise = (v) => v && typeof v.then === 'function';

const promiseMiddleware = (store) => (next) => (action) => {
  if (isPromise(action.payload)) {
    action.payload.then(
      (res) => {
        if (process.env.NODE_ENV !== 'production') {
          // console.log('RESULT', res);
        }
        /* eslint-disable no-param-reassign */
        action.payload = res;
        store.dispatch(action);
      },
      (error) => {
        if (process.env.NODE_ENV !== 'production') {
          // console.log('ERROR', error);
        }

        /* eslint-disable no-param-reassign */
        action.error = true;
        action.payload = error.response.body;
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

export default promiseMiddleware;

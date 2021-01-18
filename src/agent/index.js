import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const { API_ROOT } = process.env;

// const encode = encodeURIComponent;
const responseBody = (res) => res.body;

const tokenPlugin = (req) => {
  req.set('Content-Type', 'application/json');
  req.set('X-Api-Key', process.env.API_KEY);
};

const requests = {
  del: (url) =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: (url) =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  patch: (url, body) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

const Todos = {
  getAll: () => requests.get('/get'),
  updateOne: (id, update) =>
    requests.patch(`/patch/${id}`, { ...update }),
};

export default {
  Todos,
};

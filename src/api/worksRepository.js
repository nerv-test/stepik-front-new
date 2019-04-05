import Repository from './Repository';

const resource = 'v1/reviews';
export default {
  get(payload) {
    return Repository.get(`${resource}/`, payload);
  },

  getWork(workId, payload) {
    return Repository.get(`${resource}/${workId}/`, payload);
  },

  addWork(data) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return Repository.post('v1/works/', data, config);
  },

  addReview(payload) {
    return Repository.post(`${resource}/`, payload);
  },
};

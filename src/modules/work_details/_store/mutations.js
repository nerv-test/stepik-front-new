const SET_WORK = (state, work) => {
  state.work = work;
};

const RESET_WORK = (state) => {
  state.work = null;
};

const SET_REVIEW = (state, review) => {
  state.work.reviews = { ...review };
  state.work.status = 'reviewed';
};

export default {
  SET_WORK,
  RESET_WORK,
  SET_REVIEW,
};

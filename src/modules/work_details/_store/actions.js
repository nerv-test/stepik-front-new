import { RepositoryFactory } from '@/api/RepositoryFactory';

const WorksRepository = RepositoryFactory.get('works');

const getWorkDetails = async ({ state, commit }, { workId }) => {
  if (state.work !== null && String(state.work.id) === String(workId)) return;
  commit('RESET_WORK');
  const response = await WorksRepository.getWork(workId);
  commit('SET_WORK', response.data);
};

const setReview = async ({ commit }, review) => {
  const response = await WorksRepository.addReview(review);
  commit('SET_REVIEW', response.data);
};

export default {
  getWorkDetails,
  setReview,
};

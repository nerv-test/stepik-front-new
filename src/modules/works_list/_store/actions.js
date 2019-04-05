import { RepositoryFactory } from '@/api/RepositoryFactory';

const WorksRepository = RepositoryFactory.get('works');

const getWorkList = async ({ commit }) => {
  const response = await WorksRepository.get();
  commit('SET_WORKS', response.data);
};

export default {
  getWorkList,
};

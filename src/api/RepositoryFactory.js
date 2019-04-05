import WorksRepository from './worksRepository';

const repositories = {
  works: WorksRepository,
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name],
};

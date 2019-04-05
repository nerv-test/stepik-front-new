const onModeration = (state) => {
  if (state.works) {
    return state.works.filter(i => i.status === 'on-moderation');
  }
  return null;
};

const reviewed = (state) => {
  if (state.works) {
    return state.works.filter(i => i.status === 'reviewed');
  }
  return null;
};

export default {
  onModeration,
  reviewed,
};

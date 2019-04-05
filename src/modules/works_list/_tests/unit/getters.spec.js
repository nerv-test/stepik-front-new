import getters from '@/modules/works_list/_store/getters';

const state = {
  works: [
    {
      "id": 1,
      "created": "2019-03-10T14:54:51.473008+03:00",
      "modified": "2019-03-12T06:10:58.760878+03:00",
      "username": "username",
      "email": "stepik@stepik.stepik",
      "status": "reviewed",
      "reviews": {
        "id": 1,
        "created": "2019-03-12T06:10:58.722043+03:00",
        "modified": "2019-03-12T06:10:58.777846+03:00",
        "first_score": 0,
        "second_score": 0,
        "third_score": 0
      }
    },
    {
      "id": 2,
      "created": "2019-03-10T14:55:17.162331+03:00",
      "modified": "2019-03-12T06:19:45.905253+03:00",
      "username": "username",
      "email": "stepik@stepik.stepik",
      "status": "on-moderation",
      "reviews": null
    },
  ],
};

describe('works_list getters', () => {
  it('onModeration getter', () => {
    expect(getters.onModeration(state).length).toBe(1);
  });

  it('reviewed getter', () => {
    expect(getters.reviewed(state).length).toBe(1);
  });
});

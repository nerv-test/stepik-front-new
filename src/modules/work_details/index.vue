<template>
  <div class="col-sm-8 col-sm-offset-2" v-if="work">
    <h3>Проверка работы</h3>
    <p class="alert alert-success" v-if="isSubmitted">Изменения сохранены</p>
    <AppImage v-for="image in work.images" :key="image.id" :image="image.image"/>
    <p class="form-label">Имя участника</p>
    <AppInput :value="work.username" type="text" placeholder="username" read-only/>
    <br>
    <p class="form-label">Электропочта</p>
    <AppInput :value="work.email" type="text" placeholder="Email" read-only/>
    <br>
    <form @submit.prevent="addReview">
      <div class="row">
        <div class="col-xs-4">
          <p>Первая оценка</p>
          <AppInput v-model="_firstScore" type="number" placeholder="Первая оценка" :read-only="work.status === 'reviewed'"/>
        </div>
        <div class="col-xs-4">
          <p>Вторая оценка</p>
          <AppInput v-model="_secondScore" type="number" placeholder="Вторая оценка" :read-only="work.status === 'reviewed'"/>
        </div>
        <div class="col-xs-4">
          <p>Третья оценка</p>
          <AppInput v-model="_thirdScore" type="number" placeholder="Третья оценка" :read-only="work.status === 'reviewed'"/>
        </div>
      </div>
      <br>
      <AppBtn use="success" type="submit" :disabled="isSubmitting || isSubmitted" v-if="work.status !== 'reviewed'">Оценить</AppBtn>
    </form>
    <br>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppBtn from '@/app/components/ui/AppBtn.vue';
import AppInput from '@/app/components/ui/AppInput.vue';
import AppImage from '@/app/components/AppImage.vue';

import store from './_store';

const STORE_KEY = '$_work-details';

export default {
  name: 'WorkDetails',
  components: {
    AppBtn,
    AppInput,
    AppImage,
  },
  data() {
    return {
      firstScore: 0,
      secondScore: 0,
      thirdScore: 0,
      isSubmitting: false,
      isSubmitted: false,
      isError: false,
    };
  },
  computed: {
    ...mapGetters({
      work: `${STORE_KEY}/work`,
    }),
    _firstScore: {
      get() {
        return this.work.reviews ? this.work.reviews.first_score : 0;
      },
      set(score) {
        this.firstScore = score;
      },
    },
    _secondScore: {
      get() {
        return this.work.reviews ? this.work.reviews.second_score : 0;
      },
      set(score) {
        this.secondScore = score;
      },
    },
    _thirdScore: {
      get() {
        return this.work.reviews ? this.work.reviews.third_score : 0;
      },
      set(score) {
        this.thirdScore = score;
      },
    },
  },
  created() {
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  async mounted() {
    const workId = this.$route.params.id;
    await this.$store.dispatch(`${STORE_KEY}/getWorkDetails`, { workId });
  },
  methods: {
    addReview() {
      try {
        this.isSubmitting = true;
        this.isError = false;
        const { firstScore, secondScore, thirdScore } = this;
        const work = this.$route.params.id;
        this.$store.dispatch(`${STORE_KEY}/setReview`, { first_score: firstScore, second_score: secondScore, third_score: thirdScore, work });
        this.isSubmitted = true;
      } catch (e) {
        this.isError = true;
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

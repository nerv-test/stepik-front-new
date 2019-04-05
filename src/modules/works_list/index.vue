<template>
  <div>
    <h3 data-test="header">Работы на проверку</h3>
    <br><br>
    <table class="table" v-if="onModeration && onModeration.length > 0">
      <tbody>
        <tr v-for="work in onModeration" :key="work.id">
          <td><AppLink :to="{ name: 'work-details', params: {id: work.id} }" v-text="work.username"/></td>
          <td>{{ work.email }}</td>
          <td><AppLink class="btn btn-success btn-xs" :to="{ name: 'work-details', params: {id: work.id} }">Проверить</AppLink></td>
        </tr>
      </tbody>
    </table>
    <p class="alert alert-warning" v-else>Нет работ</p>
    <br><br>

    <h3>Проверенные работы</h3>
    <table class="table" v-if="reviewed && reviewed.length > 0">
      <tbody>
        <tr>
          <th>Имя</th>
          <th>Почта</th>
          <th colspan="3">Оценки</th>
        </tr>
        <tr v-for="work in reviewed" :key="work.id">
          <td><AppLink :to="{ name: 'work-details', params: {id: work.id} }" v-text="work.username"/></td>
          <td>{{ work.email }}</td>
          <td>{{ work.reviews.first_score }}</td>
          <td>{{ work.reviews.second_score }}</td>
          <td>{{ work.reviews.third_score }}</td>
        </tr>
      </tbody>
    </table>
    <p class="alert alert-warning" v-else>Нет работ</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppLink from '@/app/components/ui/AppLink.vue';

import store from './_store';

const STORE_KEY = '$_works-list';

export default {
  name: 'WorksList',
  components: {
    AppLink,
  },
  computed: {
    ...mapGetters({
      reviewed: `${STORE_KEY}/reviewed`,
      onModeration: `${STORE_KEY}/onModeration`,
    }),
  },
  created() {
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  mounted() {
    this.$store.dispatch(`${STORE_KEY}/getWorkList`);
  },
};
</script>

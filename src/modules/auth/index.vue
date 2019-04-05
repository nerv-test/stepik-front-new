<template>
  <div class="row">
    <div class="col-sm-6 col-sm-offset-3">
      <h3 data-test="header">Авторизация</h3>
      <p class="alert alert-warning" v-if="hasError" data-test="alert">Пароль неверный</p>
      <form @submit.prevent="login">
        <p class="form-label">Email</p>
        <AppInput required v-model="email" type="text" placeholder="Email" :has-error="hasError" data-test="email"/>
        <br>
        <p class="form-label">Пароль</p>
        <AppInput required v-model="password" type="password" placeholder="Пароль" :has-error="hasError" data-test="password"/>
        <br>
        <AppBtn use="success" type="submit" data-test="submit">Войти</AppBtn>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AppBtn from '@/app/components/ui/AppBtn.vue';
import AppInput from '@/app/components/ui/AppInput.vue';

export default {
  name: 'LoginPage',
  components: {
    AppBtn,
    AppInput,
  },
  data() {
    return {
      email: '',
      password: '',
      phone: '',
      hasError: false,
      isSubmitting: false,
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
  mounted() {
    if (this.isAuthenticated) {
      this.$router.push('/');
    }
  },
  methods: {
    async login() {
      this.hasError = false;
      try {
        const { email, password } = this;
        this.isSubmitting = true;
        await this.$store.dispatch('auth/AUTH_REQUEST', { email, password });
        this.$router.push('/admin');
      } catch (e) {
        this.hasError = true;
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<template>
  <div>
    <header class="navbar navbar-default">
      <div class="container">
        <AppLink class="navbar-brand" :to="{ path: '/' }">Stepik Test</AppLink>
        <ul class="nav navbar-nav">
          <li><AppLink class="navbar-link" :to="{ path: '/admin' }" v-if="isAuthenticated">Работы</AppLink></li>
        </ul>
        <div class="navbar-right">
          <AppLink class="navbar-text" :to="{ path: '/login' }" v-if="!isAuthenticated">Войти</AppLink>
          <p class="navbar-text" v-else>
            <span v-if="user">{{ user.email }} </span><a href="#" class="navbar-link" @click.prevent="signout">(выйти)</a>
          </p>
        </div>
      </div>
    </header>
    <div class="container">
      <transition :name="transitionName" mode="out-in">
        <router-view class="child-view"/>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import AppLink from '@/app/components/ui/AppLink.vue';


export default {
  name: 'DefaultLayout',
  components: {
    AppLink,
  },
  data() {
    return {
      transitionName: 'slide-left',
    };
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    ...mapState({
      user: state => state.auth.user,
    }),
  },
  methods: {
    signout() {
      this.$store.dispatch('auth/AUTH_LOGOUT');
      this.$router.push('/');
    },
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    next();
  },
};
</script>

<style lang="scss">
.child-view {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide {
  &-left-enter,
  &-right-leave-active {
    opacity: 0;
    transform: translate(30px, 0);
  }

  &-left-leave-active,
  &-right-enter {
    opacity: 0;
    transform: translate(-30px, 0);
  }
}
</style>

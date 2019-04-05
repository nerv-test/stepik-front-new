<template>
  <div class="image-holder">
    <img class="image-holder__img" :src="image">
  </div>
</template>

<script>
export default {
  name: 'AppImage',
  props: {
    image: { type: String, default: '' },
  },
};
</script>

<style lang="scss" scoped>
.image-holder {
  position: relative;
  width: 800px;
  height: 400px;

  &__img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
}
</style>

<template>
  <button class="btn" :class="{'btn-success': use === 'success', 'btn-xs': size === 'xs' }" v-on="$listeners">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'AppBtn',
  props: {
    use: { type: String, default: '' },
    size: { type: String, default: '' },
  },
};
</script>

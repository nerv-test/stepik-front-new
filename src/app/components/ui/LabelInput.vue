<template>
  <label class="form-label">
    <span v-text="text"/>
    <slot/>
  </label>
</template>

<script>
export default {
  name: 'LabelInput',
  props: {
    text: { type: String, default: '' },
  },
};
</script>


<template>
  <input class="form-control block" v-on="listeners" :value="value" :disabled="readOnly">
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    value: { type: [Number, String], default: '' },
    readOnly: { type: Boolean, default: false },
    hasError: { type: Boolean, default: false },
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
    listeners() {
      return {
        ...this.$listeners,
        input: (e) => {
          this.$emit('input', e.target.value);
        },
      };
    },
  },
};
</script>

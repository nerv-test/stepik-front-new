import Vue from 'vue';

/**
 * Find which layout the component should render.
 * If the component is not specified layout name, `default` is used.
 * Otherwise return undefined.
 */
function resolveLayoutName(matched) {
  const defaultName = 'default';
  const last = matched[matched.length - 1];
  if (!last) return;

  const Component = last.components.default;
  if (!Component) return;

  const isAsync = typeof Component === 'function' && !Component.options;
  if (isAsync) return;

  const isCtor = typeof Component === 'function' && Component.options;
  const layoutName = isCtor ? Component.options.layout : Component.layout;

  return layoutName || defaultName;
}

export function createRouterLayout(resolve) {
  return Vue.extend({
    name: 'RouterLayout',

    data() {
      return {
        layoutName: undefined,
        layouts: Object.create(null),
      };
    },

    watch: {
      layoutName(name) {
        if (!this.layouts[name]) {
          this.$set(this.layouts, name, () => resolve(name));
        }
      },
    },

    provide() {
      return {
        $_routerLayout_notifyUpdate: () => {
          const { matched } = this.$route;
          this.layoutName = resolveLayoutName(matched) || this.layoutName;
        },
      };
    },

    beforeRouteEnter(to, _from, next) {
      next((vm) => {
        vm.layoutName = resolveLayoutName(to.matched) || this.layoutName;
      });
    },

    beforeRouteUpdate(to, _from, next) {
      this.layoutName = resolveLayoutName(to.matched) || this.layoutName;
      next();
    },

    render(h) {
      const layout = this.layoutName && this.layouts[this.layoutName];
      if (!layout) return h();
      return h(layout, {
        key: this.layoutName,
      });
    },
  });
}

Vue.mixin({
  inject: {
    $_routerLayout_notifyUpdate: {
      default: null,
    },
  },

  beforeUpdate() {
    const notify = this.$_routerLayout_notifyUpdate;
    if (notify) notify();
  },
});

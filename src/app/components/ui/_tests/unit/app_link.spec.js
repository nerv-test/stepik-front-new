import AppLink from '@/app/components/ui/AppLink.vue';
import { shallowMount } from '@vue/test-utils';

const mountAppLink = (options = {}) => shallowMount(AppLink, {
  stubs: {
    'router-link': {
      functional: true,
      render(h, { slots }) {
        return h(
          'a',
          {
            attrs: {
              'data-router-link': 'true',
            },
          },
          slots().default,
        );
      },
    },
  },
  slots: {
    default: 'hello',
  },
  ...options,
});

describe('AppLink.vue', () => {
  const originalConsoleWarn = global.console.warn;
  let warning;
  beforeEach(() => {
    warning = undefined;
    global.console.warn = jest.fn((text) => {
      warning = text;
    });
  });
  afterAll(() => {
    global.console.warn = originalConsoleWarn;
  });

  it('warns about missing required props', () => {
    mountAppLink();
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(warning).toMatch(/Invalid <AppLink> props/);
  });

  it('warns about an invalid href', () => {
    mountAppLink({
      propsData: {
        href: '/some/local/path',
      },
    });
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(warning).toMatch(/Invalid <AppLink> href/);
  });

  it('warns about an insecure href', () => {
    mountAppLink({
      propsData: {
        href: 'http://google.com',
      },
    });
    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(warning).toMatch(/Insecure <AppLink> href/);
  });

  it('renders an anchor element when passed an `href` prop', () => {
    const externalUrl = 'https://google.com/';
    const { element } = mountAppLink({
      propsData: {
        href: externalUrl,
      },
    });
    expect(console.warn).not.toHaveBeenCalled();
    expect(element.tagName).toEqual('A');
    expect(element.href).toEqual(externalUrl);
    expect(element.target).toEqual('_blank');
    expect(element.rel).toEqual('noopener');
    expect(element.textContent).toEqual('hello');
  });

  it('renders a router-link when passed a `name` prop', () => {
    const routeName = 'home';
    const { element, vm } = mountAppLink({
      propsData: {
        name: routeName,
      },
    });
    expect(console.warn).not.toHaveBeenCalled();
    expect(element.dataset.routerLink).toEqual('true');
    expect(element.textContent).toEqual('hello');
    expect(vm.routerLinkTo).toEqual({ name: routeName, params: {} });
  });

  it('renders a router-link when passed `name` and `params` props', () => {
    const routeName = 'home';
    const routeParams = { foo: 'bar' };
    const { element, vm } = mountAppLink({
      propsData: {
        name: routeName,
        params: routeParams,
      },
    });
    expect(console.warn).not.toHaveBeenCalled();
    expect(element.dataset.routerLink).toEqual('true');
    expect(element.textContent).toEqual('hello');
    expect(vm.routerLinkTo).toEqual({
      name: routeName,
      params: routeParams,
    });
  });

  it('renders a router-link when passed a `to` prop', () => {
    const routeName = 'home';
    const { element, vm } = mountAppLink({
      propsData: {
        to: {
          name: routeName,
        },
      },
    });
    expect(console.warn).not.toHaveBeenCalled();
    expect(element.dataset.routerLink).toEqual('true');
    expect(element.textContent).toEqual('hello');
    expect(vm.routerLinkTo).toEqual({ name: routeName, params: {} });
  });

  it('renders a router-link when passed a `to` prop with `params`', () => {
    const routeName = 'home';
    const routeParams = { foo: 'bar' };
    const { element, vm } = mountAppLink({
      propsData: {
        to: {
          name: routeName,
          params: routeParams,
        },
      },
    });
    expect(console.warn).not.toHaveBeenCalled();
    // expect(element.dataset.routerLink).toEqual('true');
    expect(element.textContent).toEqual('hello');
    expect(vm.routerLinkTo).toEqual({ name: routeName, params: routeParams });
  });
});

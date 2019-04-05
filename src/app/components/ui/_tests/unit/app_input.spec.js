import AppInput from '@/app/components/ui/AppInput.vue';
import { mount } from '@vue/test-utils';

describe('AppInput.vue', () => {
  it('works with v-model', () => {
    const wrapper = mount(AppInput, { propsData: { value: 'aaa' } });
    const inputEl = wrapper.find('input').element;

    // Has the correct starting value
    expect(inputEl.value).toEqual('aaa');

    // Emits an input event with the correct value when edited
    inputEl.value = 'bbb';
    wrapper.trigger('input');
    expect(wrapper.emitted().input).toEqual([['bbb']]);

    // Sets the input to the correct value when props change
    wrapper.setProps({ value: 'ccc' });
    expect(inputEl.value).toEqual('ccc');
  });
});

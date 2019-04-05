import AppBtn from '@/app/components/ui/AppBtn.vue';
import { shallowMount } from '@vue/test-utils';


describe('AppBtn.vue', () => {
  it('renders its content', () => {
    const slotContent = '<span>foo</span>';
    const { element } = shallowMount(AppBtn, {
      slots: {
        default: slotContent,
      },
    });
    expect(element.innerHTML).toContain(slotContent);
  });

  it('btn emitted a click', () => {
    const btn = shallowMount(AppBtn);

    btn.vm.$emit('click');
    expect(btn.emitted('click')).toBeTruthy();
  });
});

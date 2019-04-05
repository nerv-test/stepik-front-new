import LabelInput from '@/app/components/ui/LabelInput.vue';
import { shallowMount } from '@vue/test-utils';


describe('LabelInput.vue', () => {
  it('renders its content', () => {
    const slotContent = '<span>foo</span>';
    const { element } = shallowMount(LabelInput, {
      slots: {
        default: slotContent,
      },
    });
    expect(element.innerHTML).toContain(slotContent);
  });
});

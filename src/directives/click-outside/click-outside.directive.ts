import { DirectiveOptions, VNode } from 'vue';
import { DirectiveBinding }        from 'vue/types/options';
import { Vue }                     from 'vue/types/vue';

let handleOutsideClick!: any;

export const clickOutsideDirective: DirectiveOptions = {
  bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
    handleOutsideClick = (e: MouseEvent) => {
      e.stopPropagation();
      const { handler, excludeElements } = binding.value;
      let clickedOnExcludedEl = false;

      excludeElements.forEach((refName: string) => {
        if (!clickedOnExcludedEl) {
          const excludedEl: Element = (vnode?.context?.$refs[ refName ] as Vue)?.$el;
          clickedOnExcludedEl = excludedEl.contains(e.target as any);
        }
      });

      if (!el.contains(e.target as any) && !clickedOnExcludedEl && vnode && vnode.context) {
        vnode.context[ handler as keyof Vue ]();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
  },

  unbind() {
    document.removeEventListener('click', handleOutsideClick);
    document.removeEventListener('touchstart', handleOutsideClick);
  },
};

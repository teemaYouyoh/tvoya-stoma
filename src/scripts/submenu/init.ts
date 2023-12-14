import vevet from '../config/vevet';
import { useOutsideClick } from '../popup/utils';

const submenuToggle = () => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
    '[data-submenu="true"]'
  );

  if (elements.length === 0) {
    return;
  }

  elements.forEach((element) => {
    element.addEventListener('focusin', () => {
      element.classList.add('viewed');
    });

    element.addEventListener('focusout', () => {
      element.classList.remove('viewed');
    });

    if (vevet.isMobile) {
      const additionalOpen =
        element.querySelector<HTMLElement>('.menu-submenu-open');

      if (!additionalOpen) {
        return;
      }

      additionalOpen.addEventListener('click', () => {
        element.classList.add('viewed');
      });

      useOutsideClick(element, () => {
        element.classList.remove('viewed');
      });

      return;
    }

    element.addEventListener('mouseenter', () => {
      element.classList.add('viewed');
    });

    element.addEventListener('mouseleave', () => {
      element.classList.remove('viewed');
    });
  });
};

export default submenuToggle;

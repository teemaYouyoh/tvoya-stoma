import debounce from '../config/debounce';

const listenerHandler = (containerArray: NodeListOf<HTMLElement>) => {
  containerArray.forEach((container) => {
    const content = container.querySelector<HTMLElement>(
      '.pagination__wrapper'
    );

    if (!content) {
      return;
    }

    const { width } = container.getBoundingClientRect();
    const { width: widthInner } = content.getBoundingClientRect();

    if (widthInner > width) {
      container.classList.add('overlay');
    }
  });
};

const paginationHelp = () => {
  const containerArray = document.querySelectorAll<HTMLElement>('.pagination');

  if (containerArray.length === 0) {
    return;
  }

  listenerHandler(containerArray);

  window.addEventListener(
    'resize',
    debounce({
      callback: () => {
        listenerHandler(containerArray);
      }
    })
  );
};

export default paginationHelp;

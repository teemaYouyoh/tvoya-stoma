import useObserver from '../config/useObserver';

const circleAnimationOberver = () => {
  const itemArray = document.querySelectorAll<HTMLElement>(
    '.franchising-circle'
  );

  if (itemArray.length === 0) {
    return;
  }

  itemArray.forEach((item) => {
    useObserver({
      target: item,
      isCallOnce: true,
      threshold: 1,
      callbackIn: () => {
        item.classList.add('viewed');
      }
    });
  });
};

export default circleAnimationOberver;

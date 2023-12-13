import { Timeline } from 'vevet';
import useObserver from '../config/useObserver';

const makeTimeline = (itemProps: HTMLImageElement) => {
  const item = itemProps;
  const timeline = new Timeline({ duration: 3000 });

  timeline.addCallback('progress', ({ easing }) => {
    item.style.transform = `scale(${1 + (0.4 - easing * 0.4)})`;
  });

  timeline.addCallback('start', () => {
    item.classList.add('showed');
  });

  timeline.addCallback('end', () => {
    item.style.transform = '';
  });

  return timeline;
};

const appearHandler = (container: HTMLDivElement, item: HTMLImageElement) => {
  const timeline = makeTimeline(item);

  useObserver({
    target: container,
    isCallOnce: true,
    callbackIn: () => {
      timeline.play();
    }
  });
};

const imageAppearInit = () => {
  const appearContainer =
    document.querySelectorAll<HTMLDivElement>('.appear-container');

  if (appearContainer.length === 0) {
    return;
  }

  appearContainer.forEach((container) => {
    const item = container.querySelector<HTMLImageElement>('.appear-content');

    if (!item) {
      return;
    }

    appearHandler(container, item);
  });
};

export default imageAppearInit;

import { Timeline } from 'vevet';
import useObserver from '../config/useObserver';

interface IMakeCounter {
  item: HTMLElement;
  container: HTMLElement;
}

interface IMakeTimeline {
  item: HTMLElement;
}

const makeTimeline: (props: IMakeTimeline) => Timeline | undefined = ({
  item: itemProp
}) => {
  const item = itemProp;

  const value = +(item.dataset.value || 0);
  if (Number.isNaN(value)) {
    return undefined;
  }

  const timeline = new Timeline({ duration: 4000, destroyOnEnd: true });

  timeline.addCallback('progress', ({ easing }) => {
    item.innerHTML = `${Math.floor(value * easing)}`;
  });

  timeline.addCallback('end', () => {
    item.classList.add('finished');
  });

  return timeline;
};

const makeCounter: (props: IMakeCounter) => void = ({ item, container }) => {
  const timeline = makeTimeline({ item });

  if (!timeline) {
    return;
  }

  useObserver({
    target: container,
    isCallOnce: true,
    callbackIn: () => {
      timeline.play();
    }
  });
};

const counterInit = () => {
  const containerArray: NodeListOf<HTMLElement> =
    document.querySelectorAll('.counter-container');
  if (containerArray.length === 0) {
    return;
  }

  containerArray.forEach((container) => {
    const counterArray: NodeListOf<HTMLElement> =
      container.querySelectorAll('.counter');

    if (counterArray.length === 0) {
      return;
    }

    counterArray.forEach((item) => {
      makeCounter({ item, container });
    });
  });
};

export default counterInit;

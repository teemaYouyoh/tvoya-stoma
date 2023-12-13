import { Timeline } from 'vevet';
import { IParentHeight } from './useParentHeight';

interface IMakeTimeline {
  showItem: HTMLElement;
  hideItem: HTMLElement;
  parentHeight: IParentHeight;
  section: HTMLElement;
  activeHeight: number;
  duration?: number;
}

const makeTimeline = ({
  showItem: showItemProp,
  hideItem: hideItemProp,
  parentHeight,
  section: sectionProp,
  activeHeight,
  duration = 600
}: IMakeTimeline) => {
  const showItem = showItemProp;
  const hideItem = hideItemProp;
  const section = sectionProp;

  const timeline = new Timeline({
    duration,
    easing: [0.25, 0.1, 0.25, 1]
  });

  timeline.addCallback('start', () => {
    parentHeight.save();
    hideItem.classList.add('unactive');
    showItem.classList.remove('unactive');
  });

  timeline.addCallback('progress', ({ progress }) => {
    section.style.pointerEvents = 'none';
    parentHeight.interpolate(activeHeight, progress);

    showItem.style.opacity = `${progress}`;
    hideItem.style.opacity = `${1 - progress}`;
  });

  timeline.addCallback('end', () => {
    section.style.pointerEvents = '';

    timeline.destroy();
    parentHeight.reset();
  });

  timeline.play();
};

export default makeTimeline;

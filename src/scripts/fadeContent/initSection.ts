import useParentHeight, { IParentHeight } from './useParentHeight';
import makeTimeline from './makeTimeline';

interface IStateItem {
  key: string;
  item: HTMLElement | undefined;
  button: HTMLElement | undefined;
}

interface IState {
  active: IStateItem;
  prev: IStateItem;
  parent: {
    item: HTMLElement;
    parentHeight: IParentHeight;
    activeHeight: number;
  };
}

const initFadeSection = (section: HTMLElement, activeKey: string = '1') => {
  const parent = section.querySelector('.fade-section-content') as HTMLElement;
  if (!parent) {
    return;
  }

  const state: IState = {
    active: {
      key: activeKey,
      item: undefined,
      button: undefined
    },
    prev: {
      key: activeKey,
      item: undefined,
      button: undefined
    },
    parent: {
      item: parent,
      parentHeight: useParentHeight(parent),
      activeHeight: parent.clientHeight
    }
  };

  const buttons = Array.from(
    section.querySelectorAll('.fade-section__button')
  ) as HTMLElement[];

  const items = Array.from(
    section.querySelectorAll('.fade-section-content__item')
  ) as HTMLElement[];

  if (items.length === 0) {
    return;
  }

  state.active.button = section.querySelector(
    '.fade-section__button.active'
  ) as HTMLElement;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const data = button.dataset.item;
      state.prev.key = state.active.key;
      state.active.key = data || '1';

      state.prev.button = state.active.button;
      state.active.button = button;

      let showItem: HTMLElement | undefined;
      let hideItem: HTMLElement | undefined;

      if (state.prev.key === state.active.key) {
        return;
      }

      if (state.prev.button) {
        state.prev.button.classList.remove('active');
      }
      state.active.button.classList.add('active');

      items.forEach((item) => {
        if (item.dataset.item === state.active.key) {
          showItem = item;
        }
        if (item.dataset.item === state.prev.key) {
          hideItem = item;
        }
      });

      if (!showItem || !hideItem) {
        return;
      }

      state.parent.activeHeight = showItem.clientHeight;
      state.parent.parentHeight.save();

      makeTimeline({
        showItem,
        hideItem,
        parentHeight: state.parent.parentHeight,
        section,
        activeHeight: state.parent.activeHeight
      });
    });
  });
};

export default initFadeSection;

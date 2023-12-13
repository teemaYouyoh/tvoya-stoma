export interface IParentHeight {
  save: () => void;
  reset: () => void;
  interpolate: (targetHeight: number, progress: number) => void;
}

const useParentHeight = (element: HTMLElement) => {
  let currentHeight = 0;

  const save = () => {
    const parent = element;

    if (!parent) {
      return;
    }

    currentHeight = parent.clientHeight;
    parent.style.height = `${currentHeight}px`;
  };

  const reset = () => {
    const parent = element;

    if (!parent) {
      return;
    }

    currentHeight = 0;
    parent.style.height = '';
  };

  const interpolate = (targetHeight: number, progress: number) => {
    const parent = element;

    if (!parent) {
      return;
    }

    const startHeight = currentHeight;
    const difference = targetHeight - startHeight;
    const height = startHeight + difference * progress;

    parent.style.height = `${height}px`;
  };

  return { save, reset, interpolate };
};

export default useParentHeight;

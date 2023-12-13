import initFadeSection from './initSection';

const fadeContentInit = () => {
  const sectionArr = document.querySelectorAll('.fade-section');

  if (sectionArr.length === 0) {
    return;
  }

  sectionArr.forEach((section) => {
    initFadeSection(section as HTMLElement);
  });
};

export default fadeContentInit;

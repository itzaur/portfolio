'use strict';
const skillsBtn = document.querySelectorAll('.skills__btn');
const skillsBtnContainer = document.querySelector('.skills__btns');
const skillsLevel = document.querySelectorAll('.skills-level');

const skillsTimeline = gsap.timeline({ duration: 1 });
function getSkillsAnim() {
  skillsTimeline
    .from('.starSkill', {
      //   x: -10,
      opacity: 0,
      scale: 0,
      ease: 'elastic.out(1, 0.3)',
      duration: 1.2,
      clearProps: 'transform',
    })
    .fromTo(
      '.point span',
      {
        x: -60,
        opacity: 0,
        scale: 0,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        ease: 'back.out(1.7)',
      },
      '<0.3'
    );
}

skillsBtnContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.skills__btn');
  const selectSkillsLevel = document.querySelector(
    `.skills-level--${clicked.dataset.tab}`
  );

  if (!clicked) return;

  skillsBtn.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', false);
    skillsLevel.forEach(skill => {
      skill.setAttribute('aria-hidden', true);
    });
  });

  clicked.classList.add('active');
  clicked.setAttribute('aria-expanded', true);
  selectSkillsLevel.setAttribute('aria-hidden', false);

  getSkillsAnim();
});
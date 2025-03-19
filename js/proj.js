document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.proj-image-section');
  const textSections = document.querySelectorAll('.text-section');
  
  function checkScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      
      if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
        section.classList.add('active');
        if (textSections[index]) {
          textSections.forEach(text => text.classList.remove('active'));
          textSections[index].classList.add('active');
        }
      } else {
        section.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll();
});
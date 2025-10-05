/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*===== ACTIVE AND REMOVE MENU =====*/
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  })

  navLinks.forEach(link => {
    link.classList.remove('active-link');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active-link');
    }
  })
}

window.addEventListener("scroll", updateActiveNav);

// Remove menu mobile
const navMenu = document.getElementById("nav-menu");
navLinks.forEach((n) => n.addEventListener("click", () => {
  navMenu.classList.remove("show");
  updateActiveNav();
}));

/*===== COPY Email =====*/
const copy = document.getElementById("copy");
if (copy) {
  copy.addEventListener("click", () => {
    navigator.clipboard.writeText("aa4080@fayoum.edu.eg");
    const originalHTML = copy.innerHTML;
    copy.innerHTML = "copied";
    setTimeout(() => {
      copy.innerHTML = originalHTML;
    }, 2000);
  });
}

/*===== THEME TOGGLE =====*/
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Check for saved theme preference or respect OS preference
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

/*===== PROJECT FILTERING =====*/
function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-img');

  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default button behavior

      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projects.forEach(project => {
        if (filterValue === 'all' || project.getAttribute('data-category') === filterValue) {
          project.style.display = 'block';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
}

/*===== TYPEWRITER EFFECT =====*/
var messageArr = ["Full Stack Developer", "Frontend Developer", "Backend Developer"];
var textPosition = 0;
var speed = 100;
var messageIndex = 0;

function typewriter() {
  const jobTitle = document.querySelector("#jobTitle");
  if (jobTitle) {
    jobTitle.innerHTML = messageArr[messageIndex].substring(0, textPosition) + '<span class="blinking-cursor">|</span>';

    if (textPosition++ === messageArr[messageIndex].length) {
      setTimeout(() => {
        textPosition = 0;
        messageIndex = (messageIndex + 1) % messageArr.length;
        typewriter();
      }, 2000);
    } else {
      setTimeout(typewriter, speed);
    }
  }
}

// Add blinking cursor style
const style = document.createElement('style');
style.textContent = `
  .blinking-cursor {
    animation: blink 1s infinite;
  }
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  initializeProjectFilters();
  typewriter();
  updateActiveNav();

  // Initialize ScrollReveal if available
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.home-data, .about-img, .skills-subtitle, .skills-text', {});
    ScrollReveal().reveal('.home-img, .about-subtitle, .about-text, .skills-data', { delay: 400 });
    ScrollReveal().reveal('.home-social-icon, .project-img', { interval: 200 });
    ScrollReveal().reveal('.skills-data, .education-data', { interval: 100 });
  }
});
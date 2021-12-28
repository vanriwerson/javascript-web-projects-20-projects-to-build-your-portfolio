const DARK_THEME = 'dark'
const LIGHT_THEME = 'light'

const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav')
const toggleIcon = document.getElementById('toggle-icon')
const undrawImages = document.querySelectorAll('.about-container img')
const textBox = document.getElementById('text-box')

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", DARK_THEME);
    localStorage.setItem('theme', DARK_THEME);
    toggleDarkLightMode(true)
  } else {
    document.documentElement.setAttribute("data-theme", LIGHT_THEME);
    localStorage.setItem('theme', LIGHT_THEME);
    toggleDarkLightMode(false)
  }
}

function toggleDarkLightMode(isDark) {
  nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
  textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
  toggleIcon.children[0].textContent = isDark ? 'to Light Mode' : 'to Dark Mode';
  isDark ? toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun') : toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');

  isDark ? changeImageMode('dark') : changeImageMode('light')
}

function changeImageMode(color) {
  const sources = [
    `./img/undraw_proud_coder_${color}.svg`, 
    `./img/undraw_feeling_proud_${color}.svg`, 
    `./img/undraw_conceptual_idea_${color}.svg`
  ]
  undrawImages.forEach((image, idx) => image.src = sources[idx])
}

toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem('theme')
if(currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if(currentTheme === 'dark') {
    toggleSwitch.checked = true;
    toggleDarkLightMode(true)
  }
}

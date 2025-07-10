const menuButton = document.getElementById('menu-button');
const primaryNav = document.querySelector('#primary-nav ul');

menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('show');
    const isOpen = primaryNav.classList.contains('show');
    menuButton.innerHTML = isOpen ? '✕' : '☰';
});

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent += document.lastModified;
document.getElementsByTagName('button')[0].addEventListener('click', () => {
    const icono = document.createElement("i");
    icono.classList.add('fa', 'fa-bath');
    document.body.appendChild(icono);
})

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
    });
}
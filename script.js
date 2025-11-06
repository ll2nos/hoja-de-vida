// Selecciona el botón que alterna el tema usando su id "themeToggle"
const themeToggle = document.getElementById('themeToggle');
// Obtiene referencia al elemento <body> para aplicar el atributo data-theme
const body = document.body;

// Verificar preferencia del usuario en localStorage; si no hay, usar 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
// Establece el atributo data-theme en el body para que CSS aplique las variables correspondientes
body.setAttribute('data-theme', currentTheme);

// Actualiza el icono del botón según el tema actual: si es 'dark' mostrar sol, si no mostrar luna
if (currentTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // icono de sol para tema oscuro
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // icono de luna para tema claro
}

// Agrega un listener al botón para alternar el tema cuando el usuario hace click
themeToggle.addEventListener('click', () => {
    // Lee el tema actual desde el atributo data-theme del body
    const currentTheme = body.getAttribute('data-theme');
    // Determina el nuevo tema: si el actual es 'light' cambiar a 'dark', y viceversa
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Aplica el nuevo tema al atributo data-theme del body
    body.setAttribute('data-theme', newTheme);
    // Guarda la preferencia en localStorage para mantenerla entre sesiones
    localStorage.setItem('theme', newTheme);
    
    // Actualiza el icono del botón según el nuevo tema
    if (newTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // sol para tema oscuro
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // luna para tema claro
    }
});

// Selecciona todas las secciones para observar su visibilidad al hacer scroll
const sections = document.querySelectorAll('section');

// Opciones del IntersectionObserver: threshold 0.1 = 10% visible para activar
const observerOptions = {
    threshold: 0.1
};

// Crea un IntersectionObserver que añade la clase 'visible' cuando la sección entra en vista
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Añade clase 'visible' para disparar la transición CSS (opacidad y transform)
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observa cada sección con el IntersectionObserver creado
sections.forEach(section => {
    observer.observe(section);
});

// Selecciona todos los enlaces internos que empiezan con '#' para navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Añade evento click para interceptar el comportamiento por defecto
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Previene el salto inmediato de la página
        
        // Obtiene el id del destino desde el atributo href del enlace
        const targetId = this.getAttribute('href');
        // Selecciona el elemento destino usando el id obtenido
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Scroll suave a la posición del elemento; resta 80px para compensar la header fija
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de carga para las barras de habilidades: anima desde 0 hasta el ancho declarado en style
window.addEventListener('load', () => {
    // Selecciona todos los elementos con clase .skill-progress
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        // Lee el ancho actual definido en el atributo style (ej. "95%")
        const width = bar.style.width;
        // Inicialmente establece el ancho a 0 para que la animación sea visible
        bar.style.width = '0';
        // Después de un corto retardo, restablece el ancho para que la transición lo anime
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
});
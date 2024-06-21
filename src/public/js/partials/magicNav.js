document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__menu a');
    const sections = document.querySelectorAll('section');

    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Remover la clase 'active-link' de todos los enlaces
            navLinks.forEach(function(link) {
                link.classList.remove('active-link');
            });
            
            // Agregar la clase 'active-link' al enlace clicado
            this.classList.add('active-link');
            
            // Obtener el id de la sección a la que apunta el enlace
            const sectionId = this.getAttribute('href').slice(1);
            
            // Remover la clase 'active-section' de todas las secciones
            sections.forEach(function(section) {
                section.classList.remove('active-section');
            });
            
            // Agregar la clase 'active-section' a la sección correspondiente
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active-section');
            }
        });
    });
});

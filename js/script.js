document.addEventListener('DOMContentLoaded', () => {

    /* 1. Scroll animations using Intersection Observer */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* 2. Countdown Timer */
    const timerElement = document.getElementById('timer');
    // Fecha por defecto o leída del elemento HTML (para permitir diferentes fechas en /civil)
    const dateString = timerElement && timerElement.dataset.date ? timerElement.dataset.date : 'March 24, 2026 17:00:00';
    const weddingDate = new Date(dateString).getTime();

    const updateCountdown = () => {
        if (!timerElement) return;
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Validar si ya pasó la fecha
        if (distance < 0) {
            document.getElementById('timer').innerHTML = '<div class="time-box"><span class="number">¡Hoy</span><span class="label">es el gran día!</span></div>';
            return;
        }

        // Cálculos matemáticos para días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Mostrar en el DOM con formato de 2 dígitos
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    };

    // Actualizar cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* 3. Navbar Scroll and Mobile Toggle */
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }));

    /* 4. RSVP Form Handling */
    const rsvpForm = document.getElementById('rsvp-form');
    const formSuccess = document.getElementById('form-success');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = rsvpForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Enviando...';
            btn.disabled = true;

            const formData = new FormData(rsvpForm);

            try {
                await fetch(rsvpForm.action, {
                    method: 'POST',
                    mode: 'no-cors', // IMPORTANTE para Google Forms
                    body: formData
                });

                rsvpForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');

            } catch (error) {
                alert('Hubo un error. Intenta nuevamente.');
                btn.textContent = 'Enviar Confirmación';
                btn.disabled = false;
            }
        });
    }
});

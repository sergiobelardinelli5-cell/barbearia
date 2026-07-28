document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. NAVBAR SCROLL EFFECT
       ========================================== */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================
       2. MENU MOBILE TOGGLE
       ========================================== */
    const mobileIcon = document.querySelector('.mobile-menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    mobileIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileIcon.querySelector('i');
        
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fechar menu ao clicar num link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileIcon.querySelector('i').classList.remove('fa-times');
            mobileIcon.querySelector('i').classList.add('fa-bars');
        });
    });

    /* ==========================================
       3. INTERSECTION OBSERVER (SCROLL REVEAL)
       ========================================== */
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Unobserve para animar apenas uma vez na descida
                observer.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    /* ==========================================
       4. ACORDEÃO (FAQ)
       ========================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fechar os outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Alternar o item clicado
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    /* ==========================================
       5. BOTÃO VOLTAR AO TOPO
       ========================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================
       6. SIMULAÇÃO DE ENVIO DE FORMULÁRIO
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previne o reload da página
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            // Estado de carregamento
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processando...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Simula uma requisição HTTP de 2 segundos
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Solicitação Enviada';
                btn.style.backgroundColor = '#25D366'; // Cor de sucesso (Verde)
                btn.style.color = '#fff';
                btn.style.borderColor = '#25D366';
                
                contactForm.reset();

                // Retorna o botão ao estado original após 4 segundos
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = ''; 
                    btn.style.color = '';
                    btn.style.borderColor = '';
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'all';
                }, 4000);
            }, 2000);
        });
    }
});
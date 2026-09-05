/**
 * Storymaki - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle (Basic implementation)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    // Note: For a real production app, we would create a proper sliding drawer
    // Here we just do a simple toggle for demonstration
    mobileMenuToggle.addEventListener('click', () => {
        // Toggle logic would go here. 
        // We'd typically toggle a class on a mobile navigation wrapper.
        alert('Menu mobile cliqué. À implémenter avec un composant offcanvas.');
    });

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 4. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            
            // Close all others
            document.querySelectorAll('.accordion-header').forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.parentElement.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current
            header.classList.toggle('active');
            
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 5. Interactive Demo (Univers Cards changing the prompt/image)
    const universCards = document.querySelectorAll('.univers-card');
    const demoPromptText = document.querySelector('.demo-prompt p');
    
    const universPrompts = {
        'Romance': '"Deux étudiants rivaux se retrouvent forcés de cohabiter et découvrent qu\'ils ont plus en commun qu\'ils ne le pensaient..."',
        'Action': '"Un mercenaire cybernétique doit infiltrer une mégacorporation pour récupérer un fichier volé avant minuit."',
        'Fantasy': '"Une jeune elfe découvre un dragonnier endormi depuis des siècles sous la montagne sacrée."',
        'Science-fiction': '"Le dernier vaisseau humain dérive vers un trou noir, quand soudain une transmission inconnue est reçue."',
        'Mystère': '"Le détective privé Arthur reçoit une lettre anonyme contenant la montre de son frère disparu il y a 10 ans."',
        'Aventure': '"Une expédition sous-marine découvre les ruines d\'une civilisation perdue qui semble toujours habitée."',
        'Comédie': '"Un vampire tente de s\'adapter à la vie en colocation avec trois loups-garous accros aux jeux vidéo."',
        'Éducatif': '"Explique le cycle de l\'eau à travers le voyage mouvementé d\'une petite goutte nommée Plip."'
    };

    universCards.forEach(card => {
        card.addEventListener('click', () => {
            const genreName = card.querySelector('h3').textContent;
            
            // Visual feedback on card
            universCards.forEach(c => {
                c.style.transform = 'translateY(0)';
                c.style.boxShadow = 'none';
            });
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.5)';

            // If user clicks an universe, scroll smoothly to the demo section and update the prompt
            if (demoPromptText && universPrompts[genreName]) {
                const demoSection = document.getElementById('comment-ca-marche');
                demoSection.scrollIntoView({ behavior: 'smooth' });
                
                // Animate text change
                demoPromptText.style.opacity = 0;
                setTimeout(() => {
                    demoPromptText.textContent = universPrompts[genreName];
                    demoPromptText.style.opacity = 1;
                }, 300);
            }
        });
    });

    // Initial check for elements already in view
    setTimeout(() => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

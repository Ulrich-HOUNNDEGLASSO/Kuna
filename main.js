// === Navigation scroll ===
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav?.classList.add('scrolled');
    } else {
        nav?.classList.remove('scrolled');
    }
});

// === Menu hamburger ===
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger?.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu?.classList.toggle('open', menuOpen);
    const spans = hamburger.querySelectorAll('span');
    if (menuOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.transform = '';
    }
});

mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        const spans = hamburger?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = '';
            spans[1].style.transform = '';
        }
    });
});

// === Reveal on scroll ===
const revealElements = document.querySelectorAll('.section-header, .product-card, .service-card, .stat-item, .bio-section, .contact-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)';
    observer.observe(el);
});

// === Modale produits ===
const overlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card') || btn.closest('.product-card-mobile');
        document.getElementById('modal-img').src = card.dataset.img;
        document.getElementById('modal-img').alt = card.dataset.title;
        document.getElementById('modal-title').textContent = card.dataset.title;
        document.getElementById('modal-desc').textContent = card.dataset.desc;
        document.getElementById('modal-matiere').textContent = card.dataset.matiere;
        document.getElementById('modal-prix').textContent = card.dataset.prix;
        document.getElementById('modal-delai').textContent = card.dataset.delai;
        document.getElementById('modal-tag').textContent = card.dataset.tag;
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

modalClose?.addEventListener('click', () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
});

overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
});
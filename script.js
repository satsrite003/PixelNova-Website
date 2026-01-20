(function(){
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.2});

    elements.forEach(el => observer.observe(el));
})();
// Simple interactions for PixelNova
(function () {
    const btn = document.getElementById('theme-toggle');
    const body = document.body;
    const wave = document.querySelector('.wave');
    const BRAND = document.getElementById('brand-heading');

    // Apply saved theme
    const saved = localStorage.getItem('pixelnova:theme');
    if (saved === 'light') body.classList.add('light');

    btn.addEventListener('click', () => {
        body.classList.toggle('light');
        const mode = body.classList.contains('light') ? 'light' : 'dark';
        localStorage.setItem('pixelnova:theme', mode);
    });

    // Small wave animation on load
    if (wave) {
        setTimeout(() => wave.classList.add('wave-animate'), 450);
    }

    // Subtle brand entrance
    if (BRAND) {
        BRAND.style.opacity = 0;
        BRAND.style.transform = 'translateY(-6px)';
        setTimeout(() => {
            BRAND.style.transition = 'opacity 420ms ease, transform 420ms cubic-bezier(.2,.9,.2,1)';
            BRAND.style.opacity = 1;
            BRAND.style.transform = 'translateY(0)';
        }, 120);
    }

    // Console greeting for curious visitors
    console.log('%cWelcome to PixelNova — crafted by Atharva Kumar', 'color:#5eead4;font-weight:700');
})();

// Highlight active nav link based on scroll position
(function(){
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    if(!sections.length || !navLinks.length) return;

    const mapIdToLink = {};
    navLinks.forEach(l => {
        const href = l.getAttribute('href');
        if(href && href.startsWith('#')) mapIdToLink[href.slice(1)] = l;
        l.addEventListener('click', ()=>{
            // small UX: close mobile menus here if added later
        });
    });

    const io = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            const id = entry.target.id;
            const link = mapIdToLink[id];
            if(!link) return;
            if(entry.isIntersecting){
                navLinks.forEach(n=>n.classList.remove('active'));
                link.classList.add('active');
            }
        });
    },{root:null,rootMargin:'-30% 0px -30% 0px',threshold:0});

    sections.forEach(s=>io.observe(s));
})();

// Make buttons disappear with fade effect after one click
(function(){
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const ctaSection = btn.closest('.cta');
            if(ctaSection) {
                ctaSection.style.transition = 'opacity 0.5s ease';
                ctaSection.style.opacity = '0';
                setTimeout(() => {
                    ctaSection.style.display = 'none';
                }, 500);
            } else {
                btn.style.display = 'none';
            }
        });
    });
})();

// Make skill-boxes clickable to search about the skill
(function(){
    const skills = document.querySelectorAll('.skill-box');
    skills.forEach(box => {
        box.style.cursor = 'pointer';
        box.title = 'Search about ' + box.textContent;
        box.addEventListener('click', () => {
            const query = encodeURIComponent(box.textContent.trim());
            window.open('https://www.google.com/search?q=' + query, '_blank');
        });
    });
})();

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

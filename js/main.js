/* ============================================================
   LITERARY CLUB — MAIN JAVASCRIPT
   ============================================================
   HOW TO USE:
   - Loader hides automatically after 2.5 seconds
   - Scroll animations trigger when elements enter the viewport
   - Nav changes style when you scroll down
   - Edit the data in index.html to update content
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. LOADING SCREEN
     Controls the book-flip loader. It hides after 2.5s.
  ---------------------------------------------------------- */
  const loader = document.getElementById('loader');
  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 2500);
  });

  // Safety: hide loader after 4s no matter what
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 4000);


  /* ----------------------------------------------------------
     2. NAVBAR — changes style on scroll
  ---------------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  /* ----------------------------------------------------------
     3. MOBILE MENU
  ---------------------------------------------------------- */
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobile-menu');
  const menuOverlay   = document.getElementById('menu-overlay');
  const mobileLinks   = document.querySelectorAll('#mobile-menu a');

  function openMenu()  { mobileMenu.classList.add('open'); menuOverlay.classList.add('active'); }
  function closeMenu() { mobileMenu.classList.remove('open'); menuOverlay.classList.remove('active'); }

  if (hamburger)   hamburger.addEventListener('click', openMenu);
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));


  /* ----------------------------------------------------------
     4. SCROLL REVEAL — animates elements as they scroll into view
     Any element with class "reveal", "reveal-left", or
     "reveal-right" will animate in when visible.
  ---------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for sibling elements
        const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ----------------------------------------------------------
     5. GALLERY LIGHTBOX
     Clicking a gallery item opens a larger view.
     Add real image src to gallery items in index.html.
  ---------------------------------------------------------- */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems  = document.querySelectorAll('.gallery-item[data-src]');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      if (src && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lightboxImg) lightboxImg.src = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });


  /* ----------------------------------------------------------
     6. SUBMIT FORM — opens mailto link
     Edit the email address in index.html in the #submit section
  ---------------------------------------------------------- */
  const submitBtn   = document.getElementById('submit-send-btn');
  const submitInput = document.getElementById('submit-subject');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const email   = submitBtn.getAttribute('data-email') || 'literaryclub@yourcollege.edu';
      const subject = submitInput ? encodeURIComponent(submitInput.value || 'Work Submission') : 'Work+Submission';
      window.location.href = `mailto:${email}?subject=${subject}`;
    });
  }


  /* ----------------------------------------------------------
     7. SMOOTH ACTIVE NAV HIGHLIGHTING (optional enhancement)
     Highlights the nav link for the currently visible section
  ---------------------------------------------------------- */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => sectionObserver.observe(s));


  /* ----------------------------------------------------------
     8. THOUGHT OF THE DAY 
  ---------------------------------------------------------- */
  const quotes = [
    {
      text: "A writer only begins a book. A reader finishes it.",
      author: "Samuel Johnson",
      role: "Thought of the Day"
    },
    {
      text: "Literature is the art of discovering something extraordinary about ordinary people.",
      author: "Boris Pasternak",
      role: "Thought of the Day"
    },
    {
      text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.",
      author: "Albus Dumbledore",
      role: "Thought of the Day"
    },
    {
      text: "There is no friend as loyal as a book.",
      author: "Ernest Hemingway",
      role: "Thought of the Day"
    },
    {
      text: "The purpose of literature is to turn blood into ink.",
      author: "T.S. Eliot",
      role: "Thought of the Day"
    }
  ];

  // random quote each day
  const dayIndex    = Math.floor(Date.now() / 86400000) % quotes.length;
  const todayQuote  = quotes[dayIndex];
  const quoteEl     = document.getElementById('daily-quote');
  const authorEl    = document.getElementById('daily-author');

  if (quoteEl)  quoteEl.textContent  = `"${todayQuote.text}"`;
  if (authorEl) authorEl.innerHTML   = `<span>${todayQuote.author}</span> — ${todayQuote.role}`;

});

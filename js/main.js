/**
 * ACROW COMPANY PROFILE - INTERACTIVE ENGINE
 * Handlers: Stats Counters, Project Filters, Lightbox Modals, Mobile Menu, PDF/Print
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    // Close menu when clicking outside or on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('open');
      });
    });
  }

  // 2. Sticky Header active scroll effect
  const header = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Animated Number Counters
  const counterElements = document.querySelectorAll('.counter-val');
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // ms
      const step = target / (duration / 25);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, 25);
    });
  };

  const observerOptions = {
    threshold: 0.3
  };

  const numbersSection = document.querySelector('.numbers-section') || document.querySelector('.hero-stats-bar');
  if (numbersSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      });
    }, observerOptions);

    observer.observe(numbersSection);
  }

  // 4. Project Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 5. Interactive Lightbox Modal for Projects & Systems
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalTitle = document.querySelector('.modal-project-title');
  const modalDesc = document.querySelector('.modal-project-desc');
  const modalImg = document.querySelector('.modal-project-img');
  const modalTags = document.querySelector('.modal-project-tags');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  const projectData = {
    'marina-bay': {
      title: 'Marina Bay Waterfront Towers',
      category: 'Residential & Commercial',
      location: 'Dubai & Alexandria Coastal Development',
      desc: 'Engineered complete climbing formwork, high-load shoring towers, and custom cantilever slab systems for 48-storey iconic waterfront towers.',
      img: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f6?q=80&w=1000&auto=format&fit=crop',
      systems: ['ACROW Flex System', 'ACCS Crane Climbing', 'Eco-Form Panels']
    },
    'rod-elfarag': {
      title: 'Rod El-Farag Cable-Stayed Bridge',
      category: 'Infrastructure & Bridges',
      location: 'Cairo, Egypt (Guinness World Record)',
      desc: 'Manufactured and supplied specialized heavy-duty shoring trusses, climbing systems for 100m pylons, and customized parapet formwork carriages for the widest cable-stayed bridge in the world.',
      img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
      systems: ['Heavy Duty Truss System', 'Parapet Carriage', 'Big Steel Panels']
    },
    'new-capital-cbd': {
      title: 'Iconic Tower & CBD Financial District',
      category: 'Landmark Projects',
      location: 'New Administrative Capital, Egypt & Africa',
      desc: 'Supplied precision automatic hydraulic climbing core-wall systems and high-speed table forms for Africa’s tallest skyscraper (394 meters).',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
      systems: ['Auto-Climbing Core Wall', 'Alu-Deck Slab System', 'VMC Heavy Panels']
    },
    'algeria-metro': {
      title: 'Algiers Metro Extension & Underground Stations',
      category: 'Infrastructure & Tunnels',
      location: 'Algiers, Algeria',
      desc: 'Turnkey tunnel formwork systems, custom heavy arch carriers, and specialized safety shoring for complex subterranean transit infrastructure.',
      img: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1000&auto=format&fit=crop',
      systems: ['Acrow Tunnel Form System', 'Cup-Lock Scaffolding', 'Heavy Duty Shoring']
    },
    'benban-solar': {
      title: 'Benban Mega Solar Complex & Sub-stations',
      category: 'Power & Energy',
      location: 'Aswan, Egypt',
      desc: 'Rapid cycle foundation shuttering and industrial transformer base systems for one of the largest photovoltaic solar installations globally.',
      img: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1000&auto=format&fit=crop',
      systems: ['Dynamic H-20 System', 'Eco-Form Foundations', 'Site Support Engineering']
    },
    'petrojet-refinery': {
      title: 'Midor Oil Refinery Expansion',
      category: 'Oil & Gas',
      location: 'Alexandria, Egypt',
      desc: 'Engineered heavy industrial circular tank formwork, safety access staircases, and explosion-proof scaffolding access structures.',
      img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop',
      systems: ['Circular Steel Panels', 'Heavy Duty Shoring', 'Protection Screens']
    }
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-id');
      const data = projectData[pId];

      if (data && modalBackdrop) {
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalImg.src = data.img;
        modalImg.alt = data.title;

        // Render tags
        modalTags.innerHTML = `
          <span class="product-chip text-red" style="background: rgba(176,0,9,0.1); border: 1px solid var(--acrow-red); font-weight:700;">${data.category}</span>
          <span class="product-chip" style="background: #e9ecef; color:#333;"><i class="fa fa-map-marker"></i> ${data.location}</span>
          ${data.systems.map(s => `<span class="product-chip" style="background: #0f0d39; color:#fff;">${s}</span>`).join('')}
        `;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Interactive Contact Form Submission Handler
  const contactForm = document.getElementById('acrowContactForm');
  const formSuccess = document.getElementById('formSuccessMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>TRANSMITTING INQUIRY...</span>';

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (formSuccess) {
          formSuccess.style.display = 'block';
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 6000);
        }
      }, 1200);
    });
  }

  // 7. Newsletter Form Handler
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        alert('Thank you for subscribing to ACROW Engineering Insights & Updates!');
        input.value = '';
      }
    });
  }

  // 8. E-Book Real-Time Search & Category Filters
  const ebookSearchInput = document.getElementById('ebookSearchInput');
  const ebookChips = document.querySelectorAll('.ebook-chip');
  const ebookCards = document.querySelectorAll('.ebook-card');

  function filterEbooks() {
    const query = (ebookSearchInput ? ebookSearchInput.value.toLowerCase().trim() : '');
    const activeChip = document.querySelector('.ebook-chip.active');
    const selectedCategory = activeChip ? activeChip.getAttribute('data-filter') : 'all';

    ebookCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const title = card.getAttribute('data-title') || '';
      const matchesCategory = (selectedCategory === 'all' || category === selectedCategory || (selectedCategory === 'slabs' && (category === 'slabs' || category === 'general')));
      const matchesQuery = !query || title.includes(query) || category.includes(query);

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (ebookSearchInput) {
    ebookSearchInput.addEventListener('input', filterEbooks);
  }

  ebookChips.forEach(chip => {
    chip.addEventListener('click', () => {
      ebookChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterEbooks();
    });
  });

  // Close Ebook modal button event
  const closeEbookBtn = document.getElementById('closeEbookModalBtn');
  if (closeEbookBtn) {
    closeEbookBtn.addEventListener('click', closeEbookModal);
  }

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEbookModal();
    }
  });
});

// Global E-Book Modal Controller
function openEbookModal(pdfUrl, title) {
  const backdrop = document.getElementById('ebookModalBackdrop');
  const titleText = document.getElementById('ebookModalTitleText');
  const iframe = document.getElementById('ebookModalIframe');
  const externalLink = document.getElementById('ebookModalExternalLink');

  if (backdrop && iframe) {
    const readerUrl = `ebook-reader.html?pdf=${encodeURIComponent(pdfUrl)}&title=${encodeURIComponent(title)}`;
    titleText.textContent = title;
    iframe.src = readerUrl;
    if (externalLink) {
      externalLink.href = readerUrl;
    }

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeEbookModal() {
  const backdrop = document.getElementById('ebookModalBackdrop');
  const iframe = document.getElementById('ebookModalIframe');

  if (backdrop && iframe) {
    backdrop.classList.remove('active');
    iframe.src = '';
    document.body.style.overflow = '';
  }
}

// Quick Print / Export to PDF trigger function
function printCompanyProfile() {
  window.print();
}

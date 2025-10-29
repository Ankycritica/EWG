// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Page navigation handling (no smooth scrolling needed for multi-page structure)
  document.addEventListener('click', function(e) {
    // Handle navigation links
    if (e.target.matches('nav a[href$=".html"]')) {
      // Close Bootstrap mobile nav if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    }
  });

  // CTA button animations (handles multiple buttons, adds hover scale)
  document.querySelectorAll('.cta-button, .btn-primary, .btn-outline-primary').forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.transition = 'transform 0.2s ease';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
    button.addEventListener('click', () => {
      button.classList.add('clicked'); // For any custom CSS animation
      setTimeout(() => button.classList.remove('clicked'), 300);
    });
  });

  // Form submission handling (prevents double-submit, shows feedback)
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!this.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('was-validated'); // Bootstrap validation styling
        return;
      }
      e.preventDefault(); // Prevent default for now; replace with AJAX later if needed
      // Simulate submission (in real: send via Fetch to Formspree)
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Fake delay for demo; in prod, use fetch()
      setTimeout(() => {
        submitBtn.textContent = 'Sent!';
        submitBtn.classList.add('btn-success');
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.classList.remove('btn-success');
          submitBtn.disabled = false;
          this.reset(); // Clear form
        }, 2000);
        // Optional: Scroll to top or show toast
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    });
  });

  // Navbar scroll effect (adds shadow on scroll)
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.classList.add('shadow-lg');
    } else {
      header.classList.remove('shadow-lg');
    }
  });

  // Fade-in animation on scroll
  function handleFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;
    
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150; // Trigger animation 150px before element comes into view
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }

  // Initial check for elements already in view
  handleFadeIn();
  
  // Check on scroll
  window.addEventListener('scroll', handleFadeIn);
  
  // Check on resize
  window.addEventListener('resize', handleFadeIn);
});
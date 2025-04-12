// js/script.js

// Utility functions
const DOM = {
  // Get element by ID
  byId: (id) => document.getElementById(id),
  
  // Get elements by class name
  byClass: (className) => document.getElementsByClassName(className),
  
  // Query selector
  query: (selector) => document.querySelector(selector),
  
  // Query selector all
  queryAll: (selector) => document.querySelectorAll(selector),
  
  // Create element
  create: (tag) => document.createElement(tag),
  
  // Add event listener
  on: (element, event, callback) => {
    if (element) {
      element.addEventListener(event, callback);
    }
  }
};

// Smooth scroll to element
const scrollTo = (element) => {
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth'
    });
  }
};

// Toggle class on element
const toggleClass = (element, className) => {
  if (element) {
    element.classList.toggle(className);
  }
};

// Add class to element
const addClass = (element, className) => {
  if (element && !element.classList.contains(className)) {
    element.classList.add(className);
  }
};

// Remove class from element
const removeClass = (element, className) => {
  if (element && element.classList.contains(className)) {
    element.classList.remove(className);
  }
};

// Check if element has class
const hasClass = (element, className) => {
  return element ? element.classList.contains(className) : false;
};

// Responsive navbar toggle
const initResponsiveNavbar = () => {
  const hamburger = DOM.query('.hamburger');
  const navLinks = DOM.query('.nav-links');
  
  if (hamburger && navLinks) {
    DOM.on(hamburger, 'click', () => {
      toggleClass(navLinks, 'nav-active');
      toggleClass(hamburger, 'toggle');
    });
  }
};

// Modal functionality
const initModals = () => {
  const modalTriggers = DOM.queryAll('.modal-trigger');
  
  modalTriggers.forEach(trigger => {
    const targetId = trigger.getAttribute('data-modal-target');
    const modal = DOM.byId(targetId);
    
    if (modal) {
      const closeButtons = modal.querySelectorAll('.modal-close, .modal-cancel');
      const overlay = modal.querySelector('.modal-overlay');
      
      // Open modal
      DOM.on(trigger, 'click', () => {
        addClass(modal, 'active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      });
      
      // Close modal with close buttons
      closeButtons.forEach(button => {
        DOM.on(button, 'click', () => {
          removeClass(modal, 'active');
          document.body.style.overflow = ''; // Restore scrolling
        });
      });
      
      // Close modal when clicking outside
      if (overlay) {
        DOM.on(overlay, 'click', (e) => {
          if (e.target === overlay) {
            removeClass(modal, 'active');
            document.body.style.overflow = ''; // Restore scrolling
          }
        });
      }
    }
  });
};

// Form validation
const initFormValidation = () => {
  const forms = DOM.queryAll('form[data-validate="true"]');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Submit handler
    DOM.on(form, 'submit', (e) => {
      let isValid = true;
      
      inputs.forEach(input => {
        // Required validation
        if (input.hasAttribute('required') && !input.value.trim()) {
          addClass(input, 'error');
          isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(input.value)) {
            addClass(input, 'error');
            isValid = false;
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault(); // Prevent form submission
      }
    });
    
    // Live validation on input
    inputs.forEach(input => {
      DOM.on(input, 'input', () => {
        if (hasClass(input, 'error')) {
          if (input.value.trim()) {
            if (input.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
              removeClass(input, 'error');
            }
          }
        }
      });
    });
  });
};

// Tooltips
const initTooltips = () => {
  const tooltipItems = DOM.queryAll('.tooltip-item');
  
  tooltipItems.forEach(item => {
    const tooltip = item.querySelector('.tooltip');
    
    if (tooltip) {
      // Mouse enter
      DOM.on(item, 'mouseenter', () => {
        addClass(tooltip, 'active');
      });
      
      // Mouse leave
      DOM.on(item, 'mouseleave', () => {
        removeClass(tooltip, 'active');
      });
    }
  });
};

// Initialize AOS (Animate on Scroll) if available
const initAOS = () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initResponsiveNavbar();
  initModals();
  initFormValidation();
  initTooltips();
  initAOS();
  
  // Initialize component library navigation
  const componentCategories = DOM.queryAll('.component-category');
  
  componentCategories.forEach(category => {
    const header = category.querySelector('.category-header');
    const content = category.querySelector('.category-content');
    
    if (header && content) {
      DOM.on(header, 'click', () => {
        toggleClass(content, 'show');
        toggleClass(header, 'active');
      });
    }
  });
});

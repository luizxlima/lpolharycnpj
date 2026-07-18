document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. FAQ ACCORDION
  // ==========================================================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = question.nextElementSibling;

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
        }
      });

      // Toggle current item
      const isActive = item.classList.contains('active');
      item.classList.toggle('active');

      if (!isActive) {
        // Open
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        // Close
        answer.style.maxHeight = '0px';
      }
    });
  });

  // Adjust accordion height on window resize
  window.addEventListener('resize', () => {
    const activeAnswers = document.querySelectorAll('.faq-item.active .faq-answer');
    activeAnswers.forEach(answer => {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    });
  });

  // ==========================================================================
  // 2. SCROLL REVEAL (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(element => {
      element.classList.add('active');
    });
  }

  // ==========================================================================
  // 3. FLOATING ACTION WIDGET
  // ==========================================================================
  const floatingCta = document.querySelector('.floating-cta');
  const heroSection = document.querySelector('.hero');

  if (floatingCta && heroSection) {
    window.addEventListener('scroll', () => {
      const heroHeight = heroSection.offsetHeight;
      const scrollPosition = window.scrollY;

      if (scrollPosition > heroHeight - 100) {
        floatingCta.classList.add('visible');
      } else {
        floatingCta.classList.remove('visible');
      }
    });
  }

  // ==========================================================================
  // 4. DYNAMIC COUNTDOWN TIMER
  // ==========================================================================
  const timerElements = {
    hours: document.getElementById('timer-hours'),
    minutes: document.getElementById('timer-minutes'),
    seconds: document.getElementById('timer-seconds')
  };

  if (timerElements.hours && timerElements.minutes && timerElements.seconds) {
    // Set countdown to end of today (midnight)
    function getRemainingTime() {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const difference = midnight.getTime() - now.getTime();

      let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      let minutes = Math.floor((difference / 1000 / 60) % 60);
      let seconds = Math.floor((difference / 1000) % 60);

      return {
        total: difference,
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      };
    }

    function updateTimer() {
      const time = getRemainingTime();
      
      timerElements.hours.textContent = time.hours;
      timerElements.minutes.textContent = time.minutes;
      timerElements.seconds.textContent = time.seconds;

      if (time.total <= 0) {
        clearInterval(timerInterval);
      }
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
  }

  // ==========================================================================
  // 5. SMOOTH SCROLL FOR INPAGE ANCHORS
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // MODAL LOGIC
  // ==========================================================================
  const modal = document.getElementById('lead-modal');
  const modalClose = document.querySelector('.modal-close');
  const allButtons = document.querySelectorAll('.btn-primary:not([type="submit"]), .header-cta');
  
  if (modal) {
    allButtons.forEach(btn => {
      // Remover href scroll para os botões e forçar o modal
      btn.addEventListener('click', (e) => {
        // Se não for um botão flutuante do whatsapp
        if(btn.id !== 'floating-whatsapp-btn') {
          e.preventDefault();
          e.stopPropagation();
          modal.classList.add('active');
        }
      });
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // MÁSCARA DE TELEFONE WHATSAPP
  // ==========================================================================
  const phoneInput = document.getElementById('lead-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let val = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
      let formatted = '';
      
      if (val.length > 0) {
        formatted += '(' + val.substring(0, 2);
      }
      if (val.length > 2) {
        formatted += ') ' + val.substring(2, 7);
      }
      if (val.length > 7) {
        formatted += '-' + val.substring(7, 11);
      }
      
      e.target.value = formatted;
    });
  }

  // ==========================================================================
  // MÁSCARA DE CNPJ
  // ==========================================================================
  const cnpjInput = document.getElementById('lead-cnpj');
  if (cnpjInput) {
    cnpjInput.addEventListener('input', function (e) {
      let val = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
      let formatted = '';
      
      if (val.length > 0) {
        formatted += val.substring(0, 2);
      }
      if (val.length > 2) {
        formatted += '.' + val.substring(2, 5);
      }
      if (val.length > 5) {
        formatted += '.' + val.substring(5, 8);
      }
      if (val.length > 8) {
        formatted += '/' + val.substring(8, 12);
      }
      if (val.length > 12) {
        formatted += '-' + val.substring(12, 14);
      }
      
      e.target.value = formatted;
    });
  }

  // ==========================================================================
  // VALIDAÇÃO E ENVIO DO FORMULÁRIO
  // ==========================================================================
  const leadForm = document.getElementById('lead-form');
  if (leadForm) {
    leadForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      const cnpjVal = cnpjInput ? cnpjInput.value.replace(/\D/g, '') : '';
      const nameVal = document.getElementById('lead-name') ? document.getElementById('lead-name').value.trim() : '';
      const emailVal = document.getElementById('lead-email') ? document.getElementById('lead-email').value.trim() : '';
      const phoneVal = document.getElementById('lead-phone') ? document.getElementById('lead-phone').value.replace(/\D/g, '') : '';
      
      const hasCnpj = cnpjVal.length === 14;
      const hasOthers = nameVal.length > 0 && emailVal.length > 0 && phoneVal.length >= 10;
      
      if (hasCnpj || hasOthers) {
        window.location.href = '/obg';
      } else {
        alert('Por favor, preencha um CNPJ válido OU os campos de Nome, Email e WhatsApp.');
      }
    });
  }
});

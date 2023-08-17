// Mobile nav toggle

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('mobile-nav-toggle')) {
      document.body.classList.toggle('mobile-nav-active');
      e.target.classList.toggle('fa-list');
      e.target.classList.toggle('fa-times'); // Corrected class name
    }
  });
});








// HERO type effect 
      const typedTextSpan = document.querySelector(".typed-text");
      const cursorSpan = document.querySelector(".cursor");
      const textArray = ["a Developer.", "a Designer.", "a Freelancer."];
      const typingDelay = 100;
      const erasingDelay = 50;
      const newTextDelay = 1000; // Delay between current and next text
      let textArrayIndex = 0;
      let charIndex = 0;
      function type() {
        if (charIndex < textArray[textArrayIndex].length) {
          if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
          typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, typingDelay);
        } 
        else {
          cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
      }
      function erase() {
          if (charIndex > 0) {
          if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
          typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
          charIndex--;
          setTimeout(erase, erasingDelay);
        } 
        else {
          cursorSpan.classList.remove("typing");
          textArrayIndex++;
          if(textArrayIndex>=textArray.length) textArrayIndex=0;
          setTimeout(type, typingDelay + 1100);
        }
      }
      document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
        if(textArray.length) setTimeout(type, newTextDelay + 250);
      });






      (function() {
        "use strict";
      
        /**
         * Easy selector helper function
         */
        const select = (el, all = false) => {
          el = el.trim()
          if (all) {
            return [...document.querySelectorAll(el)]
          } else {
            return document.querySelector(el)
          }
        }
      
        /**
         * Easy event listener function
         */
        const on = (type, el, listener, all = false) => {
          let selectEl = select(el, all)
          if (selectEl) {
            if (all) {
              selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
              selectEl.addEventListener(type, listener)
            }
          }
        }
      
        /**
         * Easy on scroll event listener 
         */
        const onscroll = (el, listener) => {
          el.addEventListener('scroll', listener)
        }
      
        /**
         * Navbar links active state on scroll
         */
        let navbarlinks = select('#navbar .scrollto', true)
        const navbarlinksActive = () => {
          let position = window.scrollY + 200
          navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
              navbarlink.classList.add('active')
            } else {
              navbarlink.classList.remove('active')
            }
          })
        }
        window.addEventListener('load', navbarlinksActive)
        onscroll(document, navbarlinksActive)
      
        /**
         * Scrolls to an element with header offset
         */
        const scrollto = (el) => {
          let elementPos = select(el).offsetTop
          window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
          })
        }
      
        /**
         * Back to top button
         */
        let backtotop = select('.back-to-top')
        if (backtotop) {
          const toggleBacktotop = () => {
            if (window.scrollY > 100) {
              backtotop.classList.add('active')
            } else {
              backtotop.classList.remove('active')
            }
          }
          window.addEventListener('load', toggleBacktotop)
          onscroll(document, toggleBacktotop)
        }

        /**
         * Scrool with ofset on links with a class name .scrollto
         */
        on('click', '.scrollto', function(e) {
          if (select(this.hash)) {
            e.preventDefault()
      
            let body = select('body')
            if (body.classList.contains('mobile-nav-active')) {
              body.classList.remove('mobile-nav-active')
              let navbarToggle = select('.mobile-nav-toggle')
              navbarToggle.classList.toggle('bi-list')
              navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
          }
        }, true)
      
        /**
         * Scroll with ofset on page load with hash links in the url
         */
        window.addEventListener('load', () => {
          if (window.location.hash) {
            if (select(window.location.hash)) {
              scrollto(window.location.hash)
            }
          }
        });
      
        /**
         * Hero type effect
         */
        const typed = select('.typed')
        if (typed) {
          let typed_strings = typed.getAttribute('data-typed-items')
          typed_strings = typed_strings.split(',')
          new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
          });
        }
      
        /**
         * Skills animation
         */
        let skilsContent = select('.skills-content');
        if (skilsContent) {
          new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function(direction) {
              let progress = select('.progress .progress-bar', true);
              progress.forEach((el) => {
                el.style.width = el.getAttribute('aria-valuenow') + '%'
              });
            }
          })
        }
      
        /**
         * Porfolio isotope and filter
         */
        window.addEventListener('load', () => {
          let portfolioContainer = select('.portfolio-container');
          if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
              itemSelector: '.portfolio-item'
            });
      
            let portfolioFilters = select('#portfolio-flters li', true);
      
            on('click', '#portfolio-flters li', function(e) {
              e.preventDefault();
              portfolioFilters.forEach(function(el) {
                el.classList.remove('filter-active');
              });
              this.classList.add('filter-active');
      
              portfolioIsotope.arrange({
                filter: this.getAttribute('data-filter')
              });
              portfolioIsotope.on('arrangeComplete', function() {
                AOS.refresh()
              });
            }, true);
          }
      
        });
      
        /**
         * Initiate portfolio lightbox 
         */
        const portfolioLightbox = GLightbox({
          selector: '.portfolio-lightbox'
        });
      
        /**
         * Portfolio details slider
         */
        new Swiper('.portfolio-details-slider', {
          speed: 400,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          }
        });
      
        /**
         * Testimonials slider
         */
        new Swiper('.testimonials-slider', {
          speed: 600,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          },
          breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
      
            1200: {
              slidesPerView: 3,
              spaceBetween: 20
            }
          }
        });
      
        /**
         * Animation on scroll
         */
        window.addEventListener('load', () => {
          AOS.init({
            duration: 100,
            easing: 'ease-in-out',
              mirror: false
          })
        });
      
      })



document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");
  const whatsappButton = document.querySelector(".whatsapp");
  const fiverrButton = document.querySelector(".fiverr");

  // Function to check scroll position and show/hide buttons
  function checkScrollPosition() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
      whatsappButton.classList.add("show");
      fiverrButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
      whatsappButton.classList.remove("show");
      fiverrButton.classList.remove("show");
    }
  }

  // Event listener for scroll
  window.addEventListener("scroll", checkScrollPosition);

  // Function to scroll to top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Event listener for back to top button click
  backToTopButton.addEventListener("click", scrollToTop);
});







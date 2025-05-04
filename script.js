// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      mainNav.classList.toggle("active");

      // Toggle hamburger to X
      const spans = this.querySelectorAll("span");
      if (mainNav.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mainNav.classList.remove("active");

      // Reset hamburger icon
      if (mobileMenuBtn) {
        const spans = mobileMenuBtn.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }

      // Update active link
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Portfolio filtering
  const portfolioFilters = document.querySelectorAll(".portfolio-filter");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  portfolioFilters.forEach((filter) => {
    filter.addEventListener("click", function () {
      // Update active filter
      portfolioFilters.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category").includes(filterValue)
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 10);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Testimonial slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialControls = document.querySelectorAll(".testimonial-control");
  let currentSlide = 0;

  function showSlide(index) {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    testimonialControls.forEach((control) =>
      control.classList.remove("active")
    );

    testimonialSlides[index].classList.add("active");
    testimonialControls[index].classList.add("active");
    currentSlide = index;
  }

  testimonialControls.forEach((control, index) => {
    control.addEventListener("click", () => showSlide(index));
  });

  // Auto-rotate testimonials
  function autoRotateTestimonials() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
  }

  // Initialize first slide
  showSlide(0);

  // Set interval for auto-rotation (every 5 seconds)
  const testimonialInterval = setInterval(autoRotateTestimonials, 5000);

  // Pause auto-rotation when hovering over testimonials
  const testimonialSection = document.querySelector(".testimonials-slider");
  if (testimonialSection) {
    testimonialSection.addEventListener("mouseenter", () =>
      clearInterval(testimonialInterval)
    );
    testimonialSection.addEventListener("mouseleave", () => {
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(autoRotateTestimonials, 5000);
    });
  }

  // Portfolio modal
  const portfolioModal = document.getElementById("portfolio-modal");
  const portfolioModalTitle = document.getElementById("portfolio-modal-title");
  const portfolioModalContent = document.getElementById(
    "portfolio-modal-content"
  );
  const closePortfolioModal = document.getElementById("close-portfolio-modal");
  const viewDetailsButtons = document.querySelectorAll(".view-details");

  // Portfolio data
  const portfolioData = {
    app1: {
      title: "Task Manager Pro",
      description:
        "A comprehensive task management application designed to help users organize their daily activities, set priorities, and track progress.",
      features: [
        "Intuitive task creation and management",
        "Priority levels and categorization",
        "Due date reminders and notifications",
        "Progress tracking with visual indicators",
        "Data synchronization across devices",
      ],
      technologies: [
        "Java",
        "Android SDK",
        "SQLite",
        "Firebase",
        "Material Design",
      ],
      image: "https://picsum.photos/800/1600",
    },
    app2: {
      title: "Melody Stream",
      description:
        "A feature-rich music player application that provides users with a seamless listening experience and advanced audio controls.",
      features: [
        "Elegant and intuitive user interface",
        "Advanced audio equalizer",
        "Playlist creation and management",
        "Background playback and lock screen controls",
        "Audio visualization effects",
      ],
      technologies: [
        "Java",
        "Android Media API",
        "ExoPlayer",
        "Room Database",
        "Material Design",
      ],
      image: "https://picsum.photos/801/1600",
    },
    app3: {
      title: "EduQuest",
      description:
        "An interactive learning application designed to make education engaging and accessible through gamified lessons and quizzes.",
      features: [
        "Interactive lessons with multimedia content",
        "Progress tracking and achievement system",
        "Customizable learning paths",
        "Offline access to educational content",
        "Regular content updates",
      ],
      technologies: [
        "Java",
        "Android SDK",
        "SQLite",
        "Firebase",
        "Animation API",
      ],
      image: "https://picsum.photos/802/1600",
    },
    app4: {
      title: "Weather Forecast",
      description:
        "A reliable weather application that provides accurate forecasts, real-time updates, and detailed weather information for locations worldwide.",
      features: [
        "Real-time weather updates",
        "7-day forecast with detailed information",
        "Location-based weather data",
        "Weather alerts and notifications",
        "Interactive weather maps",
      ],
      technologies: [
        "Java",
        "Retrofit",
        "OpenWeatherMap API",
        "Google Maps API",
        "Material Design",
      ],
      image: "https://picsum.photos/803/1600",
    },
    app5: {
      title: "QuickNote",
      description:
        "A streamlined note-taking application that helps users capture ideas, create to-do lists, and organize information efficiently.",
      features: [
        "Fast note creation and editing",
        "Rich text formatting options",
        "Categories and tags for organization",
        "Search functionality",
        "Cloud synchronization",
      ],
      technologies: [
        "Java",
        "Room Database",
        "WorkManager",
        "Material Design",
        "Firebase",
      ],
      image: "https://picsum.photos/804/1600",
    },
    app6: {
      title: "Quiz Master",
      description:
        "An educational quiz application that makes learning fun through interactive quizzes across various subjects and difficulty levels.",
      features: [
        "Diverse question types and formats",
        "Multiple difficulty levels",
        "Score tracking and performance analytics",
        "Timed quizzes and challenges",
        "Educational content across various subjects",
      ],
      technologies: [
        "Java",
        "Android SDK",
        "SQLite",
        "Animation API",
        "Material Design",
      ],
      image: "https://picsum.photos/805/1600",
    },
  };

  // Open portfolio modal with app details
  viewDetailsButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const appId = this.getAttribute("data-id");
      const app = portfolioData[appId];

      if (app) {
        portfolioModalTitle.textContent = app.title;

        let content = `
                    <div class="portfolio-modal-grid">
                        <div class="portfolio-modal-image">
                            <img src="${app.image}" alt="${app.title}">
                        </div>
                        <div class="portfolio-modal-details">
                            <p class="portfolio-description">${app.description
          }</p>
                            
                            <div class="portfolio-features">
                                <h3>Key Features</h3>
                                <ul>
                                    ${app.features
            .map((feature) => `<li>${feature}</li>`)
            .join("")}
                                </ul>
                            </div>
                            
                            <div class="portfolio-technologies">
                                <h3>Technologies Used</h3>
                                <div class="tech-tags">
                                    ${app.technologies
            .map(
              (tech) =>
                `<span class="tech-tag">${tech}</span>`
            )
            .join("")}
                                </div>
                            </div>
                            
                            <div class="portfolio-modal-actions">
                                <a href="https://play.google.com/store/apps/dev?id=5477843962633301530" class="primary-btn" target="_blank">
                                    <i class="fab fa-google-play"></i> View on Google Play
                                </a>
                            </div>
                        </div>
                    </div>
                `;

        portfolioModalContent.innerHTML = content;
        portfolioModal.classList.remove("hidden");
        portfolioModal.classList.add("show");
        document.body.style.overflow = "hidden";

        // Add CSS for the modal content
        const style = document.createElement("style");
        style.textContent = `
                    .portfolio-modal-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 30px;
                    }
                    
                    .portfolio-modal-image img {
                        width: 100%;
                        height: auto;
                        border-radius: var(--border-radius);
                        box-shadow: var(--shadow-sm);
                    }
                    
                    .portfolio-description {
                        margin-bottom: 20px;
                        line-height: 1.6;
                    }
                    
                    .portfolio-features, .portfolio-technologies {
                        margin-bottom: 20px;
                    }
                    
                    .portfolio-features h3, .portfolio-technologies h3 {
                        font-size: 1.2rem;
                        margin-bottom: 10px;
                        color: var(--primary-color);
                    }
                    
                    .portfolio-features ul {
                        padding-left: 20px;
                    }
                    
                    .portfolio-features li {
                        margin-bottom: 8px;
                    }
                    
                    .tech-tags {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                    
                    .tech-tag {
                        background-color: var(--bg-gray);
                        padding: 5px 10px;
                        border-radius: 20px;
                        font-size: 0.9rem;
                    }
                    
                    .portfolio-modal-actions {
                        margin-top: 30px;
                    }
                    
                    @media (max-width: 768px) {
                        .portfolio-modal-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `;
        document.head.appendChild(style);
      }
    });
  });

  // Close portfolio modal
  if (closePortfolioModal) {
    closePortfolioModal.addEventListener("click", function () {
      portfolioModal.classList.remove("show");
      setTimeout(() => {
        portfolioModal.classList.add("hidden");
        document.body.style.overflow = "auto";
      }, 300);
    });
  }

  // Close modal when clicking outside
  if (portfolioModal) {
    portfolioModal.addEventListener("click", function (e) {
      if (e.target === portfolioModal) {
        closePortfolioModal.click();
      }
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  const successToast = document.getElementById("success-toast");
  const closeToast = document.getElementById("close-toast");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission
      const formData = new FormData(contactForm);
      const formValues = {};

      formData.forEach((value, key) => {
        formValues[key] = value;
      });

      // Log form data (in a real app, you would send this to a server)
      console.log("Form submitted:", formValues);

      // Show success message
      successToast.classList.remove("hidden");
      successToast.classList.add("show");

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successToast.classList.remove("show");
        setTimeout(() => {
          successToast.classList.add("hidden");
        }, 300);
      }, 5000);
    });
  }

  // Close toast
  if (closeToast) {
    closeToast.addEventListener("click", function () {
      successToast.classList.remove("show");
      setTimeout(() => {
        successToast.classList.add("hidden");
      }, 300);
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active nav link on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".main-nav a");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const headerHeight = document.querySelector("header").offsetHeight;

      if (window.pageYOffset >= sectionTop - headerHeight - 100) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);

  // Download CV button
  const downloadCvBtn = document.getElementById("download-cv");
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", function (e) {
      e.preventDefault();
      alert(
        "CV download functionality would be implemented here. This would typically download a PDF file."
      );
    });
  }

  // Initialize AOS (Animate on Scroll) effect manually
  function initializeAOS() {
    const animatedElements = document.querySelectorAll(
      ".service-card, .portfolio-item, .skill-item"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-animate");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("aos-init");
      observer.observe(element);
    });
  }

  // Add CSS for AOS animations
  const aosStyle = document.createElement("style");
  aosStyle.textContent = `
        .aos-init {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(aosStyle);

  // Initialize AOS
  initializeAOS();
});

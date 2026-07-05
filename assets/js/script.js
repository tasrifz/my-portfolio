/**
 * Portfolio - S.M. Tasrif Zaman - Core Architectural Interface Matrix Engine
 * Contains Interactive Scrolling Tracking, Form Actions, Project Filters & Fluid Typing Pipeline
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. Theme Controller Pipeline (Light/Dark Toggle)
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentThemeProfile = localStorage.getItem('theme-profile') || (systemPrefersDark ? 'dark' : 'light');
    
    htmlElement.setAttribute('data-theme', currentThemeProfile);
    htmlElement.setAttribute('data-bs-theme', currentThemeProfile);
    updateInterfaceIcon(currentThemeProfile);

    themeToggleBtn.addEventListener('click', () => {
        let activeTheme = htmlElement.getAttribute('data-theme');
        let targetedTheme = (activeTheme === 'dark') ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', targetedTheme);
        htmlElement.setAttribute('data-bs-theme', targetedTheme);
        localStorage.setItem('theme-profile', targetedTheme);
        updateInterfaceIcon(targetedTheme);
    });

    function updateInterfaceIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun fs-5 text-warning';
        } else {
            themeIcon.className = 'fa-solid fa-moon fs-5 text-dark';
        }
    }

    // ----------------------------------------------------
    // 2. Dynamic Typing System
    // ----------------------------------------------------

const architectureWords = [
    "Full Stack Software Developer (Web & Mobile)",
    "Enterprise System Architect",
    "Spring Boot & Java Developer",
    "Flutter & Android Developer"
];

let wordIndex = 0;

function runTypingSystem() {
    const targetElement = document.getElementById('dynamic-jobs');
    if (!targetElement) return;

    targetElement.innerHTML = "";
    
    let currentWord = architectureWords[wordIndex];
    let charIndex = 0;
    
    let typeInterval = setInterval(() => {
        if (charIndex < currentWord.length) {
            targetElement.innerHTML += currentWord.charAt(charIndex);
            charIndex++;
        } else {
            clearInterval(typeInterval);
            // Wait 3 seconds, increment wordIndex, and run again
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % architectureWords.length;
                runTypingSystem();
            }, 3000); 
        }
    }, 60);
}
runTypingSystem();

    // ----------------------------------------------------
    // 3. Projects Category Filter System
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active status from other filter actions
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    // Show item with transition
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide item
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ----------------------------------------------------
    // 4. Custom ScrollSpy Node (Nav Active Item Highlighter)
    // ----------------------------------------------------
    const targets = document.querySelectorAll('.section-target');
    const links = document.querySelectorAll('.navbar-nav .nav-link');

    function elementBoundaryTracker() {
        let scrollVector = window.scrollY + 160;

        targets.forEach(section => {
            const topBoundary = section.offsetTop;
            const absoluteHeight = section.offsetHeight;
            const elementId = section.getAttribute('id');

            if (scrollVector >= topBoundary && scrollVector < topBoundary + absoluteHeight) {
                links.forEach(anchor => {
                    anchor.classList.remove('active');
                    if (anchor.getAttribute('href') === `#${elementId}`) {
                        anchor.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', elementBoundaryTracker);
    elementBoundaryTracker();

    // ----------------------------------------------------
    // 5. Mobile Navbar Auto-Collapse on Click
    // ----------------------------------------------------
    const navbarToggler = document.querySelector('.navbar-toggler');
    const enterpriseNav = document.getElementById('enterpriseNav');
    
    links.forEach(item => {
        item.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                const bsCollapseInstance = bootstrap.Collapse.getInstance(enterpriseNav);
                if (bsCollapseInstance) {
                    bsCollapseInstance.hide();
                }
            }
        });
    });

function seekVideo(seconds) {
    const video = document.getElementById('bKashVideo');
    if (video) {
        if (video.paused) video.play();
        video.currentTime += seconds;
    }
}
window.seekVideo = seekVideo;

window.togglePlay = function() {
    const video = document.getElementById('bKashVideo');
    if (video) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
};

const videoEl = document.getElementById('bKashVideo');
if (videoEl) {
    videoEl.addEventListener('play', () => {
        const icon = document.getElementById('playIcon');
        if (icon) icon.className = 'fa-solid fa-pause';
    });
    videoEl.addEventListener('pause', () => {
        const icon = document.getElementById('playIcon');
        if (icon) icon.className = 'fa-solid fa-play';
    });
}


    // ----------------------------------------------------
    // 6. Scroll-To-Top Button Logic
    // ----------------------------------------------------
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Ultra-Fast Interactive Preloader Fade-out
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300); 
        }, 400); 
    }
});

// ----------------------------------------------------
// FIXED: Web3Forms Contact Form Mail Action (AJAX)
// ----------------------------------------------------
window.handleContactFormSubmit = async function(event) {
    event.preventDefault();
    
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const statusAlert = document.getElementById('form-status');

    btnText.classList.add('d-none');
    btnSpinner.classList.remove('d-none');
    submitBtn.disabled = true;
    statusAlert.className = 'alert d-none mb-4';

    const formData = new FormData(form);
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();

        if (data.success) {
            statusAlert.className = 'alert alert-success mb-4';
            statusAlert.innerHTML = '<i class="fa-solid fa-circle-check me-2"></i> Message sent successfully!';
            form.reset();
        } else {
            statusAlert.className = 'alert alert-danger mb-4';
            statusAlert.innerHTML = `<i class="fa-solid fa-circle-exclamation me-2"></i> Error: ${data.message}`;
        }
    } catch (error) {
        statusAlert.className = 'alert alert-danger mb-4';
        statusAlert.innerHTML = '<i class="fa-solid fa-circle-exclamation me-2"></i> Something went wrong!';
    } finally {
        btnText.classList.remove('d-none');
        btnSpinner.classList.add('d-none');
        submitBtn.disabled = false;
        setTimeout(() => statusAlert.classList.add('d-none'), 5000);
    }
};
// Main JavaScript File for Monastery360 Project
// This file consolidates all JavaScript functionality from the website

// ========================
// Theme Management System
// ========================


class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.createToggleButton();
        this.bindEvents();
    }

    getStoredTheme() {
        return localStorage.getItem('monastery360-theme');
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Handle both data-theme and Tailwind CSS dark mode
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        localStorage.setItem('monastery360-theme', theme);
        localStorage.setItem('color-theme', theme); // for compatibility
        this.updateToggleButton();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    createToggleButton() {
        // Only create if it doesn't exist and no existing theme-toggle button
        if (document.getElementById('theme-toggle-btn') || document.getElementById('theme-toggle')) return;

        const toggleButton = document.createElement('button');
        toggleButton.id = 'theme-toggle-btn';
        toggleButton.className = 'theme-toggle';
        toggleButton.setAttribute('aria-label', 'Toggle theme');
        
        toggleButton.innerHTML = `
            <svg class="moon-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg class="sun-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
            </svg>
        `;

        document.body.appendChild(toggleButton);
        this.updateToggleButton();
    }

    updateToggleButton() {
        const button = document.getElementById('theme-toggle-btn') || document.getElementById('theme-toggle');
        if (button) {
            button.setAttribute('aria-label', `Switch to ${this.currentTheme === 'light' ? 'dark' : 'light'} mode`);
            
            // Update icon visibility for existing theme-toggle buttons
            const darkIcon = button.querySelector('#theme-toggle-dark-icon') || button.querySelector('.moon-icon');
            const lightIcon = button.querySelector('#theme-toggle-light-icon') || button.querySelector('.sun-icon');
            
            if (darkIcon && lightIcon) {
                if (this.currentTheme === 'dark') {
                    darkIcon.classList.add('hidden');
                    lightIcon.classList.remove('hidden');
                } else {
                    darkIcon.classList.remove('hidden');
                    lightIcon.classList.add('hidden');
                }
            }
        }
    }

    bindEvents() {
        // Handle button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle-btn') || e.target.closest('#theme-toggle')) {
                this.toggleTheme();
            }
        });

        // Handle system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
}

// ========================
// User Authentication System
// ========================

class AuthManager {
    constructor() {
        this.loggedInUser = localStorage.getItem('loggedInUser');
        this.init();
    }

    init() {
        this.setupLoginButton();
    }

    setupLoginButton() {
        const loginBtn = document.getElementById('loginBtn');
        if (!loginBtn) return;

        // Check if user is already logged in
        if (this.loggedInUser) {
            this.showLoggedIn(this.loggedInUser);
        }

        // Add click handler to login button
        loginBtn.addEventListener('click', (e) => {
            if (!this.loggedInUser) {
                e.preventDefault();
                const username = prompt("Enter your username:");
                if (username) {
                    this.login(username);
                }
            }
        });
    }

    login(username) {
        localStorage.setItem('loggedInUser', username);
        this.loggedInUser = username;
        this.showLoggedIn(username);
        alert("Login successful!");
    }

    showLoggedIn(username) {
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.textContent = username;
            loginBtn.href = "#";
        }
    }

    logout() {
        localStorage.removeItem('loggedInUser');
        this.loggedInUser = null;
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.textContent = "Login";
            loginBtn.href = "login.html";
        }
    }
}

// ========================
// Mobile Menu System
// ========================

class MobileMenuManager {
    constructor() {
        this.init();
    }

    init() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    }
}

// ========================
// Lightbox Modal System
// ========================

class LightboxManager {
    constructor() {
        this.images = Array.from(document.querySelectorAll('.manuscript-img'));
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.setupLightbox();
        this.bindKeyboardEvents();
    }

    setupLightbox() {
        const lightboxModal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const captionText = document.getElementById('lightbox-caption-text');
        const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
        const prevBtn = document.getElementById('lightbox-prev-btn');
        const nextBtn = document.getElementById('lightbox-next-btn');

        if (!lightboxModal || !modalImg || !captionText) return;

        // Setup image click handlers
        this.images.forEach((img, index) => {
            img.onclick = () => {
                this.currentIndex = index;
                this.openLightbox();
            };
        });

        // Setup close handlers
        if (lightboxCloseBtn) {
            lightboxCloseBtn.onclick = () => this.closeLightbox();
        }

        if (lightboxModal) {
            lightboxModal.onclick = (event) => {
                if (event.target === lightboxModal) {
                    this.closeLightbox();
                }
            };
        }

        // Prev / Next button events
        if (prevBtn) {
            prevBtn.onclick = () => this.showPrev();
        }
        if (nextBtn) {
            nextBtn.onclick = () => this.showNext();
        }
    }

    openLightbox() {
        const lightboxModal = document.getElementById('lightbox-modal');
        if (!lightboxModal) return;
        lightboxModal.style.display = "flex";
        this.updateLightbox();
    }

    updateLightbox() {
        const modalImg = document.getElementById('lightbox-img');
        const captionText = document.getElementById('lightbox-caption-text');
        if (!this.images[this.currentIndex]) return;

        modalImg.src = this.images[this.currentIndex].src;
        captionText.innerHTML = this.images[this.currentIndex].dataset.description 
                                || this.images[this.currentIndex].alt;
    }

    closeLightbox() {
        const lightboxModal = document.getElementById('lightbox-modal');
        if (lightboxModal) {
            lightboxModal.style.display = "none";
        }
    }

    showPrev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateLightbox();
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateLightbox();
    }

    bindKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                this.closeLightbox();
            } else if (event.key === "ArrowLeft") {
                this.showPrev();
            } else if (event.key === "ArrowRight") {
                this.showNext();
            }
        });
    }
}


// ========================
// Tour Modal System
// ========================

class TourModalManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTourModal();
        this.setupGlobeLinks();
        this.bindKeyboardEvents();
    }

    setupTourModal() {
        const tourModal = document.getElementById('tour-modal');
        const tourIframe = document.getElementById('tour-iframe');
        const tourCloseBtn = document.getElementById('tour-close-btn');

        if (!tourModal || !tourIframe || !tourCloseBtn) return;

        // Setup tour card click handlers
        document.querySelectorAll('.tour-card').forEach(card => {
            card.addEventListener('click', () => {
                const tourUrl = card.dataset.tourUrl;
                if (tourUrl) {
                    tourIframe.src = tourUrl;
                    tourModal.style.display = "flex";
                }
            });
        });

        // Setup close handlers
        tourCloseBtn.onclick = () => this.closeTourModal();
        tourModal.onclick = (event) => {
            if (event.target === tourModal) {
                this.closeTourModal();
            }
        };
    }

    setupGlobeLinks() {
        const globeLinks = document.querySelectorAll('.tour-globe');
        const tourModal = document.getElementById('tourModal');
        const tourFrame = document.getElementById('tourFrame');
        const closeModal = document.getElementById('closeModal');

        if (globeLinks.length > 0 && tourModal && tourFrame && closeModal) {
            globeLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const url = link.getAttribute('data-tour-url');
                    tourFrame.src = url;
                    tourModal.classList.remove('hidden');
                });
            });

            closeModal.addEventListener('click', () => {
                tourModal.classList.add('hidden');
                tourFrame.src = "";
            });

            // Click outside modal to close
            tourModal.addEventListener('click', (e) => {
                if (e.target === tourModal) {
                    tourModal.classList.add('hidden');
                    tourFrame.src = "";
                }
            });
        }
    }

    closeTourModal() {
        const tourModal = document.getElementById('tour-modal');
        const tourIframe = document.getElementById('tour-iframe');
        
        if (tourModal) {
            tourModal.style.display = "none";
        }
        if (tourIframe) {
            tourIframe.src = "";
        }
    }

    bindKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                this.closeTourModal();
                
                // Also handle monastery modal
                const tourModal = document.getElementById('tourModal');
                const tourFrame = document.getElementById('tourFrame');
                if (tourModal && !tourModal.classList.contains('hidden')) {
                    tourModal.classList.add('hidden');
                    if (tourFrame) {
                        tourFrame.src = "";
                    }
                }
            }
        });
    }
}

// ========================
// Form Validation System
// ========================

class FormManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupSignupForm();
    }

    setupSignupForm() {
        const form = document.getElementById('signupForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const password = document.getElementById('password')?.value;
            const confirmPassword = document.getElementById('confirmPassword')?.value;

            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Simulate signup success
            alert(`Account created successfully!\nWelcome, ${name}`);
            form.reset();
            // Redirect to homepage
            window.location.href = 'index.html';
        });
    }
}

// ========================
// Navigation Utilities
// ========================

class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupBackButton();
        this.setupReloadButton();
    }

    setupBackButton() {
        // Handle back button functionality for buttons with onclick="history.back()"
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('onclick') && 
                e.target.getAttribute('onclick').includes('history.back()')) {
                e.preventDefault();
                history.back();
            }
        });
    }

    setupReloadButton() {
        // Handle reload button functionality for buttons with onclick="location.reload()"
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('onclick') && 
                e.target.getAttribute('onclick').includes('location.reload()')) {
                e.preventDefault();
                location.reload();
            }
        });
    }
}

// ========================
// Main Application Class
// ========================

class Monastery360App {
    constructor() {
        this.themeManager = null;
        this.authManager = null;
        this.mobileMenuManager = null;
        this.lightboxManager = null;
        this.tourModalManager = null;
        this.formManager = null;
        this.navigationManager = null;
    }

    init() {
        // Initialize all managers
        this.themeManager = new ThemeManager();
        this.authManager = new AuthManager();
        this.mobileMenuManager = new MobileMenuManager();
        this.lightboxManager = new LightboxManager();
        this.tourModalManager = new TourModalManager();
        this.formManager = new FormManager();
        this.navigationManager = new NavigationManager();

        console.log('Monastery360 App initialized successfully');
    }
}

// ========================
// Application Initialization
// ========================

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme early for better UX
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Initialize main application
    window.monastery360App = new Monastery360App();
    window.monastery360App.init();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.monastery360App) {
            window.monastery360App = new Monastery360App();
            window.monastery360App.init();
        }
    });
} else {
    if (!window.monastery360App) {
        window.monastery360App = new Monastery360App();
        window.monastery360App.init();
    }
}

// ========================
// Global Utility Functions
// ========================

// Global functions for backward compatibility
window.monastery360 = {
    toggleTheme: () => window.monastery360App?.themeManager?.toggleTheme(),
    login: (username) => window.monastery360App?.authManager?.login(username),
    logout: () => window.monastery360App?.authManager?.logout(),
    closeLightbox: () => window.monastery360App?.lightboxManager?.closeLightbox(),
    closeTourModal: () => window.monastery360App?.tourModalManager?.closeTourModal()
};

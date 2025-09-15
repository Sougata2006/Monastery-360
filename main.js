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
        } else {
            // Ensure it behaves as a normal navigation link to login page on all devices
            // Use only the current file name (relative) for redirect to avoid file:/// absolute paths
            const path = window.location.pathname;
            const currentFile = (path.split('/').pop() || 'index.html');
            const baseHref = 'login.html';
            loginBtn.setAttribute('href', `${baseHref}?redirect=${encodeURIComponent(currentFile)}`);
        }
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

// ========================
// Signup Page Functionality
// ========================

class SignupManager {
    constructor() {
        this.elements = {};
        this.init();
    }

    init() {
        // Only initialize if we're on the signup page
        if (document.getElementById('signupForm')) {
            this.initializeElements();
            this.bindEvents();
            this.initializeTheme();
        }
    }

    initializeElements() {
        // DOM Elements
        this.elements = {
            form: document.getElementById('signupForm'),
            modalOverlay: document.getElementById('modalOverlay'),
            modalClose: document.getElementById('modalClose'),
            signupButton: document.getElementById('signupButton'),
            passwordToggle: document.getElementById('passwordToggle'),
            confirmPasswordToggle: document.getElementById('confirmPasswordToggle'),
            passwordInput: document.getElementById('password'),
            confirmPasswordInput: document.getElementById('confirmPassword'),
            nameInput: document.getElementById('name'),
            emailInput: document.getElementById('email'),
            passwordStrength: document.getElementById('passwordStrength'),
            strengthFill: document.getElementById('strengthFill'),
            strengthText: document.getElementById('strengthText'),
            
            // Role selection elements
            roleInputs: document.querySelectorAll('input[name="role"]'),
            studentFields: document.getElementById('studentFields'),
            researcherFields: document.getElementById('researcherFields'),
            operatorFields: document.getElementById('operatorFields'),
            idProofUpload: document.getElementById('idProof'),
            idProofFileName: document.getElementById('idProofFileName')
        };
    }

    bindEvents() {
        // Password toggle functionality
        this.setupPasswordToggle(this.elements.passwordToggle, this.elements.passwordInput);
        this.setupPasswordToggle(this.elements.confirmPasswordToggle, this.elements.confirmPasswordInput);

        // Role selection events
        this.elements.roleInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.showConditionalFields(e.target.value);
                this.validateRole();
            });
        });

        // File upload handling
        if (this.elements.idProofUpload) {
            this.elements.idProofUpload.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    this.elements.idProofFileName.textContent = `Selected: ${file.name}`;
                } else {
                    this.elements.idProofFileName.textContent = '';
                }
            });
        }

        // Password strength events
        this.elements.passwordInput.addEventListener('focus', () => {
            this.elements.passwordStrength.classList.add('show');
        });

        this.elements.passwordInput.addEventListener('input', () => {
            this.checkPasswordStrength(this.elements.passwordInput.value);
        });

        // Real-time validation
        [this.elements.nameInput, this.elements.emailInput, this.elements.passwordInput, this.elements.confirmPasswordInput].forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('input', () => {
                if (input.closest('.form-group').classList.contains('error')) {
                    this.validateInput(input);
                }
            });
        });

        // Form submission
        this.elements.form.addEventListener('submit', (e) => this.handleFormSubmission(e));

        // Modal events
        this.elements.modalClose.addEventListener('click', () => {
            this.elements.modalOverlay.classList.remove('show');
            window.location.href = 'index.html';
        });

        this.elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.modalOverlay) {
                this.elements.modalOverlay.classList.remove('show');
                window.location.href = 'index.html';
            }
        });

        // Initialize conditional field validation
        this.addConditionalFieldValidation();
    }

    setupPasswordToggle(toggle, input) {
        if (toggle && input) {
            toggle.addEventListener('click', () => {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                
                const icon = toggle.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        }
    }

    showConditionalFields(role) {
        // Hide all conditional fields first
        if (this.elements.studentFields) this.elements.studentFields.classList.remove('show');
        if (this.elements.researcherFields) this.elements.researcherFields.classList.remove('show');
        if (this.elements.operatorFields) this.elements.operatorFields.classList.remove('show');

        // Show relevant fields based on role
        switch(role) {
            case 'student':
                if (this.elements.studentFields) this.elements.studentFields.classList.add('show');
                break;
            case 'researcher':
                if (this.elements.researcherFields) this.elements.researcherFields.classList.add('show');
                break;
            case 'operator':
                if (this.elements.operatorFields) this.elements.operatorFields.classList.add('show');
                break;
            // Tourist doesn't need additional fields
        }
    }

    checkPasswordStrength(password) {
        let strength = 0;
        let feedback = '';

        if (password.length >= 8) strength++;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;

        this.elements.strengthFill.className = 'strength-fill';
        
        if (strength === 0) {
            feedback = 'Very weak';
        } else if (strength === 1) {
            feedback = 'Weak';
            this.elements.strengthFill.classList.add('strength-weak');
        } else if (strength === 2) {
            feedback = 'Fair';
            this.elements.strengthFill.classList.add('strength-weak');
        } else if (strength === 3) {
            feedback = 'Good';
            this.elements.strengthFill.classList.add('strength-medium');
        } else {
            feedback = 'Strong';
            this.elements.strengthFill.classList.add('strength-strong');
        }

        this.elements.strengthText.textContent = feedback;
        return strength;
    }

    validateInput(input) {
        const formGroup = input.closest('.form-group');
        const value = input.value.trim();
        
        formGroup.classList.remove('error', 'success');
        
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                formGroup.classList.add('error');
                return false;
            }
        } else if (input.id === 'password') {
            if (value.length < 8) {
                formGroup.classList.add('error');
                return false;
            }
        } else if (input.id === 'confirmPassword') {
            if (value !== this.elements.passwordInput.value) {
                formGroup.classList.add('error');
                return false;
            }
        } else if (input.type === 'file') {
            // File validation for ID proof (only required for researchers)
            if (!input.files || input.files.length === 0) {
                formGroup.classList.add('error');
                return false;
            }
        } else if (!value) {
            formGroup.classList.add('error');
            return false;
        }
        
        formGroup.classList.add('success');
        return true;
    }

    validateRole() {
        const selectedRole = document.querySelector('input[name="role"]:checked');
        const roleGroup = document.querySelector('.role-selection');
        
        if (roleGroup) {
            roleGroup.classList.remove('error', 'success');
            
            if (!selectedRole) {
                roleGroup.classList.add('error');
                return false;
            }
            
            roleGroup.classList.add('success');
        }
        return true;
    }

    validateConditionalFields() {
        const selectedRole = document.querySelector('input[name="role"]:checked');
        if (!selectedRole) return false;

        let isValid = true;
        
        switch(selectedRole.value) {
            case 'student':
                if (this.elements.studentFields) {
                    const studentInputs = this.elements.studentFields.querySelectorAll('input[required], input:not([id=""])');
                    studentInputs.forEach(input => {
                        if (!this.validateInput(input)) {
                            isValid = false;
                        }
                    });
                }
                break;
                
            case 'researcher':
                if (this.elements.researcherFields) {
                    const researcherInputs = this.elements.researcherFields.querySelectorAll('input:not([id="researcherId"])'); // researcherId is optional
                    researcherInputs.forEach(input => {
                        if (!this.validateInput(input)) {
                            isValid = false;
                        }
                    });
                }
                break;
                
            case 'operator':
                if (this.elements.operatorFields) {
                    const operatorInputs = this.elements.operatorFields.querySelectorAll('input');
                    operatorInputs.forEach(input => {
                        if (!this.validateInput(input)) {
                            isValid = false;
                        }
                    });
                }
                break;
        }
        
        return isValid;
    }

    addConditionalFieldValidation() {
        const allConditionalInputs = [];
        
        if (this.elements.studentFields) {
            allConditionalInputs.push(...this.elements.studentFields.querySelectorAll('input'));
        }
        if (this.elements.researcherFields) {
            allConditionalInputs.push(...this.elements.researcherFields.querySelectorAll('input'));
        }
        if (this.elements.operatorFields) {
            allConditionalInputs.push(...this.elements.operatorFields.querySelectorAll('input'));
        }

        allConditionalInputs.forEach(input => {
            input.addEventListener('blur', () => {
                // Only validate if the field is visible (parent has 'show' class)
                if (input.closest('.conditional-fields').classList.contains('show')) {
                    this.validateInput(input);
                }
            });
            
            input.addEventListener('input', () => {
                // Only validate if the field is visible and has error state
                if (input.closest('.conditional-fields').classList.contains('show') && 
                    input.closest('.form-group').classList.contains('error')) {
                    this.validateInput(input);
                }
            });
        });
    }

    async handleFormSubmission(e) {
        e.preventDefault();

        // Validate all inputs
        const isNameValid = this.validateInput(this.elements.nameInput);
        const isEmailValid = this.validateInput(this.elements.emailInput);
        const isPasswordValid = this.validateInput(this.elements.passwordInput);
        const isConfirmPasswordValid = this.validateInput(this.elements.confirmPasswordInput);
        const isRoleValid = this.validateRole();
        const areConditionalFieldsValid = this.validateConditionalFields();

        if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isRoleValid || !areConditionalFieldsValid) {
            return;
        }

        // Show loading state
        this.elements.signupButton.classList.add('loading');
        this.elements.signupButton.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Store user data
            localStorage.setItem('loggedInUser', this.elements.nameInput.value.trim());

            // Show success modal
            this.elements.modalOverlay.classList.add('show');

            // Redirect after modal closes
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2500);

        } catch (error) {
            console.error('Signup failed:', error);
            alert('Signup failed. Please try again.');
        } finally {
            this.elements.signupButton.classList.remove('loading');
            this.elements.signupButton.disabled = false;
        }
    }

    initializeTheme() {
        // Use the same key as index.html for consistency
        const savedTheme = localStorage.getItem('color-theme') || 
                          localStorage.getItem('monastery360-theme') || 
                          localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Also handle Tailwind CSS dark mode for compatibility with index.html
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Ensure the theme is stored with the correct key
        localStorage.setItem('color-theme', savedTheme);
        localStorage.setItem('monastery360-theme', savedTheme);
    }
}

// ========================
// Login Page Functionality
// ========================

class LoginManager {
    constructor() {
        this.elements = {};
        this.init();
    }

    init() {
        // Only initialize if we're on the login page
        if (document.getElementById('loginForm')) {
            this.initializeElements();
            this.bindEvents();
            this.initializeTheme();
        }
    }

    initializeElements() {
        // DOM Elements
        this.elements = {
            form: document.getElementById('loginForm'),
            modalOverlay: document.getElementById('modalOverlay'),
            modalClose: document.getElementById('modalClose'),
            loginButton: document.getElementById('loginButton'),
            passwordToggle: document.getElementById('passwordToggle'),
            passwordInput: document.getElementById('password'),
            usernameInput: document.getElementById('username')
        };

        // Get redirect URL from query params
        const urlParams = new URLSearchParams(window.location.search);
        const rawRedirect = urlParams.get('redirect');
        this.redirectURL = this.sanitizeRedirect(rawRedirect) || 'index.html';
    }

    sanitizeRedirect(redirect) {
        if (!redirect) return null;
        // Reject absolute paths, protocols, traversal, or backslashes
        if (redirect.includes('://') || redirect.includes('..') || redirect.startsWith('/') || redirect.includes('\\')) {
            return 'index.html';
        }
        // Only allow simple html filenames within same folder
        if (!/^[\w\- ]+\.html$/i.test(redirect)) {
            return 'index.html';
        }
        return redirect;
    }

    bindEvents() {
        // Password toggle functionality
        if (this.elements.passwordToggle && this.elements.passwordInput) {
            this.elements.passwordToggle.addEventListener('click', () => {
                const type = this.elements.passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                this.elements.passwordInput.setAttribute('type', type);
                
                const icon = this.elements.passwordToggle.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        }

        // Real-time validation
        [this.elements.usernameInput, this.elements.passwordInput].forEach(input => {
            input.addEventListener('blur', () => this.validateInput(input));
            input.addEventListener('input', () => {
                if (input.closest('.form-group').classList.contains('error')) {
                    this.validateInput(input);
                }
            });
        });

        // Form submission
        this.elements.form.addEventListener('submit', (e) => this.handleFormSubmission(e));

        // Modal events
        this.elements.modalClose.addEventListener('click', () => {
            this.elements.modalOverlay.classList.remove('show');
            window.location.href = this.redirectURL;
        });

        this.elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.elements.modalOverlay) {
                this.elements.modalOverlay.classList.remove('show');
                window.location.href = this.redirectURL;
            }
        });
    }

    validateInput(input) {
        const formGroup = input.closest('.form-group');
        const value = input.value.trim();
        
        if (!value) {
            formGroup.classList.add('error');
            return false;
        } else {
            formGroup.classList.remove('error');
            return true;
        }
    }

    async handleFormSubmission(e) {
        e.preventDefault();

        // Validate all inputs
        const isUsernameValid = this.validateInput(this.elements.usernameInput);
        const isPasswordValid = this.validateInput(this.elements.passwordInput);

        if (!isUsernameValid || !isPasswordValid) {
            return;
        }

        // Show loading state
        this.elements.loginButton.classList.add('loading');
        this.elements.loginButton.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Store user data
            localStorage.setItem('loggedInUser', this.elements.usernameInput.value.trim());

            // Show success modal
            this.elements.modalOverlay.classList.add('show');

            // Redirect after modal closes
            setTimeout(() => {
                window.location.href = this.redirectURL;
            }, 2000);

        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        } finally {
            this.elements.loginButton.classList.remove('loading');
            this.elements.loginButton.disabled = false;
        }
    }

    initializeTheme() {
        // Use the same key as index.html for consistency
        const savedTheme = localStorage.getItem('color-theme') || 
                          localStorage.getItem('monastery360-theme') || 
                          localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Also handle Tailwind CSS dark mode for compatibility with index.html
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Ensure the theme is stored with the correct key
        localStorage.setItem('color-theme', savedTheme);
        localStorage.setItem('monastery360-theme', savedTheme);
    }
}

// ========================
// Initialize All Managers
// ========================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize signup manager
    new SignupManager();
    
    // Initialize login manager
    new LoginManager();
    
    // Initialize theme for any page using consistent key
    const savedTheme = localStorage.getItem('color-theme') || 
                      localStorage.getItem('monastery360-theme') || 
                      localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Also handle Tailwind CSS dark mode for compatibility with index.html
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Ensure the theme is stored with the correct key
    localStorage.setItem('color-theme', savedTheme);
    localStorage.setItem('monastery360-theme', savedTheme);
});

// ========================
// View more and less button for manuscripts
// ========================

  const viewMoreBtn = document.getElementById("viewMoreBtn");
  const viewLessBtn = document.getElementById("viewLessBtn");
  const extraItems = document.querySelectorAll(".extra-item");

  viewMoreBtn.addEventListener("click", function () {
    extraItems.forEach(el => el.classList.remove("hidden"));
    viewMoreBtn.classList.add("hidden");
    viewLessBtn.classList.remove("hidden");
  });

  viewLessBtn.addEventListener("click", function () {
    extraItems.forEach(el => el.classList.add("hidden"));
    viewLessBtn.classList.add("hidden");
    viewMoreBtn.classList.remove("hidden");
    window.scrollTo({ top: document.getElementById("manuscripts").offsetTop, behavior: "smooth" });
  });

// ========================
// Video Autoplay Manager
// ========================

// Intersection Observer for video autoplay when section is visible
function initVideoAutoplay() {
    const prayerVideosSection = document.getElementById('prayer-videos');
    const maniMantraVideo = document.getElementById('mani-mantra-video');
    const vajraGuruVideo = document.getElementById('vajra-guru-video');
    
    if (!prayerVideosSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Play videos when section is visible
                if (maniMantraVideo) {
                    maniMantraVideo.play().catch(e => console.log('Mani Mantra video play failed:', e));
                }
                if (vajraGuruVideo) {
                    vajraGuruVideo.play().catch(e => console.log('Vajra Guru video play failed:', e));
                }
            } else {
                // Pause videos when section is not visible
                if (maniMantraVideo) {
                    maniMantraVideo.pause();
                }
                if (vajraGuruVideo) {
                    vajraGuruVideo.pause();
                }
            }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of the section is visible
    });
    
    observer.observe(prayerVideosSection);
}

// Initialize video autoplay when DOM is loaded
document.addEventListener('DOMContentLoaded', initVideoAutoplay);
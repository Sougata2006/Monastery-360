

document.addEventListener('DOMContentLoaded', function() {
    
    
    const amountOptions = Array.from(document.querySelectorAll('.amount-option'));
    const customAmount = document.getElementById('customAmount');
    const displayAmount = document.getElementById('displayAmount');
    const form = document.getElementById('donationForm');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalMessage = document.getElementById('modalMessage');
    const donateButton = document.getElementById('donateButton');
    const donorName = document.getElementById('donorName');
    const donorEmail = document.getElementById('donorEmail');

    let selectedAmount = 0;

    // Set active amount option
    function setActiveAmount(selectedOption) {
        amountOptions.forEach(option => option.classList.remove('active'));
        if (selectedOption) {
            selectedOption.classList.add('active');
        }
    }

    // Update display amount
    function updateDisplayAmount() {
        const formattedAmount = selectedAmount ? 
            '₹' + Number(selectedAmount).toLocaleString('en-IN') : '₹0';
        displayAmount.textContent = formattedAmount;
    }

    // Amount option click handlers
    amountOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectedAmount = Number(option.dataset.amount) || 0;
            customAmount.value = '';
            setActiveAmount(option);
            updateDisplayAmount();
        });

        // Keyboard accessibility
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            }
        });
    });

    // Custom amount input handler
    customAmount.addEventListener('input', () => {
        const value = Number(customAmount.value);
        if (value > 0) {
            selectedAmount = value;
            setActiveAmount(null);
        } else {
            selectedAmount = 0;
        }
        updateDisplayAmount();
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!selectedAmount || selectedAmount <= 0) {
            alert('Please select or enter a donation amount.');
            return;
        }

        // Show loading state
        donateButton.classList.add('loading');
        donateButton.disabled = true;

        try {
            // Get donor information
            const name = donorName.value.trim();
            const email = donorEmail.value.trim();

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Create payment URL (replace with actual payment gateway)
            const paymentUrl = new URL('https://example.com/donate');
            paymentUrl.searchParams.set('amount', selectedAmount);
            if (name) paymentUrl.searchParams.set('name', name);
            if (email) paymentUrl.searchParams.set('email', email);

            // Update modal message
            modalMessage.textContent = `We're opening a secure payment page for ₹${selectedAmount.toLocaleString('en-IN')}. Thank you for your generous support!`;

            // Show modal
            modalOverlay.classList.add('show');

            // Open payment in new tab
            setTimeout(() => {
                window.open(paymentUrl.toString(), '_blank', 'noopener,noreferrer');
            }, 1000);

        } catch (error) {
            console.error('Payment processing failed:', error);
            alert('Payment processing failed. Please try again.');
        } finally {
            donateButton.classList.remove('loading');
            donateButton.disabled = false;
        }
    });

    // Modal close functionality
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('show');
    });

    // Close modal on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('show');
        }
    });

    // Theme management - synced with central theme system
    function initializeTheme() {
        // Use the same multi-key approach as the central theme system
        const savedTheme = localStorage.getItem('color-theme') || 
                          localStorage.getItem('monastery360-theme') || 
                          localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Also handle Tailwind CSS dark mode for compatibility
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        updateThemeToggleIcons(savedTheme);
    }

    function updateThemeToggleIcons(theme) {
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        
        if (darkIcon && lightIcon) {
            if (theme === 'dark') {
                darkIcon.classList.add('hidden');
                lightIcon.classList.remove('hidden');
            } else {
                darkIcon.classList.remove('hidden');
                lightIcon.classList.add('hidden');
            }
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Set theme on document
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Handle Tailwind CSS dark mode
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Store with all possible keys for consistency across all pages (same as central theme system)
        localStorage.setItem('color-theme', newTheme);
        localStorage.setItem('monastery360-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeToggleIcons(newTheme);
        
        // Dispatch theme change event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: newTheme } 
        }));
    }

    // Theme toggle button event listener
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Initialize
    initializeTheme();
    updateDisplayAmount();
    
    console.log('Donation page initialized with payment functionality');
});
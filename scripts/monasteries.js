document.addEventListener('DOMContentLoaded', function() {
    initializePopupNotifications();
    setupCurrentYear();
});

function initializePopupNotifications() {
    // Find the Gurudwara Gurudongmar section specifically
    const allH3Elements = document.querySelectorAll('h3.monastery-title');
    let gurudwaraSection = null;
    
    // Look for the h3 containing "Gurudwara Gurudongmar"
    allH3Elements.forEach(h3 => {
        if (h3.textContent.includes('Gurudwara Gurudongmar')) {
            gurudwaraSection = h3;
        }
    });
    
    if (gurudwaraSection) {
        // Show popups automatically when page loads
        setTimeout(() => {
            showPopup('interactive-mode-popup');
        }, 1000); // Show Interactive Mode popup after 1 second
        
        setTimeout(() => {
            showPopup('360-view-popup');
        }, 3500); // Show 360 View popup after 3.5 seconds (1.5 seconds after first popup ends)
        
        // Get the icons container within the Gurudwara section
        const iconsContainer = gurudwaraSection.querySelector('.monastery-icons');
        
        if (iconsContainer) {
            // Get map marker link for Gurudwara (Interactive Mode)
            const mapMarkerLink = iconsContainer.querySelector('a[href*="maps.app.goo.gl"]');
            
            // Get globe link for Gurudwara (360 view) - it links to notAvailable.html
            const globeLink = iconsContainer.querySelector('a[href*="notAvailable.html"]');
            
            // Keep click event listeners as well for manual triggering
            if (mapMarkerLink) {
                mapMarkerLink.addEventListener('click', function(e) {
                    showPopup('interactive-mode-popup');
                });
            }
            
            if (globeLink) {
                globeLink.addEventListener('click', function(e) {
                    showPopup('360-view-popup');
                });
            }
        }
    }
}

function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (!popup) return;
    
    // Reset any existing animation
    popup.style.transform = 'translateX(100%)';
    popup.style.opacity = '0';
    
    // Show popup with slide-in animation
    setTimeout(() => {
        popup.style.transform = 'translateX(0)';
        popup.style.opacity = '1';
    }, 100);
    
    // Hide popup after 2 seconds
    setTimeout(() => {
        popup.style.transform = 'translateX(100%)';
        popup.style.opacity = '0';
    }, 2000);
}

function setupCurrentYear() {
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Additional utility functions for monastery page

// Function to handle monastery card hover effects
function initializeMonasteryCards() {
    const monasteryCards = document.querySelectorAll('.monastery-card');
    
    monasteryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Function to handle responsive monastery tags
function initializeMonasteryTags() {
    const tags = document.querySelectorAll('.monastery-tags span');
    
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Add pulse animation
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMonasteryCards();
    initializeMonasteryTags();
});

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .monastery-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .monastery-tags span {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .monastery-tags span:hover {
        transform: scale(1.02);
        opacity: 0.8;
    }
`;
document.head.appendChild(style);
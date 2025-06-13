// DOM Elements
const navTabs = document.querySelectorAll('.nav__tab');
const sections = document.querySelectorAll('.section');
const filterTabs = document.querySelectorAll('.filter-tab');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFilters();
    initializeBudgetCalculator();
    initializeCardInteractions();
    initializeAccessibility();
    
    // Initial budget calculation
    setTimeout(calculateBudget, 100);
});

// Navigation functionality
function initializeNavigation() {
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetSection = this.dataset.tab;
            switchSection(targetSection);
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('nav__tab--active'));
            this.classList.add('nav__tab--active');
        });
    });
}

function switchSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('section--active');
        if (section.id === sectionId) {
            section.classList.add('section--active');
            // Trigger a small delay for smooth transition
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 50);
        }
    });
    
    // Reset filters when switching sections
    resetFilters();
}

// Filter functionality
function initializeFilters() {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filterValue = this.dataset.filter;
            const parentSection = this.closest('.section');
            
            // Update active filter tab within this section only
            const sectionFilterTabs = parentSection.querySelectorAll('.filter-tab');
            sectionFilterTabs.forEach(t => t.classList.remove('filter-tab--active'));
            this.classList.add('filter-tab--active');
            
            // Apply filter
            applyFilter(parentSection, filterValue);
        });
    });
}

function applyFilter(section, filterValue) {
    // Find all cards with data-category in the current section
    const cards = section.querySelectorAll('[data-category]');
    
    cards.forEach(card => {
        if (filterValue === 'all' || card.dataset.category === filterValue) {
            card.classList.remove('hidden');
            card.style.display = '';
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
    
    // Add animation for showing/hiding
    setTimeout(() => {
        const visibleCards = section.querySelectorAll('[data-category]:not(.hidden)');
        visibleCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 50}ms`;
        });
    }, 100);
}

function resetFilters() {
    // Reset all filter tabs to 'all' and show all cards
    sections.forEach(section => {
        const filterTabs = section.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.classList.remove('filter-tab--active');
            if (tab.dataset.filter === 'all') {
                tab.classList.add('filter-tab--active');
            }
        });
        
        const cards = section.querySelectorAll('[data-category]');
        cards.forEach(card => {
            card.classList.remove('hidden');
            card.style.display = '';
        });
    });
}

// Budget Calculator
function initializeBudgetCalculator() {
    const calculateButton = document.getElementById('calculate-btn');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateBudget);
    }
    
    // Add event listeners to form inputs for real-time calculation
    const budgetInputs = document.querySelectorAll('#museum-package, #food-budget, #transport, #days');
    budgetInputs.forEach(input => {
        input.addEventListener('change', calculateBudget);
        input.addEventListener('input', calculateBudget);
    });
}

function calculateBudget() {
    const museumPackageElement = document.getElementById('museum-package');
    const foodBudgetElement = document.getElementById('food-budget');
    const transportElement = document.getElementById('transport');
    const daysElement = document.getElementById('days');
    
    // Check if elements exist
    if (!museumPackageElement || !foodBudgetElement || !transportElement || !daysElement) {
        console.log('Budget calculator elements not found');
        return;
    }
    
    const museumPackage = parseFloat(museumPackageElement.value) || 0;
    const foodBudget = parseFloat(foodBudgetElement.value) || 15;
    const transport = parseFloat(transportElement.value) || 8.80;
    const days = parseFloat(daysElement.value) || 1.5;
    
    // Calculate totals
    const museumTotal = museumPackage;
    const foodTotal = foodBudget * days;
    
    // Handle transportation calculation
    let transportTotal;
    if (transport === 16) { // Weekend ticket
        transportTotal = 16;
    } else {
        transportTotal = transport * Math.ceil(days);
    }
    
    const grandTotal = museumTotal + foodTotal + transportTotal;
    
    // Update the display
    const breakdownElement = document.getElementById('budget-breakdown');
    if (breakdownElement) {
        breakdownElement.innerHTML = `
            <div class="budget-item">
                <span>Museums & Attractions:</span>
                <span>€${museumTotal.toFixed(2)}</span>
            </div>
            <div class="budget-item">
                <span>Food (${days} day${days !== 1 ? 's' : ''}):</span>
                <span>€${foodTotal.toFixed(2)}</span>
            </div>
            <div class="budget-item">
                <span>Transportation:</span>
                <span>€${transportTotal.toFixed(2)}</span>
            </div>
            <div class="budget-item">
                <span><strong>Total Estimated Cost:</strong></span>
                <span><strong>€${grandTotal.toFixed(2)}</strong></span>
            </div>
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--color-border); font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                <p><strong>Cost per person for ${days} day${days !== 1 ? 's' : ''}</strong></p>
                <p>This estimate includes museums, food, and local transportation. Accommodation not included.</p>
                ${grandTotal < 50 ? '<p style="color: var(--color-success); font-weight: 500;">💰 Great budget-friendly trip!</p>' : ''}
                ${grandTotal > 100 ? '<p style="color: var(--color-warning); font-weight: 500;">💸 Premium experience - consider budget options to save money.</p>' : ''}
            </div>
        `;
    }
}

// Enhanced card interactions
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Add smooth hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Enhanced accessibility
function initializeAccessibility() {
    // Add keyboard navigation for tabs
    navTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function(e) {
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    targetIndex = (index + 1) % navTabs.length;
                    navTabs[targetIndex].focus();
                    navTabs[targetIndex].click();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    targetIndex = (index - 1 + navTabs.length) % navTabs.length;
                    navTabs[targetIndex].focus();
                    navTabs[targetIndex].click();
                    break;
                case 'Home':
                    e.preventDefault();
                    navTabs[0].focus();
                    navTabs[0].click();
                    break;
                case 'End':
                    e.preventDefault();
                    navTabs[navTabs.length - 1].focus();
                    navTabs[navTabs.length - 1].click();
                    break;
            }
        });
    });
    
    // Add ARIA labels and roles
    const navTabsContainer = document.querySelector('.nav__tabs');
    if (navTabsContainer) {
        navTabsContainer.setAttribute('role', 'tablist');
    }
    
    navTabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', tab.classList.contains('nav__tab--active'));
        tab.setAttribute('aria-controls', tab.dataset.tab);
        tab.setAttribute('id', `tab-${tab.dataset.tab}`);
        tab.setAttribute('tabindex', tab.classList.contains('nav__tab--active') ? '0' : '-1');
    });
    
    sections.forEach(section => {
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('aria-labelledby', `tab-${section.id}`);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality (if needed in the future)
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        const debouncedSearch = debounce(performSearch, 300);
        searchInput.addEventListener('input', debouncedSearch);
    }
}

function performSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    const activeSection = document.querySelector('.section--active');
    const cards = activeSection.querySelectorAll('.card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const cardContainer = card.closest('[data-category]');
        
        if (query === '' || text.includes(query)) {
            if (cardContainer) {
                cardContainer.style.display = '';
                cardContainer.classList.remove('hidden');
            }
        } else {
            if (cardContainer) {
                cardContainer.style.display = 'none';
                cardContainer.classList.add('hidden');
            }
        }
    });
}

// Favorites functionality (using in-memory storage)
class FavoritesManager {
    constructor() {
        this.favorites = new Set();
        this.init();
    }
    
    init() {
        this.addFavoriteButtons();
    }
    
    addFavoriteButtons() {
        const cards = document.querySelectorAll('.museum-card .card, .attraction-card .card, .restaurant-card .card');
        
        cards.forEach((card, index) => {
            const favoriteButton = document.createElement('button');
            favoriteButton.className = 'favorite-btn';
            favoriteButton.innerHTML = '♡';
            favoriteButton.setAttribute('aria-label', 'Add to favorites');
            favoriteButton.style.cssText = `
                position: absolute;
                top: 12px;
                right: 12px;
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.2s ease;
                z-index: 10;
            `;
            
            // Make card container relative
            card.style.position = 'relative';
            
            favoriteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(favoriteButton, index);
            });
            
            card.appendChild(favoriteButton);
        });
    }
    
    toggleFavorite(button, itemId) {
        if (this.favorites.has(itemId)) {
            this.favorites.delete(itemId);
            button.innerHTML = '♡';
            button.style.color = 'var(--color-text-secondary)';
            button.setAttribute('aria-label', 'Add to favorites');
        } else {
            this.favorites.add(itemId);
            button.innerHTML = '♥';
            button.style.color = 'var(--color-error)';
            button.setAttribute('aria-label', 'Remove from favorites');
        }
    }
    
    getFavorites() {
        return Array.from(this.favorites);
    }
}

// Performance optimization
function optimizePerformance() {
    // Lazy load images if any are added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize favorites manager
let favoritesManager;

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFilters();
    initializeBudgetCalculator();
    initializeCardInteractions();
    initializeAccessibility();
    optimizePerformance();
    
    // Initialize favorites manager
    favoritesManager = new FavoritesManager();
    
    // Initial budget calculation with delay to ensure DOM is ready
    setTimeout(() => {
        calculateBudget();
    }, 200);
});

// Handle window resize for responsive behavior
window.addEventListener('resize', debounce(function() {
    // Handle any responsive adjustments if needed
    // Currently handled via CSS, but can add JS enhancements here
}, 250));

// Export functions for potential external use and debugging
window.BerlinGuide = {
    switchSection,
    calculateBudget,
    applyFilter,
    resetFilters,
    favoritesManager: () => favoritesManager
};

// Add smooth scrolling for internal navigation
document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading states
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
    }
}

function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
    }
}
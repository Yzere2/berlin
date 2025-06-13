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
    
    // Oblicz koszt ulubionych muzeów
    let museumTotal = 0;
    const favoriteMuseums = Array.from(favoritesManager.favorites || [])
        .filter(id => typeof id === 'string' && id.startsWith('museum_'))
        .map(id => {
            const card = document.querySelector(`[data-id="${id}"]`);
            if (!card) return 0;
            const price = card.dataset.price;
            return price === 'Free Permanent' ? 0 : parseFloat(price) || 0;
        });
    
    if (favoriteMuseums.length > 0) {
        museumTotal = favoriteMuseums.reduce((sum, price) => sum + price, 0);
    } else {
        museumTotal = parseFloat(museumPackageElement.value) || 0;
    }
    
    // Oblicz koszt ulubionych restauracji
    let foodTotal = 0;
    const favoriteRestaurants = Array.from(favoritesManager.favorites || [])
        .filter(id => typeof id === 'string' && id.startsWith('restaurant_'))
        .map(id => {
            const card = document.querySelector(`[data-id="${id}"]`);
            return card ? parseFloat(card.dataset.price) || 0 : 0;
        });
    
    const days = parseFloat(daysElement.value) || 1.5;
    
    if (favoriteRestaurants.length > 0) {
        // Średni koszt posiłku z ulubionych restauracji
        const avgMealCost = favoriteRestaurants.reduce((sum, price) => sum + price, 0) / favoriteRestaurants.length;
        // Zakładamy 3 posiłki dziennie
        foodTotal = avgMealCost * 3 * days;
    } else {
        const foodBudget = parseFloat(foodBudgetElement.value) || 15;
        foodTotal = foodBudget * days;
    }
    
    // Handle transportation calculation
    const transport = parseFloat(transportElement.value) || 8.80;
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

// Favorites functionality (using cookies)
class FavoritesManager {
    constructor() {
        this.favorites = new Set();
        this.favoritesOrder = [];
        this.cookieName = 'berlin_favorites';
        this.orderCookieName = 'berlin_favorites_order';
        this.init();
    }
    
    init() {
        try {
            this.loadFavorites();
            this.loadFavoritesOrder();
            this.addFavoriteButtons();
            this.initializeDragAndDrop();
            this.updateFavoritesGrid();
        } catch (error) {
            console.error('Błąd podczas inicjalizacji FavoritesManager:', error);
        }
    }
    
    loadFavorites() {
        try {
            const cookies = document.cookie.split(';');
            const favoritesCookie = cookies.find(cookie => cookie.trim().startsWith(this.cookieName + '='));
            
            if (favoritesCookie) {
                const favoritesData = JSON.parse(decodeURIComponent(favoritesCookie.split('=')[1]));
                this.favorites = new Set(favoritesData);
            }
        } catch (e) {
            console.error('Błąd podczas wczytywania ulubionych:', e);
            this.favorites = new Set();
        }
    }

    loadFavoritesOrder() {
        try {
            const cookies = document.cookie.split(';');
            const orderCookie = cookies.find(cookie => cookie.trim().startsWith(this.orderCookieName + '='));
            
            if (orderCookie) {
                this.favoritesOrder = JSON.parse(decodeURIComponent(orderCookie.split('=')[1]));
            } else {
                this.favoritesOrder = Array.from(this.favorites);
            }
        } catch (e) {
            console.error('Błąd podczas wczytywania kolejności:', e);
            this.favoritesOrder = Array.from(this.favorites);
        }
    }
    
    saveFavorites() {
        try {
            const favoritesData = JSON.stringify(Array.from(this.favorites));
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            
            document.cookie = `${this.cookieName}=${encodeURIComponent(favoritesData)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
        } catch (e) {
            console.error('Błąd podczas zapisywania ulubionych:', e);
        }
    }

    saveFavoritesOrder() {
        try {
            const orderData = JSON.stringify(this.favoritesOrder);
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            
            document.cookie = `${this.orderCookieName}=${encodeURIComponent(orderData)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
        } catch (e) {
            console.error('Błąd podczas zapisywania kolejności:', e);
        }
    }
    
    addFavoriteButtons() {
        try {
            const cards = document.querySelectorAll('.museum-card, .attraction-card, .restaurant-card');
            
            cards.forEach(card => {
                // Sprawdź, czy przycisk już istnieje
                if (card.querySelector('.favorite-btn')) return;

                const favoriteButton = document.createElement('button');
                favoriteButton.className = 'favorite-btn';
                const itemId = card.dataset.id;
                favoriteButton.innerHTML = this.favorites.has(itemId) ? '♥' : '♡';
                favoriteButton.setAttribute('aria-label', this.favorites.has(itemId) ? 'Usuń z ulubionych' : 'Dodaj do ulubionych');
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
                    color: ${this.favorites.has(itemId) ? 'var(--color-error)' : 'var(--color-text-secondary)'};
                `;
                
                card.style.position = 'relative';
                
                favoriteButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleFavorite(favoriteButton, itemId);
                });
                
                card.appendChild(favoriteButton);
            });
        } catch (e) {
            console.error('Błąd podczas dodawania przycisków ulubionych:', e);
        }
    }

    updateFavoritesGrid() {
        try {
            const favoritesGrid = document.getElementById('favorites-grid');
            if (!favoritesGrid) return;

            favoritesGrid.innerHTML = '';
            
            if (this.favoritesOrder.length === 0) {
                const placeholder = document.createElement('div');
                placeholder.className = 'card-placeholder';
                placeholder.textContent = 'Dodaj ulubione atrakcje, klikając ikonę serca na kartach';
                favoritesGrid.appendChild(placeholder);
                return;
            }

            this.favoritesOrder.forEach(itemId => {
                const originalCard = document.querySelector(`[data-id="${itemId}"]`);
                if (originalCard) {
                    const cardClone = originalCard.cloneNode(true);
                    const card = cardClone.querySelector('.card');
                    if (card) {
                        card.setAttribute('draggable', 'true');
                        card.dataset.itemId = itemId;
                        
                        // Usuń przycisk ulubionych z klona
                        const favoriteBtn = card.querySelector('.favorite-btn');
                        if (favoriteBtn) {
                            favoriteBtn.remove();
                        }
                        
                        favoritesGrid.appendChild(cardClone);
                    }
                }
            });
        } catch (e) {
            console.error('Błąd podczas aktualizacji siatki ulubionych:', e);
        }
    }

    initializeDragAndDrop() {
        try {
            const favoritesGrid = document.getElementById('favorites-grid');
            if (!favoritesGrid) return;

            let draggedItem = null;

            favoritesGrid.addEventListener('dragstart', (e) => {
                const card = e.target.closest('.card');
                if (card) {
                    draggedItem = card;
                    card.classList.add('dragging');
                    e.dataTransfer.setData('text/plain', card.dataset.itemId);
                    e.dataTransfer.effectAllowed = 'move';
                }
            });

            favoritesGrid.addEventListener('dragend', (e) => {
                const card = e.target.closest('.card');
                if (card) {
                    card.classList.remove('dragging');
                    draggedItem = null;
                }
            });

            favoritesGrid.addEventListener('dragover', (e) => {
                e.preventDefault();
                const card = e.target.closest('.card');
                if (card && card !== draggedItem) {
                    card.classList.add('drag-over');
                }
            });

            favoritesGrid.addEventListener('dragleave', (e) => {
                const card = e.target.closest('.card');
                if (card) {
                    card.classList.remove('drag-over');
                }
            });

            favoritesGrid.addEventListener('drop', (e) => {
                e.preventDefault();
                const dropTarget = e.target.closest('.card');
                
                if (dropTarget && draggedItem && dropTarget !== draggedItem) {
                    const draggedId = draggedItem.dataset.itemId;
                    const dropId = dropTarget.dataset.itemId;
                    
                    const draggedIndex = this.favoritesOrder.indexOf(draggedId);
                    const dropIndex = this.favoritesOrder.indexOf(dropId);
                    
                    if (draggedIndex !== -1 && dropIndex !== -1) {
                        // Zamień pozycje w tablicy
                        [this.favoritesOrder[draggedIndex], this.favoritesOrder[dropIndex]] = 
                        [this.favoritesOrder[dropIndex], this.favoritesOrder[draggedIndex]];
                        
                        // Zamień pozycje w DOM
                        const draggedRect = draggedItem.getBoundingClientRect();
                        const dropRect = dropTarget.getBoundingClientRect();
                        
                        // Animacja zamiany pozycji
                        draggedItem.style.transition = 'transform 0.3s ease';
                        dropTarget.style.transition = 'transform 0.3s ease';
                        
                        const deltaX = dropRect.left - draggedRect.left;
                        const deltaY = dropRect.top - draggedRect.top;
                        
                        draggedItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                        dropTarget.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;
                        
                        // Po zakończeniu animacji, zaktualizuj siatkę
                        setTimeout(() => {
                            this.saveFavoritesOrder();
                            this.updateFavoritesGrid();
                        }, 300);
                    }
                }
                
                dropTarget?.classList.remove('drag-over');
            });
        } catch (e) {
            console.error('Błąd podczas inicjalizacji drag and drop:', e);
        }
    }
    
    toggleFavorite(button, itemId) {
        try {
            if (this.favorites.has(itemId)) {
                this.favorites.delete(itemId);
                this.favoritesOrder = this.favoritesOrder.filter(id => id !== itemId);
                button.innerHTML = '♡';
                button.style.color = 'var(--color-text-secondary)';
                button.setAttribute('aria-label', 'Dodaj do ulubionych');
            } else {
                this.favorites.add(itemId);
                this.favoritesOrder.push(itemId);
                button.innerHTML = '♥';
                button.style.color = 'var(--color-error)';
                button.setAttribute('aria-label', 'Usuń z ulubionych');
            }
            this.saveFavorites();
            this.saveFavoritesOrder();
            this.updateFavoritesGrid();
        } catch (e) {
            console.error('Błąd podczas przełączania ulubionych:', e);
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
    try {
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
    } catch (error) {
        console.error('Błąd podczas inicjalizacji:', error);
    }
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

// Data loading functions
async function loadCSVData(filePath) {
    try {
        const response = await fetch(filePath);
        const csvText = await response.text();
        const rows = csvText.split('\n').map(row => row.split(',').map(cell => cell.trim().replace(/^"|"$/g, '')));
        const headers = rows[0];
        return rows.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            return obj;
        });
    } catch (error) {
        console.error(`Błąd podczas wczytywania ${filePath}:`, error);
        return [];
    }
}

// Initialize data
let museumsData = [];
let attractionsData = [];
let restaurantsData = [];
let itineraryData = [];

async function initializeData() {
    try {
        museumsData = await loadCSVData('data/museums.csv');
        attractionsData = await loadCSVData('data/attractions.csv');
        restaurantsData = await loadCSVData('data/restaurants.csv');
        itineraryData = await loadCSVData('data/itinerary.csv');
        
        renderMuseums();
        renderAttractions();
        renderRestaurants();
        renderItinerary();
    } catch (error) {
        console.error('Błąd podczas inicjalizacji danych:', error);
    }
}

function renderMuseums() {
    const museumsGrid = document.querySelector('.museums-grid');
    if (!museumsGrid) return;

    museumsGrid.innerHTML = museumsData.map((museum, index) => `
        <div class="museum-card" data-category="${museum.category}" data-id="museum_${index}" data-price="${museum.price}">
            <div class="card">
                <div class="card__body">
                    <h3>${museum.name}</h3>
                    <div class="museum-meta">
                        <span class="status status--${museum.price === 'Free Permanent' ? 'success' : 'info'}">${museum.price === 'Free Permanent' ? 'Free' : '€' + museum.price}</span>
                        <span class="status status--${museum.booking_status === 'No Booking Required' ? 'success' : 'warning'}">${museum.booking_status}</span>
                    </div>
                    <div class="museum-details">
                        <p><strong>Highlights:</strong> ${museum.highlights}</p>
                        <p><strong>Details:</strong> ${museum.details}</p>
                        <p><strong>Hours:</strong> ${museum.hours}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAttractions() {
    const attractionsGrid = document.querySelector('.attractions-grid');
    if (!attractionsGrid) return;

    attractionsGrid.innerHTML = attractionsData.map((attraction, index) => `
        <div class="attraction-card" data-category="${attraction.category}" data-id="attraction_${index}" data-price="${attraction.price}">
            <div class="card">
                <div class="card__body">
                    <h3>${attraction.name}</h3>
                    <div class="attraction-meta">
                        <span class="status status--${attraction.price === '0' ? 'success' : 'info'}">${attraction.price === '0' ? 'Free' : '€' + attraction.price}</span>
                        <span class="status status--${attraction.booking_status === 'No Booking Required' ? 'success' : 'warning'}">${attraction.booking_status}</span>
                    </div>
                    <div class="attraction-details">
                        <p><strong>Highlights:</strong> ${attraction.highlights}</p>
                        <p><strong>Details:</strong> ${attraction.details}</p>
                        <p><strong>Hours:</strong> ${attraction.hours}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderRestaurants() {
    const restaurantsGrid = document.querySelector('.restaurants-grid');
    if (!restaurantsGrid) return;

    restaurantsGrid.innerHTML = restaurantsData.map((restaurant, index) => {
        const priceRange = restaurant.price_range.replace('€', '');
        const [minPrice, maxPrice] = priceRange.split('-').map(p => parseFloat(p.trim()));
        const avgPrice = (minPrice + maxPrice) / 2;
        
        return `
        <div class="restaurant-card" data-category="${restaurant.category}" data-id="restaurant_${index}" data-price="${avgPrice}">
            <div class="card">
                <div class="card__body">
                    <h3>${restaurant.name}</h3>
                    <div class="restaurant-meta">
                        <span class="status status--info">€${priceRange}</span>
                        <span class="status status--success">${restaurant.cuisine}</span>
                    </div>
                    <div class="restaurant-details">
                        <p><strong>Highlights:</strong> ${restaurant.highlights}</p>
                        <p><strong>Details:</strong> ${restaurant.details}</p>
                        <p><strong>Hours:</strong> ${restaurant.hours}</p>
                    </div>
                </div>
            </div>
            </div>`;
        }).join('');
}

function renderItinerary() {
    const itineraryContainer = document.querySelector('.itinerary');
    if (!itineraryContainer) return;

    const groupedItinerary = itineraryData.reduce((acc, item) => {
        if (!acc[item.day]) {
            acc[item.day] = [];
        }
        acc[item.day].push(item);
        return acc;
    }, {});

    itineraryContainer.innerHTML = Object.entries(groupedItinerary).map(([day, items]) => `
        <div class="itinerary__day">
            <h3>${day} - ${items[0].time}</h3>
            <div class="itinerary__items">
                ${items.map(item => `
                    <div class="itinerary__item">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <span class="status status--${item.status === 'Free' ? 'success' : item.status === 'Booking Required' ? 'warning' : 'info'}">${item.status === 'Free' ? 'Free' : item.status === 'Booking Required' ? 'Booking Required' : '€' + item.price}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Main initialization
document.addEventListener('DOMContentLoaded', async function() {
    try {
        await initializeData();
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
    } catch (error) {
        console.error('Błąd podczas inicjalizacji:', error);
    }
});
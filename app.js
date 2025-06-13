// Berlin Weekend Guide App
class BerlinGuideApp {
    constructor() {
        this.favorites = new Set();
        this.completedActivities = new Set();
        this.currentSection = 'itinerary';
        
        this.itineraryData = [
            {
                day: "Saturday",
                time: "Afternoon (Arrival)",
                activity: "Check in & Free Walking Tour",
                location: "Brandenburg Gate area",
                duration: "2-3 hours",
                cost: "0-15",
                tips: "Book free tour in advance, meet at Brandenburg Gate. SANDEMANs offers excellent free tours."
            },
            {
                day: "Saturday", 
                time: "14:00-16:00",
                activity: "Brandenburg Gate & Holocaust Memorial",
                location: "Pariser Platz/Cora-Berliner-Straße",
                duration: "2 hours",
                cost: "Free",
                tips: "Visit early to avoid crowds, very photogenic. Walk from Brandenburg Gate to Holocaust Memorial."
            },
            {
                day: "Saturday",
                time: "16:00-18:00", 
                activity: "Museum Island (Pergamon/Altes Museum)",
                location: "Museum Island (Bodestraße)",
                duration: "2 hours",
                cost: "12-20",
                tips: "Berlin WelcomeCard gives discounts, choose 1-2 museums. Some museums free on first Sunday of month."
            },
            {
                day: "Saturday",
                time: "18:00-20:00",
                activity: "East Side Gallery", 
                location: "Mühlenstraße (Friedrichshain)",
                duration: "2 hours",
                cost: "Free",
                tips: "Open 24/7, guided tours Saturday/Sunday 2-5pm. Longest open-air gallery in the world."
            },
            {
                day: "Saturday",
                time: "20:00-22:00",
                activity: "Dinner in Mitte/Kreuzberg",
                location: "Mitte or Kreuzberg districts", 
                duration: "2 hours",
                cost: "25-40",
                tips: "Try local German cuisine or international options. Reservations recommended for popular spots."
            },
            {
                day: "Saturday",
                time: "22:00+",
                activity: "Berlin Nightlife",
                location: "Kreuzberg/Friedrichshain clubs",
                duration: "Variable", 
                cost: "30-60",
                tips: "Clubs often open late, bring ID, cash for entry. Sage Club, Kitty Cheng Bar, House of Weekend are popular."
            },
            {
                day: "Sunday",
                time: "09:00-11:00",
                activity: "Sunday Brunch Culture",
                location: "Prenzlauer Berg cafes",
                duration: "2 hours",
                cost: "15-25", 
                tips: "Reservations recommended, quintessential Berlin experience. Café Krone, meet me halfway Berlin."
            },
            {
                day: "Sunday",
                time: "11:00-13:00",
                activity: "Tiergarten Park & Victory Column",
                location: "Großer Tiergarten",
                duration: "2 hours",
                cost: "Free",
                tips: "Perfect for walking, rent bikes available. Victory Column offers city views for small fee."
            },
            {
                day: "Sunday", 
                time: "13:00-15:00",
                activity: "Boat Tour on River Spree",
                location: "Spree River (various departure points)",
                duration: "2 hours", 
                cost: "15-25",
                tips: "Multiple companies, great city perspective. Boats depart from various points including Museum Island."
            },
            {
                day: "Sunday",
                time: "15:00-17:00",
                activity: "Prenzlauer Berg Exploration", 
                location: "Kollwitzplatz area",
                duration: "2 hours",
                cost: "10-20",
                tips: "Trendy area with vintage shops and cafes. Great for people watching and local atmosphere."
            },
            {
                day: "Sunday",
                time: "17:00-19:00",
                activity: "Rooftop Bar with City Views",
                location: "Alexanderplatz or Mercedes Platz",
                duration: "2 hours",
                cost: "15-30",
                tips: "Book ahead for sunset views, dress smart-casual. Gallery Rooftop Bar, SOLAR Sky-Bar are good options."
            },
            {
                day: "Sunday", 
                time: "19:00+",
                activity: "Final Evening Activity",
                location: "Based on preference",
                duration: "Variable",
                cost: "20-50",
                tips: "Consider preferences: culture, food, or nightlife. Many museums open until late on Sundays."
            }
        ];

        this.neighborhoodsData = [
            {
                name: "Mitte",
                description: "Berlin's historic center with major attractions",
                bestFor: "First-time visitors, historical sights",
                highlights: ["Brandenburg Gate", "Museum Island", "Unter den Linden", "Berlin Cathedral"],
                characteristics: {
                    "Tourist Attractions": 5,
                    "Nightlife": 3,
                    "Food": 4,
                    "Culture": 5,
                    "Shopping": 4
                }
            },
            {
                name: "Kreuzberg", 
                description: "Alternative, trendy area with vibrant street art",
                bestFor: "Young travelers, alternative culture, street art",
                highlights: ["East Side Gallery", "Checkpoint Charlie", "Vibrant nightlife", "Street art"],
                characteristics: {
                    "Tourist Attractions": 3,
                    "Nightlife": 5,
                    "Food": 5, 
                    "Culture": 4,
                    "Shopping": 4
                }
            },
            {
                name: "Friedrichshain",
                description: "Hip area known for nightlife and young crowd",
                bestFor: "Nightlife, young travelers, clubs",
                highlights: ["RAW Compound", "Warschauer Straße", "Club scene", "Alternative venues"],
                characteristics: {
                    "Tourist Attractions": 4,
                    "Nightlife": 5,
                    "Food": 4,
                    "Culture": 3,
                    "Shopping": 3
                }
            },
            {
                name: "Prenzlauer Berg",
                description: "Trendy area with excellent cafes and brunch culture", 
                bestFor: "Brunch, cafes, local atmosphere",
                highlights: ["Kollwitzplatz", "Excellent brunch spots", "Vintage shopping", "Local markets"],
                characteristics: {
                    "Tourist Attractions": 3,
                    "Nightlife": 3,
                    "Food": 5,
                    "Culture": 3,
                    "Shopping": 4
                }
            }
        ];

        this.transportationData = [
            {
                type: "24-hour ticket AB zones",
                price: "10.60",
                bestFor: "Single day intensive sightseeing",
                includes: "All public transport in zones A&B"
            },
            {
                type: "48-hour ticket AB zones", 
                price: "20.60",
                bestFor: "Perfect for 1.5 day trip",
                includes: "All public transport in zones A&B",
                recommended: true
            },
            {
                type: "Berlin WelcomeCard 48h",
                price: "26.90",
                bestFor: "Transport + attraction discounts",
                includes: "Public transport + discounts at 170+ attractions + guide"
            },
            {
                type: "Single ticket AB zones",
                price: "3.80", 
                bestFor: "Individual short trips",
                includes: "Single 2-hour journey"
            },
            {
                type: "Group day ticket (up to 5 people)",
                price: "33.30",
                bestFor: "Groups traveling together", 
                includes: "All public transport for up to 5 people"
            }
        ];

        this.restaurantsData = {
            brunch: [
                {
                    name: "Café Krone",
                    type: "Brunch", 
                    location: "Prenzlauer Berg",
                    priceRange: "€€",
                    rating: "4.6",
                    speciality: "Sunday brunch, pancakes, terrace",
                    tips: "Reservations recommended for weekend brunch"
                },
                {
                    name: "meet me halfway Berlin",
                    type: "Brunch/Persian",
                    location: "Mitte",
                    priceRange: "€€",
                    rating: "4.8", 
                    speciality: "All-day breakfast, Persian cuisine",
                    tips: "Tables get reserved quickly for Saturday breakfast"
                }
            ],
            german: [
                {
                    name: "Ephraims",
                    type: "German",
                    location: "Mitte",
                    priceRange: "€€",
                    rating: "4.6",
                    speciality: "Classic German dishes, historic mansion, river views",
                    tips: "Dinner reservations recommended"
                },
                {
                    name: "Prater Beer Garden",
                    type: "Beer Garden",
                    location: "Prenzlauer Berg", 
                    priceRange: "€€",
                    rating: "4.3",
                    speciality: "600 seats under chestnut trees, local brews",
                    tips: "Seasonal operation, self-service"
                }
            ],
            nightlife: [
                {
                    name: "Gallery Rooftop Bar",
                    type: "Rooftop Bar",
                    location: "Mercedes Platz",
                    priceRange: "€€",
                    rating: "4.3",
                    speciality: "River views, Berlin-themed cocktails",
                    tips: "Reservations recommended for sunset"
                }
            ]
        };

        this.practicalTips = {
            safety: [
                "Keep valuables in inside pockets",
                "Avoid dark parks at night", 
                "Stay alert on public transport",
                "Beware of fake policemen at tourist areas",
                "Emergency number: 110 (police), 112 (general emergency)"
            ],
            weather: [
                "June weather: mild to warm (15-25°C)",
                "Bring lightweight, breathable clothing",
                "Pack light jacket for evenings",
                "Comfortable walking shoes essential",
                "Sunscreen and hat recommended"
            ],
            cultural: [
                "Most shops closed on Sundays", 
                "Museums and restaurants open on Sundays",
                "Tipping: 5-10% in restaurants",
                "Cash still widely used",
                "Public transport runs 24/7 on weekends"
            ]
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderItinerary();
        this.renderNeighborhoods();
        this.renderTransportation();
        this.renderFood();
        this.renderTips();
        this.updateBudget();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav__tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchSection(e.target.dataset.section);
            });
        });

        // Print and Share
        document.getElementById('printItinerary').addEventListener('click', () => {
            this.printItinerary();
        });

        document.getElementById('shareItinerary').addEventListener('click', () => {
            this.shareItinerary();
        });

        // Transportation calculator
        document.getElementById('tripType').addEventListener('change', (e) => {
            this.calculateTransportCost(e.target.value);
        });
    }

    switchSection(sectionId) {
        // Update active section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('section--active');
        });
        document.getElementById(sectionId).classList.add('section--active');

        // Update active tab
        document.querySelectorAll('.nav__tab').forEach(tab => {
            tab.classList.remove('nav__tab--active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('nav__tab--active');

        this.currentSection = sectionId;
    }

    renderItinerary() {
        const saturdayTimeline = document.getElementById('saturdayTimeline');
        const sundayTimeline = document.getElementById('sundayTimeline');

        const saturdayActivities = this.itineraryData.filter(item => item.day === 'Saturday');
        const sundayActivities = this.itineraryData.filter(item => item.day === 'Sunday');

        saturdayTimeline.innerHTML = this.renderTimelineItems(saturdayActivities);
        sundayTimeline.innerHTML = this.renderTimelineItems(sundayActivities);

        // Add event listeners to checkboxes
        document.querySelectorAll('.activity-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleActivity(e.target.dataset.index);
            });
        });
    }

    renderTimelineItems(activities) {
        return activities.map((activity, index) => {
            const globalIndex = this.itineraryData.indexOf(activity);
            const isCompleted = this.completedActivities.has(globalIndex);

            return `
                <div class="timeline-item ${isCompleted ? 'timeline-item--completed' : ''}">
                    <div class="activity-card ${isCompleted ? 'activity-card--completed' : ''}">
                        <div class="activity-header">
                            <div class="activity-time">${activity.time}</div>
                            <input type="checkbox" class="activity-checkbox" data-index="${globalIndex}" ${isCompleted ? 'checked' : ''}>
                        </div>
                        <h4 class="activity-title">${activity.activity}</h4>
                        <div class="activity-details">
                            <div class="activity-detail">
                                <strong>📍 Location:</strong> ${activity.location}
                            </div>
                            <div class="activity-detail">
                                <strong>⏱️ Duration:</strong> ${activity.duration}
                            </div>
                            <div class="activity-detail">
                                <strong>💰 Cost:</strong> €${activity.cost}
                            </div>
                        </div>
                        <div class="activity-tips">
                            <strong>💡 Tips:</strong> ${activity.tips}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    toggleActivity(index) {
        if (this.completedActivities.has(index)) {
            this.completedActivities.delete(index);
        } else {
            this.completedActivities.add(index);
        }
        this.renderItinerary();
        this.updateBudget();
    }

    updateBudget() {
        const totalCost = this.itineraryData.reduce((sum, activity, index) => {
            if (!this.completedActivities.has(index)) {
                const cost = activity.cost;
                if (cost === 'Free') return sum;
                if (cost.includes('-')) {
                    const maxCost = parseFloat(cost.split('-')[1]);
                    return sum + maxCost;
                }
                return sum + parseFloat(cost);
            }
            return sum;
        }, 0);

        document.getElementById('totalBudget').textContent = `€${totalCost.toFixed(0)}`;
        document.getElementById('completedCount').textContent = `${this.completedActivities.size}/${this.itineraryData.length}`;
    }

    renderNeighborhoods() {
        const grid = document.getElementById('neighborhoodsGrid');
        grid.innerHTML = this.neighborhoodsData.map(neighborhood => {
            const isFavorited = this.favorites.has(neighborhood.name);
            return `
                <div class="neighborhood-card ${isFavorited ? 'neighborhood-card--favorited' : ''}" data-neighborhood="${neighborhood.name}">
                    <div class="neighborhood-header">
                        <h3 class="neighborhood-name">${neighborhood.name}</h3>
                        <button class="favorite-btn ${isFavorited ? 'favorite-btn--active' : ''}" data-neighborhood="${neighborhood.name}">
                            ${isFavorited ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <p class="neighborhood-description">${neighborhood.description}</p>
                    <div class="neighborhood-highlights">
                        <h4>Best for: ${neighborhood.bestFor}</h4>
                        <div class="highlights-list">
                            ${neighborhood.highlights.map(highlight => `<span class="highlight-tag">${highlight}</span>`).join('')}
                        </div>
                    </div>
                    <div class="characteristics-grid">
                        ${Object.entries(neighborhood.characteristics).map(([key, value]) => `
                            <div class="characteristic">
                                <span>${key}:</span>
                                <span class="characteristic-stars">${'★'.repeat(value)}${'☆'.repeat(5-value)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners for favorites
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFavorite(e.target.dataset.neighborhood);
            });
        });
    }

    toggleFavorite(neighborhood) {
        if (this.favorites.has(neighborhood)) {
            this.favorites.delete(neighborhood);
        } else {
            this.favorites.add(neighborhood);
        }
        this.renderNeighborhoods();
    }

    renderTransportation() {
        const options = document.getElementById('transportOptions');
        options.innerHTML = this.transportationData.map(option => `
            <div class="transport-option ${option.recommended ? 'transport-option--recommended' : ''}">
                <h3>${option.type}</h3>
                <div class="transport-price">€${option.price}</div>
                <p><strong>Best for:</strong> ${option.bestFor}</p>
                <p><strong>Includes:</strong> ${option.includes}</p>
            </div>
        `).join('');
    }

    calculateTransportCost(tripType) {
        const result = document.getElementById('transportResult');
        
        if (!tripType) {
            result.classList.remove('transport-result--visible');
            return;
        }

        const transportMap = {
            'single': { cost: 3.80, trips: 8, total: 30.40 },
            'day': { cost: 10.60, trips: 1, total: 10.60 },
            'weekend': { cost: 20.60, trips: 1, total: 20.60 },
            'welcome': { cost: 26.90, trips: 1, total: 26.90 },
            'group': { cost: 33.30, trips: 1, total: 33.30 }
        };

        const selected = transportMap[tripType];
        if (selected) {
            result.innerHTML = `
                <h4>💡 Cost Calculation</h4>
                <p>For your 1.5-day Berlin trip with ${tripType === 'single' ? 'individual tickets' : 'this pass'}:</p>
                <div style="font-size: 18px; font-weight: bold; color: var(--color-primary); margin-top: 12px;">
                    Total Cost: €${selected.total}
                </div>
                ${tripType === 'single' ? '<p style="color: var(--color-warning); margin-top: 8px;">⚠️ Note: Estimated 8 trips needed for full itinerary</p>' : ''}
                ${tripType === 'welcome' ? '<p style="color: var(--color-success); margin-top: 8px;">✅ Includes attraction discounts!</p>' : ''}
            `;
            result.classList.add('transport-result--visible');
        }
    }

    renderFood() {
        const brunchSpots = document.getElementById('brunchSpots');
        const germanFood = document.getElementById('germanFood');
        const nightlife = document.getElementById('nightlife');

        brunchSpots.innerHTML = this.renderRestaurants(this.restaurantsData.brunch);
        germanFood.innerHTML = this.renderRestaurants(this.restaurantsData.german);
        nightlife.innerHTML = this.renderRestaurants(this.restaurantsData.nightlife);
    }

    renderRestaurants(restaurants) {
        return restaurants.map(restaurant => `
            <div class="restaurant-card">
                <div class="restaurant-header">
                    <h4 class="restaurant-name">${restaurant.name}</h4>
                    <div class="restaurant-rating">⭐ ${restaurant.rating}</div>
                </div>
                <div class="restaurant-details">
                    <div class="restaurant-detail">
                        <strong>📍 Location:</strong> ${restaurant.location}
                    </div>
                    <div class="restaurant-detail">
                        <strong>💰 Price:</strong> <span class="price-range">${restaurant.priceRange}</span>
                    </div>
                </div>
                <p><strong>Speciality:</strong> ${restaurant.speciality}</p>
                <div class="restaurant-tips">
                    <strong>💡 Tips:</strong> ${restaurant.tips}
                </div>
            </div>
        `).join('');
    }

    renderTips() {
        const safetyTips = document.getElementById('safetyTips');
        const weatherTips = document.getElementById('weatherTips');
        const culturalTips = document.getElementById('culturalTips');

        safetyTips.innerHTML = this.practicalTips.safety.map(tip => `<li>${tip}</li>`).join('');
        weatherTips.innerHTML = this.practicalTips.weather.map(tip => `<li>${tip}</li>`).join('');
        culturalTips.innerHTML = this.practicalTips.cultural.map(tip => `<li>${tip}</li>`).join('');
    }

    printItinerary() {
        try {
            const printContent = this.generatePrintContent();
            const printWindow = window.open('', '_blank', 'width=800,height=600');
            
            if (printWindow) {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>Berlin Weekend Guide - Itinerary</title>
                            <style>
                                body { 
                                    font-family: Arial, sans-serif; 
                                    margin: 20px; 
                                    line-height: 1.6;
                                }
                                h1, h2 { 
                                    color: #d52b1e; 
                                    border-bottom: 2px solid #d52b1e;
                                    padding-bottom: 5px;
                                }
                                .activity { 
                                    margin-bottom: 20px; 
                                    padding: 15px; 
                                    border-left: 3px solid #d52b1e; 
                                    background: #f9f9f9;
                                }
                                .activity-time { 
                                    font-weight: bold; 
                                    color: #666; 
                                    font-size: 14px;
                                }
                                .activity-title { 
                                    font-size: 18px; 
                                    font-weight: bold; 
                                    margin: 5px 0; 
                                    color: #333;
                                }
                                .activity-details { 
                                    margin: 10px 0; 
                                    color: #555;
                                }
                                .activity-tips { 
                                    background: #fffacd; 
                                    padding: 10px; 
                                    margin-top: 10px; 
                                    border-radius: 4px;
                                    border-left: 3px solid #ffce00;
                                }
                                @media print {
                                    body { margin: 0; }
                                    .activity { break-inside: avoid; }
                                }
                            </style>
                        </head>
                        <body>
                            ${printContent}
                        </body>
                    </html>
                `);
                printWindow.document.close();
                
                // Wait a moment for content to load, then print
                setTimeout(() => {
                    printWindow.focus();
                    printWindow.print();
                }, 500);
            } else {
                alert('Pop-up blocked. Please allow pop-ups for this site to use the print feature.');
            }
        } catch (error) {
            console.error('Print error:', error);
            alert('Print feature encountered an error. Please try again or use your browser\'s print function.');
        }
    }

    generatePrintContent() {
        const saturdayActivities = this.itineraryData.filter(item => item.day === 'Saturday');
        const sundayActivities = this.itineraryData.filter(item => item.day === 'Sunday');

        return `
            <h1>🇩🇪 Berlin Weekend Guide</h1>
            <p><strong>Your personalized 1.5-day Berlin itinerary</strong></p>
            <p><em>Generated on ${new Date().toLocaleDateString()}</em></p>
            
            <h2>Saturday (Half Day)</h2>
            ${saturdayActivities.map(activity => `
                <div class="activity">
                    <div class="activity-time">${activity.time}</div>
                    <div class="activity-title">${activity.activity}</div>
                    <div class="activity-details">
                        <strong>📍 Location:</strong> ${activity.location}<br>
                        <strong>⏱️ Duration:</strong> ${activity.duration}<br>
                        <strong>💰 Cost:</strong> €${activity.cost}
                    </div>
                    <div class="activity-tips">
                        <strong>💡 Tips:</strong> ${activity.tips}
                    </div>
                </div>
            `).join('')}
            
            <h2>Sunday (Full Day)</h2>
            ${sundayActivities.map(activity => `
                <div class="activity">
                    <div class="activity-time">${activity.time}</div>
                    <div class="activity-title">${activity.activity}</div>
                    <div class="activity-details">
                        <strong>📍 Location:</strong> ${activity.location}<br>
                        <strong>⏱️ Duration:</strong> ${activity.duration}<br>
                        <strong>💰 Cost:</strong> €${activity.cost}
                    </div>
                    <div class="activity-tips">
                        <strong>💡 Tips:</strong> ${activity.tips}
                    </div>
                </div>
            `).join('')}
            
            <hr style="margin: 30px 0; border: 1px solid #ddd;">
            <p style="text-align: center; color: #666; font-size: 14px;">
                Have an amazing weekend in Berlin! 🎉
            </p>
        `;
    }

    shareItinerary() {
        if (navigator.share) {
            navigator.share({
                title: 'Berlin Weekend Guide',
                text: 'Check out this amazing Berlin weekend itinerary!',
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                this.fallbackShare();
            });
        } else {
            this.fallbackShare();
        }
    }

    fallbackShare() {
        const url = window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                alert('Itinerary link copied to clipboard! 📋\n\nYou can now paste it to share with others.');
            }).catch(err => {
                console.log('Clipboard error:', err);
                this.showShareUrl(url);
            });
        } else {
            this.showShareUrl(url);
        }
    }

    showShareUrl(url) {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            alert('Itinerary link copied! 📋\n\nYou can now paste it to share with others.');
        } catch (err) {
            alert('Share this link with others:\n\n' + url);
        }
        document.body.removeChild(textArea);
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BerlinGuideApp();
});
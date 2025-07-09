// Community Hub JavaScript - Main functionality

// Search functionality
class CommunitySearch {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchBtn = document.getElementById('search-btn');
        this.searchResults = document.getElementById('search-results');
        this.searchData = this.initializeSearchData();
        
        console.log('Search elements found:', {
            searchInput: !!this.searchInput,
            searchBtn: !!this.searchBtn,
            searchResults: !!this.searchResults
        });
        
        if (this.searchInput && this.searchBtn && this.searchResults) {
            this.setupEventListeners();
            console.log('Search functionality initialized');
        }
    }
    
    setupEventListeners() {
        // Search on input change (with debounce)
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            console.log('Search query:', query);
            
            if (query.length < 2) {
                this.hideResults();
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });
        
        // Search on button click
        this.searchBtn.addEventListener('click', () => {
            const query = this.searchInput.value.trim();
            if (query.length >= 2) {
                this.performSearch(query);
            }
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-search')) {
                this.hideResults();
            }
        });
        
        // Handle Enter key
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.searchInput.value.trim();
                if (query.length >= 2) {
                    this.performSearch(query);
                }
            }
        });
    }
    
    initializeSearchData() {
        return {
            news: [
                {
                    title: "City Reimbursement Received",
                    type: "News",
                    content: "The City of Buffalo has finally reimbursed us the $101,000 for utility bills",
                    url: "news.html"
                },
                {
                    title: "Summer Reading Program",
                    type: "News",
                    content: "Our summer reading program is in full swing! Kids are earning prizes for every book they read",
                    url: "news.html"
                },
                {
                    title: "Community Garden Update",
                    type: "News", 
                    content: "We've harvested over 200 pounds of fresh vegetables this month",
                    url: "news.html"
                }
            ],
            events: [
                {
                    title: "Community Basketball Tournament",
                    type: "Event",
                    content: "Annual neighborhood basketball tournament with prizes and community barbecue",
                    url: "events.html"
                },
                {
                    title: "Summer Concert Series",
                    type: "Event",
                    content: "Live music performances featuring local artists and food vendors",
                    url: "events.html"
                },
                {
                    title: "Community Clean-Up Day",
                    type: "Event",
                    content: "Join neighbors in keeping our community clean and beautiful",
                    url: "events.html"
                }
            ],
            places: [
                {
                    title: "Seneca Babcock Community Center",
                    type: "Community Center",
                    content: "Main community center serving the neighborhood",
                    url: "index.html#local-places"
                },
                {
                    title: "South Side Social and Athletic",
                    type: "Recreation",
                    content: "Local sports and recreational facility",
                    url: "index.html#local-places"
                },
                {
                    title: "Clinton Bailey Farmers Market",
                    type: "Shopping",
                    content: "Local farmers market for fresh produce",
                    url: "index.html#local-places"
                },
                {
                    title: "Larkin Square",
                    type: "Recreation",
                    content: "Public square for events and gatherings",
                    url: "index.html#local-places"
                }
            ],
            history: [
                {
                    title: "Early Settlement",
                    type: "History",
                    content: "The Seneca Babcock neighborhood has deep historical roots in Buffalo's East Side",
                    url: "index.html#history"
                },
                {
                    title: "Industrial Heritage",
                    type: "History",
                    content: "The area played a significant role in Buffalo's industrial development",
                    url: "index.html#history"
                }
            ]
        };
    }
    
    performSearch(query) {
        console.log('Performing search for:', query);
        const results = this.searchContent(query);
        console.log('Search results:', results);
        this.displayResults(results, query);
    }
    
    searchContent(query) {
        const lowercaseQuery = query.toLowerCase();
        const allData = [
            ...this.searchData.news,
            ...this.searchData.events,
            ...this.searchData.places,
            ...this.searchData.history
        ];
        
        return allData.filter(item => {
            return (
                item.title.toLowerCase().includes(lowercaseQuery) ||
                item.content.toLowerCase().includes(lowercaseQuery) ||
                item.type.toLowerCase().includes(lowercaseQuery)
            );
        }).slice(0, 8); // Limit to 8 results
    }
    
    displayResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    No results found for "${query}". Try searching for news, events, places, or history.
                </div>
            `;
        } else {
            this.searchResults.innerHTML = results.map(result => `
                <div class="search-result-item" onclick="window.location.href='${result.url}'">
                    <div class="search-result-type">${result.type}</div>
                    <div class="search-result-title">${this.highlightQuery(result.title, query)}</div>
                    <div class="search-result-excerpt">${this.highlightQuery(result.content, query)}</div>
                </div>
            `).join('');
        }
        
        this.showResults();
    }
    
    highlightQuery(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<strong>$1</strong>');
    }
    
    showResults() {
        this.searchResults.classList.remove('hidden');
    }
    
    hideResults() {
        this.searchResults.classList.add('hidden');
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Form submission handling
function initializeStoryForm() {
    const storyForm = document.getElementById('story-form');
    if (storyForm) {
        storyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const storyData = {
                name: formData.get('name'),
                email: formData.get('email'),
                storyType: formData.get('story-type'),
                story: formData.get('story'),
                photo: formData.get('photo')
            };
            
            // For now, just show a success message
            alert('Thank you for sharing your story! We will review it and add it to our community archive.');
            
            // Reset the form
            this.reset();
            
            // Log the data for demonstration
            console.log('Story submitted:', storyData);
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Animate cards on scroll
    const cards = document.querySelectorAll('.history-card, .news-card, .event-card, .place-category');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Navbar scroll effect
function initializeNavbarEffect() {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = '#fff';
                header.style.backdropFilter = 'none';
            }
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing all functionality...');
    
    // Initialize search functionality
    new CommunitySearch();
    
    // Initialize other features
    initializeMobileMenu();
    initializeStoryForm();
    initializeScrollAnimations();
    initializeNavbarEffect();
    
    console.log('All functionality initialized!');
});

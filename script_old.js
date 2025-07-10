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
            resources: [
                {
                    title: "Food Pantry",
                    type: "Resource",
                    content: "Fresh, perishable food items including produce and low-fat dairy products for those in need",
                    url: "resources.html"
                },
                {
                    title: "Senior Services",
                    type: "Resource",
                    content: "Comprehensive support services including meals, transportation, case management, and recreation for seniors",
                    url: "resources.html"
                },
                {
                    title: "Baby & Children's Ministry",
                    type: "Resource",
                    content: "Free clothing, cribs, car seats, strollers, toys, and books for children and families",
                    url: "resources.html"
                },
                {
                    title: "Good Neighbors Health Care",
                    type: "Resource",
                    content: "Healthcare services for community members in need",
                    url: "resources.html"
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
            ],
            studies: [
                {
                    title: "Initiatives for a Smart Economy",
                    type: "Study",
                    content: "Economic development strategy for Buffalo featuring Seneca Babcock Community Center analysis",
                    url: "studies.html"
                },
                {
                    title: "Labor Takes the High Road",
                    type: "Study",
                    content: "Labor movements and community solidarity in Buffalo, featuring Seneca Babcock residents",
                    url: "studies.html"
                },
                {
                    title: "WNY Girls in Sports",
                    type: "Study",
                    content: "Gender equity in youth sports programs including Seneca Babcock Community Center",
                    url: "studies.html"
                },
                {
                    title: "Tool Libraries: Hammering Equity Home",
                    type: "Study",
                    content: "Community tool libraries and partnerships with Seneca-Babcock Community Association",
                    url: "studies.html"
                },
                {
                    title: "Buffalo Common Council Transparency",
                    type: "Study",
                    content: "Municipal funding transparency for community centers and oversight measures",
                    url: "studies.html"
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
            ...this.searchData.resources,
            ...this.searchData.history,
            ...this.searchData.studies
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

// Simple Share Modal Functionality
let currentShareData = {};

function openSimpleShareModal(title, description) {
    currentShareData = { title, description };
    
    document.getElementById('share-title').textContent = title;
    document.getElementById('share-description').textContent = description;
    
    const modal = document.getElementById('simple-share-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Add phone formatting listener
    const phoneInput = document.getElementById('phone-number');
    phoneInput.addEventListener('input', function(e) {
        const cursorPosition = e.target.selectionStart;
        const oldLength = e.target.value.length;
        e.target.value = formatPhoneNumber(e.target.value);
        const newLength = e.target.value.length;
        
        // Adjust cursor position
        const newCursorPosition = cursorPosition + (newLength - oldLength);
        e.target.setSelectionRange(newCursorPosition, newCursorPosition);
    });
    
    // Add Enter key support for phone input
    phoneInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            shareViaPhone();
        }
    });
}

function closeSimpleShareModal() {
    const modal = document.getElementById('simple-share-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    
    // Reset the modal state
    document.querySelector('.simple-share-options').classList.remove('hidden');
    document.getElementById('phone-input-form').classList.add('hidden');
    document.getElementById('phone-number').value = '';
}

function shareViaEmail() {
    const { title, description } = currentShareData;
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\nShared from Seneca Babcock Community Hub\n${window.location.href}`);
    
    // Show a fake "sending" animation
    const emailBtn = document.querySelector('.email-share');
    const originalText = emailBtn.innerHTML;
    emailBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    emailBtn.disabled = true;
    
    setTimeout(() => {
        emailBtn.innerHTML = '<i class="fas fa-check"></i> <span>Sent!</span>';
        emailBtn.style.background = '#10b981';
        
        setTimeout(() => {
            emailBtn.innerHTML = originalText;
            emailBtn.style.background = '';
            emailBtn.disabled = false;
            closeSimpleShareModal();
        }, 1500);
    }, 1000);
}

function shareViaPhone() {
    const phoneNumber = document.getElementById('phone-number').value.trim();
    
    if (!phoneNumber) {
        alert('Please enter a phone number first.');
        return;
    }
    
    const { title, description } = currentShareData;
    
    // Show a fake "sending" animation
    const sendBtn = document.querySelector('.phone-actions .btn-primary');
    const originalText = sendBtn.textContent;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    sendBtn.disabled = true;
    
    setTimeout(() => {
        sendBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        sendBtn.style.background = '#10b981';
        
        setTimeout(() => {
            sendBtn.innerHTML = originalText;
            sendBtn.style.background = '';
            sendBtn.disabled = false;
            
            // Reset form and close modal
            document.getElementById('phone-number').value = '';
            closeSimpleShareModal();
        }, 1500);
    }, 1000);
}

function showPhoneInput() {
    document.querySelector('.simple-share-options').classList.add('hidden');
    document.getElementById('phone-input-form').classList.remove('hidden');
    
    // Focus on the phone input
    setTimeout(() => {
        document.getElementById('phone-number').focus();
    }, 100);
}

function backToShareOptions() {
    document.querySelector('.simple-share-options').classList.remove('hidden');
    document.getElementById('phone-input-form').classList.add('hidden');
    
    // Clear the phone input
    document.getElementById('phone-number').value = '';
}

// Phone number formatting
function formatPhoneNumber(input) {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, '');
    
    // Apply formatting based on length
    if (numbers.length <= 3) {
        return numbers;
    } else if (numbers.length <= 6) {
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else {
        return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('simple-share-modal');
    if (modal && e.target === modal) {
        closeSimpleShareModal();
    }
});

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
    initializeLanguageSelector();
    
    console.log('All functionality initialized!');
});

// Language Selector Functionality
function initializeLanguageSelector() {
    // Initialize both desktop and mobile language selectors
    initializeLanguageSelectorById('language-btn', 'language-dropdown');
    initializeLanguageSelectorById('mobile-language-btn', 'mobile-language-dropdown');
}

function initializeLanguageSelectorById(btnId, dropdownId) {
    const languageBtn = document.getElementById(btnId);
    const languageDropdown = document.getElementById(dropdownId);
    
    if (!languageBtn || !languageDropdown) {
        console.log(`Language selector elements not found for ${btnId}`);
        return;
    }
    
    const languageOptions = languageDropdown.querySelectorAll('.language-option');
    
    // Toggle dropdown
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageBtn.classList.toggle('active');
        languageDropdown.classList.toggle('active');
    });
    
    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove selected class from all options (both desktop and mobile)
            document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            option.classList.add('selected');
            
            // Update button text for both desktop and mobile
            const langText = option.querySelector('span:last-child').textContent;
            const flagEmoji = option.querySelector('.flag').textContent;
            
            // Update both desktop and mobile buttons
            document.querySelectorAll('.language-btn span:not(.flag):not(.fas)').forEach(span => {
                span.textContent = langText;
            });
            
            // Close all dropdowns
            document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.language-dropdown').forEach(dropdown => dropdown.classList.remove('active'));
            
            // Trigger Google Translate (if available)
            const langCode = option.dataset.lang;
            triggerGoogleTranslate(langCode);
            
            // Store language preference
            localStorage.setItem('selectedLanguage', langCode);
            
            console.log('Language changed to:', langText, langCode);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageBtn.classList.remove('active');
            languageDropdown.classList.remove('active');
        }
    });
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && savedLanguage !== 'en') {
        const savedOption = languageDropdown.querySelector(`[data-lang="${savedLanguage}"]`);
        if (savedOption) {
            savedOption.click();
        }
    }
    
    console.log(`Language selector initialized for ${btnId}`);
}

// Trigger Google Translate functionality
function triggerGoogleTranslate(langCode) {
    // If Google Translate is loaded, use it
    if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
        // Find the Google Translate select element
        const translateSelect = document.querySelector('.goog-te-combo');
        if (translateSelect) {
            translateSelect.value = langCode;
            translateSelect.dispatchEvent(new Event('change'));
            return;
        }
    }
    
    // Fallback: Simple content replacement for basic phrases
    if (langCode !== 'en') {
        showTranslationNotice(langCode);
    }
}

// Show a notice about translation
function showTranslationNotice(langCode) {
    const translations = {
        'es': 'Traducción automática disponible - La traducción completa estará disponible próximamente',
        'fr': 'Traduction automatique disponible - La traduction complète sera bientôt disponible',
        'ar': 'الترجمة الآلية متاحة - ستكون الترجمة الكاملة متاحة قريباً',
        'sw': 'Tafsiri ya kiotomatiki inapatikana - Tafsiri kamili itapatikana hivi karibuni',
        'so': 'Turjumaada tooska ah ayaa la heli karaa - Turjumaada buuxa waxay noqon doontaa dhawaan'
    };
    
    const message = translations[langCode] || 'Automatic translation available - Full translation coming soon';
    
    // Create and show a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

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
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchBtn = document.getElementById('mobile-search-btn');
    const searchInput = document.getElementById('search-input');

    if (hamburger && mobileNavMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNavMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !mobileNavMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                mobileNavMenu.classList.remove('active');
            }
        });
    }

    // Sync mobile search with main search
    if (mobileSearchInput && searchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            searchInput.value = e.target.value;
            // Trigger search if there's a search function
            if (typeof window.communitySearch !== 'undefined') {
                window.communitySearch.performSearch(e.target.value);
            }
        });
    }

    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', () => {
            if (mobileSearchInput.value.trim()) {
                // Trigger search
                if (typeof window.communitySearch !== 'undefined') {
                    window.communitySearch.performSearch(mobileSearchInput.value.trim());
                }
            }
        });
    }

    // Update active nav link based on current page
    updateActiveNavLink();
}

// Function to update active navigation link
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if this is the current page
        if (href === currentPage || 
            (currentPage === 'index.html' && href === 'index.html') ||
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
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
    console.log('Initializing language selector...');
    
    // Initialize both desktop and mobile language selectors
    initializeLanguageSelectorById('language-btn', 'language-dropdown');
    initializeLanguageSelectorById('mobile-language-btn', 'mobile-language-dropdown');
}

function initializeLanguageSelectorById(btnId, dropdownId) {
    const languageBtn = document.getElementById(btnId);
    const languageDropdown = document.getElementById(dropdownId);
    
    console.log(`Looking for ${btnId}:`, languageBtn);
    console.log(`Looking for ${dropdownId}:`, languageDropdown);
    
    if (!languageBtn || !languageDropdown) {
        console.log(`Language selector elements not found for ${btnId}`);
        return;
    }
    
    const languageOptions = languageDropdown.querySelectorAll('.language-option');
    console.log(`Found ${languageOptions.length} language options for ${btnId}`);
    
    // Toggle dropdown
    languageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`Language button clicked: ${btnId}`);
        
        // Close other dropdowns first
        document.querySelectorAll('.language-dropdown').forEach(dropdown => {
            if (dropdown !== languageDropdown) {
                dropdown.classList.remove('active');
            }
        });
        document.querySelectorAll('.language-btn').forEach(btn => {
            if (btn !== languageBtn) {
                btn.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        const isActive = languageDropdown.classList.contains('active');
        if (isActive) {
            languageBtn.classList.remove('active');
            languageDropdown.classList.remove('active');
            console.log('Dropdown closed');
        } else {
            languageBtn.classList.add('active');
            languageDropdown.classList.add('active');
            console.log('Dropdown opened');
        }
    });
    
    // Handle language selection
    languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const langCode = option.dataset.lang;
            const langText = option.querySelector('span:last-child').textContent;
            console.log('Language option clicked:', langCode, langText);
            
            // Remove selected class from all options (both desktop and mobile)
            document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option and its counterpart
            option.classList.add('selected');
            // Also select the corresponding option in other language selectors
            document.querySelectorAll(`[data-lang="${langCode}"]`).forEach(opt => opt.classList.add('selected'));
            
            // Update button text for both desktop and mobile
            document.querySelectorAll('.language-btn span:not(.flag):not(.fas)').forEach(span => {
                span.textContent = langText;
            });
            
            // Close all dropdowns
            document.querySelectorAll('.language-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.language-dropdown').forEach(dropdown => dropdown.classList.remove('active'));
            
            // Show notification
            showLanguageNotification(langText, langCode);
            
            // Trigger Google Translate (if available)
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

// Show language change notification
function showLanguageNotification(langName, langCode) {
    const translations = {
        'es': 'Idioma cambiado a Español - La traducción completa estará disponible próximamente',
        'fr': 'Langue changée en Français - La traduction complète sera bientôt disponible',
        'ar': 'تم تغيير اللغة إلى العربية - ستكون الترجمة الكاملة متاحة قريباً',
        'sw': 'Lugha imebadilishwa kuwa Kiswahili - Tafsiri kamili itapatikana hivi karibuni',
        'so': 'Luqadda waxaa loo beddelay Soomaaliga - Turjumaada buuxda ayaa dhowaan la heli doonaa'
    };
    
    const message = langCode === 'en' ? 
        `Language changed to ${langName}` : 
        translations[langCode] || `Language changed to ${langName} - Full translation coming soon`;
    
    // Create notification
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
        z-index: 10001;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Translation data for the website
const translations = {
    en: {
        // Navigation
        'Home': 'Home',
        'History': 'History',
        'News': 'News',
        'Events': 'Events',
        'Resources': 'Resources',
        'Studies': 'Studies',
        'Community': 'Community',
        'Contact': 'Contact',
        'English': 'English',
        
        // Hero Section
        'Seneca Babcock Community': 'Seneca Babcock Community',
        'Research & Information Center': 'Research & Information Center',
        'Comprehensive neighborhood data, community studies, and local insights for residents, researchers, and community stakeholders': 'Comprehensive neighborhood data, community studies, and local insights for residents, researchers, and community stakeholders',
        'View Studies & Data': 'View Studies & Data',
        'Latest Updates': 'Latest Updates',
        'Years of History': 'Years of History',
        'Residents': 'Residents',
        'Published Studies': 'Published Studies',
        
        // Sections
        'Neighborhood Insights & Research': 'Neighborhood Insights & Research',
        'Latest News & Updates': 'Latest News & Updates',
        'Upcoming Events': 'Upcoming Events',
        'Community Resources': 'Community Resources',
        'Community Research & Studies': 'Community Research & Studies',
        'Send Us a Message': 'Send Us a Message',
        'Get Involved': 'Get Involved',
        
        // Buttons
        'View All News & Updates': 'View All News & Updates',
        'View All Events & Calendar': 'View All Events & Calendar',
        'View All Resources': 'View All Resources',
        'View All Studies & Research': 'View All Studies & Research',
        'Send Message': 'Send Message',
        'Donate Now': 'Donate Now',
        'Volunteer Today': 'Volunteer Today',
        
        // Form elements
        'Your Name': 'Your Name',
        'Email Address': 'Email Address',
        'Subject': 'Subject',
        'Message': 'Message',
        'Select a topic': 'Select a topic',
        'General Question': 'General Question',
        'Events & Activities': 'Events & Activities',
        'Community Resources': 'Community Resources',
        'Volunteer Opportunities': 'Volunteer Opportunities',
        'Website Feedback': 'Website Feedback',
        'Other': 'Other',
        'How can we help you?': 'How can we help you?',
        'Search news, events, places...': 'Search news, events, places...',
        
        // Common phrases
        'Where Neighbors Care': 'Where Neighbors Care',
        'Food Pantry': 'Food Pantry',
        'Senior Services': 'Senior Services',
        'Make a Donation': 'Make a Donation',
        'Volunteer Your Time': 'Volunteer Your Time',
        'Help strengthen our community through donations and volunteer work': 'Help strengthen our community through donations and volunteer work',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': 'Have questions, suggestions, or need help? We\'re here to connect you with our community',
    },
    es: {
        // Navigation
        'Home': 'Inicio',
        'History': 'Historia',
        'News': 'Noticias',
        'Events': 'Eventos',
        'Resources': 'Recursos',
        'Studies': 'Estudios',
        'Community': 'Comunidad',
        'Contact': 'Contacto',
        'English': 'Español',
        
        // Hero Section
        'Seneca Babcock Community': 'Comunidad Seneca Babcock',
        'Research & Information Center': 'Centro de Investigación e Información',
        'Comprehensive neighborhood data, community studies, and local insights for residents, researchers, and community stakeholders': 'Datos integrales del vecindario, estudios comunitarios y perspectivas locales para residentes, investigadores y partes interesadas de la comunidad',
        'View Studies & Data': 'Ver Estudios y Datos',
        'Latest Updates': 'Últimas Actualizaciones',
        'Years of History': 'Años de Historia',
        'Residents': 'Residentes',
        'Published Studies': 'Estudios Publicados',
        
        // Sections
        'Neighborhood Insights & Research': 'Perspectivas e Investigación del Vecindario',
        'Latest News & Updates': 'Últimas Noticias y Actualizaciones',
        'Upcoming Events': 'Próximos Eventos',
        'Community Resources': 'Recursos Comunitarios',
        'Community Research & Studies': 'Investigación y Estudios Comunitarios',
        'Send Us a Message': 'Envíanos un Mensaje',
        'Get Involved': 'Participa',
        
        // Buttons
        'View All News & Updates': 'Ver Todas las Noticias y Actualizaciones',
        'View All Events & Calendar': 'Ver Todos los Eventos y Calendario',
        'View All Resources': 'Ver Todos los Recursos',
        'View All Studies & Research': 'Ver Todos los Estudios e Investigación',
        'Send Message': 'Enviar Mensaje',
        'Donate Now': 'Donar Ahora',
        'Volunteer Today': 'Ser Voluntario Hoy',
        
        // Form elements
        'Your Name': 'Tu Nombre',
        'Email Address': 'Dirección de Correo Electrónico',
        'Subject': 'Asunto',
        'Message': 'Mensaje',
        'Select a topic': 'Selecciona un tema',
        'General Question': 'Pregunta General',
        'Events & Activities': 'Eventos y Actividades',
        'Community Resources': 'Recursos Comunitarios',
        'Volunteer Opportunities': 'Oportunidades de Voluntariado',
        'Website Feedback': 'Comentarios del Sitio Web',
        'Other': 'Otro',
        'How can we help you?': '¿Cómo podemos ayudarte?',
        'Search news, events, places...': 'Buscar noticias, eventos, lugares...',
        
        // Common phrases
        'Where Neighbors Care': 'Donde los Vecinos se Preocupan',
        'Food Pantry': 'Despensa de Alimentos',
        'Senior Services': 'Servicios para Adultos Mayores',
        'Make a Donation': 'Hacer una Donación',
        'Volunteer Your Time': 'Voluntario Tu Tiempo',
        'Help strengthen our community through donations and volunteer work': 'Ayuda a fortalecer nuestra comunidad a través de donaciones y trabajo voluntario',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': '¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para conectarte con nuestra comunidad',
        
        // Form elements
        'Your Name': 'Tu Nombre',
        'Email Address': 'Dirección de Correo Electrónico',
        'Subject': 'Asunto',
        'Message': 'Mensaje',
        'Select a topic': 'Seleccionar un tema',
        'General Question': 'Pregunta General',
        'Events & Activities': 'Eventos y Actividades',
        'Community Resources': 'Recursos Comunitarios',
        'Volunteer Opportunities': 'Oportunidades de Voluntariado',
        'Website Feedback': 'Comentarios sobre el Sitio Web',
        'Other': 'Otro',
        'How can we help you?': '¿Cómo podemos ayudarte?',
        'Search news, events, places...': 'Buscar noticias, eventos, lugares...',
        
        // Common phrases
        'Where Neighbors Care': 'Donde los Vecinos se Preocupan',
        'Food Pantry': 'Despensa de Alimentos',
        'Senior Services': 'Servicios para Personas Mayores',
        'Make a Donation': 'Hacer una Donación',
        'Volunteer Your Time': 'Ofrece tu Tiempo como Voluntario',
        'Help strengthen our community through donations and volunteer work': 'Ayuda a fortalecer nuestra comunidad a través de donaciones y trabajo voluntario',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': '¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para conectarte con nuestra comunidad',
    },
    fr: {
        // Navigation
        'Home': 'Accueil',
        'History': 'Histoire',
        'News': 'Nouvelles',
        'Events': 'Événements',
        'Resources': 'Ressources',
        'Studies': 'Études',
        'Community': 'Communauté',
        'Contact': 'Contact',
        'English': 'Français',
        
        // Hero Section
        'Seneca Babcock Community': 'Communauté Seneca Babcock',
        'Research & Information Center': 'Centre de Recherche et d\'Information',
        'Comprehensive neighborhood data, community studies, and local insights for residents, researchers, and community stakeholders': 'Données complètes du quartier, études communautaires et perspectives locales pour les résidents, chercheurs et parties prenantes de la communauté',
        'View Studies & Data': 'Voir les Études et Données',
        'Latest Updates': 'Dernières Mises à Jour',
        'Years of History': 'Années d\'Histoire',
        'Residents': 'Résidents',
        'Published Studies': 'Études Publiées',
        
        // Sections
        'Neighborhood Insights & Research': 'Perspectives et Recherche du Quartier',
        'Latest News & Updates': 'Dernières Nouvelles et Mises à Jour',
        'Upcoming Events': 'Événements à Venir',
        'Community Resources': 'Ressources Communautaires',
        'Community Research & Studies': 'Recherche et Études Communautaires',
        'Send Us a Message': 'Envoyez-nous un Message',
        'Get Involved': 'Participez',
        
        // Buttons
        'View All News & Updates': 'Voir Toutes les Nouvelles et Mises à Jour',
        'View All Events & Calendar': 'Voir Tous les Événements et Calendrier',
        'View All Resources': 'Voir Toutes les Ressources',
        'View All Studies & Research': 'Voir Toutes les Études et Recherche',
        'Send Message': 'Envoyer Message',
        'Donate Now': 'Faire un Don',
        'Volunteer Today': 'Devenir Bénévole',
        
        // Form elements
        'Your Name': 'Votre Nom',
        'Email Address': 'Adresse Email',
        'Subject': 'Sujet',
        'Message': 'Message',
        'Select a topic': 'Sélectionnez un sujet',
        'General Question': 'Question Générale',
        'Events & Activities': 'Événements et Activités',
        'Community Resources': 'Ressources Communautaires',
        'Volunteer Opportunities': 'Opportunités de Bénévolat',
        'Website Feedback': 'Commentaires sur le Site Web',
        'Other': 'Autre',
        'How can we help you?': 'Comment pouvons-nous vous aider?',
        'Search news, events, places...': 'Rechercher nouvelles, événements, lieux...',
        
        // Common phrases
        'Where Neighbors Care': 'Où les Voisins se Soucient',
        'Food Pantry': 'Banque Alimentaire',
        'Senior Services': 'Services aux Aînés',
        'Make a Donation': 'Faire un Don',
        'Volunteer Your Time': 'Donnez de Votre Temps',
        'Help strengthen our community through donations and volunteer work': 'Aidez à renforcer notre communauté par des dons et du travail bénévole',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': 'Vous avez des questions, des suggestions ou besoin d\'aide? Nous sommes là pour vous connecter avec notre communauté',
        
        // Form elements
        'Your Name': 'Votre Nom',
        'Email Address': 'Adresse Électronique',
        'Subject': 'Sujet',
        'Message': 'Message',
        'Select a topic': 'Sélectionner un sujet',
        'General Question': 'Question Générale',
        'Events & Activities': 'Événements et Activités',
        'Community Resources': 'Ressources Communautaires',
        'Volunteer Opportunities': 'Opportunités de Bénévolat',
        'Website Feedback': 'Commentaires sur le Site Web',
        'Other': 'Autre',
        'How can we help you?': 'Comment pouvons-nous vous aider?',
        'Search news, events, places...': 'Rechercher des nouvelles, des événements, des lieux...',
        
        // Common phrases
        'Where Neighbors Care': 'Où les Voisins se Soucient',
        'Food Pantry': 'Banque Alimentaire',
        'Senior Services': 'Services aux Personnes Âgées',
        'Make a Donation': 'Faire un Don',
        'Volunteer Your Time': 'Bénévoler Votre Temps',
        'Help strengthen our community through donations and volunteer work': 'Aidez à renforcer notre communauté par des dons et du bénévolat',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': 'Vous avez des questions, des suggestions ou besoin d\'aide? Nous sommes ici pour vous connecter avec notre communauté',
    },
    ar: {
        // Navigation
        'Home': 'الرئيسية',
        'History': 'التاريخ',
        'News': 'الأخبار',
        'Events': 'الأحداث',
        'Resources': 'الموارد',
        'Studies': 'الدراسات',
        'Community': 'المجتمع',
        'Contact': 'اتصل',
        'English': 'العربية',
        
        // Hero Section
        'Seneca Babcock Community': 'مجتمع سينيكا بابكوك',
        'Research & Information Center': 'مركز البحوث والمعلومات',
        'Comprehensive neighborhood data, community studies, and local insights for residents, researchers, and community stakeholders': 'بيانات شاملة للحي ودراسات مجتمعية ورؤى محلية للسكان والباحثين وأصحاب المصلحة في المجتمع',
        'View Studies & Data': 'عرض الدراسات والبيانات',
        'Latest Updates': 'آخر التحديثات',
        'Years of History': 'سنوات من التاريخ',
        'Residents': 'السكان',
        'Published Studies': 'الدراسات المنشورة',
        
        // Sections
        'Neighborhood Insights & Research': 'رؤى وبحوث الحي',
        'Latest News & Updates': 'آخر الأخبار والتحديثات',
        'Upcoming Events': 'الأحداث القادمة',
        'Community Resources': 'موارد المجتمع',
        'Community Research & Studies': 'البحوث والدراسات المجتمعية',
        'Send Us a Message': 'أرسل لنا رسالة',
        'Get Involved': 'شارك',
        
        // Buttons
        'View All News & Updates': 'عرض جميع الأخبار والتحديثات',
        'View All Events & Calendar': 'عرض جميع الأحداث والتقويم',
        'View All Resources': 'عرض جميع الموارد',
        'View All Studies & Research': 'عرض جميع الدراسات والبحوث',
        'Send Message': 'إرسال رسالة',
        'Donate Now': 'تبرع الآن',
        'Volunteer Today': 'تطوع اليوم',
        
        // Form elements
        'Your Name': 'اسمك',
        'Email Address': 'عنوان البريد الإلكتروني',
        'Subject': 'الموضوع',
        'Message': 'الرسالة',
        'Select a topic': 'اختر موضوعاً',
        'General Question': 'سؤال عام',
        'Events & Activities': 'الأحداث والأنشطة',
        'Community Resources': 'موارد المجتمع',
        'Volunteer Opportunities': 'فرص التطوع',
        'Website Feedback': 'ملاحظات الموقع',
        'Other': 'أخرى',
        'How can we help you?': 'كيف يمكننا مساعدتك؟',
        'Search news, events, places...': 'البحث عن الأخبار والأحداث والأماكن...',
        
        // Common phrases
        'Where Neighbors Care': 'حيث يهتم الجيران',
        'Food Pantry': 'مخزن الطعام',
        'Senior Services': 'خدمات كبار السن',
        'Make a Donation': 'تبرع',
        'Volunteer Your Time': 'تطوع بوقتك',
        'Help strengthen our community through donations and volunteer work': 'ساعد في تقوية مجتمعنا من خلال التبرعات والعمل التطوعي',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': 'هل لديك أسئلة أو اقتراحات أو تحتاج إلى مساعدة؟ نحن هنا لربطك بمجتمعنا',
        
        // Form elements
        'Your Name': 'اسمك',
        'Email Address': 'عنوان بريدك الإلكتروني',
        'Subject': 'الموضوع',
        'Message': 'رسالة',
        'Select a topic': 'اختر موضوعًا',
        'General Question': 'سؤال عام',
        'Events & Activities': 'الأحداث والأنشطة',
        'Community Resources': 'موارد المجتمع',
        'Volunteer Opportunities': 'فرص التطوع',
        'Website Feedback': 'ملاحظات حول الموقع',
        'Other': 'أخرى',
        'How can we help you?': 'كيف يمكننا مساعدتك؟',
        'Search news, events, places...': 'ابحث في الأخبار والأحداث والأماكن...',
        
        // Common phrases
        'Where Neighbors Care': 'حيث يهتم الجيران',
        'Food Pantry': 'مخزن الطعام',
        'Senior Services': 'خدمات كبار السن',
        'Make a Donation': 'تقديم تبرع',
        'Volunteer Your Time': 'تطوع بوقتك',
        'Help strengthen our community through donations and volunteer work': 'ساعد في تقوية مجتمعنا من خلال التبرعات والعمل التطوعي',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': 'هل لديك أسئلة أو اقتراحات أو تحتاج إلى مساعدة؟ نحن هنا لربطك بمجتمعنا',
    },
    sw: {
        // Navigation
        'Home': 'Nyumbani',
        'History': 'Historia',
        'News': 'Habari',
        'Events': 'Matukio',
        'Resources': 'Rasilimali',
        'Studies': 'Masomo',
        'Community': 'Jamii',
        'Contact': 'Wasiliana',
        'English': 'Kiswahili',
        
        // Hero Section
        'Seneca Babcock Community': 'Jamii ya Seneca Babcock',
        'Research & Information Center': 'Kituo cha Utafiti na Habari',
        'Comprehensive neighborhood data, community studies, and local insights for residents, researchers, and community stakeholders': 'Data kamili ya mtaa, masomo ya kijamii, na maarifa ya ndani kwa wakazi, watafiti, na wadau wa jamii',
        'View Studies & Data': 'Ona Masomo na Data',
        'Latest Updates': 'Masasisho ya Hivi Karibuni',
        'Years of History': 'Miaka ya Historia',
        'Residents': 'Wakazi',
        'Published Studies': 'Masomo Yaliyochapishwa',
        
        // Sections
        'Neighborhood Insights & Research': 'Maarifa na Utafiti wa Mtaa',
        'Latest News & Updates': 'Habari na Masasisho ya Hivi Karibuni',
        'Upcoming Events': 'Matukio Yajayo',
        'Community Resources': 'Rasilimali za Jamii',
        'Community Research & Studies': 'Utafiti na Masomo ya Jamii',
        'Send Us a Message': 'Tutumie Ujumbe',
        'Get Involved': 'Jiunge',
        
        // Buttons
        'View All News & Updates': 'Ona Habari na Masasisho Yote',
        'View All Events & Calendar': 'Ona Matukio Yote na Kalenda',
        'View All Resources': 'Ona Rasilimali Zote',
        'View All Studies & Research': 'Ona Masomo na Utafiti Wote',
        'Send Message': 'Tuma Ujumbe',
        'Donate Now': 'Changia Sasa',
        'Volunteer Today': 'Jitolee Leo',
        
        // Form elements
        'Your Name': 'Jina Lako',
        'Email Address': 'Anwani ya Barua Pepe',
        'Subject': 'Kichwa cha Habari',
        'Message': 'Ujumbe',
        'Select a topic': 'Chagua mada',
        'General Question': 'Swali la Kawaida',
        'Events & Activities': 'Matukio na Shughuli',
        'Community Resources': 'Rasilimali za Jamii',
        'Volunteer Opportunities': 'Fursa za Kujitolea',
        'Website Feedback': 'Maoni ya Tovuti',
        'Other': 'Nyingine',
        'How can we help you?': 'Tunawezaje kukusaidia?',
        'Search news, events, places...': 'Tafuta habari, matukio, maeneo...',
        
        // Common phrases
        'Where Neighbors Care': 'Mahali Jirani Wanapojali',
        'Food Pantry': 'Ghala la Chakula',
        'Senior Services': 'Huduma za Wazee',
        'Make a Donation': 'Fanya Mchango',
        'Volunteer Your Time': 'Tolea Muda Wako',
        'Help strengthen our community through donations and volunteer work': 'Saidia kuimarisha jamii yetu kupitia michango na kazi ya kujitolea',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': 'Una maswali, mapendekezo, au unahitaji msaada? Tuko hapa ili kukuunganisha na jamii yetu',
        
        // Form elements
        'Your Name': 'Jina Lako',
        'Email Address': 'Anwani Yako ya Barua Pepe',
        'Subject': 'Mada',
        'Message': 'Ujumbe',
        'Select a topic': 'Chagua mada',
        'General Question': 'Swali la Kawaida',
        'Events & Activities': 'Matukio na Shughuli',
        'Community Resources': 'Rasilimali za Jamii',
        'Volunteer Opportunities': 'Fursa za Kujitolea',
        'Website Feedback': 'Maoni kuhusu Tovuti',
        'Other': 'Nyingine',
        'How can we help you?': 'Tunaweza kukusaidia vipi?',
        'Search news, events, places...': 'Tafuta habari, matukio, maeneo...',
        
        // Common phrases
        'Where Neighbors Care': 'Mahali Wajirani Wanapojali',
        'Food Pantry': 'Kikundi cha Chakula',
        'Senior Services': 'Huduma za Wazee',
        'Make a Donation': 'Fanya Donation',
        'Volunteer Your Time': 'Toa Wakati Wako kama Msaidizi',
        'Help strengthen our community through donations and volunteer work': 'Saidia kuimarisha jamii yetu kupitia michango na kazi za kujitolea',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': 'Una maswali, mapendekezo, au unahitaji msaada? Tuko hapa kukuunganisha na jamii yetu',
    },
    so: {
        // Navigation
        'Home': 'Guriga',
        'History': 'Taariikhda',
        'News': 'Wararka',
        'Events': 'Dhacdooyinka',
        'Resources': 'Kheyraadka',
        'Studies': 'Daraasadaha',
        'Community': 'Bulshada',
        'Contact': 'Xiriir',
        'English': 'Soomaaliga',
        
        // Hero Section
        'Seneca Babcock Community': 'Bulshada Seneca Babcock',
        'Research & Information Center': 'Xarunta Cilmi-baarista iyo Macluumaadka',
        'Comprehensive neighborhood data, community studies, and local insights for residents, researchers, and community stakeholders': 'Xogta guud ee xaafadda, daraasadaha bulshada, iyo aragtida maxalliga ah ee dadka deggan, cilmi-baarayaasha, iyo daneeyayaasha bulshada',
        'View Studies & Data': 'Arag Daraasadaha iyo Xogta',
        'Latest Updates': 'Cusbooneysiinta Ugu Dambeeyay',
        'Years of History': 'Sanado Taariikh ah',
        'Residents': 'Dadka Deggan',
        'Published Studies': 'Daraasadaha la Daabacay',
        
        // Sections
        'Neighborhood Insights & Research': 'Aragtida iyo Cilmi-baarista Xaafadda',
        'Latest News & Updates': 'Wararka iyo Cusbooneysiinta Ugu Dambeeyay',
        'Upcoming Events': 'Dhacdooyinka Soo Socda',
        'Community Resources': 'Kheyraadka Bulshada',
        'Community Research & Studies': 'Cilmi-baarista iyo Daraasadaha Bulshada',
        'Send Us a Message': 'Noo Dir Fariintaada',
        'Get Involved': 'Ka Qaybgal',
        
        // Buttons
        'View All News & Updates': 'Arag Dhammaan Wararka iyo Cusbooneysiinta',
        'View All Events & Calendar': 'Arag Dhammaan Dhacdooyinka iyo Kalandarrada',
        'View All Resources': 'Arag Dhammaan Kheyraadka',
        'View All Studies & Research': 'Arag Dhammaan Daraasadaha iyo Cilmi-baarista',
        'Send Message': 'Dir Fariinta',
        'Donate Now': 'Tabaruc Hadda',
        'Volunteer Today': 'Iskataashiga Maanta',
        
        // Form elements
        'Your Name': 'Magacaaga',
        'Email Address': 'Cinwaankaaga Emailka',
        'Subject': 'Mowduuca',
        'Message': 'Fariinta',
        'Select a topic': 'Dooro mowduuc',
        'General Question': 'Suaal Guud',
        'Events & Activities': 'Dhacdooyinka & Hawlaha',
        'Community Resources': 'Kheyraadka Bulshada',
        'Volunteer Opportunities': 'Fursadaha Iskaa Wax U Qabso',
        'Website Feedback': 'Faallooyinka Bogga',
        'Other': 'Kale',
        'How can we help you?': 'Sideen ku caawin karnaa?',
        'Search news, events, places...': 'Raadi warar, dhacdooyin, meelaha...',
        
        // Common phrases
        'Where Neighbors Care': 'Halkee Derisyadu Ka Walwalsan Yihiin',
        'Food Pantry': 'Maktabadda Cuntada',
        'Senior Services': 'Adeegyada Waayeelka',
        'Make a Donation': 'Samee Deeq',
        'Volunteer Your Time': 'Waqtigaaga Iskaa Wax U Qabso',
        'Help strengthen our community through donations and volunteer work': 'Ka caawi adkeynta bulshada dhexdeeda adoo maraya deeqo iyo shaqo iskaa wax u qabso',
        'Have questions, suggestions, or need help? We\'re here to connect you with our community': 'Ma leedahay suaalo, talooyin, ama caawimaad u baahan tahay? Waxaan halkan u joognaa inaan ku xidhno bulshada dhexdeeda'
    }
};

// Function to translate the page
function translatePage(langCode) {
    if (!translations[langCode]) {
        console.log('Translation not available for:', langCode);
        return;
    }
    
    const translation = translations[langCode];
    
    // Find all text elements and translate them
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label, option');
    
    textElements.forEach(element => {
        // Skip if element contains only icons or has child elements with mixed content
        if (element.children.length > 0) {
            // Handle elements with mixed content (text + icons)
            const textNodes = [];
            element.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    textNodes.push(node);
                }
            });
            
            textNodes.forEach(textNode => {
                const originalText = textNode.textContent.trim();
                if (translation[originalText]) {
                    textNode.textContent = translation[originalText];
                }
            });
        } else {
            // Handle simple text elements
            const originalText = element.textContent.trim();
            if (originalText && translation[originalText]) {
                element.textContent = translation[originalText];
            }
        }
    });
    
    // Handle navigation links specifically
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const text = link.textContent.trim();
        if (translation[text]) {
            link.textContent = translation[text];
        }
    });
    
    // Handle button text with icons
    document.querySelectorAll('.btn').forEach(button => {
        const textSpan = button.querySelector('span');
        if (textSpan) {
            const text = textSpan.textContent.trim();
            if (translation[text]) {
                textSpan.textContent = translation[text];
            }
        } else {
            // Handle buttons without spans
            const text = button.textContent.trim();
            if (translation[text]) {
                // Preserve icons
                const icon = button.querySelector('i');
                if (icon) {
                    button.innerHTML = `${icon.outerHTML} ${translation[text]}`;
                } else {
                    button.textContent = translation[text];
                }
            }
        }
    });
    
    // Handle form elements
    document.querySelectorAll('input[placeholder]').forEach(input => {
        const placeholder = input.getAttribute('placeholder');
        if (translation[placeholder]) {
            input.setAttribute('placeholder', translation[placeholder]);
        }
    });
    
    // Update page direction for RTL languages
    if (langCode === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.style.fontFamily = "'Amiri', 'Inter', sans-serif";
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.style.fontFamily = "'Inter', sans-serif";
    }
    
    console.log('Page translated to:', langCode);
}

// Trigger translation functionality
function triggerGoogleTranslate(langCode) {
    // Use our custom translation system
    translatePage(langCode);
    
    // If Google Translate is also available, use it as backup
    if (typeof google !== 'undefined' && google.translate && google.translate.TranslateElement) {
        const translateSelect = document.querySelector('.goog-te-combo');
        if (translateSelect) {
            translateSelect.value = langCode;
            translateSelect.dispatchEvent(new Event('change'));
        }
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

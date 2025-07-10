// Resources page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeResourcesPage();
});

function initializeResourcesPage() {
    setupCategoryFiltering();
    setupResourceForm();
    setupMobileMenu();
}

// Category filtering functionality
function setupCategoryFiltering() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const resourceCards = document.querySelectorAll('.resource-detailed-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            filterResources(category, resourceCards);
        });
    });
}

function filterResources(category, resourceCards) {
    resourceCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            // Add fade-in animation
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 100);
        } else {
            card.classList.add('hidden');
        }
    });
}

// Resource submission form
function setupResourceForm() {
    const form = document.getElementById('resource-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const resourceData = {
                name: formData.get('resource-name'),
                category: formData.get('resource-category'),
                description: formData.get('resource-description'),
                contact: formData.get('resource-contact'),
                submitterEmail: formData.get('submitter-email')
            };
            
            // Validate form
            if (!validateResourceForm(resourceData)) {
                return;
            }
            
            // In a real implementation, this would send to a server
            console.log('Resource submitted:', resourceData);
            alert('Thank you for submitting a resource! We will review it and add it to our directory.');
            
            // Reset form
            this.reset();
        });
    }
}

function validateResourceForm(data) {
    const required = ['name', 'category', 'description', 'submitterEmail'];
    
    for (let field of required) {
        if (!data[field] || data[field].trim() === '') {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.submitterEmail)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

// Mobile menu functionality (shared with main site)
function setupMobileMenu() {
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

// Search functionality for resources
function searchResources(searchTerm) {
    const resourceCards = document.querySelectorAll('.resource-detailed-card');
    const normalizedSearch = searchTerm.toLowerCase();
    
    resourceCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const provider = card.querySelector('.resource-provider').textContent.toLowerCase();
        const description = card.querySelector('.resource-description').textContent.toLowerCase();
        
        if (title.includes(normalizedSearch) || 
            provider.includes(normalizedSearch) || 
            description.includes(normalizedSearch)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Accessibility improvements
function setupAccessibility() {
    // Add keyboard navigation for tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + direction + tabBtns.length) % tabBtns.length;
                tabBtns[nextIndex].focus();
                tabBtns[nextIndex].click();
            }
        });
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', () => {
    setupAccessibility();
});

// Export functions for external use
window.ResourcesPage = {
    searchResources,
    filterResources
};

console.log('Resources page initialized successfully!');

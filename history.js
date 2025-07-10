// History page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeTimelineNavigation();
    initializeScrollAnimations();
    initializeMobileMenu();
});

// Timeline navigation functionality
function initializeTimelineNavigation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineEras = document.querySelectorAll('.timeline-era');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const era = this.dataset.era;
            
            // Update active timeline item
            timelineItems.forEach(ti => ti.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding era
            timelineEras.forEach(te => te.classList.remove('active'));
            const targetEra = document.getElementById(`${era}-era`);
            if (targetEra) {
                targetEra.classList.add('active');
                
                // Smooth scroll to the era content
                setTimeout(() => {
                    targetEra.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });
}

// Scroll animations for story cards
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all story cards and today cards
    const cards = document.querySelectorAll('.story-card, .today-card');
    cards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });
}

// Mobile menu functionality (reused from main script)
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Add hover effects for story cards
document.addEventListener('DOMContentLoaded', function() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

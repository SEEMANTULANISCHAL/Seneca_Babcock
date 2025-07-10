// Studies page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeCategoryFiltering();
    initializeCitationModal();
    initializeResearchForm();
});

// Category filtering functionality
function initializeCategoryFiltering() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const studyCards = document.querySelectorAll('.study-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Filter study cards
            studyCards.forEach(card => {
                if (category === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const cardCategories = card.dataset.category.split(' ');
                    if (cardCategories.includes(category)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
}

// Citation modal functionality
function initializeCitationModal() {
    const citeBtns = document.querySelectorAll('.study-cite-btn');
    const modal = document.getElementById('citation-modal');
    const closeBtn = modal.querySelector('.modal-close');
    
    const citationData = {
        'smart-economy-2013': {
            title: 'Initiatives for a Smart Economy',
            authors: 'Partnership for the Public Good',
            year: '2013',
            url: 'https://ppgbuffalo.org/files/documents/economic_development/initiatives_for_a_smart_economy_2013.pdf',
            type: 'Report'
        },
        'smart-economy-2018': {
            title: 'Initiatives for a Smart Economy 2.0',
            authors: 'Partnership for the Public Good',
            year: '2018',
            url: 'https://ppgbuffalo.org/files/documents/economic_development/initiatives_for_smart_economy_2_0.pdf',
            type: 'Report'
        },
        'labor-high-road-2019': {
            title: 'Labor Takes the High Road',
            authors: 'Partnership for the Public Good',
            year: '2019',
            url: 'https://ppgbuffalo.org/files/documents/labortakesthehighroad_final_hr.pdf',
            type: 'Report'
        },
        'girls-sports-2022': {
            title: 'WNY Girls in Sports',
            authors: 'Partnership for the Public Good',
            year: '2022',
            url: 'https://ppgbuffalo.org/files/documents/equality_civil_rights/4_-girls-in-sports.pdf',
            type: 'Research Study'
        },
        'tool-libraries-2021': {
            title: 'Tool Libraries: Hammering Equity Home',
            authors: 'Partnership for the Public Good',
            year: '2021',
            url: 'https://ppgbuffalo.org/files/documents/housing_neighborhoods/tool_library_-_edits_feb2021.pdf',
            type: 'Policy Study'
        },
        'council-transparency-2024': {
            title: 'Buffalo Common Council Summary: Community Center Transparency',
            authors: 'Partnership for the Public Good',
            year: '2024',
            url: 'https://ppgbuffalo.org/news-and-events/news/article:10-11-2024-12-00am-buffalo-common-council-summary-week-of-october-7-2024/',
            type: 'Policy Analysis'
        }
    };

    citeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const studyId = this.dataset.study;
            const data = citationData[studyId];
            
            if (data) {
                showCitation(data);
                modal.classList.remove('hidden');
            }
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Copy citation functionality
    const copyBtns = modal.querySelectorAll('.copy-citation');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.dataset.format;
            const citationText = document.getElementById(`${format}-citation`).textContent;
            
            navigator.clipboard.writeText(citationText).then(() => {
                // Show temporary success message
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.background = '#10b981';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '#4fd1c7';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy citation: ', err);
                // Fallback for older browsers
                selectText(document.getElementById(`${format}-citation`));
            });
        });
    });
}

function showCitation(data) {
    const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // APA Format
    const apaElement = document.getElementById('apa-citation');
    apaElement.textContent = `${data.authors}. (${data.year}). ${data.title}. Retrieved ${today}, from ${data.url}`;

    // MLA Format
    const mlaElement = document.getElementById('mla-citation');
    mlaElement.textContent = `${data.authors}. "${data.title}." Web. ${today}. <${data.url}>.`;

    // Chicago Format
    const chicagoElement = document.getElementById('chicago-citation');
    chicagoElement.textContent = `${data.authors}. "${data.title}." Accessed ${today}. ${data.url}.`;
}

function selectText(element) {
    if (document.selection) {
        const range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(element);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}

// Research submission form
function initializeResearchForm() {
    const form = document.getElementById('research-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        submitBtn.style.background = '#64748b';
        
        setTimeout(() => {
            submitBtn.textContent = 'Submitted!';
            submitBtn.style.background = '#10b981';
            
            // Show success message
            showNotification('Thank you for submitting research! We will review and add it to our database.', 'success');
            
            // Reset form
            form.reset();
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.style.background = '#4fd1c7';
            }, 3000);
        }, 2000);
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#4fd1c7'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        max-width: 400px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        margin-left: 1rem;
        cursor: pointer;
        opacity: 0.8;
    `;
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    notification.appendChild(closeBtn);
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

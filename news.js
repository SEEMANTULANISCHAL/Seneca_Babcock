// News page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeNewsPage();
});

function initializeNewsPage() {
    setupMobileMenu();
    loadFacebookPosts();
    setupNewsletterForm();
    setupSocialSharing();
    setupPostFiltering();
}

// Hardcoded Facebook-style posts from both community pages
const facebookPostsData = [
    {
        id: 'fb_1',
        author: 'Seneca-Babcock Community Association',
        date: '2 days ago',
        content: '🎉 Great news! The City of Buffalo has finally reimbursed us the $101,000 for utility bills we\'ve been covering for the past five years. As President Brian Pilarski said, "We\'re in a better spot now." This means we can redirect these funds back to our community programs for seniors and children. Thank you to Acting Mayor Chris Scanlon for making this a priority! #CommunityFirst #SenecaBabcock',
        image: 'https://ewscripps.brightspotcdn.com/dims4/default/05fec70/2147483647/strip/true/crop/1300x728+0+0/resize/800x450!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F10%2F5a%2F4068270644a0a9744b0599b8a33e%2Fscreenshot-2025-02-06-at-5-41-05-pm.png',
        likes: 85,
        comments: 24,
        shares: 18,
        link: 'https://www.facebook.com/senecababcock/',
        created_time: '2025-07-07T10:00:00Z'
    },
    {
        id: 'fb_2',
        author: 'Seneca Street CDC',
        date: '3 days ago',
        content: '📚 Our summer reading program is in full swing! Kids are earning prizes for every book they read, and we\'ve already seen some amazing progress. The program runs through August 15th at our community center. Free books available for all participants! Stop by Monday-Friday 10 AM - 4 PM to sign up your child. Building literacy, building futures! #SummerReading #YouthPrograms #Education',
        likes: 42,
        comments: 12,
        shares: 8,
        link: 'https://www.facebook.com/SenecaStreetCDC/',
        created_time: '2025-07-06T14:30:00Z'
    },
    {
        id: 'fb_3',
        author: 'Seneca-Babcock Community Association',
        date: '5 days ago',
        content: '🌱 Community Garden Update: Our volunteers have been doing incredible work! We\'ve harvested over 200 pounds of fresh vegetables this month, which are being distributed to families in need through our food pantry. Next harvest day is this Saturday at 9 AM - all are welcome to help and learn about urban gardening. Bring work gloves and water! #CommunityGarden #FoodSecurity #Volunteer',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=450&fit=crop',
        likes: 67,
        comments: 18,
        shares: 15,
        link: 'https://www.facebook.com/senecababcock/',
        created_time: '2025-07-04T08:15:00Z'
    },
    {
        id: 'fb_4',
        author: 'Seneca Street CDC',
        date: '1 week ago',
        content: '🏠 Housing Update: We\'re working closely with the City of Buffalo on new affordable housing initiatives in our neighborhood. We want to ensure that long-time residents have a voice in these developments. Community meeting scheduled for July 20th at 6 PM to discuss upcoming projects and how they will benefit our neighborhood. Your input matters! #AffordableHousing #CommunityVoice #Development',
        likes: 56,
        comments: 31,
        shares: 24,
        link: 'https://www.facebook.com/SenecaStreetCDC/',
        created_time: '2025-07-02T18:00:00Z'
    },
    {
        id: 'fb_5',
        author: 'Seneca-Babcock Community Association',
        date: '1 week ago',
        content: '🎵 Music in the Park was a huge success! Over 150 community members came out to enjoy live performances by local artists. Special thanks to the Buffalo Philharmonic students who volunteered their time, and to all the food vendors who participated. Our next community event is the annual block party on August 12th - save the date! #MusicInThePark #CommunityEvents #Buffalo',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop',
        likes: 94,
        comments: 28,
        shares: 12,
        link: 'https://www.facebook.com/senecababcock/',
        created_time: '2025-07-01T20:30:00Z'
    },
    {
        id: 'fb_6',
        author: 'Seneca Street CDC',
        date: '10 days ago',
        content: '💼 Job Fair Success! Last week\'s job fair connected 45 community members with local employers. We had representatives from healthcare, manufacturing, retail, and service industries. Special thanks to our partners at Buffalo Employment and Training Center. Our next job readiness workshop is July 25th - we\'ll cover resume writing, interview skills, and professional networking. Free event! #JobFair #Employment #CareerDevelopment',
        likes: 38,
        comments: 9,
        shares: 22,
        link: 'https://www.facebook.com/SenecaStreetCDC/',
        created_time: '2025-06-29T11:45:00Z'
    },
    {
        id: 'fb_7',
        author: 'Seneca-Babcock Community Association',
        date: '2 weeks ago',
        content: '🚨 Safety Update: Thanks to our neighborhood watch program and partnership with Buffalo Police District D, we\'ve seen a 30% reduction in petty crime this quarter. Officer Rodriguez will be hosting a community safety meeting this Thursday at 7 PM. Topics include home security, personal safety tips, and how to report suspicious activity. Light refreshments provided! #CommunitySafety #NeighborhoodWatch #BPD',
        likes: 73,
        comments: 16,
        shares: 19,
        link: 'https://www.facebook.com/senecababcock/',
        created_time: '2025-06-25T16:20:00Z'
    },
    {
        id: 'fb_8',
        author: 'Seneca Street CDC',
        date: '2 weeks ago',
        content: '🎨 Youth Art Showcase this Friday! Our young artists (ages 8-17) will be displaying their summer creations at the community center. Paintings, sculptures, digital art, and photography will be featured. The event runs from 5-8 PM with refreshments and music. Come support our talented youth and see the amazing creativity in our neighborhood! Some artwork will be available for purchase with proceeds supporting the art program. #YouthArt #CommunityShowcase #Creativity',
        image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=450&fit=crop',
        likes: 61,
        comments: 20,
        shares: 11,
        link: 'https://www.facebook.com/SenecaStreetCDC/',
        created_time: '2025-06-23T13:10:00Z'
    }
];

// Load Facebook posts - simple and clean
function loadFacebookPosts() {
    const container = document.querySelector('.facebook-posts-container');
    
    // Clear loading message
    container.innerHTML = '';
    
    // Show all posts (or first 6 for initial load)
    const postsToShow = facebookPostsData.slice(0, 6);
    
    postsToShow.forEach(post => {
        const postElement = createFacebookPost(post);
        container.appendChild(postElement);
    });
}

// Setup post filtering by source
function setupPostFiltering() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.source;
            filterPosts(filter);
        });
    });
}

// Filter posts by source
function filterPosts(source) {
    const container = document.querySelector('.facebook-posts-container');
    container.innerHTML = '';
    
    let filteredPosts = facebookPostsData;
    
    // Apply filter
    if (source === 'community') {
        filteredPosts = facebookPostsData.filter(post => post.author === 'Seneca-Babcock Community Association');
    } else if (source === 'cdc') {
        filteredPosts = facebookPostsData.filter(post => post.author === 'Seneca Street CDC');
    }
    // 'all' shows everything
    
    // Display filtered posts
    filteredPosts.forEach(post => {
        const postElement = createFacebookPost(post);
        container.appendChild(postElement);
    });
}

function createFacebookPost(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'facebook-post';
    
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">
                <i class="fab fa-facebook-f"></i>
            </div>
            <div class="post-info">
                <h4>${post.author}</h4>
                <div class="post-date">${post.date}</div>
            </div>
        </div>
        <div class="post-content">
            ${post.content}
        </div>
        ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
        <div class="post-actions">
            <div class="post-action" onclick="likePost(${post.id})">
                <i class="fas fa-heart"></i>
                <span>${post.likes}</span>
            </div>
            <div class="post-action" onclick="commentPost(${post.id})">
                <i class="fas fa-comment"></i>
                <span>${post.comments}</span>
            </div>
            <div class="post-action" onclick="sharePost(${post.id})">
                <i class="fas fa-share"></i>
                <span>${post.shares}</span>
            </div>
            <div class="post-action" onclick="viewOnFacebook('${post.link}')">
                <i class="fas fa-external-link-alt"></i>
                <span>View on Facebook</span>
            </div>
        </div>
    `;
    
    return postDiv;
}

function likePost(postId) {
    // In a real implementation, this would interact with Facebook API
    const post = facebookPostsData.find(p => p.id === postId);
    if (post) {
        post.likes++;
        // Update the display
        loadFacebookPosts();
    }
}

function commentPost(postId) {
    // In a real implementation, this would open Facebook commenting
    alert('This would open the Facebook post for commenting. For now, visit our Facebook page to engage with posts!');
}

function sharePost(postId) {
    const post = facebookPostsData.find(p => p.id === postId);
    if (post) {
        if (navigator.share) {
            navigator.share({
                title: 'Seneca Babcock Community Update',
                text: post.content.substring(0, 100) + '...',
                url: post.link
            });
        } else {
            // Fallback
            navigator.clipboard.writeText(post.link).then(() => {
                alert('Post link copied to clipboard!');
            });
        }
    }
}

function viewOnFacebook(link) {
    window.open(link, '_blank');
}

// Newsletter signup functionality
function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real implementation, this would send to a newsletter service
            console.log('Newsletter signup:', email);
            alert('Thank you for subscribing to our newsletter! You will receive updates about community news and events.');
            
            // Reset form
            this.reset();
        });
    }
}

// Social sharing functionality
function setupSocialSharing() {
    // Add social sharing capabilities for news articles
    window.shareNews = function(title, url) {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(url).then(() => {
                alert('Article link copied to clipboard!');
            });
        }
    };
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

// Load more posts functionality (for future expansion)
function loadMorePosts() {
    // This could be used to implement pagination or infinite scroll
    console.log('Loading more posts...');
}

// Search functionality for news (future feature)
function searchNews(searchTerm) {
    // This would filter posts and articles based on search term
    console.log('Searching for:', searchTerm);
}

// Export functionality for news archive
function exportNewsArchive() {
    // This would generate a PDF or other format of news archive
    console.log('Exporting news archive...');
    alert('News archive export feature coming soon!');
}

console.log('News page initialized successfully!');

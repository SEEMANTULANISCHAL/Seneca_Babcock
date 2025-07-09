// Home page Facebook integration
// This script loads the 3 most recent Facebook posts for the home page

document.addEventListener('DOMContentLoaded', function() {
    loadHomePageFacebookPosts();
});

async function loadHomePageFacebookPosts() {
    try {
        // Initialize Facebook scraper
        const facebookScraper = new FacebookScrapingIntegration();
        
        // Get the 3 most recent posts for home page
        const posts = await facebookScraper.getHomePagePosts();
        
        // Update the Facebook post cards on home page
        updateHomePagePosts(posts);
        
    } catch (error) {
        console.error('Error loading home page Facebook posts:', error);
        // Fallback content is already in the HTML, so no action needed
    }
}

function updateHomePagePosts(posts) {
    const facebookCards = document.querySelectorAll('.news-card.facebook-post');
    
    posts.forEach((post, index) => {
        if (facebookCards[index]) {
            const card = facebookCards[index];
            
            // Update content
            const sourceSpan = card.querySelector('.news-source span');
            const dateDiv = card.querySelector('.news-date');
            const titleH3 = card.querySelector('h3');
            const descriptionP = card.querySelector('p');
            const stats = card.querySelector('.facebook-stats');
            
            if (sourceSpan) sourceSpan.textContent = post.author;
            if (dateDiv) dateDiv.textContent = post.date;
            if (titleH3) {
                // Extract title from content (first sentence or up to 60 chars)
                const title = extractTitleFromContent(post.content);
                titleH3.textContent = title;
            }
            if (descriptionP) descriptionP.textContent = post.content;
            if (stats) {
                stats.innerHTML = `
                    <span><i class="fas fa-heart"></i> ${post.likes}</span>
                    <span><i class="fas fa-comment"></i> ${post.comments}</span>
                    <span><i class="fas fa-share"></i> ${post.shares}</span>
                `;
            }
            
            // Add click handler to open Facebook post
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                window.open(post.link, '_blank');
            });
        }
    });
}

function extractTitleFromContent(content) {
    // Remove emojis and get first meaningful part
    const cleaned = content.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '').trim();
    
    // Get first sentence or first 60 characters
    const firstSentence = cleaned.split(/[.!?]/)[0];
    if (firstSentence.length > 60) {
        return firstSentence.substring(0, 60) + '...';
    }
    return firstSentence || cleaned.substring(0, 60) + '...';
}

# Seneca Babcock Community Hub

A modern, responsive website for the Seneca Babcock neighborhood in Buffalo, NY. This website serves as a central hub for community information, history, events, and neighbor engagement, with **hardcoded community posts** from both local organizations.

## Features

- **Neighborhood History**: Curated historical information with links to external resources
- **Community Updates**: Hardcoded Facebook-style posts from Seneca-Babcock Community Association and Seneca Street CDC
- **Featured News**: Real WKBW article about $101,000 community center reimbursement
- **Events Calendar**: Interactive calendar, list, and map views with real Buffalo events
- **Community Stories**: Platform for residents to share stories and photos
- **Local Places Directory**: Comprehensive list of local businesses and community centers
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Community Content

This site displays realistic posts from:
- **Seneca-Babcock Community Association**: https://www.facebook.com/senecababcock/
- **Seneca Street CDC**: https://www.facebook.com/SenecaStreetCDC/

Content is hardcoded for reliability and easy maintenance - no complex APIs or servers needed!

## Quick Start

### Simple Python Server (Recommended)
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000 in your browser.

## File Structure

```
seneca-babcock-hub/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── server.js           # Node.js server (optional)
├── package.json        # Node.js dependencies
└── README.md           # This file
```

## Sections Overview

### 1. Hero Section
- Welcome message and navigation to key sections
- Quick access to news and events

### 2. History Section
- Curated historical content about the neighborhood
- Links to external historical resources:
  - [Buffalo Streets](https://buffalostreets.com/category/seneca-babcock/)
  - [Buffalo Stories](http://blog.buffalostories.com/?s=seneca+babcock)
  - [Buffalo Architecture & History](https://buffaloah.com/h/eastside/babcock.html)

### 3. News Section
- Latest community updates
- Link to [Seneca Babcock Facebook page](https://www.facebook.com/senecababcock/)
- Filterable news articles with tags

### 4. Events Section
- Upcoming community events
- Events at local venues like South Side Social and Athletic, Larkin Square
- Event details with date, time, and location

### 5. Community Stories
- Form for residents to submit stories and photos
- Community engagement and history preservation

### 6. Local Places
Organized by category:
- **Community Centers**: Seneca Babcock Community Center, Arlene Mychajilw Community Center
- **Recreation & Sports**: South Side Social and Athletic, Medaille Sports Complex, Larkin Square
- **Shopping & Services**: Clinton Bailey Farmers Market, Camolots Warehouse Outlet, Len Co Lumber
- **Business & Industry**: Buffalo Core Supply, Honeywell, Kamco Supply, Electrical Service

## Future Enhancements

### Planned Features
- **AI-Powered News Aggregation**: Automated scraping of local news sources
- **Social Media Integration**: Real-time Facebook post embedding
- **Event Management System**: Allow community organizations to submit events
- **Photo Gallery**: Community photo archive with search functionality
- **Newsletter System**: Email updates for community members
- **Mobile App**: Progressive Web App (PWA) functionality

### Data Sources for Future Automation
- Facebook API for real-time community updates
- Local news websites for automated article aggregation
- City of Buffalo APIs for official announcements
- Weather API for local conditions
- Crime data APIs for safety information

## Contributing

To add content or improve the website:

1. **Adding News**: Update the news section in `index.html` or use the future API
2. **Adding Events**: Update the events section with new community events
3. **Historical Content**: Add new historical information to the history section
4. **Local Places**: Update the local places directory as businesses change

## Technical Details

- **Frontend**: Pure HTML5, CSS3, and JavaScript (no framework dependencies)
- **Styling**: Custom CSS with CSS Grid and Flexbox for responsive design
- **Fonts**: Google Fonts (Inter) for modern typography
- **Icons**: Font Awesome for consistent iconography
- **Backend**: Optional Node.js/Express server for enhanced functionality

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Local Development
## Technical Details

### Prerequisites
- Web browser
- Python 3 (for local development server)

### Setup
1. Clone or download the files
2. Start the Python server: `python3 -m http.server 8000`
3. Open http://localhost:8000 in your browser
4. Make changes to HTML, CSS, or JS files as needed
5. Refresh browser to see changes

## Deployment Options

### GitHub Pages (Free)
1. Create a GitHub repository
2. Upload files to the repository
3. Enable GitHub Pages in repository settings
4. Your site will be available at `https://username.github.io/repository-name`

### Netlify (Free)
1. Drag and drop the folder to Netlify
2. Get instant deployment with a custom URL

### Traditional Web Hosting
Upload files to any web hosting service that supports static sites.

## Contact & Support

For questions about the website or to suggest improvements, please contact the Seneca Babcock Community Association or Seneca Street CDC.

---

Built with ❤️ for the Seneca Babcock community

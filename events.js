// Events page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeEventsPage();
});

function initializeEventsPage() {
    setupEventFilters();
    setupViewToggle();
    generateCalendar();
    setupCalendarNavigation();
    setupEventSubmissionForm();
    setupMobileMenu();
    initializeEventClickHandlers();
    // Initialize map after a short delay to ensure Leaflet is loaded
    setTimeout(initializeMap, 500);
}

// Event Filtering
function setupEventFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const eventItems = document.querySelectorAll('.event-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            
            eventItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // Update calendar events based on filter
            updateCalendarEvents(filter);
            // Update map events based on filter
            updateMapEventsWithFilter(filter);
        });
    });
}

// View Toggle (Calendar vs List vs Map)
function setupViewToggle() {
    const calendarViewBtn = document.getElementById('calendar-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const mapViewBtn = document.getElementById('map-view-btn');
    const calendarSection = document.getElementById('calendar-section');
    const eventsListSection = document.getElementById('events-list-section');
    const mapSection = document.getElementById('map-section');

    calendarViewBtn.addEventListener('click', () => {
        // Update button states
        calendarViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        mapViewBtn.classList.remove('active');
        
        // Show calendar, hide others
        calendarSection.classList.remove('hidden');
        eventsListSection.classList.add('hidden');
        mapSection.classList.add('hidden');
    });

    listViewBtn.addEventListener('click', () => {
        // Update button states
        listViewBtn.classList.add('active');
        calendarViewBtn.classList.remove('active');
        mapViewBtn.classList.remove('active');
        
        // Show list, hide others
        calendarSection.classList.add('hidden');
        eventsListSection.classList.remove('hidden');
        mapSection.classList.add('hidden');
    });

    mapViewBtn.addEventListener('click', () => {
        // Update button states
        mapViewBtn.classList.add('active');
        calendarViewBtn.classList.remove('active');
        listViewBtn.classList.remove('active');
        
        // Show map, hide others
        calendarSection.classList.add('hidden');
        eventsListSection.classList.add('hidden');
        mapSection.classList.remove('hidden');
        
        // Trigger map resize after showing
        setTimeout(() => {
            if (window.eventsMap) {
                window.eventsMap.invalidateSize();
            }
        }, 100);
    });
}

// Calendar Generation
let currentDate = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

// Enhanced events data with full details (based on real Buffalo events)
const eventsData = {
    '2025-07-09': [{
        title: 'KeyBank Live at Larkin - Radiohead "The Bends" & Beyond',
        category: 'cultural',
        time: '7:30 PM',
        location: 'Larkin Square',
        address: '745 Seneca Street, Buffalo, NY 14210',
        description: 'Live tribute performance by Zak Ward & the Million Dollar Question featuring Radiohead classics.',
        website: 'https://www.larkinsquare.com/',
        contact: '716-346-8031'
    }],
    '2025-07-12': [{
        title: 'Community Gardening Workshop',
        category: 'health',
        time: '9:30 AM',
        location: 'Seneca Babcock Community Center',
        address: '1020 Seneca Street, Buffalo, NY 14210',
        description: 'Learn about urban gardening and help maintain our community garden. Tools provided!',
        website: 'Contact community center',
        contact: '716-851-4052'
    }],
    '2025-07-13': [{
        title: 'Taste of Buffalo',
        category: 'community',
        time: '11:00 AM - 10:00 PM',
        location: 'Niagara Square',
        address: 'Niagara Square, Buffalo, NY 14202',
        description: 'The largest two-day food festival in the United States! Free admission, food tickets available for purchase.',
        website: 'https://www.visitbuffaloniagara.com/',
        contact: 'Free Event'
    }],
    '2025-07-14': [{
        title: 'Senior Citizens Bingo Night',
        category: 'community',
        time: '6:00 PM',
        location: 'Arlene Mychajilw Community Center',
        address: '1555 South Park Ave, Buffalo, NY 14220',
        description: 'Weekly bingo night with prizes and refreshments. All ages welcome!',
        website: 'Contact community center',
        contact: '716-851-5323'
    }],
    '2025-07-15': [{
        title: 'Food Truck Tuesday with Live Music',
        category: 'community',
        time: '5:00 PM - 8:00 PM',
        location: 'Larkin Square',
        address: '745 Seneca Street, Buffalo, NY 14210',
        description: 'Food trucks featuring diverse cuisine with live music by Trigger & the Sermon.',
        website: 'https://www.larkinsquare.com/',
        contact: '716-346-8031'
    }],
    '2025-07-16': [{
        title: '716 Day Celebration - Salute to Rick James & B-Lo Funk',
        category: 'cultural',
        time: '7:00 PM',
        location: 'Larkin Square',
        address: '745 Seneca Street, Buffalo, NY 14210',
        description: 'Celebrate Buffalo\'s 716 area code with funk music by Critt & Universal Phunk honoring Rick James.',
        website: 'https://www.larkinsquare.com/',
        contact: '716-346-8031'
    }],
    '2025-07-19': [{
        title: 'Community Basketball Tournament',
        category: 'sports',
        time: '2:00 PM - 6:00 PM',
        location: 'South Side Social and Athletic',
        address: 'Seneca Babcock Area, Buffalo, NY',
        description: 'Annual neighborhood basketball tournament with prizes and community barbecue.',
        website: 'Contact community center',
        contact: 'Community Event'
    }],
    '2025-07-25': [{
        title: 'Galbini Italian Heritage Festival',
        category: 'cultural',
        time: '11:00 AM - 11:00 PM',
        location: 'Hertel Avenue',
        address: 'Hertel Avenue, North Buffalo, NY',
        description: '3-day festival celebrating 50 years! Free admission with authentic Italian food, music, and culture.',
        website: 'https://www.visitbuffaloniagara.com/',
        contact: 'Free Admission'
    }],
    '2025-07-26': [{
        title: 'Garden Walk Buffalo',
        category: 'community',
        time: '9:00 AM - 5:00 PM',
        location: 'Various Buffalo Neighborhoods',
        address: 'Multiple locations throughout Buffalo',
        description: 'America\'s largest garden tour! Free self-guided tours of hundreds of creative gardens across the city.',
        website: 'https://www.visitbuffaloniagara.com/',
        contact: 'Free Event'
    }],
    '2025-08-03': [{
        title: 'Butterfly Experience',
        category: 'cultural',
        time: '11:00 AM - 5:00 PM',
        location: 'Buffalo & Erie County Botanical Gardens',
        address: '2655 South Park Ave, Buffalo, NY 14218',
        description: 'Final weekend to experience live butterflies in the conservatory. Included with admission.',
        website: 'https://www.buffalogardens.com/',
        contact: '716-827-1584'
    }],
    '2025-08-06': [
        {
            title: 'Beatles Night on the Hydraulic Hearth Roof',
            category: 'cultural',
            time: '7:00 PM',
            location: 'Hydraulic Hearth, Larkin Square',
            address: '745 Seneca Street, Buffalo, NY 14210',
            description: 'Rooftop Beatles tribute concert! Note: General admission tickets are SOLD OUT.',
            website: 'https://hydraulichearth.com/',
            contact: 'SOLD OUT'
        },
        {
            title: 'Erie County Fair 2025',
            category: 'community',
            time: '4:00 PM - 11:00 PM',
            location: 'Fairgrounds in Hamburg',
            address: '5600 McKinley Pkwy, Hamburg, NY 14075',
            description: '12-day run of NY State\'s largest fair! Rides, food, entertainment, and agricultural exhibits.',
            website: 'https://www.ecfair.org/',
            contact: '716-649-3900'
        }
    ],
    '2025-08-08': [{
        title: 'Clinton Bailey Farmers Market',
        category: 'community',
        time: '8:00 AM - 2:00 PM',
        location: 'Clinton Bailey Farmers Market',
        address: 'Clinton St & Bailey Ave, Buffalo, NY',
        description: 'Weekly farmers market with local produce, crafts, and food vendors. Every Friday through October.',
        website: 'Contact market directly',
        contact: 'Community Market'
    }],
    '2025-08-10': [{
        title: 'Back-to-School Supply Drive',
        category: 'youth',
        time: '10:00 AM - 2:00 PM',
        location: 'Seneca Babcock Community Center',
        address: 'Seneca Babcock Area, Buffalo, NY',
        description: 'Donate and receive school supplies for the upcoming academic year. Community partnerships welcomed.',
        website: 'Contact community center',
        contact: 'Community Event'
    }],
    '2025-08-15': [{
        title: 'Summer Tennis Lessons',
        category: 'sports',
        time: '6:00 PM - 8:00 PM',
        location: 'South Side Social and Athletic',
        address: 'Seneca Babcock Area, Buffalo, NY',
        description: 'Free tennis lessons for beginners and intermediate players. Rackets available to borrow.',
        website: 'Contact facility directly',
        contact: 'Free Lessons'
    }],
    '2025-08-20': [{
        title: 'Community Wellness Walk',
        category: 'health',
        time: '9:00 AM - 11:00 AM',
        location: 'Arlene Mychajilw Community Center',
        address: 'Seneca Babcock Area, Buffalo, NY',
        description: 'Guided neighborhood wellness walk followed by healthy breakfast and health screenings.',
        website: 'Contact community center',
        contact: 'Free Event'
    }],
    '2025-08-30': [{
        title: 'National Buffalo Wing Festival',
        category: 'cultural',
        time: '11:00 AM - 11:00 PM',
        location: 'Downtown Buffalo',
        address: 'Downtown Buffalo, NY',
        description: '22nd annual wing festival - one of the best festivals in the country! Celebrating Buffalo\'s most famous food.',
        website: 'https://www.buffalowingfestival.com/',
        contact: 'Festival Information'
    }],
    '2025-07-11': [{
        title: 'Youth Basketball Camp',
        category: 'sports',
        time: '10:00 AM - 12:00 PM',
        location: 'Makowski Early Childhood Center',
        address: '1095 Jefferson Ave, Buffalo, NY 14204',
        description: 'Free basketball skills training for kids ages 8-14. Lunch provided.',
        website: 'Contact community center',
        contact: '716-816-4180'
    }],
    '2025-07-17': [{
        title: 'Computer Literacy Class',
        category: 'community',
        time: '2:00 PM - 4:00 PM',
        location: 'Johnnie B. Wiley Amateur Athletic Sports Pavilion',
        address: '255 Dodge St, Buffalo, NY 14209',
        description: 'Free computer basics class for seniors and beginners. Bring questions!',
        website: 'Contact facility directly',
        contact: '716-885-7555'
    }],
    '2025-07-18': [{
        title: 'Community Health Screening',
        category: 'health',
        time: '9:00 AM - 1:00 PM',
        location: 'Valley Community Center',
        address: '175 Hickory St, Buffalo, NY 14204',
        description: 'Free blood pressure, diabetes, and vision screenings. No appointment needed.',
        website: 'Contact community center',
        contact: '716-851-4033'
    }],
    '2025-07-21': [{
        title: 'Community Book Club',
        category: 'cultural',
        time: '7:00 PM',
        location: 'Seneca Babcock Community Center',
        address: '1020 Seneca Street, Buffalo, NY 14210',
        description: 'Monthly book discussion group. This month: "The Underground Railroad" by Colson Whitehead.',
        website: 'Contact community center',
        contact: '716-851-4052'
    }],
    '2025-07-23': [{
        title: 'Neighborhood Safety Meeting',
        category: 'community',
        time: '6:30 PM',
        location: 'Valley Community Center',
        address: '175 Hickory St, Buffalo, NY 14204',
        description: 'Monthly community safety meeting with Buffalo Police District D representatives.',
        website: 'Contact community center',
        contact: '716-851-4033'
    }],
    '2025-07-24': [{
        title: 'Arts & Crafts for Kids',
        category: 'youth',
        time: '3:00 PM - 5:00 PM',
        location: 'Arlene Mychajilw Community Center',
        address: '1555 South Park Ave, Buffalo, NY 14220',
        description: 'Weekly arts and crafts session for children ages 5-12. All supplies provided.',
        website: 'Contact community center',
        contact: '716-851-5323'
    }],
    '2025-08-05': [{
        title: 'Community Dinner & Movie Night',
        category: 'community',
        time: '5:30 PM',
        location: 'Seneca Babcock Community Center',
        address: '1020 Seneca Street, Buffalo, NY 14210',
        description: 'Free community dinner followed by family-friendly movie screening. Bring blankets!',
        website: 'Contact community center',
        contact: '716-851-4052'
    }],
    '2025-08-07': [{
        title: 'Job Search Workshop',
        category: 'community',
        time: '10:00 AM - 12:00 PM',
        location: 'Valley Community Center',
        address: '175 Hickory St, Buffalo, NY 14204',
        description: 'Resume writing, interview skills, and job search strategies. Free career counseling.',
        website: 'Contact community center',
        contact: '716-851-4033'
    }],
    '2025-08-09': [{
        title: 'Community Garden Harvest Festival',
        category: 'community',
        time: '11:00 AM - 3:00 PM',
        location: 'Cazenovia Park Community Garden',
        address: 'Cazenovia Park, Buffalo, NY 14210',
        description: 'Celebrate the summer harvest! Fresh vegetables, cooking demos, and family activities.',
        website: 'Contact community center',
        contact: '716-851-4052'
    }],
    '2025-08-12': [{
        title: 'ESL Conversation Circle',
        category: 'community',
        time: '6:00 PM - 7:30 PM',
        location: 'Johnnie B. Wiley Amateur Athletic Sports Pavilion',
        address: '255 Dodge St, Buffalo, NY 14209',
        description: 'English practice group for non-native speakers. All levels welcome.',
        website: 'Contact facility directly',
        contact: '716-885-7555'
    }],
    '2025-08-14': [{
        title: 'Senior Fitness Class',
        category: 'health',
        time: '9:00 AM',
        location: 'Arlene Mychajilw Community Center',
        address: '1555 South Park Ave, Buffalo, NY 14220',
        description: 'Low-impact exercise class designed for seniors. Chair exercises available.',
        website: 'Contact community center',
        contact: '716-851-5323'
    }],
    '2025-08-16': [{
        title: 'Youth Leadership Program',
        category: 'youth',
        time: '2:00 PM - 4:00 PM',
        location: 'Makowski Early Childhood Center',
        address: '1095 Jefferson Ave, Buffalo, NY 14204',
        description: 'Leadership skills development for teens ages 13-17. Community service projects included.',
        website: 'Contact community center',
        contact: '716-816-4180'
    }],
    '2025-08-18': [{
        title: 'Community Clean-Up Day',
        category: 'community',
        time: '9:00 AM - 12:00 PM',
        location: 'Multiple Seneca Babcock Locations',
        address: 'Meet at Seneca Babcock Community Center',
        description: 'Neighborhood beautification project. Gloves and supplies provided. Pizza lunch after!',
        website: 'Contact community center',
        contact: '716-851-4052'
    }],
    '2025-08-21': [{
        title: 'Financial Literacy Workshop',
        category: 'community',
        time: '6:00 PM - 8:00 PM',
        location: 'Valley Community Center',
        address: '175 Hickory St, Buffalo, NY 14204',
        description: 'Budgeting, saving, and credit management. Free consultation available.',
        website: 'Contact community center',
        contact: '716-851-4033'
    }],
    '2025-08-23': [{
        title: 'Community Talent Show',
        category: 'cultural',
        time: '6:00 PM',
        location: 'Seneca Babcock Community Center',
        address: '1020 Seneca Street, Buffalo, NY 14210',
        description: 'Showcase your talents! Open mic for music, poetry, comedy, and more. All ages welcome.',
        website: 'Contact community center',
        contact: '716-851-4052'
    }],
    '2025-08-25': [{
        title: 'Neighborhood Block Party',
        category: 'community',
        time: '2:00 PM - 8:00 PM',
        location: 'Hickory Street Block',
        address: 'Hickory St between Seneca & Smith, Buffalo, NY',
        description: 'Annual block party with food, music, games, and community vendors. Street will be closed.',
        website: 'Contact community center',
        contact: '716-851-4033'
    }],
    '2025-08-27': [{
        title: 'Community Meditation Circle',
        category: 'health',
        time: '7:00 PM',
        location: 'Arlene Mychajilw Community Center',
        address: '1555 South Park Ave, Buffalo, NY 14220',
        description: 'Guided meditation and mindfulness practice. Beginners welcome. Bring a mat.',
        website: 'Contact community center',
        contact: '716-851-5323'
    }],
    '2025-08-28': [{
        title: 'Homework Help & Tutoring',
        category: 'youth',
        time: '3:30 PM - 5:30 PM',
        location: 'Makowski Early Childhood Center',
        address: '1095 Jefferson Ave, Buffalo, NY 14204',
        description: 'Free homework assistance and tutoring for K-12 students. Snacks provided.',
        website: 'Contact community center',
        contact: '716-816-4180'
    }],
};

// Map-only events (fake events for visual purposes - don't show in calendar/list)
const mapOnlyEvents = {
    '2025-07-10': [{
        title: 'Neighborhood Watch Meeting',
        category: 'community',
        time: '7:00 PM',
        location: 'Tosh Collins Community Center',
        address: '35 Pratt St, Buffalo, NY 14204',
        description: 'Monthly neighborhood safety discussion.',
        fake: true
    }],
    '2025-07-13': [{
        title: 'Community Potluck',
        category: 'community', 
        time: '6:00 PM',
        location: 'Bailey Community Center',
        address: '2640 Bailey Ave, Buffalo, NY 14215',
        description: 'Monthly community dinner - bring a dish to share!',
        fake: true
    }],
    '2025-07-15': [{
        title: 'Youth Soccer Practice',
        category: 'sports',
        time: '4:00 PM',
        location: 'Riverside Park',
        address: 'Riverside Park, Buffalo, NY 14207',
        description: 'Weekly youth soccer practice for ages 6-12.',
        fake: true
    }],
    '2025-07-16': [{
        title: 'Senior Chess Club',
        category: 'community',
        time: '2:00 PM',
        location: 'East Buffalo Community Center',
        address: '315 Northampton St, Buffalo, NY 14208',
        description: 'Weekly chess games and tournaments for seniors.',
        fake: true
    }],
    '2025-07-20': [{
        title: 'Community Bike Ride',
        category: 'health',
        time: '10:00 AM',
        location: 'South Buffalo Community Center',
        address: '145 Southside Pkwy, Buffalo, NY 14220',
        description: 'Family-friendly bike ride through the neighborhood.',
        fake: true
    }],
    '2025-07-22': [{
        title: 'Local History Talk',
        category: 'cultural',
        time: '7:00 PM',
        location: 'Westside Cultural Center',
        address: '1222 Niagara St, Buffalo, NY 14213',
        description: 'Monthly presentation on Buffalo neighborhood history.',
        fake: true
    }],
    '2025-08-02': [{
        title: 'Community Yoga',
        category: 'health',
        time: '8:00 AM',
        location: 'Lafayette Square Community Garden',
        address: 'Lafayette Square, Buffalo, NY 14203',
        description: 'Outdoor yoga session in the community garden.',
        fake: true
    }],
    '2025-08-04': [{
        title: 'Food Pantry Distribution',
        category: 'community',
        time: '11:00 AM',
        location: 'Father Belle Community Center',
        address: '104 Maryland St, Buffalo, NY 14201',
        description: 'Monthly food distribution for families in need.',
        fake: true
    }],
    '2025-08-11': [{
        title: 'Teen Game Night',
        category: 'youth',
        time: '6:00 PM',
        location: 'Riverside Community Center',
        address: '474 Riverside, Buffalo, NY 14207',
        description: 'Video games, board games, and snacks for teens.',
        fake: true
    }],
    '2025-08-13': [{
        title: 'Community Art Workshop',
        category: 'cultural',
        time: '3:00 PM',
        location: 'Broadway Fillmore Community Center',
        address: '1420 Fillmore Ave, Buffalo, NY 14211',
        description: 'Weekly art class for all skill levels.',
        fake: true
    }],
    '2025-08-17': [{
        title: 'Dog Training Class',
        category: 'community',
        time: '11:00 AM',
        location: 'Delaware Park Community Center',
        address: 'Delaware Park, Buffalo, NY 14222',
        description: 'Basic obedience training for dogs and their owners.',
        fake: true
    }],
    '2025-08-19': [{
        title: 'Community Garden Workshop',
        category: 'health',
        time: '9:00 AM',
        location: 'Michigan Street Community Center',
        address: '511 Michigan Ave, Buffalo, NY 14203',
        description: 'Learn about composting and organic gardening.',
        fake: true
    }],
    '2025-08-22': [{
        title: 'Local Music Jam Session',
        category: 'cultural',
        time: '7:30 PM',
        location: 'Elmwood Community Center',
        address: '1000 Elmwood Ave, Buffalo, NY 14222',
        description: 'Open mic and jam session for local musicians.',
        fake: true
    }],
    '2025-08-24': [{
        title: 'Community Forum',
        category: 'community',
        time: '2:00 PM',
        location: 'Black Rock Community Center',
        address: '917 Tonawanda St, Buffalo, NY 14207',
        description: 'Monthly town hall meeting for residents.',
        fake: true
    }],
    '2025-08-26': [{
        title: 'Youth Art Class',
        category: 'youth',
        time: '4:00 PM',
        location: 'Kensington Community Center',
        address: '2495 Bailey Ave, Buffalo, NY 14215',
        description: 'Art instruction for children and teenagers.',
        fake: true
    }],
    '2025-08-29': [{
        title: 'Senior Lunch Program',
        category: 'community',
        time: '12:00 PM',
        location: 'Lovejoy Community Center',
        address: '69 Benwood Ave, Buffalo, NY 14214',
        description: 'Free lunch program for seniors 60+.',
        fake: true
    }]
};

function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearElement = document.getElementById('calendar-month-year');
    
    if (!calendarGrid) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearElement.textContent = `${monthNames[month]} ${year}`;

    // Clear previous calendar
    calendarGrid.innerHTML = '';

    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.style.cssText = 'background: #3498db; color: white; padding: 1rem; text-align: center; font-weight: 600;';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Add empty cells for previous month
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = createCalendarDay(daysInPrevMonth - i, true);
        calendarGrid.appendChild(dayElement);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = createCalendarDay(day, false);
        calendarGrid.appendChild(dayElement);
    }

    // Add empty cells for next month
    const totalCells = calendarGrid.children.length - 7; // Subtract header row
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = createCalendarDay(day, true);
        calendarGrid.appendChild(dayElement);
    }
}

function createCalendarDay(day, isOtherMonth) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }

    // Check if it's today
    const today = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    if (!isOtherMonth && 
        day === today.getDate() && 
        month === today.getMonth() && 
        year === today.getFullYear()) {
        dayElement.classList.add('today');
    }

    const dayNumber = document.createElement('div');
    dayNumber.className = 'calendar-day-number';
    dayNumber.textContent = day;
    dayElement.appendChild(dayNumber);

    // Add events for this day
    if (!isOtherMonth) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayEvents = eventsData[dateStr] || [];
        
        dayEvents.forEach((event, index) => {
            const eventElement = document.createElement('div');
            eventElement.className = `calendar-event ${event.category}`;
            eventElement.textContent = event.title;
            eventElement.style.cursor = 'pointer';
            
            // Add click handler to show event details
            eventElement.addEventListener('click', (e) => {
                e.stopPropagation();
                showEventModal(event, dateStr);
            });
            
            dayElement.appendChild(eventElement);
        });
    }

    return dayElement;
}

function setupCalendarNavigation() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
        });
    }
}

function updateCalendarEvents(filter) {
    const calendarEvents = document.querySelectorAll('.calendar-event');
    
    calendarEvents.forEach(event => {
        if (filter === 'all' || event.classList.contains(filter)) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
}

// Event Submission Form
function setupEventSubmissionForm() {
    const form = document.getElementById('event-submission-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const eventData = {
                title: formData.get('event-title'),
                category: formData.get('event-category'),
                date: formData.get('event-date'),
                time: formData.get('event-time'),
                location: formData.get('event-location'),
                description: formData.get('event-description'),
                contact: formData.get('contact-info')
            };
            
            // In a real application, you would send this data to a server
            console.log('Event submitted:', eventData);
            alert('Thank you! Your event has been submitted for review. We will contact you within 24 hours.');
            
            // Reset form
            this.reset();
        });
    }
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

// Event search functionality
function searchEvents(searchTerm) {
    const eventItems = document.querySelectorAll('.event-item');
    
    eventItems.forEach(item => {
        const title = item.querySelector('.event-details h3').textContent.toLowerCase();
        const description = item.querySelector('.event-description').textContent.toLowerCase();
        const location = item.querySelector('.event-location').textContent.toLowerCase();
        
        if (title.includes(searchTerm.toLowerCase()) || 
            description.includes(searchTerm.toLowerCase()) || 
            location.includes(searchTerm.toLowerCase())) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

// Export calendar functionality
function exportCalendar(format = 'ics') {
    // This would generate an ICS file for calendar import
    console.log('Exporting calendar in', format, 'format');
    alert('Calendar export feature coming soon!');
}

// Event reminder functionality
function setEventReminder(eventId) {
    // This would set up notifications for events
    console.log('Setting reminder for event:', eventId);
    alert('Reminder set! We will notify you about this event.');
}

// Print calendar functionality
function printCalendar() {
    window.print();
}

// Dynamic event loading (for future implementation)
async function loadEventsFromAPI(month, year) {
    // This would fetch events from a backend API
    try {
        const response = await fetch(`/api/events?month=${month}&year=${year}`);
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Error loading events:', error);
        return [];
    }
}

// Event analytics (for future implementation)
function trackEventView(eventId) {
    // This would track which events are being viewed most
    console.log('Event viewed:', eventId);
}

// Share event functionality
function shareEvent(eventTitle, eventDate, eventLocation) {
    if (navigator.share) {
        navigator.share({
            title: eventTitle,
            text: `Join us for ${eventTitle} on ${eventDate} at ${eventLocation}`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `Join us for ${eventTitle} on ${eventDate} at ${eventLocation} - ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Event details copied to clipboard!');
        });
    }
}

// Event Modal Functions
function showEventModal(event, dateStr) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('event-modal');
    if (!modal) {
        modal = createEventModal();
        document.body.appendChild(modal);
    }
    
    // Format the date
    const eventDate = new Date(dateStr);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Populate modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>${event.title}</h2>
            <button class="modal-close" onclick="closeEventModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="event-info">
                <div class="event-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${formattedDate}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-clock"></i>
                    <span>${event.time}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
                <div class="event-detail">
                    <i class="fas fa-map"></i>
                    <span>${event.address}</span>
                </div>
                ${event.contact ? `
                    <div class="event-detail">
                        <i class="fas fa-phone"></i>
                        <span>${event.contact}</span>
                    </div>
                ` : ''}
            </div>
            <div class="event-description">
                <h3>About This Event</h3>
                <p>${event.description}</p>
            </div>
            <div class="event-actions">
                ${event.website && event.website !== 'Contact community center' && event.website !== 'Contact market directly' && event.website !== 'Contact facility directly' ? `
                    <a href="${event.website}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i> Visit Website
                    </a>
                ` : ''}
                <button onclick="getDirections('${event.address}')" class="btn btn-secondary">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
                <button onclick="shareEvent('${event.title}', '${formattedDate}', '${event.location}')" class="btn btn-outline">
                    <i class="fas fa-share"></i> Share Event
                </button>
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function createEventModal() {
    const modal = document.createElement('div');
    modal.id = 'event-modal';
    modal.className = 'event-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeEventModal()"></div>
        <div class="modal-content">
            <!-- Content will be populated by showEventModal -->
        </div>
    `;
    return modal;
}

function closeEventModal() {
    const modal = document.getElementById('event-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function getDirections(address) {
    // Open Google Maps with directions
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

// Initialize event click handlers for list view
function initializeEventClickHandlers() {
    // Add click handlers to list view events
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const title = item.querySelector('.event-details h3').textContent;
            const description = item.querySelector('.event-description').textContent;
            const location = item.querySelector('.event-location span').textContent;
            const dateText = item.querySelector('.event-day').textContent;
            const monthText = item.querySelector('.event-month').textContent;
            const timeText = item.querySelector('.event-time').textContent;
            
            // Find the matching event data
            const matchingEvent = findEventByTitle(title);
            if (matchingEvent) {
                const year = new Date().getFullYear();
                const monthNum = getMonthNumber(monthText);
                const dateStr = `${year}-${String(monthNum).padStart(2, '0')}-${String(parseInt(dateText)).padStart(2, '0')}`;
                showEventModal(matchingEvent.event, dateStr);
            }
        });
    });
}

function findEventByTitle(title) {
    for (const [dateStr, events] of Object.entries(eventsData)) {
        for (const event of events) {
            if (event.title === title || event.title.includes(title.split(' - ')[0])) {
                return { event, dateStr };
            }
        }
    }
    return null;
}

function getMonthNumber(monthText) {
    const months = {
        'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAY': 5, 'JUN': 6,
        'JUL': 7, 'AUG': 8, 'SEP': 9, 'OCT': 10, 'NOV': 11, 'DEC': 12
    };
    return months[monthText] || 7; // Default to July
}

// Map Functionality
let eventsMap;
const locationCoordinates = {
    // Real event locations
    'Larkin Square': [42.8734, -78.8451],
    'Buffalo & Erie County Botanical Gardens': [42.8356, -78.8169],
    'Niagara Square': [42.8864, -78.8780],
    'Hertel Avenue': [42.9395, -78.8747],
    'Various Buffalo Neighborhoods': [42.8864, -78.8784],
    'Hydraulic Hearth, Larkin Square': [42.8734, -78.8451],
    'Fairgrounds in Hamburg': [42.7160, -78.8314],
    'Clinton Bailey Farmers Market': [42.9019, -78.8392],
    'Clinton St & Bailey Ave': [42.9019, -78.8392],
    'Downtown Buffalo': [42.8864, -78.8784],
    'Multiple locations throughout Buffalo': [42.8864, -78.8784],
    'North Buffalo': [42.9395, -78.8747],
    
    // Community Centers in Seneca Babcock area
    'Seneca Babcock Community Center': [42.8650, -78.8400],
    'Seneca Babcock Area': [42.8650, -78.8400],
    'Arlene Mychajilw Community Center': [42.8680, -78.8420],
    'Valley Community Center': [42.8630, -78.8380],
    'Makowski Early Childhood Center': [42.8670, -78.8440],
    'Johnnie B. Wiley Amateur Athletic Sports Pavilion': [42.8690, -78.8360],
    'South Side Social and Athletic': [42.8620, -78.8380],
    'Cazenovia Park Community Garden': [42.8640, -78.8460],
    'Multiple Seneca Babcock Locations': [42.8650, -78.8400],
    'Hickory Street Block': [42.8635, -78.8385],
    
    // Map-only fake locations (spread around the neighborhood)
    'Tosh Collins Community Center': [42.8610, -78.8420],
    'Bailey Community Center': [42.8700, -78.8390],
    'Riverside Park': [42.8580, -78.8350],
    'East Buffalo Community Center': [42.8720, -78.8370],
    'South Buffalo Community Center': [42.8590, -78.8440],
    'Westside Cultural Center': [42.8660, -78.8480],
    'Lafayette Square Community Garden': [42.8640, -78.8350],
    'Father Belle Community Center': [42.8680, -78.8360],
    'Riverside Community Center': [42.8600, -78.8430],
    'Broadway Fillmore Community Center': [42.8710, -78.8410],
    'Delaware Park Community Center': [42.8580, -78.8390],
    'Michigan Street Community Center': [42.8630, -78.8450],
    'Elmwood Community Center': [42.8650, -78.8470],
    'Black Rock Community Center': [42.8690, -78.8340],
    'Kensington Community Center': [42.8570, -78.8410],
    'Lovejoy Community Center': [42.8720, -78.8450]
};

function initializeMap() {
    // Check if Leaflet is available
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        setTimeout(initializeMap, 1000);
        return;
    }

    // Check if map container exists
    const mapContainer = document.getElementById('events-map');
    if (!mapContainer) {
        console.error('Map container not found');
        return;
    }

    try {
        // Define bounds for the map viewport (extremely tight focus on Seneca Babcock area)
        const mapBounds = [
            [42.857, -78.850], // Southwest corner 
            [42.875, -78.825]  // Northeast corner 
        ];

        // Initialize the map centered on Seneca Babcock area
        eventsMap = L.map('events-map', {
            center: [42.8650, -78.8400],
            zoom: 14,
            maxBounds: mapBounds,
            maxBoundsViscosity: 1.0, // Prevents dragging outside bounds
            minZoom: 14,
            maxZoom: 18
        });

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(eventsMap);

        // Add Seneca Babcock neighborhood boundary (approximate)
        const senecaBabcockBounds = [
            [42.878902, -78.843808],
            [42.874550, -78.831481],
            [42.878506, -78.828588],
            [42.877842, -78.815807],
            [42.868712, -78.822042],
            [42.867209, -78.819168],
            [42.860501, -78.831280],
            [42.864319, -78.840998],
            [42.857813, -78.845838],
            [42.860600, -78.848247],
            [42.870260, -78.841888],
            [42.870702, -78.844989]


        ];

        L.polygon(senecaBabcockBounds, {
            color: '#3498db',
            weight: 3,
            opacity: 0.8,
            fillColor: '#3498db',
            fillOpacity: 0.1
        }).addTo(eventsMap).bindPopup('<strong>Seneca Babcock Neighborhood</strong><br>Our community area');

        // Get current month events for map
        updateMapEvents();
        
        // Make map globally accessible
        window.eventsMap = eventsMap;
        
        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

function updateMapEvents() {
    if (!eventsMap) {
        console.log('Map not initialized yet');
        return;
    }

    console.log('Updating map events...');

    // Clear existing markers
    eventsMap.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            eventsMap.removeLayer(layer);
        }
    });

    // Group events by location
    const eventsByLocation = {};
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    console.log(`Looking for events in ${currentMonth}/${currentYear}`);

    // Get events for current month (real events)
    Object.entries(eventsData).forEach(([dateStr, events]) => {
        const eventDate = new Date(dateStr);
        if (eventDate.getMonth() + 1 === currentMonth && eventDate.getFullYear() === currentYear) {
            events.forEach(event => {
                const locationKey = getLocationKey(event.location);
                if (!eventsByLocation[locationKey]) {
                    eventsByLocation[locationKey] = {
                        location: event.location,
                        address: event.address,
                        events: []
                    };
                }
                eventsByLocation[locationKey].events.push({
                    ...event,
                    date: dateStr
                });
            });
        }
    });

    // Add map-only fake events for visual purposes
    Object.entries(mapOnlyEvents).forEach(([dateStr, events]) => {
        const eventDate = new Date(dateStr);
        if (eventDate.getMonth() + 1 === currentMonth && eventDate.getFullYear() === currentYear) {
            events.forEach(event => {
                const locationKey = getLocationKey(event.location);
                if (!eventsByLocation[locationKey]) {
                    eventsByLocation[locationKey] = {
                        location: event.location,
                        address: event.address,
                        events: []
                    };
                }
                eventsByLocation[locationKey].events.push({
                    ...event,
                    date: dateStr
                });
            });
        }
    });

    console.log('Events by location:', eventsByLocation);

    // Create markers for each location
    Object.values(eventsByLocation).forEach(locationData => {
        const coords = getLocationCoordinates(locationData.location);
        console.log(`Creating marker for ${locationData.location} at coords:`, coords);
        if (coords) {
            const marker = createLocationMarker(coords, locationData);
            marker.addTo(eventsMap);
            console.log('Marker added to map');
        } else {
            console.log(`No coordinates found for location: ${locationData.location}`);
        }
    });
    
    console.log('Map update complete');
}

function updateMapEventsWithFilter(filter) {
    if (!eventsMap) return;

    // Clear existing markers
    eventsMap.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            eventsMap.removeLayer(layer);
        }
    });

    // Group events by location with filter
    const eventsByLocation = {};
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Get events for current month (real events)
    Object.entries(eventsData).forEach(([dateStr, events]) => {
        const eventDate = new Date(dateStr);
        if (eventDate.getMonth() + 1 === currentMonth && eventDate.getFullYear() === currentYear) {
            events.forEach(event => {
                // Apply filter
                if (filter === 'all' || event.category === filter) {
                    const locationKey = getLocationKey(event.location);
                    if (!eventsByLocation[locationKey]) {
                        eventsByLocation[locationKey] = {
                            location: event.location,
                            address: event.address,
                            events: []
                        };
                    }
                    eventsByLocation[locationKey].events.push({
                        ...event,
                        date: dateStr
                    });
                }
            });
        }
    });

    // Add map-only fake events with filter
    Object.entries(mapOnlyEvents).forEach(([dateStr, events]) => {
        const eventDate = new Date(dateStr);
        if (eventDate.getMonth() + 1 === currentMonth && eventDate.getFullYear() === currentYear) {
            events.forEach(event => {
                // Apply filter
                if (filter === 'all' || event.category === filter) {
                    const locationKey = getLocationKey(event.location);
                    if (!eventsByLocation[locationKey]) {
                        eventsByLocation[locationKey] = {
                            location: event.location,
                            address: event.address,
                            events: []
                        };
                    }
                    eventsByLocation[locationKey].events.push({
                        ...event,
                        date: dateStr
                    });
                }
            });
        }
    });

    // Create markers for each location
    Object.values(eventsByLocation).forEach(locationData => {
        const coords = getLocationCoordinates(locationData.location);
        if (coords) {
            const marker = createLocationMarker(coords, locationData);
            marker.addTo(eventsMap);
        }
    });
}

function getLocationKey(location) {
    // Normalize location names for grouping
    return location.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function getLocationCoordinates(location) {
    // Find coordinates for the location
    for (const [key, coords] of Object.entries(locationCoordinates)) {
        if (location.includes(key) || key.includes(location)) {
            return coords;
        }
    }
    
    // Default to center of Seneca Babcock if location not found
    return [42.8650, -78.8400];
}

function createLocationMarker(coords, locationData) {
    // Create custom icon based on event categories
    const categories = [...new Set(locationData.events.map(e => e.category))];
    const primaryCategory = categories[0];
    
    const iconColors = {
        'cultural': '#e74c3c',
        'community': '#3498db',
        'sports': '#f39c12',
        'health': '#27ae60',
        'youth': '#9b59b6'
    };

    const iconColor = iconColors[primaryCategory] || '#3498db';
    
    const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background-color: ${iconColor}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
    });

    const marker = L.marker(coords, { icon: customIcon });
    
    // Create popup content
    const popupContent = createMapPopupContent(locationData);
    marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
    });

    return marker;
}

function createMapPopupContent(locationData) {
    const { location, address, events } = locationData;
    
    let popupHTML = `
        <div class="map-popup">
            <div class="map-popup-header">
                <h3>${location}</h3>
            </div>
            <div class="map-popup-body">
    `;

    events.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });

        popupHTML += `
            <div class="popup-event" onclick="showEventFromMap('${event.date}', '${event.title}')">
                <div class="popup-event-title">${event.title}</div>
                <div class="popup-event-time">
                    <i class="fas fa-calendar"></i> ${formattedDate} at ${event.time}
                </div>
                <span class="popup-event-category ${event.category}">${event.category}</span>
            </div>
        `;
    });

    popupHTML += `
            </div>
        </div>
    `;

    return popupHTML;
}

function showEventFromMap(dateStr, eventTitle) {
    // Only show modals for real events (not fake map-only events)
    const events = eventsData[dateStr];
    if (events) {
        const event = events.find(e => e.title === eventTitle);
        if (event) {
            showEventModal(event, dateStr);
            return;
        }
    }
    
    // If it's a fake event, show a simple message
    const fakeEvents = mapOnlyEvents[dateStr];
    if (fakeEvents) {
        const fakeEvent = fakeEvents.find(e => e.title === eventTitle);
        if (fakeEvent && fakeEvent.fake) {
            alert(`${fakeEvent.title}\n\nThis is a community activity. Contact the venue directly for more information.\n\nLocation: ${fakeEvent.location}\nTime: ${fakeEvent.time}`);
        }
    }
}

// Update map when calendar navigation changes
function setupCalendarNavigation() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar();
            // Update map if it exists
            setTimeout(updateMapEvents, 100);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar();
            // Update map if it exists
            setTimeout(updateMapEvents, 100);
        });
    }
}

console.log('Events page initialized successfully!');

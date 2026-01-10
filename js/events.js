document.addEventListener('DOMContentLoaded', () => {
    // Access global variable set by js/data/events.js
    const events = window.eventsData || [];

    const eventsContainer = document.getElementById('events-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!eventsContainer) return;

    // Initial Render
    renderEvents(events);

    // Filter Logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            if (category === 'all') {
                renderEvents(events);
            } else {
                const filtered = events.filter(e => e.category === category);
                renderEvents(filtered);
            }
        });
    });

    function renderEvents(eventList) {
        // Clear current
        eventsContainer.innerHTML = '';

        if (eventList.length === 0) {
            eventsContainer.innerHTML = '<p class="no-events">No events found in this category.</p>';
            return;
        }

        eventList.forEach((event, index) => {
            const card = document.createElement('div');
            card.className = 'event-card fade-in';
            card.style.animationDelay = `${index * 100}ms`; // Staggered animation

            const date = new Date(event.date).toLocaleDateString('en-MY', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            card.innerHTML = `
                <div class="card-header">
                    <span class="badge ${event.category}">${capitalize(event.category)}</span>
                    <span class="date">${date}</span>
                </div>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="card-footer">
                    <span class="location">📍 ${event.location}</span>
                </div>
            `;

            eventsContainer.appendChild(card);
        });
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});

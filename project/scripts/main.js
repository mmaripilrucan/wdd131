// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
  // ———— 1. SET ACTIVE NAVIGATION LINK ———— //
  // Highlight the current page in the navigation menu
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ———— 2. DESTINATIONS DATA ———— //
  // Array of 24 top destinations in Argentina (objects)
  const destinations = [
    { id: 1, name: "Iguazú Falls", region: "Misiones", desc: "One of the world’s largest waterfalls, surrounded by lush rainforest." },
    { id: 2, name: "El Calafate", region: "Santa Cruz", desc: "Gateway to the stunning Perito Moreno Glacier in Los Glaciares National Park." },
    { id: 3, name: "Ushuaia", region: "Tierra del Fuego", desc: "The southernmost city in the world, known as the 'End of the World'." },
    { id: 4, name: "Bariloche", region: "Río Negro", desc: "Alpine-style town famous for chocolate, lakes, and outdoor adventures." },
    { id: 5, name: "Salta", region: "Salta", desc: "Colonial city with cobbled streets and rich Andean culture." },
    { id: 6, name: "Cafayate", region: "Salta", desc: "Wine-producing town nestled in dramatic red rock canyons." },
    { id: 7, name: "Mendoza", region: "Mendoza", desc: "Wine capital of Argentina with views of the Andes mountains." },
    { id: 8, name: "San Martín de los Andes", region: "Neuquén", desc: "Beautiful lakeside town in the heart of the Argentine Lake District." },
    { id: 9, name: "Puerto Madryn", region: "Chubut", desc: "Coastal city famous for seasonal whale watching in the Golfo Nuevo." },
    { id: 10, name: "Península Valdés", region: "Chubut", desc: "UNESCO site known for orcas, elephant seals, and marine wildlife." },
    { id: 11, name: "Purmamarca", region: "Jujuy", desc: "Colorful village at the base of the Cerro de los Siete Colores (Rainbow Hill)." },
    { id: 12, name: "Tilcara", region: "Jujuy", desc: "Ancient town with pre-Inca ruins and stunning mountain scenery." },
    { id: 13, name: "Córdoba", region: "Córdoba", desc: "Historic city home to one of the oldest universities in South America." },
    { id: 14, name: "Villa Carlos Paz", region: "Córdoba", desc: "Popular lakeside resort town with festivals and outdoor activities." },
    { id: 15, name: "La Plata", region: "Buenos Aires", desc: "Planned city with impressive architecture and wide diagonal avenues." },
    { id: 16, name: "Tigre Delta", region: "Buenos Aires", desc: "Scenic river delta with islands, canals, and boat tours near the capital." },
    { id: 17, name: "Mar del Plata", region: "Buenos Aires", desc: "Argentina’s most famous beach resort, bustling in summer." },
    { id: 18, name: "Rosario", region: "Santa Fe", desc: "Major city on the Paraná River, birthplace of Che Guevara." },
    { id: 19, name: "Isla Martín García", region: "Buenos Aires", desc: "Protected island nature reserve in the Río de la Plata." },
    { id: 20, name: "Quebrada de Humahuaca", region: "Jujuy", desc: "UNESCO World Heritage site with ancient indigenous trails and towns." },
    { id: 21, name: "Nahuel Huapi National Park", region: "Río Negro/Neuquén", desc: "Argentina’s first national park, filled with lakes and forests." },
    { id: 22, name: "Aconcagua", region: "Mendoza", desc: "The tallest mountain in the Americas, a challenge for climbers." },
    { id: 23, name: "Laguna de los Tres", region: "Santa Cruz", desc: "Hiking destination with the iconic view of Mount Fitz Roy." },
    { id: 24, name: "Cachi", region: "Salta", desc: "Charming mountain village with colonial charm and ancient ruins." }
  ];

  // ———— 3. RENDER DESTINATIONS TO THE PAGE ———— //
  const grid = document.getElementById('destinations-grid');

  // Only run if we're on the destinations page
  if (grid) {
    // Initial render
    renderDestinations(destinations);

    // Add search functionality
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const term = e.target.value.trim().toLowerCase();

        // Conditional: filter only if there's a search term
        let filtered;
        if (term === '') {
          filtered = destinations;
        } else {
          filtered = destinations.filter(d =>
            d.name.toLowerCase().includes(term) ||
            d.region.toLowerCase().includes(term) ||
            d.desc.toLowerCase().includes(term)
          );
        }

        // Re-render the filtered list
        renderDestinations(filtered);
      });
    }
  }

  /**
   * Renders an array of destination objects into the DOM grid.
   * Uses .map() and template literals exclusively for output.
   * @param {Array} list - Array of destination objects
   */
  function renderDestinations(list) {
    const html = list.map(d => {
      // Build each card using template literals only
      return `
        <div class="destination-card">
          <div class="card-img-wrapper">
            <img src="../images/destination${d.id}.jpg" alt="${d.name}" loading="lazy">
          </div>
          <div class="card-content">
            <h3>${d.name}</h3>
            <p><strong>${d.region}</strong><br>${d.desc}</p>
          </div>
        </div>
      `;
    }).join('');

    // Update the DOM
    grid.innerHTML = html;

    // Show message if no results
    if (list.length === 0) {
      grid.innerHTML = `
        <p class="no-results" style="grid-column: 1 / -1; text-align: center; color: #666; font-style: italic;">
          No destinations found matching your search. Please try another keyword.
        </p>
      `;
    }
  }

  // ———— 4. HANDLE CONTACT FORM SUBMISSION ———— //
  const form = document.getElementById('newsletter-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent default form submission

      const name = form.name.value.trim();
      const email = form.email.value.trim();

      // Conditional branching: Validate inputs
      if (!name) {
        alert('Please enter your full name.');
        return;
      }

      if (!email) {
        alert('Please enter your email address.');
        return;
      }

      if (!isValidEmail(email)) {
        alert('Please enter a valid email address (e.g., name@example.com).');
        return;
      }

      // Save data to localStorage
      localStorage.setItem('subscriberName', name);
      localStorage.setItem('subscriberEmail', email);

      // Redirect to confirmation page
      window.location.href = 'confirmation.html';
    });
  }

  /**
   * Validates email format using a simple regex.
   * @param {string} email - The email to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

 
});
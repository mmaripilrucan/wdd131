// Temple Data Array
const temples = [
 {
   templeName: "Aba Nigeria",
   location: "Aba, Nigeria",
   dedicated: "2005, August, 7",
   area: 11500,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
 },
 {
   templeName: "Manti Utah",
   location: "Manti, Utah, United States",
   dedicated: "1888, May, 21",
   area: 74792,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
 },
 {
   templeName: "Payson Utah",
   location: "Payson, Utah, United States",
   dedicated: "2015, June, 7",
   area: 96630,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/320x200/payson-utah-temple-daylight-1416668-wallpaper.jpg"
 },
 {
   templeName: "Yigo Guam",
   location: "Yigo, Guam",
   dedicated: "2020, May, 2",
   area: 6861,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
 },
 {
   templeName: "Washington D.C.",
   location: "Kensington, Maryland, United States",
   dedicated: "1974, November, 19",
   area: 156558,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
 },
 {
   templeName: "Lima Perú",
   location: "Lima, Perú",
   dedicated: "1986, January, 10",
   area: 9600,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
 },
 {
   templeName: "Mexico City Mexico",
   location: "Mexico City, Mexico",
   dedicated: "1983, December, 2",
   area: 116642,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
 },
 {
   templeName: "Salt Lake",
   location: "Salt Lake City, Utah, United States",
   dedicated: "1893, April, 6",
   area: 253015,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/320x200/slctemple7.jpg"
 },
 {
   templeName: "Rome Italy",
   location: "Rome, Italy",
   dedicated: "2019, March, 10",
   area: 40000,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/320x200/6-Rome-Temple-2160338.jpg"
 },
 {
   templeName: "Kyiv Ukraine",
   location: "Kyiv, Ukraine",
   dedicated: "2010, August, 29",
   area: 17446,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/kyiv-ukraine/320x200/kyiv-ukraine-temple-lds-736359-wallpaper.jpg"
 },
 {
   templeName: "Nauvoo Illinois",
   location: "Nauvoo, Illinois, United States",
   dedicated: "2002, June, 27",
   area: 58000,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nauvoo-illinois/320x200/nauvoo-temple-756499-wallpaper.jpg"
 },
 {
   templeName: "Adelaide Australia",
   location: "Adelaide, South Australia",
   dedicated: "2000, June, 15",
   area: 10700,
   imageUrl:
     "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/adelaide-australia/320x200/adelaide-australia-temple-lds-851233-wallpaper.jpg"
 }
];

// DOM References
const gallery = document.getElementById("temple-gallery");
const menuButton = document.getElementById('menu-button');
const primaryNav = document.querySelector('#primary-nav ul');
const navLinks = document.querySelectorAll('#primary-nav a');


document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent += document.lastModified;

// Function to create temple card
function createTempleCard(temple) {
 const card = document.createElement("article");
 card.className = "card";

 card.innerHTML = `
   <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
   <div class="card-content">
     <h3>${temple.templeName}</h3>
     <p><strong>Location:</strong> ${temple.location}</p>
     <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
     <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
   </div>
 `;

 return card;
}

// Function to display temples
function displayTemples(templeList) {
 gallery.innerHTML = "";
 templeList.forEach(temple => {
   gallery.appendChild(createTempleCard(temple));
 });
}

// Filter functions
function filterTemples(filter) {
 let filtered = [];

 switch (filter) {
   case "old":
     filtered = temples.filter(t => {
       const year = parseInt(t.dedicated.split(",")[0]);
       return year < 1900;
     });
     break;
   case "new":
     filtered = temples.filter(t => {
       const year = parseInt(t.dedicated.split(",")[0]);
       return year > 2000;
     });
     break;
   case "large":
     filtered = temples.filter(t => t.area > 90000);
     break;
   case "small":
     filtered = temples.filter(t => t.area < 10000);
     break;
   case "home":
   default:
     filtered = temples;
     break;
 }

 displayTemples(filtered);
}

// Initial Load
displayTemples(temples);

// Event Listeners for Navigation
navLinks.forEach(link => {
 link.addEventListener("click", (e) => {
   e.preventDefault();
   const filter = e.target.getAttribute("data-filter");
   filterTemples(filter);

   // Update active state (optional)
   navLinks.forEach(l => l.classList.remove("active"));
   e.target.classList.add("active");
 });
});

// Mobile Menu Toggle
menuButton.addEventListener('click', () => {
 primaryNav.classList.toggle('show');
 const isOpen = primaryNav.classList.contains('show');
 menuButton.innerHTML = isOpen ? '✕' : '☰';
});
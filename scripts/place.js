// Footer information
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Windchill calculation
function calculateWindChill(temp, windSpeed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1);
}

// Get weather values
const temp = parseFloat(document.getElementById('temp').textContent);
const windSpeed = parseFloat(document.getElementById('wind-speed').textContent);
const windChillElement = document.getElementById('wind-chill');

// Calculate and display windchill if conditions are met
if (temp <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChill(temp, windSpeed)} °C`;
}
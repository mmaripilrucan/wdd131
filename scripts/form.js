const products = [
    { id: "prod1", name: "Wireless Headphones" },
    { id: "prod2", name: "Smart Watch" },
    { id: "prod3", name: "Bluetooth Speaker" },
    { id: "prod4", name: "Fitness Tracker" },
    { id: "prod5", name: "Tablet" }
];


document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('productName');

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

    
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    
    document.getElementById('lastModified').textContent = `Last Modification: ${new Date(document.lastModified).toLocaleString()}`;
});
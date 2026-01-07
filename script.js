/* --- CONFIGURATION --- */
const PRICES = {
    sprout: 0.00009, // LTC per sprout
    auto: 0.015      // LTC per day
};

// Wallet Address
const WALLET_ADDRESS = "LcnuMGFuDSvnKp1Dsgn7Wp38WM9UJWNeuo";

/* --- MODAL FUNCTIONS --- */

// Open a specific modal by ID
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
}

// Close a specific modal by ID
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal if user clicks outside the box (on the dark background)
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

/* --- CALCULATION LOGIC --- */

// Calculate Sprout Farm Cost
function calculateSprout() {
    const input = document.getElementById('sprout-qty');
    const display = document.getElementById('sprout-total');
    
    // Get value, ensure it's at least 20
    let qty = parseInt(input.value);
    
    // Safety check: if empty or invalid, treat as 0 (or min)
    if (isNaN(qty) || qty < 0) qty = 0;

    // Calculate total
    const total = (qty * PRICES.sprout).toFixed(5); // 5 decimal places for crypto
    
    // Update display
    display.innerText = `${total} LTC`;
}

// Calculate Auto Farm Cost
function calculateAuto() {
    const input = document.getElementById('auto-days');
    const display = document.getElementById('auto-total');
    
    // Get value, ensure it's at least 1
    let days = parseInt(input.value);
    
    if (isNaN(days) || days < 0) days = 0;

    // Calculate total
    const total = (days * PRICES.auto).toFixed(5);
    
    // Update display
    display.innerText = `${total} LTC`;
}

/* --- UTILITIES --- */

// Copy Wallet Address to Clipboard
function copyAddress() {
    navigator.clipboard.writeText(WALLET_ADDRESS).then(() => {
        alert("Wallet address copied to clipboard!");
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Add simple tilt effect to cards (Optional visual flair)
const cards = document.querySelectorAll('.product-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Simple subtle glow following mouse
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,183,3,0.05), #141414)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = '#141414';
    });
});

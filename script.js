/* --- CONFIGURATION --- */
const PRICES = {
    sprout: 0.00009, // LTC per sprout
    auto: 0.015      // LTC per day
};

const WALLET_ADDRESS = "LcnuMGFuDSvnKp1Dsgn7Wp38WM9UJWNeuo";

/* --- SEARCH FUNCTIONALITY --- */
const searchInput = document.getElementById('serviceSearch');

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase();
        let targetId = "";

        // Determine which card to highlight based on search
        if (query.includes('auto') || query.includes('farm') || query.includes('day')) {
            targetId = "auto-card";
        } else if (query.includes('sprout') || query.includes('leaf')) {
            targetId = "sprout-card";
        }

        if (targetId) {
            const element = document.getElementById(targetId);
            
            // Smooth scroll to the product
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Visual "Found it" highlight effect
            element.classList.add('highlight-card');
            setTimeout(() => {
                element.classList.remove('highlight-card');
            }, 2500);
            
            // Clear search after find
            searchInput.value = "";
        } else {
            // Shake effect or alert if not found
            alert("No service matches your search. Try 'auto' or 'sprout'.");
        }
    }
});

/* --- CALCULATION LOGIC --- */

// Calculate Sprout Farm Cost
function calculateSprout() {
    const input = document.getElementById('sprout-qty');
    const display = document.getElementById('sprout-total');
    
    let qty = parseInt(input.value);
    
    // Validate minimum purchase of 20
    if (isNaN(qty) || qty < 0) qty = 0;

    // Use 5 decimal places for Litecoin display
    const total = (qty * PRICES.sprout).toFixed(5);
    display.innerText = `${total} LTC`;
}

// Calculate Auto Farm Cost
function calculateAuto() {
    const input = document.getElementById('auto-days');
    const display = document.getElementById('auto-total');
    
    let days = parseInt(input.value);
    
    if (isNaN(days) || days < 0) days = 0;

    const total = (days * PRICES.auto).toFixed(5);
    display.innerText = `${total} LTC`;
}

/* --- MODAL CONTROL --- */

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    // Prevent scrolling background when modal is open
    document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
    // Restore scrolling
    document.body.style.overflow = "auto";
}

// Close modal if user clicks the dark backdrop
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

/* --- UTILITIES --- */

function copyAddress() {
    navigator.clipboard.writeText(WALLET_ADDRESS).then(() => {
        // Change icon or alert user
        alert("Litecoin address copied to clipboard!");
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Ensure "Shop" link in nav scrolls smoothly
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

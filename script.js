/* --- CONFIGURATION --- */
const PRICES = {
    sprout: 0.00009,
    auto: 0.015
};

const WALLET_ADDRESS = "LcnuMGFuDSvnKp1Dsgn7Wp38WM9UJWNeuo";

/* --- SEARCH LOGIC --- */
const searchInput = document.getElementById('serviceSearch');

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase();
        let targetId = "";

        // Logic to determine where to scroll
        if (query.includes('auto') || query.includes('farm')) {
            targetId = "auto-card";
        } else if (query.includes('sprout')) {
            targetId = "sprout-card";
        }

        if (targetId) {
            const element = document.getElementById(targetId);
            
            // Scroll to the element
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Add a temporary glow highlight
            element.classList.add('highlight-card');
            setTimeout(() => {
                element.classList.remove('highlight-card');
            }, 2000);
        } else {
            alert("Service not found. Try 'auto' or 'sprout'.");
        }
    }
});

/* --- MODAL LOGIC --- */
function openModal(modalId) {
    document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal if user clicks outside the content box
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

/* --- CALCULATION LOGIC --- */
function calculateSprout() {
    const qty = document.getElementById('sprout-qty').value || 0;
    const total = (qty * PRICES.sprout).toFixed(8); // Precision for small LTC amounts
    document.getElementById('sprout-total').innerText = `${total} LTC`;
}

function calculateAuto() {
    const days = document.getElementById('auto-days').value || 0;
    const total = (days * PRICES.auto).toFixed(4);
    document.getElementById('auto-total').innerText = `${total} LTC`;
}

/* --- UTILITIES --- */
function copyAddress() {
    // We can use a prompt or clipboard API
    navigator.clipboard.writeText(WALLET_ADDRESS);
    
    // Visual feedback on the button if you want, or just a simple alert
    alert("Address Copied: " + WALLET_ADDRESS);
}

// Subtle Mouse Parallax for Cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

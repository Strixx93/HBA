import confetti from 'canvas-confetti';

// Beautiful curated shades of pink for the background
const pinkShades = [
    { name: "Classic Pink", hex: "#FFC0CB" },
    { name: "Light Pink", hex: "#FFB6C1" },
    { name: "Cherry Blossom", hex: "#FFB7C5" },
    { name: "Lavender Blush", hex: "#FFF0F5" },
    { name: "Bubblegum Pink", hex: "#FFC1CC" },
    { name: "Misty Rose", hex: "#FFE4E1" },
    { name: "Rose Gold", hex: "#B76E79" },
    { name: "Hot Pink", hex: "#FF69B4" },
    { name: "Orchid Pink", hex: "#F2BDCD" },
    { name: "Cotton Candy", hex: "#FFBCD9" },
    { name: "Deep Pink", hex: "#FF1493" },
    { name: "Baby Pink", hex: "#F4C2C2" }
];

// Curated colors for the confetti to match the pink aesthetic perfectly
const confettiColors = ['#FFC0CB', '#FFB6C1', '#FF69B4', '#FF1493', '#FFE4E1', '#FFF0F5', '#F2BDCD', '#FFFFFF', '#FFD700'];

let currentIndex = 0;
const body = document.body;

function updatePinkShade(index) {
    const shade = pinkShades[index];
    
    // Smooth transition of the background color
    body.style.backgroundColor = shade.hex;
    
    // Dynamic tab title to reflect the shade name
    document.title = `Pink - ${shade.name}`;
}

// Function to trigger a beautiful confetti burst at specific normalized coordinates
function triggerConfetti(x = 0.5, y = 0.5, particleCount = 40) {
    confetti({
        particleCount: particleCount,
        spread: 60,
        origin: { x, y },
        colors: confettiColors,
        disableForReducedMotion: true
    });
}

// Function to run a gorgeous intro dual-stream confetti cascade on load
function triggerIntroConfetti() {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        // Left side stream
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: confettiColors
        });
        
        // Right side stream
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: confettiColors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Click / touch handler
function handleInteraction(e) {
    // Avoid double trigger for touch/click combos
    if (e.type === 'touchstart') {
        e.preventDefault();
    }

    // Get event coordinates
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);

    // Normalize coordinates (0 to 1) for canvas-confetti
    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;

    // Change shade
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * pinkShades.length);
    } while (nextIndex === currentIndex);
    
    currentIndex = nextIndex;
    updatePinkShade(currentIndex);

    // Fire confetti at interactive coordinate point
    triggerConfetti(x, y);
}

// Event Listeners for both desktop and mobile
body.addEventListener('click', handleInteraction);
body.addEventListener('touchstart', handleInteraction, { passive: false });

// Initialize page state
updatePinkShade(currentIndex);

// Trigger soft aesthetic confetti load effect once document is fully interactive
window.addEventListener('DOMContentLoaded', () => {
    // Small delay to let initial layout settle
    setTimeout(triggerIntroConfetti, 300);
});

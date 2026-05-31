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

// Function to spawn a beautiful burst of fountaining hearts centered on the clicked point
function spawnHearts(clientX, clientY) {
    const heartCount = 14;
    const container = document.querySelector('.centered-content');
    if (!container) return;

    // Calculate coordinates relative to the centered-content container
    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        
        // Start heart exactly at client click coordinates
        heart.style.left = `${relativeX}px`;
        heart.style.top = `${relativeY}px`;
        
        // Random radial fountaining animations
        const angle = Math.random() * Math.PI * 2; // Random 360 degree direction
        const distance = 80 + Math.random() * 160; // Random spread radius
        
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 80; // Rise upward slightly
        const rot = (Math.random() - 0.5) * 140; // Random rotation angle
        
        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.setProperty('--rot', `${rot}deg`);
        
        container.appendChild(heart);
        
        // Clean up DOM after animation completes
        setTimeout(() => {
            heart.remove();
        }, 1400);
    }
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

    // If center image (heather) is clicked, launch heart fountaining effect!
    const heatherImage = document.getElementById('heather-image');
    if (e.target === heatherImage) {
        spawnHearts(clientX, clientY);
    }

    // If any of the bottom Maria images are clicked, spin them around the Z-axis!
    const maria1 = document.getElementById('maria1-image');
    const maria2 = document.getElementById('maria2-image');
    
    if (e.target === maria1 || e.target === maria2) {
        const targetImage = e.target;
        
        // Prevent double triggers if already spinning
        if (!targetImage.classList.contains('spinning')) {
            targetImage.classList.add('spinning');
            
            // Remove the class after the animation completes so it can be re-triggered
            setTimeout(() => {
                targetImage.classList.remove('spinning');
            }, 900); // matches the 0.9s duration in CSS
        }
    }

    // If the top House image is clicked, make him do a bouncier jumpy spring animation!
    const houseImage = document.getElementById('house-image');
    if (e.target === houseImage) {
        if (!houseImage.classList.contains('jumpy')) {
            houseImage.classList.add('jumpy');
            
            // Remove the class after the animation completes so it can be re-triggered
            setTimeout(() => {
                houseImage.classList.remove('jumpy');
            }, 650); // matches the 0.65s duration in CSS
        }
    }
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

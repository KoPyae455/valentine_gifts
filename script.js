// --- SCROLL REVEAL ANIMATION ---
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// --- FLOATING HEARTS BACKGROUND ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('bg-heart');
    heart.innerHTML = '❤️';
    
    // Randomize position and size
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4-7s
    
    document.getElementById('hero').appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createHeart, 500);

// --- LIGHTBOX FUNCTIONALITY ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(element) {
    const img = element.querySelector('img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
}

function closeLightbox(event) {
    if (event.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
}

// --- PROPOSAL MODAL & CONFETTI ---
function showProposal() {
    const modal = document.getElementById('proposal-modal');
    modal.style.display = 'flex';
    
    // Trigger confetti/hearts explosion
    for(let i=0; i<50; i++) {
        createExplosionHeart();
    }
    
    // Optional: Play music if not already playing
    const audio = document.getElementById('bg-music');
    if(audio && audio.paused) {
        audio.play().catch(e => console.log("Audio play failed (user interaction needed first)"));
    }
}

function createExplosionHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    heart.style.zIndex = '2000';
    heart.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(heart);

    // Random direction
    const x = (Math.random() - 0.5) * window.innerWidth;
    const y = (Math.random() - 0.5) * window.innerHeight;

    // Animate
    requestAnimationFrame(() => {
        heart.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random()*360}deg)`;
        heart.style.opacity = '0';
    });

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Close proposal modal on click
document.getElementById('proposal-modal').addEventListener('click', function() {
    this.style.display = 'none';
});
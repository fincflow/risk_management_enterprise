const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signUpOverlay = document.getElementById('signUpOverlay');
const signInOverlay = document.getElementById('signInOverlay');
const container = document.getElementById('container');

const toSignUp = () => container.classList.add('right-panel-active');
const toSignIn = () => container.classList.remove('right-panel-active');

signUpButton.addEventListener('click', toSignUp);
signInButton.addEventListener('click', toSignIn);
signUpOverlay.addEventListener('click', toSignUp);
signInOverlay.addEventListener('click', toSignIn);

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let width = 0;
let height = 0;
let dpr = window.devicePixelRatio || 1;

const maxDistance = 150;

function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initParticles();
}

function initParticles() {
    const count = Math.min(160, Math.max(80, Math.floor((width * height) / 12000)));
    particles = Array.from({ length: count }, () => createParticle());
}

function createParticle() {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1.2 + Math.random() * 1.8,
    };
}

function updateParticles() {
    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';

    for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
                const alpha = (1 - dist / maxDistance) * 0.2;
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animate);
}

resizeCanvas();
animate();
window.addEventListener('resize', resizeCanvas);

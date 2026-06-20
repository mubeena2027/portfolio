// ============ NAVBAR FUNCTIONALITY ============
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============ NAVBAR SCROLL EFFECT ============
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============ SCROLL ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = getAnimation(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

function getAnimation(element) {
    if (element.classList.contains('section-title')) {
        return 'fadeIn 0.8s ease forwards';
    }
    if (element.classList.contains('skill-card')) {
        return 'fadeIn 0.8s ease forwards';
    }
    if (element.classList.contains('project-card')) {
        return 'fadeIn 0.8s ease forwards';
    }
    if (element.classList.contains('cert-card')) {
        return 'fadeIn 0.8s ease forwards';
    }
    return 'fadeIn 0.6s ease forwards';
}

// Observe all animated elements
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ============ EMAIL JS INITIALIZATION ============
// You need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
// Get it from: https://dashboard.emailjs.com/admin/account
emailjs.init('WhQSamPl1fZRvJT97');

// ============ CONTACT FORM SUBMISSION ============
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('user_name').value;
        const email = document.getElementById('user_email').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Show loading state
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;

        try {
            // Send email via EmailJS
            // Your service ID: service_portfolio
            // Your template ID: template_portfolio
            await emailjs.send('service_portfolio', 'template_portfolio', {
                to_email: 'shaikmubeenam6@gmail.com',
                from_name: name,
                from_email: email,
                message: message
            });

            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Email send failed:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}

// ============ NOTIFICATION FUNCTION ============
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#f56565'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease forwards;
        font-weight: 500;
        max-width: 400px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add slide animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);

// ============ PARALLAX EFFECT ============
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Apply parallax to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0% ${scrollPosition * 0.5}px`;
    }
});

// ============ CERTIFICATE LINK HANDLING ============
document.querySelectorAll('.cert-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Check if file exists, if not show alert
        const href = button.getAttribute('href');
        if (href.includes('certificates/')) {
            // In production, ensure the PDF files exist at these paths
            console.log('Opening certificate:', href);
        }
    });
});

// ============ ACTIVE NAVIGATION LINK ============
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============ PAGE LOAD ANIMATION ============
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.6s ease';
});

// ============ UTILITY: COPY TO CLIPBOARD ============
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

// ============ DYNAMICALLY ADD EXTERNAL LINKS TRACKING ============
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        // Track external link clicks
        console.log('External link clicked:', link.href);
    });
});

// ============ FORM FOCUS EFFECTS ============
const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============ SCROLL TO TOP BUTTON ============
// Create and add scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// ============ INITIALIZATION ============
console.log('Portfolio website loaded successfully!');
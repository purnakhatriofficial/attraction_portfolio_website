// Portfolio Website JavaScript

// Smooth Scroll Navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form fields
        const name = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const message = contactForm.querySelector('textarea');
        
        // Basic validation
        if (name.value.trim() === '') {
            showError(name, 'Name cannot be empty');
            return;
        }
        
        if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            return;
        }
        
        if (message.value.trim() === '') {
            showError(message, 'Message cannot be empty');
            return;
        }
        
        // Simulate form submission
        sendMessage(name.value, email.value, message.value);
    });
}

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(input, message) {
    // Remove any existing error
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and append error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message text-danger small mt-1';
    errorElement.textContent = message;
    input.parentElement.appendChild(errorElement);
    
    // Highlight input field
    input.classList.add('is-invalid');
    
    // Remove error after user starts typing
    input.addEventListener('input', function removeError() {
        errorElement.remove();
        input.classList.remove('is-invalid');
        input.removeEventListener('input', removeError);
    });
}

// Simulated message sending function
function sendMessage(name, email, message) {
    // In a real-world scenario, you would send this to a backend service
    console.log('Message Submitted:', { name, email, message });
    
    // Show success modal or message
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    
    // Reset form
    document.getElementById('contactForm').reset();
}

// Project Modal Functionality
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('.card-title').textContent;
            const projectDescription = this.querySelector('.card-text').textContent;
            const projectImage = this.querySelector('.card-img-top').src;
            
            // Update modal content
            const modalTitle = document.getElementById('projectModalLabel');
            const modalBody = document.querySelector('#projectModal .modal-body');
            const modalImage = document.querySelector('#projectModal .modal-body img');
            
            modalTitle.textContent = projectTitle;
            modalBody.querySelector('p').textContent = projectDescription;
            modalImage.src = projectImage;
        });
    });
}

// Skill Animation
function animateSkills() {
    const skillBadges = document.querySelectorAll('#skills .badge');
    
    skillBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.5s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 200);
    });
}


function copyText() {
    // Get the textarea element
    const textarea = document.getElementById('textArea');
    
    // Select the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    // Copy the text
    try {
        navigator.clipboard.writeText(textarea.value)
            .then(() => {
                alert('Text copied successfully!');
            })
            .catch(err => {
                // Fallback for older browsers
                document.execCommand('copy');
                alert('Text copied successfully!');
            });
    } catch (err) {
        // Fallback for older browsers
        document.execCommand('copy');
        alert('Text copied successfully!');
    }
}

// Dark Mode Toggle
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    darkModeToggle.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', this.checked);
    });
    
    // Check user's previous preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
}

// Initialize all functions when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initContactForm();
    initProjectModals();
    animateSkills();
    initDarkModeToggle();
});




// Additional utility functions can be added here

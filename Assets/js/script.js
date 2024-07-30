// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Hero section animation
gsap.from('.hero-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
});

// Skill items animation
gsap.from('.skill-item', {
    scrollTrigger: {
        trigger: '.skills-container',
        start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out'
});

// Portfolio items animation
gsap.from('.portfolio-item', {
    scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 80%'
    },
    opacity: 0,
    y: 50,
    stagger: 0.3,
    duration: 0.8,
    ease: 'power3.out'
});

// Form validation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        // Submit the form
        form.submit();
    }
});

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    if (name.value.trim() === '') {
        setErrorFor(name, 'Name cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(name);
    }

    if (email.value.trim() === '') {
        setErrorFor(email, 'Email cannot be blank');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        setErrorFor(email, 'Email is not valid');
        isValid = false;
    } else {
        setSuccessFor(email);
    }

    if (message.value.trim() === '') {
        setErrorFor(message, 'Message cannot be blank');
        isValid = false;
    } else {
        setSuccessFor(message);
    }

    return isValid;
}

function setErrorFor(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');

    if (!errorMessage) {
        const errorElement = document.createElement('small');
        errorElement.className = 'error-message';
        errorElement.innerText = message;
        formGroup.appendChild(errorElement);
    } else {
        errorMessage.innerText = message;
    }

    formGroup.className = 'form-group error';
}

function setSuccessFor(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');

    if (errorMessage) {
        formGroup.removeChild(errorMessage);
    }

    formGroup.className = 'form-group success';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
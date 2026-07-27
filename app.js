document.addEventListener('DOMContentLoaded', () => {
    // Navigation Scroll Effect with Directional Hide/Show
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (window.scrollY > lastScrollY && window.scrollY > 150) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });


    // Mobile Navigation Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section, .hero');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id') || '';
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}` || (current === 'hero' && item.getAttribute('href') === '#')) {
                item.classList.add('active');
            }
        });
    });

    // Food Menu Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                    // Trigger simple fade-in
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transition = 'opacity 0.4s ease';
                    }, 50);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Reservation Form Handler
    const reservationForm = document.getElementById('reservation-form');
    const modal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    if (reservationForm && modal) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('res-name').value.trim();
            const email = document.getElementById('res-email').value.trim();
            const phone = document.getElementById('res-phone').value.trim();
            const guests = document.getElementById('res-guests').value;
            const date = document.getElementById('res-date').value;
            const time = document.getElementById('res-time').value;

            if (!name || !email || !phone || !guests || !date || !time) {
                alert('Please fill in all required fields.');
                return;
            }

            // Fill reservation details in modal
            const detailsText = document.getElementById('modal-details');
            if (detailsText) {
                detailsText.innerHTML = `Table reserved for <strong>${guests} guests</strong> on <strong>${date}</strong> at <strong>${time}</strong> under the name <strong>${name}</strong>.`;
            }

            // Show success modal
            modal.classList.add('active');

            // Reset form
            reservationForm.reset();
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close modal when clicking outside of contents
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});

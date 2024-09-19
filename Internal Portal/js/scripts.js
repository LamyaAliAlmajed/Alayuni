// Display current date
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

function updateDateTime() {
    const now = new Date();
    dateElement.textContent = now.toLocaleDateString();
    timeElement.textContent = now.toLocaleTimeString();
}

setInterval(updateDateTime, 1000);

// Display weather (placeholder example, replace with actual weather fetching logic)
const weatherElement = document.getElementById('weather');
weatherElement.textContent = "Sunny 25°C"; // API

// Search bar toggle
const searchIcon = document.getElementById('search-icon');
const searchBar = document.getElementById('search-bar');

searchIcon.addEventListener('click', () => {
    searchBar.classList.toggle('show-search');
    searchBar.focus();
});

// Replace placeholder [User's Name] with actual SharePoint user info later
document.querySelector('.left-section span').textContent = "Hello, User";

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let currentIndex = 0;

// Function to change slide
function changeSlide(index) {
    const offset = -index * 100;
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;

    // Update dot active state
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Automatic slide change every 10 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    changeSlide(currentIndex);
}, 10000);

// Dot click event
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        changeSlide(index);
    });
});

// Initialize the first slide and dot
changeSlide(currentIndex);

const announcementSlides = document.querySelectorAll('.announcement-slide');
const announcementDots = document.querySelectorAll('.announcement-dots .dot');

let currentAnnouncementSlide = 0;

// Function to move to a specific slide
function moveAnnouncementSlide(index) {
    // Set the transformation for each slide based on the index
    announcementSlides.forEach((slide, i) => {
        slide.style.transform = `translateX(-${index * 100}%)`;
        // Update the active state of dots
        announcementDots[i].classList.toggle('active', i === index);
    });
    currentAnnouncementSlide = index;
}

// Initialize the first slide as active
moveAnnouncementSlide(0);

// Set up automatic sliding every 10 seconds
function autoSlideAnnouncements() {
    currentAnnouncementSlide = (currentAnnouncementSlide + 1) % announcementSlides.length;
    moveAnnouncementSlide(currentAnnouncementSlide);
}

setInterval(autoSlideAnnouncements, 10000);

// Function to manually slide to a specific slide on dot click
function manualSlide(sliderClass, slideIndex) {
    const slides = document.querySelectorAll(`.${sliderClass} .news-slide`);
    const dots = document.querySelectorAll(`.${sliderClass} .dot`);

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
        dots[index].classList.toggle('active', index === slideIndex);
    });
}

// Function to auto slide every 10 seconds
function autoSlide(sliderClass) {
    let currentSlide = 0;
    const slides = document.querySelectorAll(`.${sliderClass} .news-slide`);
    const dots = document.querySelectorAll(`.${sliderClass} .dot`);

    function changeSlide() {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    const interval = setInterval(changeSlide, 10000);

    // Add click event to dots for manual slide
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(interval); // Stop auto slide when dot is clicked
            currentSlide = index;
            manualSlide(sliderClass, currentSlide);
            setTimeout(() => setInterval(changeSlide, 10000), 10000); // Resume auto slide after 10 seconds
        });
    });
}

// Initialize sliders
autoSlide('news');
autoSlide('announcements');

// Photo Slider
const photoSlides = document.querySelectorAll('.slider-slide');
const photoDots = document.querySelectorAll('.photo-slider .dot');
const modal = document.getElementById('photo-modal');
const modalImg = modal.querySelector('img');

let currentPhotoIndex = 0;

// Change Slide Function
function changePhotoSlide(index) {
    photoSlides[currentPhotoIndex].classList.remove('active');
    photoDots[currentPhotoIndex].classList.remove('active');
    photoSlides[index].classList.add('active');
    photoDots[index].classList.add('active');
    currentPhotoIndex = index;
}

// Click event for dots
photoDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        changePhotoSlide(index);
    });
});

// Click event for showing modal on slide click
photoSlides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
        const bgImage = getComputedStyle(slide).backgroundImage;
        modalImg.src = bgImage.slice(5, -2); // Remove 'url("' and '")'
        modal.classList.add('active');
    });
});

// Close modal on click
modal.addEventListener('click', () => {
    modal.classList.remove('active');
});


function initializeSlider(containerClass) {
    const container = document.querySelector(`.${containerClass}`);
    const slides = container.querySelectorAll('.slider-slide, .news-slide');
    const dots = container.querySelectorAll('.dot');
    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Set up automatic sliding
    const interval = setInterval(nextSlide, 10000);

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(interval);
            currentIndex = index;
            showSlide(currentIndex);
            setTimeout(() => setInterval(nextSlide, 10000), 10000);
        });
    });

    // Initialize first slide
    showSlide(0);

    // For photo and video sliders, add modal functionality
    if (containerClass === 'photo-slider' || containerClass === 'video-slider') {
        const modal = document.createElement('div');
        modal.className = 'modal';
        document.body.appendChild(modal);

        slides.forEach((slide) => {
            slide.addEventListener('click', () => {
                const bgImage = getComputedStyle(slide).backgroundImage;
                const imageUrl = bgImage.slice(5, -2); // Remove 'url("' and '")'
                
                if (containerClass === 'photo-slider') {
                    modal.innerHTML = `<img src="${imageUrl}" alt="Full size image">`;
                } else {
                    // Assuming the video URL is stored in a data attribute
                    const videoUrl = slide.dataset.videoUrl;
                    modal.innerHTML = `<video src="${videoUrl}" controls></video>`;
                }
                
                modal.classList.add('active');
            });
        });

        modal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
}

// Add this event listener at the end of your file
document.addEventListener('DOMContentLoaded', () => {
    initializeSlider('news');
    initializeSlider('announcements');
    initializeSlider('photo-slider');
    initializeSlider('video-slider');
});


// counters


const counters = document.querySelectorAll('.counter-number');
const speed = 200; // The lower the slower

const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    const suffix = counter.dataset.suffix || '';
    let count = 0;
    const inc = target / speed;
    
    const updateCount = () => {
        if (count < target) {
            count += inc;
            counter.innerText = Math.floor(count) + suffix;
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target + suffix;
        }
    };

    updateCount();
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});

/// events

document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar-days');
    const monthDisplay = document.getElementById('currentMonth');
    const calendarView = document.getElementById('calendar-view');
    const eventDetailsView = document.getElementById('event-details');
    const eventDate = document.getElementById('event-date');
    const eventList = document.getElementById('event-list');
    const backButton = document.getElementById('back-to-calendar');
    let currentDate = new Date();
    let events = {
        //"2024-9-20": ["test", "test"],
        //"2024-9-25": ["tests"]
    };

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        monthDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        
        calendar.innerHTML = '';
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let i = 0; i < firstDay; i++) {
            calendar.appendChild(document.createElement('div'));
        }
        
        const today = new Date();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.addEventListener('click', () => selectDate(year, month, day));
            
            const dateString = `${year}-${month + 1}-${day}`;
            if (events[dateString]) {
                dayElement.classList.add('has-event');
            }
            
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            calendar.appendChild(dayElement);
        }
    }

    function selectDate(year, month, day) {
        const dateString = `${year}-${month + 1}-${day}`;
        if (events[dateString]) {
            showEventDetails(dateString);
        }
    }

    function showEventDetails(dateString) {
        calendarView.style.display = 'none';
        eventDetailsView.style.display = 'block';
        
        const date = new Date(dateString);
        eventDate.textContent = date.toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        
        eventList.innerHTML = '';
        events[dateString].forEach(event => {
            const li = document.createElement('li');
            li.textContent = event;
            eventList.appendChild(li);
        });
    }

    function showCalendar() {
        calendarView.style.display = 'block';
        eventDetailsView.style.display = 'none';
    }

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    backButton.addEventListener('click', showCalendar);

    renderCalendar();
    showCalendar(); 
});

// nav menu

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});
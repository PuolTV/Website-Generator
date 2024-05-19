function alertMessage() {
    alert("Thank you for clicking the button!");
}

document.getElementById("contactForm").addEventListener("submit", function(event){
    event.preventDefault();
    alert("Form submitted! Thank you, " + document.getElementById("name").value + ".");
});

const images = [
    'https://source.unsplash.com/random/1920x1080',
    'https://source.unsplash.com/random/1920x1080?sig=1',
    'https://source.unsplash.com/random/1920x1080?sig=2',
    'https://source.unsplash.com/random/1920x1080?sig=3',
    'https://source.unsplash.com/random/1920x1080?sig=4'
];

let currentIndex = 0;

function preloadImage(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = callback;
}

function changeBackgroundImage() {
    currentIndex = (currentIndex + 1) % images.length;
    const nextImageUrl = images[currentIndex];

    preloadImage(nextImageUrl, function() {
        const heroSection = document.querySelector('.hero');
        heroSection.style.backgroundImage = `url(${nextImageUrl})`;
    });
}

setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds

// Adjust the margin-top of the hero section and padding of the contact section
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    const footer = document.querySelector('footer');
    const contactSection = document.querySelector('#contact');

    // Set the margin-top of the hero section based on the header height
    const headerHeight = header.offsetHeight;
    heroSection.style.marginTop = `${headerHeight}px`;

    // Set the padding-bottom of the contact section based on the footer height
    const footerHeight = footer.offsetHeight;
    contactSection.style.paddingBottom = `${footerHeight + 20}px`; // Add extra spacing if needed

    // Set the padding-top of the contact section to balance with the bottom padding
    contactSection.style.paddingTop = '40px';

    // Preload the initial background image for the hero section
    const initialImageUrl = images[currentIndex];
    preloadImage(initialImageUrl, function() {
        heroSection.style.backgroundImage = `url(${initialImageUrl})`;
    });

    // Show the pop-up when the page loads
    document.getElementById('popup').style.display = 'flex';
});

// Add a class to the header when the page is scrolled
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Apply customizations from the customization panel
function applyCustomizations() {
    // Hero section customizations
    const heroTitle = document.getElementById('hero-title-input').value;
    const heroDescription = document.getElementById('hero-description-input').value;
    const accentColor = document.getElementById('accent-color').value;

    if (heroTitle) {
        document.getElementById('hero-title').textContent = heroTitle;
    }

    if (heroDescription) {
        document.getElementById('hero-description').textContent = heroDescription;
    }

    if (accentColor) {
        // Apply accent color to various elements
        document.querySelector('.hero button').style.backgroundColor = accentColor;
        document.querySelectorAll('nav a').forEach(function(link) {
            link.style.color = accentColor;
        });
        document.querySelectorAll('button').forEach(function(button) {
            button.style.backgroundColor = accentColor;
        });
        document.querySelector('footer').style.backgroundColor = accentColor;

        // Store the accent color in a data attribute for export
        document.documentElement.setAttribute('data-accent-color', accentColor);
    }

    // About section customizations
    const aboutTitle = document.getElementById('about-title-input').value;
    const aboutDescription = document.getElementById('about-description-input').value;

    if (aboutTitle) {
        document.getElementById('about-title').textContent = aboutTitle;
    }

    if (aboutDescription) {
        document.getElementById('about-description').textContent = aboutDescription;
    }

    // User name customization for footer
    const userName = document.getElementById('user-name-input').value;

    if (userName) {
        document.getElementById('footer-text').textContent = `© 2024 ${userName}. All rights reserved.`;
    }
}

// Smooth scroll to the About section
function scrollToAbout() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}

// Function to close the pop-up
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Function to export the website as a zip file
function exportWebsite() {
    const zip = new JSZip();
    
    // Get the current accent color
    const accentColor = document.documentElement.getAttribute('data-accent-color') || '#0066cc';

    // HTML content excluding the customization panel and the pop-up
    const indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customizable Website Template</title>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section id="home" class="hero">
        <h1 id="hero-title">${document.getElementById('hero-title').textContent}</h1>
        <p id="hero-description">${document.getElementById('hero-description').textContent}</p>
        <button onclick="scrollToAbout()">Learn More</button>
    </section>

    <section id="about">
        <h2 id="about-title">${document.getElementById('about-title').textContent}</h2>
        <p id="about-description">${document.getElementById('about-description').textContent}</p>
    </section>

    <section id="contact">
        <h2>Contact Me</h2>
        <form id="contactForm">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            
            <button type="submit">Submit</button>
        </form>
    </section>

    <footer>
        <p id="footer-text">${document.getElementById('footer-text').textContent}</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
    `;

    // JavaScript content
    const scriptContent = `
function alertMessage() {
    alert("Thank you for clicking the button!");
}

document.getElementById("contactForm").addEventListener("submit", function(event){
    event.preventDefault();
    alert("Form submitted! Thank you, " + document.getElementById("name").value + ".");
});

const images = [
    'https://source.unsplash.com/random/1920x1080',
    'https://source.unsplash.com/random/1920x1080?sig=1',
    'https://source.unsplash.com/random/1920x1080?sig=2',
    'https://source.unsplash.com/random/1920x1080?sig=3',
    'https://source.unsplash.com/random/1920x1080?sig=4'
];

let currentIndex = 0;

function preloadImage(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = callback;
}

function changeBackgroundImage() {
    currentIndex = (currentIndex + 1) % images.length;
    const nextImageUrl = images[currentIndex];

    preloadImage(nextImageUrl, function() {
        const heroSection = document.querySelector('.hero');
        heroSection.style.backgroundImage = \`url(\${nextImageUrl})\`;
    });
}

setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds

// Adjust the margin-top of the hero section and padding of the contact section
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    const footer = document.querySelector('footer');
    const contactSection = document.querySelector('#contact');

    // Set the margin-top of the hero section based on the header height
    const headerHeight = header.offsetHeight;
    heroSection.style.marginTop = \`\${headerHeight}px\`;

    // Set the padding-bottom of the contact section based on the footer height
    const footerHeight = footer.offsetHeight;
    contactSection.style.paddingBottom = \`\${footerHeight + 20}px\`; // Add extra spacing if needed

    // Set the padding-top of the contact section to balance with the bottom padding
    contactSection.style.paddingTop = '40px';

    // Preload the initial background image for the hero section
    const initialImageUrl = images[currentIndex];
    preloadImage(initialImageUrl, function() {
        heroSection.style.backgroundImage = \`url(\${initialImageUrl})\`;
    });
});

// Add a class to the header when the page is scrolled
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Apply customizations from the customization panel
function applyCustomizations() {
    // Hero section customizations
    const heroTitle = document.getElementById('hero-title-input').value;
    const heroDescription = document.getElementById('hero-description-input').value;
    const accentColor = document.getElementById('accent-color').value;

    if (heroTitle) {
        document.getElementById('hero-title').textContent = heroTitle;
    }

    if (heroDescription) {
        document.getElementById('hero-description').textContent = heroDescription;
    }

    if (accentColor) {
        // Apply accent color to various elements
        document.querySelector('.hero button').style.backgroundColor = accentColor;
        document.querySelectorAll('nav a').forEach(function(link) {
            link.style.color = accentColor;
        });
        document.querySelectorAll('button').forEach(function(button) {
            button.style.backgroundColor = accentColor;
        });
        document.querySelector('footer').style.backgroundColor = accentColor;

        // Store the accent color in a data attribute for export
        document.documentElement.setAttribute('data-accent-color', accentColor);
    }

    // About section customizations
    const aboutTitle = document.getElementById('about-title-input').value;
    const aboutDescription = document.getElementById('about-description-input').value;

    if (aboutTitle) {
        document.getElementById('about-title').textContent = aboutTitle;
    }

    if (aboutDescription) {
        document.getElementById('about-description').textContent = aboutDescription;
    }

    // User name customization for footer
    const userName = document.getElementById('user-name-input').value;

    if (userName) {
        document.getElementById('footer-text').textContent = \`© 2024 \${userName}. All rights reserved.\`;
    }
}

// Smooth scroll to the About section
function scrollToAbout() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}
    `;

    // CSS content
    const styleContent = `
body {
    font-family: 'Raleway', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
}

header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: background-color 0.3s ease;
}

header.scrolled {
    background-color: rgba(51, 51, 51, 0.8);
}

nav ul {
    list-style: none;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
}

nav ul li {
    margin: 0 1rem;
}

nav ul li a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    position: relative;
}

nav ul li a::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #fff;
    transition: width 0.3s;
}

nav ul li a:hover::after {
    width: 100%;
}

.hero {
    position: relative;
    color: #fff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 1rem;
    background-size: cover;
    background-position: center;
    transition: background-image 1s ease-in-out;
    margin-top: 80px;
    overflow: hidden;
}

.hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.hero h1,
.hero p,
.hero button {
    position: relative;
    z-index: 2;
    animation: fadeInUp 1s ease-out forwards;
}

.hero h1 {
    font-size: 3rem;
    margin: 0;
    animation-delay: 0.2s;
}

.hero p {
    font-size: 1.5rem;
    margin: 1rem 0;
    animation-delay: 0.4s;
}

.hero button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    background-color: ${accentColor};
    color: #fff;
    cursor: pointer;
    margin-top: 1rem;
    animation-delay: 0.6s;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.hero button:hover {
    background-color: ${accentColor};
    transform: scale(1.1);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

section {
    padding: 4rem 1rem;
    text-align: center;
}

#about {
    background-color: #f4f4f4;
}

#contact {
    padding-top: 40px; /* Set top padding to balance with footer height */
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

form label {
    margin-top: 1rem;
}

form input,
form textarea {
    width: 100%;
    max-width: 400px;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 2px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
}

form input:focus,
form textarea:focus {
    border-color: ${accentColor};
}

form button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    background-color: ${accentColor};
    color: #fff;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

form button:hover {
    background-color: ${accentColor};
    transform: scale(1.1);
}

footer {
    background-color: ${accentColor};
    color: #fff;
    text-align: center;
    padding: 1rem 0;
    position: fixed;
    bottom: 0;
    width: 100%;
    transition: background-color 0.3s ease;
}

footer:hover {
    background-color: rgba(51, 51, 51, 0.8);
}

#customization-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: rgba(244, 244, 244, 0.1); /* Semi-transparent background */
    border-left: 1px solid #ddd;
    padding: 1rem;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1001;
    overflow-y: auto;
    opacity: 0.1;
    transition: opacity 0.3s ease;
}

#customization-panel:hover {
    opacity: 1; /* Fully opaque on hover */
    background-color: rgba(244, 244, 244, 0.9); /* Less transparent background on hover */
}

#customization-panel h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

#customization-panel label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
}

#customization-panel input[type="text"],
#customization-panel input[type="color"],
#customization-panel textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

#customization-panel button {
    margin-top: 1rem;
    padding: 0.5rem;
    width: 100%;
    border: none;
    background-color: ${accentColor};
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

#customization-panel button:hover {
    background-color: ${accentColor};
    transform: scale(1.05);
}
    `;

    zip.file("index.html", indexContent);
    zip.file("script.js", scriptContent);
    zip.file("styles.css", styleContent);

    zip.generateAsync({ type: "blob" })
        .then(function(content) {
            saveAs(content, "website.zip");
        });
}

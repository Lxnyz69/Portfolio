// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Set active page
    function setActivePage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId) {
                page.classList.add('active');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        
        // Update URL hash
        window.location.hash = pageId;
        
        // Scroll to top when changing pages on mobile
        if (window.innerWidth <= 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            setActivePage(pageId);
        });
    });
    
    // Handle browser back/forward
    window.addEventListener('hashchange', function() {
        const pageId = window.location.hash.substring(1);
        if (['home', 'about', 'projects'].includes(pageId)) {
            setActivePage(pageId);
        }
    });
    
    // Typing animation
    const texts = ['Web Developer', 'Gamer', 'Anime Enthusiast'];
    const typedTextElement = document.getElementById('typed-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Delete text
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            // Type text
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }
        
        // Check if text is complete
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1200; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 600; // Pause before starting next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 800);
    
    // Fix untuk animasi progress bar
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            // Reset width to 0 first
            bar.style.width = '0';
            
            // Get the target width from the data attribute or style attribute
            const targetWidth = bar.parentElement.nextElementSibling.textContent.replace('%', '');
            
            // Animate after a short delay
            setTimeout(() => {
                bar.style.width = targetWidth + '%';
            }, 300);
        });
    }
    
    // Animate skill bars when about page is active
    function handleAboutPageAnimation() {
        const aboutPage = document.getElementById('about');
        if (aboutPage.classList.contains('active')) {
            animateSkillBars();
        }
    }
    
    // Observe page changes to trigger animations
    const pageObserver = new MutationObserver(function(mutations) {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                handleAboutPageAnimation();
            }
        });
    });
    
    // Observe all pages
    pages.forEach(page => {
        pageObserver.observe(page, { attributes: true });
    });
    
    // Initial check
    handleAboutPageAnimation();
    
    // Handle window resize
    function handleResize() {
        const nav = document.querySelector('nav');
        if (window.innerWidth <= 768) {
            // Mobile - navbar at bottom
            nav.style.top = 'auto';
            nav.style.bottom = '0';
        } else {
            // Desktop - navbar at top
            nav.style.top = '0';
            nav.style.bottom = 'auto';
        }
    }
    
    // Initial call and event listener
    handleResize();
    window.addEventListener('resize', handleResize);
});

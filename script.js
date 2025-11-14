// Language functionality
document.addEventListener('DOMContentLoaded', function() {
    // Language elements
    const languageSelector = document.querySelector('.language-selector');
    const languageDropdown = document.getElementById('language-dropdown');
    const currentLanguage = document.getElementById('current-language');
    const languageLinks = document.querySelectorAll('.language-dropdown a');
    
    // Language data
    const translations = {
        en: {
            // Hero Section
            'hero-title': 'Experience Lightning-Fast Internet with Fiber Optics',
            'hero-description': 'Why choose an internet service provider that uses fiber optic technology? Because fiber optics deliver speeds up to 100x faster than traditional connections, with unmatched reliability and future-proof technology for your home or business.',
            'hero-btn-primary': 'Explore Services',
            'hero-btn-secondary': 'Contact Us',
            'feature-1-title': 'Fiber Optic Cables',
            'feature-1-desc': 'Light-speed data transmission',
            'feature-2-title': 'Advanced Modems',
            'feature-2-desc': 'Seamless connectivity',
            'feature-3-title': 'TV Decoders',
            'feature-3-desc': 'Crystal-clear entertainment',
            
            // Services Section
            'services-title': 'Our Services',
            'services-description': 'Discover our comprehensive range of communication and internet solutions',
            'service-1-title': 'NumeroLink',
            'service-1-desc': 'Premium television services with Creolink decoders for crystal-clear entertainment',
            'service-2-title': 'HomeLink',
            'service-2-desc': 'High-speed home internet with reliable modems for seamless connectivity',
            'service-3-title': 'OfficeLink',
            'service-3-desc': 'Enterprise-grade internet solutions for businesses with advanced networking',
            'service-4-title': 'Corporate',
            'service-4-desc': 'Custom solutions for large enterprises with dedicated support and infrastructure',
            
            // Products Section
            'products-title': 'Featured Products',
            'products-description': 'Check out our most popular electronics and networking items',
            'add-to-cart-btn': 'Add to Cart',
            'details-btn': 'Details',
            
            // Blog Section
            'blog-title': 'Latest from Our Blog',
            'blog-description': 'Stay updated with the latest trends in electronics and networking',
            'read-more-btn': 'Read More',
            
            // CTA Section
            'cta-title': 'Ready to Experience the Future of Internet?',
            'cta-description': 'Join thousands of satisfied customers who have switched to Creolink\'s fiber optic technology for faster, more reliable internet.',
            'cta-btn-primary': 'Get Started',
            'cta-btn-secondary': 'Contact Us',
            
            // Footer
            'quick-links-title': 'Quick Links',
            'services-footer-title': 'Our Services',
            'shop-title': 'Shop',
            'connect-title': 'Connect With Us'
        },
        fr: {
            // Hero Section
            'hero-title': 'Découvrez Internet Ultrafast avec la Fibre Optique',
            'hero-description': 'Pourquoi choisir un fournisseur d\'accès Internet qui utilise la technologie de fibre optique ? Parce que la fibre optique offre des vitesses jusqu\'à 100 fois plus rapides que les connexions traditionnelles, avec une fiabilité inégalée et une technologie tournée vers l\'avenir pour votre domicile ou votre entreprise.',
            'hero-btn-primary': 'Découvrir nos Services',
            'hero-btn-secondary': 'Nous Contacter',
            'feature-1-title': 'Câbles Fibre Optique',
            'feature-1-desc': 'Transmission de données à la vitesse de la lumière',
            'feature-2-title': 'Modems Avancés',
            'feature-2-desc': 'Connectivité sans interruption',
            'feature-3-title': 'Décodeurs TV',
            'feature-3-desc': 'Divertissement en qualité cristalline',
            
            // Services Section
            'services-title': 'Nos Services',
            'services-description': 'Découvrez notre gamme complète de solutions de communication et d\'Internet',
            'service-1-title': 'NumeroLink',
            'service-1-desc': 'Services de télévision premium avec décodeurs Creolink pour un divertissement de qualité cristalline',
            'service-2-title': 'HomeLink',
            'service-2-desc': 'Internet haut débit domestique avec des modems fiables pour une connectivité sans interruption',
            'service-3-title': 'OfficeLink',
            'service-3-desc': 'Solutions Internet de qualité entreprise avec mise en réseau avancée',
            'service-4-title': 'Entreprise',
            'service-4-desc': 'Solutions personnalisées pour les grandes entreprises avec support dédié et infrastructure',
            
            // Products Section
            'products-title': 'Produits en Vedette',
            'products-description': 'Découvrez nos articles électroniques et de réseau les plus populaires',
            'add-to-cart-btn': 'Ajouter au Panier',
            'details-btn': 'Détails',
            
            // Blog Section
            'blog-title': 'Derniers Articles de Notre Blog',
            'blog-description': 'Restez informé des dernières tendances en électronique et en réseau',
            'read-more-btn': 'Lire la Suite',
            
            // CTA Section
            'cta-title': 'Prêt à Découvrir l\'Avenir d\'Internet ?',
            'cta-description': 'Rejoignez des milliers de clients satisfaits qui sont passés à la technologie de fibre optique de Creolink pour un Internet plus rapide et plus fiable.',
            'cta-btn-primary': 'Commencer',
            'cta-btn-secondary': 'Nous Contacter',
            
            // Footer
            'quick-links-title': 'Liens Rapides',
            'services-footer-title': 'Nos Services',
            'shop-title': 'Boutique',
            'connect-title': 'Restez Connecté'
        }
    };

    // Toggle language dropdown
    languageSelector.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageSelector.contains(e.target)) {
            languageDropdown.classList.remove('active');
        }
    });

    // Language selection
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            languageDropdown.classList.remove('active');
        });
    });

    // Change language function
    function changeLanguage(lang) {
        currentLanguage.textContent = lang === 'en' ? 'English' : 'Français';
        
        // Update all translatable elements
        Object.keys(translations[lang]).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update button texts
        const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
        const detailsButtons = document.querySelectorAll('.btn-details');
        const readMoreButtons = document.querySelectorAll('.btn-read-more');
        
        addToCartButtons.forEach(btn => {
            if (btn.id === 'add-to-cart-btn' || !btn.id) {
                btn.textContent = translations[lang]['add-to-cart-btn'];
            }
        });
        
        detailsButtons.forEach(btn => {
            if (btn.id === 'details-btn' || !btn.id) {
                btn.textContent = translations[lang]['details-btn'];
            }
        });
        
        readMoreButtons.forEach(btn => {
            if (btn.id === 'read-more-btn' || !btn.id) {
                btn.textContent = translations[lang]['read-more-btn'];
            }
        });
        
        // Show language change confirmation
        showNotification(`Language changed to ${lang === 'en' ? 'English' : 'French'}`);
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    searchButton.addEventListener('click', function() {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            showNotification(`Searching for: ${searchTerm}`);
            // In a real implementation, this would redirect to search results
            searchInput.value = '';
        }
    }

    // Login/Signup buttons
    const loginBtn = document.querySelector('.btn-login');
    const signupBtn = document.querySelector('.btn-signup');
    
    loginBtn.addEventListener('click', function() {
        showNotification('Login functionality would open here');
    });
    
    signupBtn.addEventListener('click', function() {
        showNotification('Signup functionality would open here');
    });

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            let currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;
            
            // Add animation to cart icon
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 300);
            
            showNotification(`${productName} added to cart!`);
        });
    });

    // Details buttons
    const detailsBtns = document.querySelectorAll('.btn-details');
    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            showNotification(`Showing details for: ${productName}`);
        });
    });

    // Read more buttons
    const readMoreBtns = document.querySelectorAll('.btn-read-more');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const blogCard = this.closest('.blog-card');
            const blogTitle = blogCard.querySelector('.blog-title').textContent;
            showNotification(`Reading more about: ${blogTitle}`);
        });
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNotification(`Thank you for subscribing with: ${email}`);
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'success') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#e74c3c' : '#2ecc71'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
            header.style.background = 'var(--white)';
        }
    });

    // Initialize with English
    changeLanguage('en');
});

// Add CSS for notification
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(notificationStyles);
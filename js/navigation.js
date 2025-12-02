// Common Navigation Component with Mega Menu
(function() {
    // Navigation configuration
    const navConfig = {
        brand: {
            text: 'Interview Prep Guide',
            link: '../index.html'
        },
        cheatSheetSections: [
            { text: 'Core QA', href: '#core-qa', icon: '📋' },
            { text: 'Defects', href: '#defect-management', icon: '🐛' },
            { text: 'Git', href: '#git-commands', icon: '🔀' },
            { text: 'Playwright', href: '#playwright', icon: '🎭' },
            { text: 'Selectors', href: '#selectors', icon: '🎯' },
            { text: 'Jira', href: '#jira', icon: '📊' },
            { text: 'JavaScript', href: '#javascript', icon: '📜' }
        ],
        detailedPrep: [
            { text: 'Playwright', href: 'playwright-interview.html', id: 'playwright', icon: '🎭', count: 101, desc: 'Browser Automation' },
            { text: 'Git', href: 'git-interview.html', id: 'git', icon: '🔀', count: 70, desc: 'Version Control' },
            { text: 'Manual Testing', href: 'manual-testing-interview.html', id: 'manual-testing', icon: '🧪', count: 90, desc: 'QA Fundamentals' },
            { text: 'Jira', href: 'jira-interview.html', id: 'jira', icon: '📋', count: 85, desc: 'Project Management' },
            { text: 'Selenium Java', href: 'selenium-interview.html', id: 'selenium', icon: '🤖', count: 85, desc: 'WebDriver & Coding' },
            { text: 'QA Automation', href: 'qa-automation-interview.html', id: 'qa-automation', icon: '⚙️', count: 80, desc: 'Frameworks & CI/CD' },
            { text: 'E2E QA Interview', href: 'end-to-end-qa-interview.html', id: 'e2e-qa', icon: '🎯', count: 85, desc: 'Complete QA Guide' },
            { text: 'General Interview', href: 'general-interview.html', id: 'general', icon: '💼', count: 90, desc: 'HR & Technical' }
        ]
    };

    // Detect current page
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        
        if (filename === '' || filename === 'index.html') {
            return 'home';
        }
        
        return navConfig.detailedPrep.find(link => link.href === filename)?.id || '';
    }

    // Check if we're on a detailed prep page
    function isDetailedPrepPage() {
        const currentPage = getCurrentPage();
        return currentPage !== 'home' && currentPage !== '';
    }

    // Create navigation HTML
    function createNavigation() {
        const currentPage = getCurrentPage();
        const isHomePage = window.location.pathname.endsWith('index.html') || 
                          window.location.pathname.endsWith('/') ||
                          window.location.pathname === '';
        
        // Adjust links for home page (no pages/ prefix needed for detailed prep pages)
        const brandLink = isHomePage ? 'index.html' : navConfig.brand.link;
        const homeLink = isHomePage ? 'index.html' : '../index.html';
        
        // Create mega menu items
        const megaMenuItems = navConfig.detailedPrep.map(item => {
            const href = isHomePage ? `pages/${item.href}` : item.href;
            const activeClass = item.id === currentPage ? 'active' : '';
            return `
                <a href="${href}" class="mega-menu-item ${activeClass}">
                    <span class="mega-icon">${item.icon}</span>
                    <div class="mega-content">
                        <span class="mega-title">${item.text}</span>
                        <span class="mega-desc">${item.desc}</span>
                    </div>
                    <span class="mega-count">${item.count}Q</span>
                </a>`;
        }).join('');

        // Create cheat sheet sections for mega menu
        const cheatSheetItems = navConfig.cheatSheetSections.map(item => {
            const href = isHomePage ? item.href : `../index.html${item.href}`;
            return `
                <a href="${href}" class="mega-menu-section">
                    <span class="section-icon">${item.icon}</span>
                    <span class="section-text">${item.text}</span>
                </a>`;
        }).join('');

        const homeActiveClass = currentPage === 'home' ? 'active' : '';
        const prepActiveClass = isDetailedPrepPage() ? 'active' : '';

        return `
    <header class="site-header">
        <div class="container inner">
            <a href="${brandLink}" class="brand">${navConfig.brand.text}</a>
            <button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false">
                <span class="hamburger"></span>
            </button>
            <nav class="nav" aria-label="Primary">
                <div class="nav-item has-mega-menu">
                    <a href="${homeLink}" class="nav-link ${homeActiveClass}">
                        <span>📝</span> Cheat Sheet
                    </a>
                    <div class="mega-menu mega-menu-sections">
                        <div class="mega-menu-header">
                            <span class="mega-header-icon">📝</span>
                            <div>
                                <div class="mega-header-title">Quick Reference Cheat Sheet</div>
                                <div class="mega-header-desc">Essential concepts at a glance</div>
                            </div>
                        </div>
                        <div class="mega-menu-grid sections-grid">
                            ${cheatSheetItems}
                        </div>
                        <div class="mega-menu-footer">
                            <a href="${homeLink}" class="view-all-link">View Full Cheat Sheet →</a>
                        </div>
                    </div>
                </div>
                <div class="nav-item has-mega-menu">
                    <a href="#" class="nav-link ${prepActiveClass}" aria-haspopup="true">
                        <span>📚</span> Detailed Prep
                        <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                        </svg>
                    </a>
                    <div class="mega-menu mega-menu-prep">
                        <div class="mega-menu-header">
                            <span class="mega-header-icon">📚</span>
                            <div>
                                <div class="mega-header-title">Detailed Interview Preparation</div>
                                <div class="mega-header-desc">671 questions across 8 comprehensive topics</div>
                            </div>
                        </div>
                        <div class="mega-menu-grid">
                            ${megaMenuItems}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>`;
    }

    // Insert navigation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', insertNavigation);
    } else {
        insertNavigation();
    }

    function insertNavigation() {
        const navHTML = createNavigation();
        const progressBar = document.getElementById('progress');
        
        // Remove any existing header first
        const existingHeader = document.querySelector('header.site-header');
        if (existingHeader) {
            existingHeader.remove();
        }
        
        if (progressBar && progressBar.parentNode) {
            // Insert navigation after progress bar
            progressBar.insertAdjacentHTML('afterend', navHTML);
        } else {
            // Insert at the beginning of body if no progress bar
            document.body.insertAdjacentHTML('afterbegin', navHTML);
        }

        // Setup mega menu interactions
        setupMegaMenu();
        setupMobileMenu();
    }

    function setupMegaMenu() {
        const navItems = document.querySelectorAll('.nav-item.has-mega-menu');
        
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const megaMenu = item.querySelector('.mega-menu');
            
            // For touch devices
            let touchTimeout;
            
            // Prevent default click on Detailed Prep (dropdown only)
            link.addEventListener('click', (e) => {
                if (link.getAttribute('aria-haspopup') === 'true') {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });

            // Mouse interactions for desktop
            item.addEventListener('mouseenter', () => {
                clearTimeout(touchTimeout);
                item.classList.add('active');
            });

            item.addEventListener('mouseleave', () => {
                touchTimeout = setTimeout(() => {
                    item.classList.remove('active');
                }, 100);
            });

            // Keep menu open when hovering over it
            megaMenu.addEventListener('mouseenter', () => {
                clearTimeout(touchTimeout);
            });

            megaMenu.addEventListener('mouseleave', () => {
                touchTimeout = setTimeout(() => {
                    item.classList.remove('active');
                }, 100);
            });
        });

        // Close mega menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item.has-mega-menu')) {
                document.querySelectorAll('.nav-item.has-mega-menu').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.nav-item.has-mega-menu').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }

    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                nav.classList.toggle('nav-open');
                menuToggle.classList.toggle('active');
            });
        }
    }

    // Export for potential customization
    window.NavigationConfig = navConfig;
})();

// Progress bar functionality (common across pages)
window.addEventListener('scroll', () => {
    const progressBar = document.getElementById('progress');
    if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

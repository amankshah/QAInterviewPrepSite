// Common Navigation Component
(function() {
    // Navigation configuration
    const navConfig = {
        brand: {
            text: 'Interview Prep Guide',
            link: '../index.html'
        },
        links: [
            { text: 'Cheat Sheet', href: '../index.html', id: 'home' },
            { text: 'Playwright', href: 'playwright-interview.html', id: 'playwright' },
            { text: 'Git', href: 'git-interview.html', id: 'git' },
            { text: 'Manual Testing', href: 'manual-testing-interview.html', id: 'manual-testing' },
            { text: 'Jira', href: 'jira-interview.html', id: 'jira' },
            { text: 'Selenium', href: 'selenium-interview.html', id: 'selenium' },
            { text: 'QA Automation', href: 'qa-automation-interview.html', id: 'qa-automation' }
        ]
    };

    // Detect current page
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        
        if (filename === '' || filename === 'index.html') {
            return 'home';
        }
        
        return navConfig.links.find(link => link.href === filename)?.id || '';
    }

    // Create navigation HTML
    function createNavigation() {
        const currentPage = getCurrentPage();
        const isHomePage = window.location.pathname.endsWith('index.html') || 
                          window.location.pathname.endsWith('/');
        
        // Adjust links for home page (no ../ needed)
        const brandLink = isHomePage ? 'index.html' : navConfig.brand.link;
        
        const navLinks = navConfig.links.map(link => {
            const href = isHomePage ? `pages/${link.href}` : link.href;
            const activeClass = link.id === currentPage ? 'class="active"' : '';
            return `<a href="${href}" ${activeClass}>${link.text}</a>`;
        }).join('\n                ');

        return `
    <header class="site-header">
        <div class="container inner">
            <a href="${brandLink}" class="brand">${navConfig.brand.text}</a>
            <nav class="nav" aria-label="Primary">
                ${navLinks}
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
        
        if (progressBar && progressBar.parentNode) {
            // Insert navigation after progress bar
            progressBar.insertAdjacentHTML('afterend', navHTML);
        } else {
            // Insert at the beginning of body if no progress bar
            document.body.insertAdjacentHTML('afterbegin', navHTML);
        }

        // Remove any existing static header
        const existingHeaders = document.querySelectorAll('header.site-header');
        if (existingHeaders.length > 1) {
            existingHeaders[1].remove();
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


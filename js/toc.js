// Table of Contents Generator
(function() {
    function generateTOC() {
        // Find all category headers
        const categories = document.querySelectorAll('.category-header');
        if (categories.length === 0) return;

        // Create TOC container
        const toc = document.createElement('aside');
        toc.className = 'toc-sidebar';
        toc.innerHTML = `
            <div class="toc-title">📑 Contents</div>
            <ul class="toc-list" id="toc-list"></ul>
        `;

        const tocList = toc.querySelector('#toc-list');

        // Generate TOC items from categories and questions
        categories.forEach((category, index) => {
            const icon = category.querySelector('.category-icon')?.textContent || '';
            const title = category.querySelector('.category-title')?.textContent || '';
            const categoryId = category.id;

            // Add category header
            const categoryLi = document.createElement('li');
            categoryLi.innerHTML = `<a href="#${categoryId}" data-target="${categoryId}" class="toc-category">${icon} ${title}</a>`;
            tocList.appendChild(categoryLi);

            // Find all questions in this category
            let nextSection = category.nextElementSibling;
            const questionsUl = document.createElement('ul');
            questionsUl.className = 'toc-questions';
            
            if (nextSection && nextSection.classList.contains('qa-grid')) {
                const cards = nextSection.querySelectorAll('.qa-card');
                cards.forEach((card, qIndex) => {
                    const questionNumber = card.querySelector('.qa-number')?.textContent || '';
                    const questionText = card.querySelector('.qa-question-text')?.textContent || '';
                    
                    // Truncate long questions
                    const truncatedText = questionText.length > 50 
                        ? questionText.substring(0, 50) + '...' 
                        : questionText;
                    
                    // Add unique ID to each card for navigation
                    const cardId = `q${questionNumber}`;
                    card.id = cardId;
                    
                    const qLi = document.createElement('li');
                    qLi.innerHTML = `<a href="#${cardId}" data-target="${cardId}" class="toc-question">Q${questionNumber}: ${truncatedText}</a>`;
                    questionsUl.appendChild(qLi);
                });
                
                if (questionsUl.children.length > 0) {
                    categoryLi.appendChild(questionsUl);
                }
            }
        });

        // Insert TOC into page
        const main = document.querySelector('main');
        if (main) {
            main.parentNode.insertBefore(toc, main);
        }

        // Add active state on scroll
        setupScrollSpy();

        // Smooth scroll for TOC links
        toc.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(link.dataset.target);
                if (target) {
                    const offset = 140; // Account for sticky header + nav
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Toggle category sections
        toc.querySelectorAll('.toc-category').forEach(categoryLink => {
            categoryLink.addEventListener('click', (e) => {
                const questionsUl = categoryLink.parentElement.querySelector('.toc-questions');
                if (questionsUl && e.target === categoryLink) {
                    categoryLink.classList.toggle('collapsed');
                }
            });
        });

        // Add class to body to indicate sidebar is present
        document.body.classList.add('has-toc-sidebar');
        
        // Make main content aware of sidebar
        if (window.innerWidth > 1024) {
            const containers = document.querySelectorAll('main .container, .hero .container');
            containers.forEach(container => {
                container.classList.add('content-with-sidebar');
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const containers = document.querySelectorAll('main .container, .hero .container');
            if (window.innerWidth > 1024) {
                containers.forEach(container => {
                    container.classList.add('content-with-sidebar');
                });
            } else {
                containers.forEach(container => {
                    container.classList.remove('content-with-sidebar');
                });
            }
        });
    }

    function setupScrollSpy() {
        const tocLinks = document.querySelectorAll('.toc-list a');
        const allTargets = Array.from(document.querySelectorAll('[id]')).filter(el => 
            el.classList.contains('category-header') || el.classList.contains('qa-card')
        );

        function updateActiveLink() {
            const scrollPosition = window.scrollY + 200;

            let currentSection = '';
            allTargets.forEach(target => {
                const sectionTop = target.offsetTop;
                if (scrollPosition >= sectionTop) {
                    currentSection = target.id;
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.target === currentSection) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', generateTOC);
    } else {
        generateTOC();
    }
})();


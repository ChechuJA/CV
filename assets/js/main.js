document.addEventListener('DOMContentLoaded', () => {
    // Active link handling for sidebar
    const links = document.querySelectorAll('.sidebar-menu a');
    
    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Simulate "Loading Resources" toast on load
    showToast('Initializing Security Dashboard...');
    
    setTimeout(() => {
        showToast('Secure Score Synchronized: 98%', 'success');
    }, 1500);

    setupGlobalSearch();
});

function setupGlobalSearch() {
    const input = document.getElementById('global-search-input');
    const resultsContainer = document.getElementById('global-search-results');

    if (!input || !resultsContainer) {
        return;
    }

    const searchableNodes = [
        ...document.querySelectorAll('.card, .timeline-item, tbody tr, .cert-badge, .skill-item')
    ];

    const searchIndex = searchableNodes
        .map((node, index) => {
            const sectionAnchor = node.id ? node : node.closest('[id]');
            if (!sectionAnchor || !sectionAnchor.id) {
                return null;
            }

            const titleNode = node.querySelector('.card-title, .timeline-title, th, strong');
            const title = (titleNode?.textContent || sectionAnchor.id).trim();
            const text = node.textContent.replace(/\s+/g, ' ').trim();

            return {
                id: `${sectionAnchor.id}-${index}`,
                anchorId: sectionAnchor.id,
                title,
                text
            };
        })
        .filter(Boolean);

    let visibleResults = [];
    let activeIndex = -1;

    const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const buildSnippet = (text, term) => {
        const index = text.toLowerCase().indexOf(term.toLowerCase());
        if (index === -1) {
            return text.slice(0, 120);
        }

        const start = Math.max(0, index - 45);
        const end = Math.min(text.length, index + term.length + 65);
        return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`;
    };

    const highlight = (value, term) => {
        if (!term) {
            return value;
        }
        const regex = new RegExp(`(${escapeRegex(term)})`, 'ig');
        return value.replace(regex, '<mark>$1</mark>');
    };

    const renderResults = (items, term) => {
        if (!items.length) {
            resultsContainer.innerHTML = '<div class="search-empty">No results found. Try another keyword.</div>';
            resultsContainer.classList.add('visible');
            return;
        }

        resultsContainer.innerHTML = items
            .map((item, idx) => {
                const snippet = buildSnippet(item.text, term);
                return `
                    <button class="search-result-item ${idx === activeIndex ? 'active' : ''}" data-anchor="${item.anchorId}" type="button">
                        <div class="search-result-title">${highlight(item.title, term)}</div>
                        <div class="search-result-snippet">${highlight(snippet, term)}</div>
                    </button>
                `;
            })
            .join('');

        resultsContainer.classList.add('visible');
    };

    const activateSidebarLink = (anchorId) => {
        const links = document.querySelectorAll('.sidebar-menu a');
        links.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${anchorId}`);
        });
    };

    const navigateTo = (anchorId) => {
        const target = document.getElementById(anchorId);
        if (!target) {
            return;
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.remove('search-focus-target');
        void target.offsetWidth;
        target.classList.add('search-focus-target');
        activateSidebarLink(anchorId);

        setTimeout(() => {
            target.classList.remove('search-focus-target');
        }, 1400);
    };

    const performSearch = (term) => {
        if (!term || term.trim().length < 2) {
            visibleResults = [];
            activeIndex = -1;
            resultsContainer.classList.remove('visible');
            resultsContainer.innerHTML = '';
            return;
        }

        const normalized = term.toLowerCase().trim();
        visibleResults = searchIndex
            .map((entry) => {
                const titleMatch = entry.title.toLowerCase().includes(normalized);
                const textMatch = entry.text.toLowerCase().includes(normalized);
                if (!titleMatch && !textMatch) {
                    return null;
                }

                return {
                    ...entry,
                    score: (titleMatch ? 8 : 0) + (textMatch ? 2 : 0)
                };
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8);

        activeIndex = visibleResults.length ? 0 : -1;
        renderResults(visibleResults, term);
    };

    input.addEventListener('input', (event) => {
        performSearch(event.target.value);
    });

    input.addEventListener('keydown', (event) => {
        if (!visibleResults.length && event.key !== 'Escape') {
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            activeIndex = Math.min(activeIndex + 1, visibleResults.length - 1);
            renderResults(visibleResults, input.value);
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            activeIndex = Math.max(activeIndex - 1, 0);
            renderResults(visibleResults, input.value);
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            if (activeIndex >= 0 && visibleResults[activeIndex]) {
                navigateTo(visibleResults[activeIndex].anchorId);
                resultsContainer.classList.remove('visible');
            }
        }

        if (event.key === 'Escape') {
            resultsContainer.classList.remove('visible');
        }
    });

    resultsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.search-result-item');
        if (!button) {
            return;
        }

        const anchorId = button.getAttribute('data-anchor');
        if (anchorId) {
            navigateTo(anchorId);
            resultsContainer.classList.remove('visible');
        }
    });

    document.addEventListener('click', (event) => {
        const searchContainer = document.getElementById('global-search-container');
        if (!searchContainer?.contains(event.target)) {
            resultsContainer.classList.remove('visible');
        }
    });
}

function showToast(message, type = 'info') {
    // Simple toast notification simulation
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = type === 'success' ? '#107c10' : '#0078d4';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    toast.style.zIndex = '1000';
    toast.style.fontFamily = 'Segoe UI, sans-serif';
    toast.style.animation = 'fadeIn 0.3s ease-in-out';
    
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

const sections = ['store', 'about', 'shipping', 'recipes', 'blog'];

function loadContent(page) {
    const section = document.getElementById(page);
    if (section) {
        fetch(`${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Page not found');
                }
                return response.text();
            })
            .then(html => {
                section.innerHTML = html;
            })
            .catch(error => {
                section.innerHTML = `<h1>404</h1><p>${error.message}</p>`;
            });
    } else {
        console.error('Section not found');
    }
}

function navigate(page) {
    const section = document.getElementById(page);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, '', `#${page}`);
    } else {
        console.error('Section not found');
    }
}

export function initializeRouter() {
    document.addEventListener('DOMContentLoaded', () => {
        sections.forEach(loadContent);

        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = event.target.getAttribute('href').substring(1);
                navigate(targetId);
            });
        });

        const hash = window.location.hash.substring(1);
        if (hash) {
            navigate(hash);
        } else {
            navigate('store');
        }
    });

    window.onpopstate = () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            navigate(hash);
        } else {
            navigate('store');
        }
    };
}

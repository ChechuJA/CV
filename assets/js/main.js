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
});

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

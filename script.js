document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('actionBtn');
    const message = document.getElementById('message');
    
    let clickCount = 0;
    
    button.addEventListener('click', () => {
        clickCount++;
        message.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}! 🎉`;
        message.classList.add('show');
        
        // Add a subtle animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});


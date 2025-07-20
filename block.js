// Código para bloquear F12, Ctrl+U y click derecho
(function() {
    // Bloquear F12
    window.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
        }
    });

    // Bloquear click derecho
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // Bloquear Ctrl+U
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
        }
    });
})();

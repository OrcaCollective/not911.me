
(function() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const themeToggleButton = document.querySelector('.theme-toggle');
    const darkSchemePreference = prefersDarkScheme ? 'dark' : 'light';
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : darkSchemePreference;

    if (currentTheme === 'dark') {
        document.body.classList.toggle('dark');
        themeToggleButton.setAttribute('aria-pressed', true);
    }  else if (currentTheme == 'light') {
        document.body.classList.toggle('light');
        themeToggleButton.setAttribute('aria-pressed', false);
    }

    themeToggleButton.addEventListener('click', handleThemeToggle);

    function handleThemeToggle(e) {
        document.body.classList.toggle('light');
        document.body.classList.toggle('dark');

        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") { // "Spacebar" for IE11 support
            // Prevent the default action to stop scrolling when space is pressed
            e.preventDefault();
            toggleButton(e.target);
          }

        const theme = document.body.classList.contains('light') ? 'light' : 'dark';
        const ariaPressed = document.body.classList.contains('light') ? false : true;
        
        themeToggleButton.setAttribute('aria-pressed', ariaPressed);
        localStorage.setItem('theme', theme);
    }
})();
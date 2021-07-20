
(function() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const themeToggleButton = document.querySelector('.theme-toggle');
    const darkSchemePreference = prefersDarkScheme ? 'dark' : 'light';
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : darkSchemePreference;
    const rootElement = document.querySelector(':root');

    if (currentTheme === 'dark') {
        rootElement.classList.toggle('dark');
        themeToggleButton.setAttribute('aria-pressed', true);
    }  else if (currentTheme == 'light') {
        rootElement.classList.toggle('light');
        themeToggleButton.setAttribute('aria-pressed', false);
    }

    themeToggleButton.addEventListener('click', handleThemeToggle);

    function handleThemeToggle(e) {
        rootElement.classList.toggle('light');
        rootElement.classList.toggle('dark');

        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") { // "Spacebar" for IE11 support
            // Prevent the default action to stop scrolling when space is pressed
            e.preventDefault();
            toggleButton(e.target);
          }

        const theme = rootElement.classList.contains('light') ? 'light' : 'dark';
        const ariaPressed = rootElement.classList.contains('light') ? false : true;
        
        themeToggleButton.setAttribute('aria-pressed', ariaPressed);
        localStorage.setItem('theme', theme);
    }
})();
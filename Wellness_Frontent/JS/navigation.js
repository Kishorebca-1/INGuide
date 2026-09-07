(function setupWellnessNavigation() {
    if (!document.querySelector('link[data-global-navigation-style]')) {
        const stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = "../CSS/global-navigation.css";
        stylesheet.dataset.globalNavigationStyle = "true";
        document.head.appendChild(stylesheet);
    }

    if (!document.querySelector('script[src$="global-navigation.js"]')) {
        const globalNavigationScript = document.createElement("script");
        globalNavigationScript.src = "../JS/global-navigation.js";
        document.body.appendChild(globalNavigationScript);
    }

    const pageRoutes = {
        Dashboard: "../Dashboard/dashboard.html",
        "Mood, Journal & Progress": "../Mood & Journal/Mood.html",
        "Support & Guidance": "../Support/support.html",
        "Relax & Activities": "../Support/support.html",
        "Wellness Resources": "../Support/support.html",
        "Reminders, Habits & Profile": "../Dashboard/dashboard.html"
    };

    document.querySelectorAll(".nav-item[data-page], .sidebar-menu a").forEach(item => {
        item.addEventListener("click", event => {
            const label = item.dataset.page ||
                item.querySelector("span")?.textContent.trim() ||
                item.textContent.trim();
            const page = label.includes("Mood, Journal")
                ? "Mood, Journal & Progress"
                : label.includes("Support & Guidance")
                    ? "Support & Guidance"
                    : label.includes("Relax & Activities")
                        ? "Relax & Activities"
                        : label.includes("Wellness Resources")
                            ? "Wellness Resources"
                            : label.includes("Profile")
                                ? "Reminders, Habits & Profile"
                                : "Dashboard";
            const destination = pageRoutes[page];

            if (!destination) return;

            event.preventDefault();
            window.location.href = destination;
        });
    });
})();
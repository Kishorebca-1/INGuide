(function initializeGlobalNavigation() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const displayName = user?.name || user?.fullName || "Kishore";

    document.querySelectorAll(".profile-button strong, #userName").forEach(element => {
        if (element.id === "userName") {
            element.textContent = `${displayName}!`;
        } else {
            element.textContent = displayName;
        }
    });

    document.querySelectorAll(".nav-item, .sidebar-menu .nav-item").forEach(item => {
        const target = item.getAttribute("href") || "";
        const page = item.dataset.page || "";
        const current = window.location.pathname;

        const active = (page === "Dashboard" && current.includes("Dashboard/dashboard"))
            || (page === "Mood, Journal & Progress" && current.includes("Mood%20%26%20Journal"))
            || (page === "Support & Guidance" && current.includes("Support/"));

        if (active || target && current.endsWith(target.replace("../", ""))) {
            item.classList.add("active");
        }
    });
})();
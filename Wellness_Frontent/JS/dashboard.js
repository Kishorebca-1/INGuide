const token = localStorage.getItem("token");
let user = null;

try {
  user = JSON.parse(localStorage.getItem("user"));
} catch (error) {
  localStorage.removeItem("user");
}

const loginPath = "Authentication/Login.html";
const requiredRole = document.body.dataset.role;

if (!token || !user) {
  window.location.href = loginPath;
} else if (requiredRole === "admin" && user.role !== "admin") {
  window.location.href = "dashboard.html";
} else if (requiredRole !== "admin" && user.role === "admin") {
  window.location.href = "admin-dashboard.html";
} else {
  const welcome = document.getElementById("welcome");
  const dashboardLabel = requiredRole === "admin" ? "Admin" : "User";
  welcome.textContent = `Welcome ${dashboardLabel}: ${user.email}`;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = loginPath;
}

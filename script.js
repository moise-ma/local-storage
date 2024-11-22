// Elements
const switchToSignup = document.getElementById("switch-to-signup");
const switchToLogin = document.getElementById("switch-to-login");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const formTitle = document.getElementById("form-title");
const dashboard = document.getElementById("dashboard");
const currentUser = document.getElementById("current-user");
const userTable = document.querySelector("#user-table tbody");
const logoutBtn = document.getElementById("logout-btn");

// Switch Forms
switchToSignup.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    formTitle.textContent = "Sign Up";
});

switchToLogin.addEventListener("click", () => {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    formTitle.textContent = "Login";
});

// Signup
document.getElementById("signup-btn").addEventListener("click", () => {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (username && password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.some(user => user.username === username)) {
            alert("User already exists!");
        } else {
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! You can now login.");
            signupForm.reset();
            switchToLogin.click();
        }
    } else {
        alert("Please fill in all fields.");
    }
});

// Login
document.getElementById("login-btn").addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            currentUser.textContent = username;
            loginForm.classList.add("hidden");
            dashboard.classList.remove("hidden");
            displayUsers();
        } else {
            alert("Invalid username or password.");
        }
    } else {
        alert("Please fill in all fields.");
    }
});

// Logout
logoutBtn.addEventListener("click", () => {
    dashboard.classList.add("hidden");
    loginForm.classList.remove("hidden");
    formTitle.textContent = "Login";
    loginForm.reset();
});

// Display Users
function displayUsers() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    userTable.innerHTML = "";
    users.forEach((user, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.password}</td>
        </tr>`;
        userTable.innerHTML += row;
    });
}
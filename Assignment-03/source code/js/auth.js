let users = JSON.parse(localStorage.getItem("users")) || [
  { email: "admin@fashionhub.com", password: "admin123" }
];

function register() {
  const email = regEmail.value;
  const password = regPassword.value;

  if (!email || !password) return alert("Fill all fields");

  if (users.find(u => u.email === email))
    return alert("User already exists");

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully");
  window.location.href = "login.html";
}

function login() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return alert("Invalid credentials");

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loggedUser", email);
  window.location.href = "index.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// Simulated user data
const users = {
    tech: { password: "tech123", role: "tech" },
    media: { password: "media123", role: "media" },
  };
  
  let currentUser = null;
  
  // Show admin panel
  document.querySelector("nav ul").innerHTML +=
    '<li><a href="#" onclick="toggleAdminPanel()">Admin</a></li>';
  
  function toggleAdminPanel() {
    const adminPanel = document.getElementById("adminPanel");
    adminPanel.classList.toggle("hidden");
  }
  
  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (users[username] && users[username].password === password) {
      currentUser = { username, role: users[username].role };
      document.getElementById("loginForm").classList.add("hidden");
      document.getElementById("updateForm").classList.remove("hidden");
      loadContent();
    } else {
      alert("Invalid credentials");
    }
  }
  
  function logout() {
    currentUser = null;
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("updateForm").classList.add("hidden");
  }
  
  function loadContent() {
    const section = document.getElementById("sectionSelect").value;
    const content =
      localStorage.getItem(section) ||
      document.querySelector(`#${section} p`).innerHTML;
    document.getElementById("contentInput").value = content;
  }
  
  function updateContent() {
    if (!currentUser) return;
  
    const section = document.getElementById("sectionSelect").value;
    const content = document.getElementById("contentInput").value;
  
    if (
      currentUser.role === "tech" ||
      (currentUser.role === "media" && section !== "contact")
    ) {
      localStorage.setItem(section, content);
      document.querySelector(`#${section} p`).innerHTML = content;
      alert("Content updated successfully");
    } else {
      alert("You do not have permission to update this section");
    }
  }
  
  // Event listeners
  document
    .getElementById("sectionSelect")
    .addEventListener("change", loadContent);
  
  // Initial content load
  document.querySelectorAll("main section").forEach((section) => {
    const storedContent = localStorage.getItem(section.id);
    if (storedContent) {
      section.querySelector("p").innerHTML = storedContent;
    }
  });
  
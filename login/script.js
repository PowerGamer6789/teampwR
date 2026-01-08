import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2B6GywfjWNvYoPvBsM97Z_Q0YK1Y736Y",
  authDomain: "pwr-gamingreimagined.firebaseapp.com",
  projectId: "pwr-gamingreimagined",
  storageBucket: "pwr-gamingreimagined.firebasestorage.app",
  messagingSenderId: "1031733683542",
  appId: "1:1031733683542:web:772729552ffce628a1e2f7",
  measurementId: "G-SKQX2P9LVR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const status = document.getElementById("status");

// Convert username → fake email
function usernameToEmail(username) {
  return `${username.toLowerCase()}@team.pwr`;
}

// Get the 'afterLogin' URL param
function getAfterLoginParam() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("afterLogin");
}

// Extract only the domain (scheme + host)
function extractDomain(url) {
  try {
    const parsed = new URL(url);
    return parsed.origin; // just https://domain.tld
  } catch {
    return null;
  }
}

// Compute final redirect
function getRedirectURL() {
  const param = getAfterLoginParam();
  const domain = extractDomain(param);
  return domain || "/"; // fallback to root
}

// LOGIN BUTTON
document.getElementById("login").onclick = () => {
  const email = usernameToEmail(usernameInput.value.trim());
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      status.style.display = "none";
      // redirect ONLY on login click
      window.location.href = getRedirectURL();
    })
    .catch(err => {
      status.textContent = err.message;
      status.style.display = "block";
    });
};

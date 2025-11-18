// src/services/api.js
import { auth } from "../lib/firebase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

/**
 * Generic fetch wrapper that automatically attaches Firebase ID token
 * @param {string} endpoint - API endpoint (e.g., '/auth/signin')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<object>} - Parsed JSON response
 */
export async function apiCall(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Get the current user's ID token if authenticated
  if (auth.currentUser) {
    const idToken = await auth.currentUser.getIdToken();
    headers["Authorization"] = `Bearer ${idToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Sign up with email and password
 * Creates a Firebase user and sends user info to backend
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @returns {Promise<object>} - User data from backend
 */
export async function signUp(email, password, name) {
  const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
  
  // Create Firebase user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
  // Update display name in Firebase
  await updateProfile(userCredential.user, { displayName: name });

  // Send user info to backend
  const idToken = await userCredential.user.getIdToken();
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: idToken,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to register user");
  }

  return response.json();
}

/**
 * Sign in with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} - User data from backend
 */
export async function signIn(email, password) {
  const { signInWithEmailAndPassword } = await import("firebase/auth");
  
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();

  // Call backend signin endpoint (creates user in DB if missing)
  const signinUrl = `${API_BASE_URL}/auth/signin`;
  const response = await fetch(signinUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: idToken,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (response.status === 404) {
      throw new Error(`Backend endpoint not found. Is the server running at ${API_BASE_URL}?`);
    }
    throw new Error(error.detail || "Failed to sign in");
  }

  return response.json();
}

/**
 * Sign in with Google
 * @returns {Promise<object>} - User data from backend
 */
export async function signInWithGoogle() {
  const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
  
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  
  const idToken = await userCredential.user.getIdToken();

  // Send Google sign-in to backend
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: idToken,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to sign in with Google");
  }

  return response.json();
}

/**
 * Sign out the current user
 */
export async function signOut() {
  await auth.signOut();
}

/**
 * Send password reset email
 * @param {string} email
 */
export async function sendPasswordReset(email) {
  const { sendPasswordResetEmail } = await import("firebase/auth");
  await sendPasswordResetEmail(auth, email);
}

/**
 * Verify email OTP (Firebase handles this natively)
 * For custom OTP, implement via backend endpoint
 */
export async function verifyEmailOTP(otp) {
  // This is typically handled by Firebase's built-in email verification
  // If you need custom OTP, call backend: apiCall('/auth/verify-email', { method: 'POST', body: JSON.stringify({ otp }) })
  return apiCall('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ otp }),
  });
}

/**
 * Get current user's ID token
 * @returns {Promise<string|null>} - ID token or null if not authenticated
 */
export async function getCurrentToken() {
  if (!auth.currentUser) return null;
  return await auth.currentUser.getIdToken();
}

/**
 * Get current user info
 * @returns {object|null} - User object or null if not authenticated
 */
export function getCurrentUser() {
  return auth.currentUser;
}

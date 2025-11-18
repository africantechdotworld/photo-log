# Frontend Changes Tracking

This file tracks all files that have been edited during the current work session.

## Files Modified

### 1. `src/services/api.js`
**Changes made:**
- Fixed `signUp()` function to send token in request body instead of Authorization header (matches backend `TokenRequest` format)
- Fixed `signIn()` function to call `/auth/signin` endpoint instead of `/me` endpoint
- Fixed `signInWithGoogle()` function to send token in request body instead of Authorization header
- Added better error handling for 404 errors in `signIn()` function

**Date:** Current session

---

### 2. `src/pages/Signup.jsx`
**Changes made:**
- Added error handling for `operation-not-allowed` Firebase error to show user-friendly message
- Updated successful signup redirect to navigate to `/verify-email` page instead of home page
- Pass email to verify email page via navigation state

**Date:** Current session

---

### 3. `src/pages/VerifyEmail.jsx`
**Changes made:**
- Updated to receive email from navigation state (from signup page)
- Added `useLocation` hook to access route state
- Email now displays the actual user email instead of placeholder

**Date:** Current session

---

## Notes
- All changes are frontend-only
- Backend code was not modified (as per team guidelines)
- Backend issues identified but not fixed (reported to backend team)


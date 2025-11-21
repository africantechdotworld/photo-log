# Frontend Changes Tracking

This file tracks all files that have been edited during the current work session.

## Files Modified

### 1. `src/services/api.js`
**Changes made:**
- Fixed `signUp()` function to send token in request body instead of Authorization header (matches backend `TokenRequest` format)
- Fixed `signIn()` function to call `/auth/signin` endpoint instead of `/me` endpoint
- Fixed `signInWithGoogle()` function to send token in request body instead of Authorization header
- Added better error handling for 404 errors in `signIn()` function
- Added `sendEmailVerification()` function to send email verification link via Firebase and notify backend
- Added `checkEmailVerification()` function to check if email is verified by reloading user and checking emailVerified status

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
- **Complete rewrite:** Removed OTP input system, replaced with verification link approach
- Added "I've verified my email" button that checks verification status and redirects if verified
- Added "Resend verification email" button with 60-second cooldown
- Added success/error message displays
- Updated UI to show instructions for using verification link instead of OTP
- Added troubleshooting section with helpful tips

**Date:** Current session

---

### 4. `src/pages/Signin.jsx`
**Changes made:**
- Added email verification check after successful signin
- If email is not verified, automatically sends verification email via Firebase
- Redirects to `/verify-email` page if email is not verified
- Redirects to home page if email is verified
- Applied same logic to both email/password and Google sign-in flows

**Date:** Current session

---

### 5. `src/pages/EventDashboard.jsx`
**Changes made:**
- **Removed all mock/demo data**
- Connected to real backend API using `getEvents()` function
- Added loading state with loading indicator
- Added error handling and error message display
- Updated to use real event data structure from backend:
  - `photo_count` instead of `photoCount`
  - `is_active` and `is_archived` instead of `status`
  - `cover_thumbnail_url` and `cover_image_url` instead of `coverPhoto`
  - `share_link` for event links
- Implemented real delete functionality with `deleteEvent()` API call
- Updated stats calculations to use real data:
  - Total Events: actual count from API
  - Total Photos: sum of `photo_count` from all events
  - Active Events: count of active, non-archived events
- Updated QR code generation to use actual event share links
- Added delete confirmation and loading state during deletion
- Removed view count (not available in current API)
- Updated event status badges to show Active/Inactive/Archived based on real data

**Date:** Current session

---

### 6. `src/services/api.js`
**Changes made:**
- Added `getEvents(page, pageSize)` function to fetch events list from backend
- Added `getEvent(eventId)` function to fetch single event details
- Added `deleteEvent(eventId)` function to delete an event
- Added `getEventQRCode(eventId)` function (for future use when backend implements it)
- Added `createEvent(eventData)` function to create a new event
- Added `uploadEventCover(eventId, file)` function to upload cover image for an event

**Date:** Current session

---

### 7. `src/pages/CreateEvent.jsx`
**Changes made:**
- **Removed all mock/demo data**
- Connected to real backend API using `createEvent()` and `uploadEventCover()` functions
- Updated form submission to:
  - Create event via API with real data (name, description, date, password)
  - Convert date input to ISO datetime format for backend
  - Upload cover photo after event creation (if provided)
  - Handle cover upload errors gracefully (event still created even if cover fails)
- Added loading state with "Creating Event..." button text
- Added error handling and error message display
- Updated success page to use real event data:
  - Display actual event name
  - Generate QR code using real event share link or ID
  - Show actual event share link
- Updated "Create Another Event" to reset all form state including errors

**Date:** Current session

---

### 8. `src/pages/HostGallery.jsx`
**Changes made:**
- **Removed all mock/demo data**
- Connected to real backend API using `getEvent()` and `getEventPhotos()` functions
- Added loading state with loading indicator
- Added error handling with error message display and fallback UI
- Fetches event and photos data on component mount using `useEffect`
- Updated to use real event data structure:
  - `share_link` for event links
  - `date` from event object
  - Removed view count (not available in API)
- Updated to use real photo data structure:
  - `thumbnail_url` or `url` for photo display
  - `caption` from photo object
  - `id` for photo identification
- Implemented real delete functionality:
  - Single photo delete with `deletePhoto()` API call
  - Bulk photo delete with `bulkDeletePhotos()` API call
  - Event delete with `deleteEvent()` API call (navigates to dashboard after)
  - Updates local state after successful deletion
  - Shows loading state during deletion (disabled buttons)
- Updated QR code generation to use actual event share links
- Removed view count display (not available in current API)
- Photo grid uses thumbnail URLs when available, falls back to full URL

**Date:** Current session

---

### 9. `src/services/api.js`
**Changes made:**
- Added `getEventPhotos(eventId, page, pageSize)` function to fetch photos for an event
- Added `deletePhoto(eventId, photoId)` function to delete a single photo
- Added `bulkDeletePhotos(eventId, photoIds)` function to delete multiple photos

**Date:** Current session

---

## Notes
- All changes are frontend-only
- Backend code was not modified (as per team guidelines)
- Backend issues identified but not fixed (reported to backend team)


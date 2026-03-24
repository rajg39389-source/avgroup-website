/* ═══════════════════════════════════════════════
   AV GROUP — FIREBASE CONFIGURATION
   ✅ Already filled with your project values
═══════════════════════════════════════════════ */

const firebaseConfig = {
  apiKey:            "AIzaSyDSMIX8Da5Sm-8LV-zkO8tD9lbAKRxkMho",
  authDomain:        "avgroup-website.firebaseapp.com",
  projectId:         "avgroup-website",
  storageBucket:     "avgroup-website.firebasestorage.app",
  messagingSenderId: "1098171889011",
  appId:             "1:1098171889011:web:b18ef90970249bacc20106"
};

/* ── ADMIN EMAIL ──
   This is the email that will have admin access.
   Change this to Vikas or Hemant's real email address.
   After uploading, REGISTER on the website using this exact email.
   You will automatically be sent to the Admin Dashboard.
*/
/* ── ADMIN EMAILS ──
   Both these emails have full admin access.
   Add more emails here if needed in future.
*/
const ADMIN_EMAIL  = "guptaraj2921@gmail.com";       // Developer admin
const ADMIN_EMAIL2 = "chourasiyavikas42@gmail.com";  // Client admin

// Helper function — checks if any email is admin
const isAdmin = (email) => email === ADMIN_EMAIL || email === ADMIN_EMAIL2;

/* DO NOT EDIT BELOW THIS LINE */
export { firebaseConfig, ADMIN_EMAIL, ADMIN_EMAIL2, isAdmin };

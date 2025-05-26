// components/Auth/SocialAuth.js
import styles from "../styles/AthSvr.module.css";

export default function SocialAuth({ action }) {
  const handleGoogleAuth = () => {
    // Implement Google OAuth
    window.location.href = `/api/auth/google?action=${action}`;
  };

  return (
    <div className={styles.socialAuth}>
      <button
        type="button"
        onClick={handleGoogleAuth}
        className={styles.socialButton}
      >
        <img
          src="/google-icon.png"
          alt="Google"
          className={styles.socialIcon}
        />
        {action === "login" ? "Login with Google" : "Register with Google"}
      </button>
    </div>
  );
}

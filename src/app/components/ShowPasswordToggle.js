// components/Auth/ShowPasswordToggle.js
import Styles from "../styles/AthSvr.module.css";
export default function ShowPasswordToggle({ showPassword, setShowPassword }) {
  return (
    <div className="form-check mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id="showPassword"
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
      />
      <label htmlFor="showPassword" className={Styles.formCheckLabel}>
        Show Password
      </label>
    </div>
  );
}

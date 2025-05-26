// components/Layout/Footer.js
import Link from "next/link";
import styles from "@/app/styles/fTrsvr.module.css";
export default function Footer() {
  return (
    <footer className={styles.footCopy}>
      <div className={styles.openSans}>
        <p>
          &copy; {new Date().getFullYear()} Auth System. All rights reserved.
        </p>
      </div>
      <div className={styles.footList}>
        <div className={styles.openSans}>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Help</Link>
        </div>
      </div>
      <div className={styles.footIcon}>
        <p className={styles.openSans}>Contact Us:</p>
        <Link href="#" className="fab fa-instagram"></Link>
        <Link href="#" className="fas fa-envelope"></Link>
        <Link href="#" className="fab fa-whatsapp"></Link>
        <Link href="#" className="fab fa-facebook"></Link>
        <Link href="#" className="fab fa-twitter"></Link>
        <Link href="#" className="fab fa-linkedin"></Link>
      </div>
    </footer>
  );
}

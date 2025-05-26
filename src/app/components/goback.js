"use client";
import styles from "@/app/styles/addsvr.module.css";
import sty from "@/app/styles/crdsvr.module.css";
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // This uses the client-side browser history API
  };

  return (
    <button onClick={handleGoBack} className={styles.icn}>
      <FiArrowLeft />
      <h2 className={sty.brdcrmUsr}>Dashboard</h2>
    </button>
  );
}

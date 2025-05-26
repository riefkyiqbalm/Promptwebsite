// components/Layout/MainLayout.js
// import { url } from 'inspector';
import { Html } from "next/document";
import Footer from "../components/Footer";
import Head from "next/head";
import styles from "../styles/Auth.module.css";
// import image from '../../assets/FROMPROMPTv1.gif'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}

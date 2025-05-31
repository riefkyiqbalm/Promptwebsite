// components/Layout/MainLayout.js
// import { url } from 'inspector';
import Footer from "../components/Footer";
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

import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.",
  openGraph:{
    title: "NoteHub",
    description: "NoteHub is a simple and efficient application designed for managing personal notes. It helps keep your thoughts organized and accessible in one place, whether you are at home or on the go.",
    url: `${process.env.base_url}`,
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt : "notehub img",
    }]
  }
};

export default function RootLayout({children,modal}: Readonly<{children: React.ReactNode;modal: React.ReactNode;}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>        
        <TanStackProvider>
          <AuthProvider>
            <Header/>
            <main>{children}{modal}</main>
            <Footer/>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}

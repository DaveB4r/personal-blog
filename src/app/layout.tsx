"use client";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from "@nextui-org/react";
import MyNavBar from "@/components/Navbar";
import AuthContextProvider from "@/contexts/page";
import Footer from "@/components/Footer";
import Aside from '@/components/Aside';
import { CategoryElement } from "@/components/Categories";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>JDP personal blog</title>
        <link
          rel="shortcut icon"
          href="/images/favicon.svg"
          type="image/x-icon"
        />
      </head>
      <body>
        <AuthContextProvider>
          <NextUIProvider>
            <MyNavBar options={["home", "blog"]} />
            <main className=" w-screen my-1 ">
              <section className="grid main-section">
                <Aside>
                  <CategoryElement />
                </Aside>
                {children}
              </section>
            </main>

            <Footer />
          </NextUIProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
};
export default RootLayout;

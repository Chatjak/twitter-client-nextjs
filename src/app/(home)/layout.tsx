import { Sidebar } from "@/components/Sidebar";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getCurrentUser } from "@/util/getFunction";
import BottomBar from "@/components/BottomBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter clone",
  description: "Twitter clone by chatjak",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const User = await getCurrentUser()
  console.log(User);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className=" max-w-6xl mx-auto  flex relative">
          <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full  ">
            <Sidebar username={User.username} />
          </div>
          <div className="xl:ml-[285px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-2xl">
            {children}
          </div>
          <BottomBar username={User.username} />
        </main>
      </body>
    </html>
  );
}

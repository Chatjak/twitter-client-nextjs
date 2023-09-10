export const metadata = {
  title: "Twitter clone",
  description: "project for portfolio's chatjak",
};
import "../globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="max-w-xl mx-auto h-screen">
          <div className=" flex justify-center items-center w-full h-full p-2">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

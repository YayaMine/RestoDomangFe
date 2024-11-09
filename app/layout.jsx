import { Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-unbounded',
});

export const metadata = {
  title: "Domang Sushi",
  description: "The Best Sushi in Gianyar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${unbounded.variable} font-unbounded antialiased`}>
        <main className="w-full h-full">{children}</main>
      </body>
    </html>
  );
}
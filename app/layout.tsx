import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { getMetadata } from "@/lib/metadata";
import Providers from "@/providers";
import { GlobalWrapperScrollProvider } from "@/providers/GlobalWrapperScrollProvider";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const generateMetadata = async () => {
  return getMetadata({});
};
export const viewport = { width: "device-width", initialScale: 1 };
export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await currentUser();
  // const IconTransformCodeFragment = await fs.readFileSync(
  //   "./components/IconTransform/index.tsx",
  //   "utf-8"
  // );
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/@waline/client@v3/dist/waline.css" />
      </head>

      <body className={`${inter.className} antialiased`}>
        <Providers
          codeFragments={[
            {
              title: "IconTransform",
              fragment: `IconTransformCodeFragment`
            }
          ]}
        >
          <GlobalWrapperScrollProvider>
            <Nav />
            <div className="mx-auto">{children}</div>
            <Footer />
          </GlobalWrapperScrollProvider>
        </Providers>
      </body>
    </html>
  );
}

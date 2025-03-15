import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { getMetadata } from "@/lib/metadata";
import Providers from "@/providers";
import { GlobalWrapperScrollProvider } from "@/providers/GlobalWrapperScrollProvider";
import "@/styles/global.scss";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });
export const generateMetadata = async ({ params }) => {
  return getMetadata({});
};
export const viewport = { width: "device-width", initialScale: 1 };
export default async function RootLayout({
  children,
  params: { lng }
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dicts = await getMessages(lng);
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
          lng={lng}
          dicts={dicts}
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

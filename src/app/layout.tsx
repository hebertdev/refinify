import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Notifications } from "@mantine/notifications";
import { Header } from "components/Header";
import { getTokenServer } from "helpers/auth";
import { Navbar } from "components/Navbar";
import NextTopLoader from "nextjs-toploader";

//providers
import { UserContextProvider } from "contexts/UserContext";

export const metadata: Metadata = {
  title: "RefiniFy | Transforma Tus Imágenes con AI.",
  description:
    "RefiniFy es la app ideal para transformar tus imágenes con IA. Aplica filtros y efectos que convierten tus fotos en impresionantes obras de arte. ¡Diviértete creando y compartiendo momentos únicos!",
  openGraph: {
    images: [
      "https://raw.githubusercontent.com/hebertdev/hebertdev/refs/heads/master/img/refinify_banner_Web.webp",
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getTokenServer(); // Espera a que se obtenga el token
  return (
    <html lang="es">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextTopLoader color="#ff7006" height={3} />
        <MantineProvider theme={theme}>
          <UserContextProvider>
            <Notifications />
            {!token ? (
              <>
                <Header />
                {children}
              </>
            ) : (
              <>
                <div className="w-full flex justify-between">
                  <Navbar />
                  <div className="w-full">{children}</div>
                </div>
              </>
            )}
          </UserContextProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

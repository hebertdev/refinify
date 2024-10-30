import { getTokenServer } from "helpers/auth";
import type { Metadata } from "next";

//components
import {
  Banner,
  Features,
  PlayWithImages,
} from "components/pages/Home/Landing";
import { Feed } from "components/pages/Home/Feed";
import { Center } from "@mantine/core";

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

export default async function HomePage() {
  const token = await getTokenServer();
  return (
    <>
      {!token ? (
        <>
          <Banner />
          <Features />
          <PlayWithImages />
          <Center mb={"xl"}>
            <a href="https://hebertdev.com" target="_blank">
              By @hebertdev
            </a>
          </Center>
        </>
      ) : (
        <>
          <Feed />
        </>
      )}
    </>
  );
}

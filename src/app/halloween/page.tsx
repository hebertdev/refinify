import type { Metadata } from "next";
//components
import { Container } from "components/pages/Halloween";

export const metadata: Metadata = {
  title: "RefiniFy | Transforma el Fondo de tu foto con un Toque de Halloween",
  description:
    "RefiniFy es la app ideal para transformar tus imágenes con IA. Sube tu imagen, ya sea con tu disfraz de Halloween o un look cotidiano, y ¡descubre la magia que te espera!",
  openGraph: {
    images: [
      "https://raw.githubusercontent.com/hebertdev/hebertdev/refs/heads/master/img/refinify_banner_Web.webp",
    ],
  },
};

export default function HalloweenPage() {
  return (
    <>
      <Container />
    </>
  );
}

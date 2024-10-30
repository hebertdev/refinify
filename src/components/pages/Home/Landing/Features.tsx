import { Container } from "@mantine/core";

export function Features() {
  return (
    <>
      <Container size={"xl"} mt={"xl"}>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Comience aquí tu{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
            viaje creativo
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <img
            src="https://res.cloudinary.com/hebertdev1/image/upload/v1729936126/enyeqklchjrah49rltg6.png"
            alt="Product image without background"
            className="rounded-lg w-full"
          />
          <div className="space-y-4">
            <h2 className="font-semibold text-3xl mb-2">
              Filtros y Superposiciones
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Transforma tus imágenes con una variedad de filtros personalizados
              y superposiciones creativas. Añade un toque artístico o un
              ambiente específico a tus fotos, dándoles vida y personalidad
              únicas.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-semibold text-3xl mb-2">Auto Adaptable</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Nuestro editor ajusta automáticamente el tamaño y la calidad de
              tus imágenes, garantizando resultados perfectos en cualquier
              formato. Ya sea para redes sociales, impresión o cualquier otro
              uso, siempre tendrás la mejor versión de tu foto.
            </p>
          </div>

          <img
            src="https://res.cloudinary.com/hebertdev1/image/upload/v1729935941/responsive_ipun41.png"
            alt="Before and after image enhancement"
            className="rounded-lg w-full"
          />
        </div>
      </Container>
    </>
  );
}

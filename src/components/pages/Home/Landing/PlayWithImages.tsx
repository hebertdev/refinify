"use client";

import { Container } from "@mantine/core";
import { useState } from "react";

interface Image {
  title: string;
  src: string;
}

export function PlayWithImages() {
  const [activeCategory, setActiveCategory] = useState<string>("Personas");

  const categories: string[] = ["Personas", "Animales", "Productos", "Autos"];

  const images: Record<string, Image[]> = {
    Personas: [
      {
        title: "Original",
        src: "https://sb.kaleidousercontent.com/67418/604x802/ed396e87c5/people-1.jpg",
      },
      {
        title: "Nuevo Fondo",
        src: "https://sb.kaleidousercontent.com/67418/604x802/b8d74bcca6/people-skater-floor-fix.png",
      },
      {
        title: "Potencial Infinito",
        src: "https://sb.kaleidousercontent.com/67418/604x802/e74824a7ae/people-endless-possibilities.jpg",
      },
    ],
    Animales: [
      {
        title: "Original",
        src: "https://sb.kaleidousercontent.com/67418/604x802/12fffeabf0/animal-1.jpg",
      },

      {
        title: "Nuevo Fondo",
        src: "https://sb.kaleidousercontent.com/67418/604x802/574efac004/animals-new-background.jpg",
      },
      {
        title: "Potencial Infinito",
        src: "https://sb.kaleidousercontent.com/67418/604x802/b985b55a49/animals-endless-possibilities.png",
      },
    ],
    Productos: [
      {
        title: "Original",
        src: "https://sb.kaleidousercontent.com/67418/604x802/65b5c440b8/prodcut-2.jpg",
      },

      {
        title: "Nuevo Fondo",
        src: "https://sb.kaleidousercontent.com/67418/604x802/fd1beb254d/prodcut-2-bg-2.jpg",
      },
      {
        title: "Potencial Infinito",
        src: "https://sb.kaleidousercontent.com/67418/604x802/94e1042920/product-endless-possibilitiess.jpg",
      },
    ],
    Autos: [
      {
        title: "Original",
        src: "https://sb.kaleidousercontent.com/67418/604x802/e61e5c6800/cars-image1.png",
      },

      {
        title: "Nuevo Fondo",
        src: "https://sb.kaleidousercontent.com/67418/604x802/0a4d979048/cars-image3.png",
      },
      {
        title: "Potencial Infinito",
        src: "https://sb.kaleidousercontent.com/67418/604x802/934a4239b5/cars-image4.png",
      },
    ],
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <Container size={"xl"} mt={"xl"}>
      <div className="text-gray-800 dark:text-white min-h-screen transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Juega con tus{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text">
                imágenes!
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images[activeCategory].map((image, index) => (
              <div key={index}>
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full object-cover rounded-xl overflow-hidden"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-center">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

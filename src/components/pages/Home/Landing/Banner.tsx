"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Button, Card, Container } from "@mantine/core";
import { IconPlayerPlay, IconPumpkinScary, IconX } from "@tabler/icons-react";
import { aiTools } from "constants/aiTools";

export function Banner() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    videoRefs.current[index]?.play();
  };

  const handleMouseLeave = (index: number) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0; // Reinicia el video
    }
  };

  return (
    <>
      <Container size={"xl"}>
        <section className="text-center mb-16 h-[calc(100vh-60px)] flex items-center justify-center">
          <div>
            <h1 className="text-4xl md:text-7xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              El editor de fotos IA{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fc3131] to-[#ff8605]">
                más fácil
              </span>
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
              Tu solución gratuita de edición de fotos con IA. Crea imágenes
              profesionales y da vida a tus ideas.
            </p>
            <div className="flex gap-2 m-auto items-center justify-center">
              <Link href={"/account/signup"}>
                <Button size="lg" radius={"xl"}>
                  Comienza gratis
                </Button>
              </Link>
              <ButtonPlayer />
            </div>
            <Link href={"/halloween"}>
              <Button
                size="lg"
                radius={"xl"}
                variant="light"
                mt={"md"}
                leftSection={<IconPumpkinScary />}
                className="title-halloween"
              >
                Tu fondo de Halloween gratis
              </Button>
            </Link>
            <div className="estorbo" />
          </div>
        </section>
      </Container>

      <Container size={"xl"}>
        <section className="mb-16">
          <h2 className="text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#ff8605] to-[#fc3131]">
            Herramientas AI para Fotos
          </h2>
          <p className="text-2xl text-gray-700 dark:text-gray-400 mb-8 text-center">
            Descubre todas las herramientas de diseño y generación de imágenes
            con IA. Edita tus fotos como un verdadero profesional.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aiTools.map((tool, index) => {
              return (
                <Card
                  key={index}
                  withBorder
                  p={0}
                  radius={"lg"}
                  className="overflow-hidden"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={tool.video}
                    className="w-full h-[250px] object-cover"
                    muted
                    loop
                    style={{ userSelect: "none" }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tool.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </Container>
    </>
  );
}
function ButtonPlayer() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <>
      <Button size="lg" radius={"xl"} onClick={openLightbox}>
        <IconPlayerPlay />
      </Button>
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[1000]">
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={closeLightbox}
          >
            <IconX size={24} />
          </button>
          <div
            className="min-h-[95%] max-h-[95%] overflow-hidden flex items-center justify-center min-w-[95%] max-w-[95%] w-full h-full"
            onClick={closeLightbox}
          >
            <video
              onClick={(e) => e.stopPropagation()}
              src={
                "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1721925769/AI_Features.mp4"
              }
              loop
              autoPlay
              className="max-w-[90%] max-h-[90%] min-h-[200px] rounded-[20px] overflow-hidden"
            />
          </div>
        </div>
      )}
    </>
  );
}

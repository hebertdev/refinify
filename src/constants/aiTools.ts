// Define un tipo para las herramientas de IA
interface Tool {
  id: string;
  name: string;
  description: string;
  video: string;
}

export const aiTools: Tool[] = [
  {
    id: "tool-001",
    name: "Fondo Creativo",
    description:
      "Transforma tus fotos antiguas creando fondos sorprendentes con tecnología de inteligencia artificial.",
    video:
      "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722037142/BG-replace.mp4",
  },
  {
    id: "tool-002",
    name: "Relleno Avanzado",
    description:
      "Amplía tus imágenes de manera fluida y precisa, adaptándose a cualquier tamaño sin perder calidad.",
    video:
      "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722373003/gen-fill.mp4",
  },
  {
    id: "tool-003",
    name: "Restaurador de Imágenes",
    description:
      "Revitaliza fotos antiguas eliminando imperfecciones y devolviéndoles su esplendor original.",
    video:
      "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722372995/gen-restore.mp4",
  },
  {
    id: "tool-004",
    name: "Aumentador de Imágenes",
    description:
      "Escala tus imágenes a cualquier tamaño manteniendo una calidad impresionante y cada detalle.",
    video:
      "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722373221/gen-upscale.mp4",
  },
  {
    id: "tool-005",
    name: "Recoloración Instantánea",
    description:
      "Crea variantes de productos en múltiples colores al instante, sin necesidad de ediciones manuales.",
    video:
      "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1704911199/Demos_Generative-Recolor.mp4",
  },
  {
    id: "tool-006",
    name: "Intercambiador de Objetos",
    description:
      "Sustituye objetos en tus imágenes utilizando simples descripciones en lenguaje natural.",
    video:
      "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722623260/gen-replace.mp4",
  },
  {
    id: "tool-007",
    name: "Eliminador de Elementos",
    description:
      "Remueve objetos no deseados de tus imágenes, logrando un resultado limpio y profesional.",
    video:
      "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1704912685/Demos_Generative-Remove.mp4",
  },
];

// Herramientas de IA disponibles
// const toolsAi: Tool[] = [
//   {
//     name: "Reemplazo de Fondos",
//     description:
//       "Transforma tus fotos antiguas al crear nuevos y sorprendentes fondos.",
//     video:
//       "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722037142/BG-replace.mp4",
//   },
//   {
//     name: "Relleno Generativo",
//     description:
//       "Expande tus imágenes de manera fluida con IA para ajustarse a cualquier tamaño.",
//     video:
//       "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722373003/gen-fill.mp4",
//   },
//   {
//     name: "Restauración de Imágenes",
//     description:
//       "Revitaliza fotos antiguas eliminando artefactos e imperfecciones.",
//     video:
//       "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722372995/gen-restore.mp4",
//   },
//   {
//     name: "Aumento de Imágenes",
//     description: "Amplía tus imágenes a cualquier tamaño sin perder calidad.",
//     video:
//       "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722373221/gen-upscale.mp4",
//   },
//   {
//     name: "Recoloración generativa",
//     description:
//       "Produzca variantes de productos basadas en colores con IA generativa, eliminando la necesidad de edición manual o nuevas tomas.",
//     video:
//       "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1704911199/Demos_Generative-Recolor.mp4",
//   },
//   {
//     name: "Reemplazo generativo",
//     description:
//       "Intercambie objetos en primer plano con indicaciones en lenguaje natural e IA generativa.",
//     video:
//       "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722623260/gen-replace.mp4",
//   },
//   {
//     name: "Eliminación de Objetos No Deseados",
//     description:
//       "Quita elementos indeseados de tus imágenes generadas por usuarios.",
//     video:
//       "https://cloudinary-marketing-res.cloudinary.com/video/upload/v1704912685/Demos_Generative-Remove.mp4",
//   },
// ];

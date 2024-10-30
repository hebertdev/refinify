"use client";

import {
  IconDownload,
  IconGhost,
  IconSparkles,
  IconUpload,
} from "@tabler/icons-react";
import { DropzoneButton } from "./Dropzone";
import { Box, Button, Center, LoadingOverlay, Select } from "@mantine/core";
import { useEffect, useState } from "react";

import { promptsBgReplace } from "constants/promptsBgReplace";
import { bgReplaceHalloweenAPI } from "services/files";
import { showNotification } from "components/Notifications";

export function Container() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [retryTime, setRetryTime] = useState<number>(15000);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleBuildParams = () => {
    const newParams: Array<{
      effect?: string;
      crop?: string;
      aspect_ratio?: string;
      background?: string;
    }> = [];
    newParams.push({
      effect: `gen_background_replace:prompt_an ${
        promptsBgReplace.find((prompt) => prompt.value === selectedPrompt)
          ?.label_en
      }`,
    });
    if (aspectRatio && aspectRatio !== "original") {
      newParams.push({
        crop: "pad",
        aspect_ratio: aspectRatio,
        background: "gen_fill",
      });
    }
    return newParams;
  };

  const handleSubmitTransformation = async () => {
    if (!imagePreview) return;
    if (!selectedPrompt) {
      showNotification({
        title: "Error",
        message: "Selecciona un prompt",
        color: "red",
      });
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      if (!publicId) {
        formData.append("file", files[0]);
      } else {
        formData.append("public_id", publicId);
      }
      formData.append("params", JSON.stringify(handleBuildParams())); // Convierte el array a JSON
      const data = await bgReplaceHalloweenAPI(formData);
      setPublicId(data.public_id);
      if (data.url) {
        const imageUrl = data.url;
        const img = new Image();
        img.onload = () => {
          setLoading(false);
          setNewImage(imageUrl);
        };
        img.onerror = () => {
          setLoading(false);
          setError(true);
          showNotification({
            title: "Error",
            message:
              "No se pudo transformar la imagen, intente nuevamente o pruebe otro prompt.",
            color: "red",
          });
        };
        img.src = imageUrl;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const downloadImage = async (imageUrl: string, event: React.MouseEvent) => {
    event.preventDefault();
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = ""; // Proporciona un nombre de archivo si es necesario
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (error && retryTime > 0) {
      timer = setInterval(() => {
        setRetryTime((prev) => {
          if (prev <= 1000) {
            clearInterval(timer);
            setError(false);
            return 15000; // Reset the retry time
          }
          return prev - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Clean up the interval on unmount
  }, [error, retryTime]);

  useEffect(() => {
    setPublicId(null);
    setNewImage(null);
    setSelectedPrompt(null);
    setAspectRatio(null);
  }, [files]);

  return (
    <>
      {isLoaded && (
        <div className="flex h-[calc(100vh-65px)] bg-gray-900">
          <div className="absolute inset-0 overflow-hidden ">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-900 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-purple-900 to-transparent opacity-50" />
            <svg
              className="absolute top-0 left-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="spider-web"
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 0 L100 100 M100 0 L0 100 M50 0 L50 100 M0 50 L100 50"
                    stroke="rgba(255,165,0,0.1)"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#spider-web)"
              />
            </svg>
          </div>
          <IconGhost
            className="absolute top-20 left-10 text-orange-500 opacity-50 animate-bounce"
            size={48}
          />
          <IconGhost
            className="absolute bottom-10 right-10 text-orange-500 opacity-50 animate-bounce"
            size={48}
          />
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>

          {/* Tools Column */}
          <div className="h-full overflow-auto"></div>

          {/* Image Preview Column */}
          <div className="flex-1 pl-4 pr-4 pb-[5px] pt-[10px] flex flex-col">
            <div className="flex justify-between items-center  min-h-[50px] mb-[10px] ">
              <div className=" items-center space-x-2 w-full">
                {imagePreview && (
                  <Center>
                    <Button
                      leftSection={<IconUpload />}
                      variant="light"
                      onClick={() => {
                        setImagePreview(null);
                        setNewImage(null);
                      }}
                      disabled={error || loading}
                    >
                      Subir otra imagen
                    </Button>
                  </Center>
                )}
              </div>
            </div>
            <Box className="relative flex-1  rounded-lg flex items-center justify-center overflow-hidden md:min-h-[calc(100vh - 140px)] md:min-h-[calc(100vh - 160px)]">
              <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
              />
              {newImage ? (
                <>
                  <>
                    <div className="relative min-h-[90%] max-h-[90%] overflow-hidden flex items-center justify-center min-w-[90%]  max-w-[90%] w-[100%] h-[100%]">
                      <img
                        src={newImage}
                        alt="Image Preview"
                        style={{
                          height: "auto",
                          width: "auto",
                          maxWidth: "80%",
                          maxHeight: "90%",
                          minHeight: "300px",
                          backgroundImage: `
                        linear-gradient(45deg, #ccc 25%, transparent 25%),
                        linear-gradient(-45deg, #ccc 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #ccc 75%),
                        linear-gradient(-45deg, transparent 75%, #ccc 75%)
                      `,
                          backgroundSize: "10px 10px",
                          backgroundPosition: "0 0, 0 5px, 5px -5px, -5px 0px",
                        }}
                      />
                      <div className="flex gap-[5px] items-center pt-[10px] w-full absolute bottom-0 left-0 right-0 justify-end">
                        <Button
                          size="xs"
                          leftSection={<IconDownload />}
                          disabled={loading}
                          onClick={(event) => downloadImage(newImage, event)}
                        >
                          Descargar
                        </Button>
                      </div>
                    </div>
                  </>
                </>
              ) : (
                <DropzoneButton
                  setImagePreview={setImagePreview}
                  imagePreview={imagePreview}
                  setFiles={setFiles}
                />
              )}
            </Box>
            <Box className="h-[90px] md:h-[60px] border-t border-gray-300 dark:border-[var(--mantine-color-dark-4)] w-full  md:flex  items-center justify-between ">
              {imagePreview && (
                <>
                  <Box className="flex items-center gap-2 ">
                    <Select
                      placeholder="Selecciona un prompt"
                      value={selectedPrompt}
                      onChange={setSelectedPrompt}
                      data={promptsBgReplace
                        .filter(
                          (prompt) => prompt.category === "halloween-background"
                        )
                        .map((prompt) => ({
                          value: prompt.value,
                          label: prompt.label_es,
                        }))}
                      disabled={error}
                    />
                    <Select
                      data={[
                        {
                          value: "original",
                          label: "Original aspect ratio",
                        },
                        {
                          value: "9:16",
                          label: "Instagram story (9/16)",
                        },
                        {
                          value: "1:1",
                          label: "Instagram post (1/1)",
                        },
                        {
                          value: "3:4",
                          label: "Instagram post (3/4)",
                        },
                      ]}
                      placeholder="Selecciona un formato"
                      value={aspectRatio}
                      onChange={setAspectRatio}
                      disabled={error}
                    />
                  </Box>
                  <Button
                    leftSection={<IconSparkles />}
                    onClick={handleSubmitTransformation}
                    loading={loading}
                    className="w-full md:w-auto mt-2 md:mt-0"
                    disabled={error}
                  >
                    {error
                      ? `Intente de nuevo en ${retryTime / 1000} sec`
                      : "Generar"}
                  </Button>
                </>
              )}
            </Box>
          </div>

          {/* Image Changes Column */}
          <div className="h-full overflow-auto">
            <div className="space-y-4 w-full"></div>
          </div>
        </div>
      )}
    </>
  );
}

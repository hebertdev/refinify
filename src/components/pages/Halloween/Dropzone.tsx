import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Text,
  Group,
  Button,
  rem,
  useMantineTheme,
  Center,
  Box,
  Modal,
  Card,
  Image,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import {
  IconCloudUpload,
  IconX,
  IconDownload,
  IconTrash,
  IconUpload,
  IconPhoto,
} from "@tabler/icons-react";
import classes from "./Dropzone.module.css";
import { getFilesAPI, uploadFileAPI } from "services/files";
import { showNotification } from "components/Notifications";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";

interface DropzoneProps {
  imagePreview: any;
  setImagePreview: any;
  setFiles: any;
}

export function DropzoneButton({
  imagePreview,
  setImagePreview,
  setFiles,
}: DropzoneProps) {
  const router = useRouter();
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFiles(acceptedFiles);
    if (file) {
      if (file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
      }
    }
  };

  const handleRemoveImage = () => {
    setFiles([]);
    setImagePreview(null);
  };

  return (
    <div className="relative min-h-[90%] max-h-[90%] overflow-hidden flex items-center justify-center min-w-[90%]  max-w-[90%] w-[100%] h-[100%]">
      {!imagePreview ? (
        <div>
          <h1 className="text-2xl md:text-5xl font-extrabold text-orange-500 mb-4 tracking-tighter title-halloween text-center">
            Transforma el Fondo de tu foto con un Toque de Halloween
          </h1>
          <p className="text-lg md:text-xl text-orange-200 mb-8 text-center">
            Sube tu imagen, ya sea con tu disfraz de Halloween o un look
            cotidiano, y ¡descubre la magia que te espera!
          </p>
          <Dropzone
            openRef={openRef}
            onDrop={handleDrop} // Cambié onDrop para manejar los archivos
            className="border-2 border-dashed border-gray-300 dark:border-[var(--mantine-color-dark-4)] mb-[10px] rounded-lg"
            radius="md"
            accept={[
              MIME_TYPES.jpeg,
              MIME_TYPES.png,
              MIME_TYPES.webp,
              MIME_TYPES.avif,
            ]}
            maxSize={30 * 1024 ** 2}
            maxFiles={1}
          >
            <div style={{ pointerEvents: "none", padding: "10px" }}>
              <Group justify="center">
                <Dropzone.Accept>
                  <IconDownload
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload
                    color="white"
                    style={{ width: rem(50), height: rem(50) }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
              </Group>

              <Text ta="center" fw={700} fz="lg" mt="xl">
                <Dropzone.Accept>Drop File here</Dropzone.Accept>
                <Dropzone.Reject>
                  Only .jpg, .png and .webp files
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <Text className="text-white">Upload Image</Text>
                </Dropzone.Idle>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed" p={10}>
                Arrastra y suelta una imagen aquí para subir. Solo se aceptan
                imágenes en <i>.jpg</i>, <i>.png</i> y <i>.webp</i>, con un
                tamaño máximo de 5 MB.
              </Text>
            </div>
          </Dropzone>
          <Center>
            <Box className="flex gap-2">
              <Button
                className={classes.control}
                size="md"
                radius="xl"
                onClick={() => openRef.current?.()}
                mt={"10px"}
                leftSection={<IconUpload />}
              >
                Sube una imagen
              </Button>
            </Box>
          </Center>
        </div>
      ) : (
        <>
          <img
            src={imagePreview}
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
              bg={"red"}
              leftSection={<IconTrash />}
              onClick={handleRemoveImage}
            >
              Quitar imagen
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

import { Accordion, Box, Button, rem, Select, Text } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { FileData } from "interfaces/files";
import React, { useEffect, useState } from "react";
import { aiTools } from "constants/aiTools";
import { categoriesBgReplace } from "constants/categoriesBgReplace";
import { promptsBgReplace } from "constants/promptsBgReplace";
import { backgroundReplaceAPI } from "services/files";
import { showNotification } from "components/Notifications";
type NewFileData = {
  url: string;
  height: number;
  width: number;
};

interface GenAiToolProps {
  handleNewFile: (url: NewFileData) => void;
  handleSetFile: (file: FileData) => void;
  file: FileData;
  disabledAccordion: boolean;
  transformations: any[];
  setGenerativeBgParams: React.Dispatch<React.SetStateAction<any[]>>;
}

export function BackgroundReplaceTool({
  handleNewFile,
  handleSetFile,
  file,
  disabledAccordion,
  transformations,
  setGenerativeBgParams,
}: GenAiToolProps) {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);
  const [seed, setSeed] = useState(1);

  const handleSetCategory = (value: string | null) => {
    setSelectedCategory(value);
    setSelectedPrompt(null);
  };

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

  const submitTransformation = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const params: Array<{
        effect?: string;
        crop?: string;
        aspect_ratio?: string;
        background?: string;
      }> = [];

      const data = await backgroundReplaceAPI(file.id, handleBuildParams());

      if (data.url) {
        const imageUrl = data.url;
        const img = new Image();
        img.onload = () => {
          setLoading(false);
          handleNewFile({
            url: imageUrl,
            height: img.height,
            width: img.width,
          });
        };
        img.onerror = () => {
          setLoading(false);
          showNotification({
            title: "Error",
            message: "No se pudo transformar la imagen.",
            color: "red",
          });
        };
        img.src = imageUrl;
      }
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Error",
        message: "Ocurrió un error al procesar la imagen.",
        color: "red",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Accordion.Item value="background-replace">
        <Accordion.Control
          disabled={disabledAccordion}
          icon={
            <IconSparkles
              style={{
                width: rem(20),
                height: rem(20),
              }}
            />
          }
        >
          Background replace
        </Accordion.Control>
        <Accordion.Panel>
          <Box mt={"xs"}>
            <Text size="xs" mb={"xs"}>
              {aiTools[0].description}
            </Text>
            <video
              controls
              src={aiTools[0].video}
              className="rounded-md"
            ></video>
            <Select
              label="Select a category"
              placeholder="Select an AI tool"
              mt="xs"
              value={selectedCategory}
              onChange={(value) => handleSetCategory(value)}
              data={categoriesBgReplace.map((tool) => ({
                value: tool.value,
                label: tool.label_es,
              }))}
            />
            {selectedCategory && (
              <>
                <Select
                  label="Select a prompt"
                  placeholder="Select an AI tool"
                  mt="xs"
                  value={selectedPrompt}
                  onChange={setSelectedPrompt}
                  data={promptsBgReplace
                    .filter((tool) => tool.category === selectedCategory)
                    .map((tool) => ({
                      value: tool.value,
                      label: tool.label_es,
                    }))}
                />
                <Text mt={"xs"} size="xs">
                  {
                    promptsBgReplace.find(
                      (prompt) => prompt.value === selectedPrompt
                    )?.label_es
                  }
                </Text>
                <Select
                  mt={"xs"}
                  label="Aspect ratio output"
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
                  placeholder="Select an output format"
                  value={aspectRatio}
                  onChange={setAspectRatio}
                />
                {selectedPrompt && (
                  <Button
                    mt={"xs"}
                    fullWidth
                    loading={loading}
                    onClick={submitTransformation}
                  >
                    Apply Changes
                  </Button>
                )}
              </>
            )}
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </>
  );
}

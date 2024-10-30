import { Accordion, Box, Button, rem, Select, Text } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { FileData } from "interfaces/files";
import React, { useEffect, useState } from "react";
import { aiTools } from "constants/aiTools";
import { categoriesBgReplace } from "constants/categoriesBgReplace";
import { promptsBgReplace } from "constants/promptsBgReplace";
import { transformFileAPI } from "services/files";
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

export function GenAiTool({
  handleNewFile,
  handleSetFile,
  file,
  disabledAccordion,
  transformations,
  setGenerativeBgParams,
}: GenAiToolProps) {
  const [loading, setLoading] = useState(false);
  const [selectedAi, setSelectedAi] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  const handleSetCategory = (value: string | null) => {
    setSelectedCategory(value);
    setSelectedPrompt(null);
  };

  const handleSetPrompt = (value: string | null) => {
    setSelectedPrompt(value);
    setGenerativeBgParams(
      value
        ? [
            {
              effect: `gen_background_replace:prompt_an ${
                promptsBgReplace.find((prompt) => prompt.value === value)
                  ?.label_en
              }}:seed_4`,
            },
          ]
        : []
    );
  };

  const submitTransformation = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const updatedTransformations = [...transformations];
      const data = await transformFileAPI(file.id, updatedTransformations);
      handleSetFile(data.file);
      handleNewFile({
        url: data.url,
        height: data.height,
        width: data.width,
      });
      if (data.url) {
        const img = new Image();
        img.onload = () => {
          setLoading(false);
          handleNewFile({
            url: data.url,
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
        img.src = data.url;
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
      <Accordion.Item value="generative-ai">
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
          Generative AI
        </Accordion.Control>
        <Accordion.Panel>
          <Select
            placeholder="Select an AI tool"
            value={selectedAi}
            onChange={setSelectedAi}
            data={[
              ...aiTools.map((tool) => ({
                value: tool.id,
                label: tool.name,
              })),
            ]}
          />
          {selectedAi === aiTools[0].id && (
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
                    onChange={(value) => handleSetPrompt(value)}
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
          )}
        </Accordion.Panel>
      </Accordion.Item>
    </>
  );
}

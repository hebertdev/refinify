import {
  Accordion,
  Box,
  Button,
  Center,
  rem,
  Select,
  SelectProps,
} from "@mantine/core";
import { IconColorFilter } from "@tabler/icons-react";
import { showNotification } from "components/Notifications";
import { FileData } from "interfaces/files";
import React, { useState } from "react";
import { transformFileAPI } from "services/files";

type NewFileData = {
  url: string;
  height: number;
  width: number;
};

interface ArtFiltersToolProps {
  handleNewFile: (url: NewFileData) => void;
  handleSetFile: (file: FileData) => void;
  file: FileData;
  disabledAccordion: boolean;
  transformations: any[];
  setEffectParams: React.Dispatch<React.SetStateAction<any[]>>;
  setArtParams: React.Dispatch<React.SetStateAction<any[]>>;
}

export function ArtFiltersTool({
  handleNewFile,
  handleSetFile,
  file,
  disabledAccordion,
  transformations,
  setArtParams,
}: ArtFiltersToolProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFilterChange = (filter: string | null) => {
    setSelectedFilter(filter);
    setArtParams(filter ? [{ effect: filter }] : []);
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
    <Accordion.Item value="art-filters">
      <Accordion.Control
        disabled={disabledAccordion}
        icon={<IconColorFilter style={{ width: rem(20), height: rem(20) }} />}
      >
        Art Filters
      </Accordion.Control>
      <Accordion.Panel>
        <Select
          label="Select an art filter"
          placeholder="Select a filter"
          data={filtersData}
          value={selectedFilter}
          onChange={handleFilterChange}
          renderOption={renderSelectOption}
        />
        <Button
          fullWidth
          mt="xs"
          onClick={submitTransformation}
          loading={loading}
        >
          Apply Filter
        </Button>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

const filtersData = [
  { label: "al_dente", value: "art:al_dente" },
  { label: "athena", value: "art:athena" },
  { label: "audrey", value: "art:audrey" },
  { label: "aurora", value: "art:aurora" },
  { label: "daguerre", value: "art:daguerre" },
  { label: "eucalyptus", value: "art:eucalyptus" },
  { label: "fes", value: "art:fes" },
  { label: "frost", value: "art:frost" },
  { label: "hairspray", value: "art:hairspray" },
  { label: "hokusai", value: "art:hokusai" },
  { label: "incognito", value: "art:incognito" },
  { label: "linen", value: "art:linen" },
  { label: "peacock", value: "art:peacock" },
  { label: "primavera", value: "art:primavera" },
  { label: "quartz", value: "art:quartz" },
  { label: "red_rock", value: "art:red_rock" },
  { label: "refresh", value: "art:refresh" },
  { label: "sizzle", value: "art:sizzle" },
  { label: "sonnet", value: "art:sonnet" },
  { label: "ukulele", value: "art:ukulele" },
  { label: "zorro", value: "art:zorro" },
];

const images: Record<string, string> = {
  "art:al_dente":
    "https://res.cloudinary.com/demo/image/upload/e_art:al_dente/v1690194782/docs/diy-house.jpg",
  "art:athena":
    "https://res.cloudinary.com/demo/image/upload/e_art:athena/v1690194782/docs/diy-house.jpg",
  "art:audrey":
    "https://res.cloudinary.com/demo/image/upload/e_art:audrey/v1690194782/docs/diy-house.jpg",
  "art:aurora":
    "https://res.cloudinary.com/demo/image/upload/e_art:aurora/v1690194782/docs/diy-house.jpg",
  "art:daguerre":
    "https://res.cloudinary.com/demo/image/upload/e_art:daguerre/v1690194782/docs/diy-house.jpg",
  "art:eucalyptus":
    "https://res.cloudinary.com/demo/image/upload/e_art:eucalyptus/v1690194782/docs/diy-house.jpg",
  "art:fes":
    "https://res.cloudinary.com/demo/image/upload/e_art:fes/v1690194782/docs/diy-house.jpg",
  "art:frost":
    "https://res.cloudinary.com/demo/image/upload/e_art:frost/v1690194782/docs/diy-house.jpg",
  "art:hairspray":
    "https://res.cloudinary.com/demo/image/upload/e_art:hairspray/v1690194782/docs/diy-house.jpg",
  "art:hokusai":
    "https://res.cloudinary.com/demo/image/upload/e_art:hokusai/v1690194782/docs/diy-house.jpg",
  "art:incognito":
    "https://res.cloudinary.com/demo/image/upload/e_art:incognito/v1690194782/docs/diy-house.jpg",
  "art:linen":
    "https://res.cloudinary.com/demo/image/upload/e_art:linen/v1690194782/docs/diy-house.jpg",
  "art:peacock":
    "https://res.cloudinary.com/demo/image/upload/e_art:peacock/v1690194782/docs/diy-house.jpg",
  "art:primavera":
    "https://res.cloudinary.com/demo/image/upload/e_art:primavera/v1690194782/docs/diy-house.jpg",
  "art:quartz":
    "https://res.cloudinary.com/demo/image/upload/e_art:quartz/v1690194782/docs/diy-house.jpg",
  "art:red_rock":
    "https://res.cloudinary.com/demo/image/upload/e_art:red_rock/v1690194782/docs/diy-house.jpg",
  "art:refresh":
    "https://res.cloudinary.com/demo/image/upload/e_art:refresh/v1690194782/docs/diy-house.jpg",
  "art:sizzle":
    "https://res.cloudinary.com/demo/image/upload/e_art:sizzle/v1690194782/docs/diy-house.jpg",
  "art:sonnet":
    "https://res.cloudinary.com/demo/image/upload/e_art:sonnet/v1690194782/docs/diy-house.jpg",
  "art:ukulele":
    "https://res.cloudinary.com/demo/image/upload/e_art:ukulele/v1690194782/docs/diy-house.jpg",
  "art:zorro":
    "https://res.cloudinary.com/demo/image/upload/e_art:zorro/v1690194782/docs/diy-house.jpg",
};

const renderSelectOption: SelectProps["renderOption"] = ({
  option,
  checked,
}) => (
  <Box>
    <img
      src={images[option.value]}
      alt={option.label}
      style={{
        objectFit: "cover",
        borderRadius: 10,
        border: `${
          checked
            ? "3px solid var(--mantine-color-brand-filled)"
            : "3px solid transparent"
        }`,
      }}
    />
    <Center>{option.label}</Center>
  </Box>
);

"use client";

import Link from "next/link";

//mantine
import { Container, Group, Box, Text, Button, Chip } from "@mantine/core";

import classes from "./Header.module.css";
import { DarkModeButton } from "./DarkModeButton";

export function Header() {
  return (
    <>
      <header
        style={{
          position: "fixed",
          zIndex: 100,
          height: "60px",
          width: "100%",
        }}
        className={classes.header}
      >
        <Container size={"xl"} className={classes.header_container}>
          <Group>
            <Link href={"/"}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "30px",
                    marginLeft: "5px",
                  }}
                >
                  Refinify
                </Text>
                <Text
                  style={{
                    fontSize: "9px",
                    backgroundColor: "var(--mantine-color-brand-filled)",
                    padding: "2px 10px",
                    borderRadius: "10px",
                    marginLeft: "5px",
                    color: "black",
                  }}
                >
                  Beta
                </Text>
              </Box>
            </Link>
          </Group>
          <Group></Group>
          <Box
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <DarkModeButton />
            <Link href={"/account/login"}>
              <Button radius={"xl"} variant="outline">
                Iniciar sesión
              </Button>
            </Link>
          </Box>
        </Container>
      </header>
      <div style={{ height: "65px" }} />
    </>
  );
}

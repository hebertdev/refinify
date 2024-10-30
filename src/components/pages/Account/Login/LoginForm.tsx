"use client";

import Link from "next/link";

// servicios
import { loginAPI } from "services/accounts";

// ayudantes
import { setToken } from "helpers/auth";

// mantine
import { showNotification } from "components/Notifications";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
} from "@mantine/core";
import { useState } from "react";

export function LoginForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      password: (val) =>
        val.length < 8
          ? "La contraseña debe tener al menos 8 caracteres."
          : null,
    },
  });

  return (
    <Paper radius="md" p="xl">
      <Text size="lg" fw={500}>
        Bienvenido a refinify
      </Text>

      <br />
      <form
        onSubmit={form.onSubmit(async () => {
          if (loading) return;
          try {
            setLoading(true);
            const data = await loginAPI(form.values);
            form.reset();
            showNotification({
              title: "¡Bienvenido!",
              message: `Hola, ${data.user.first_name}! Nos alegra tenerte aquí.`,
              color: "green",
            });
            setToken(data.access_token);
            window.location.href = "/";
          } catch (error: any) {
            form.reset();
            showNotification({
              title: "¡Error!",
              message: JSON.stringify(error?.response?.data),
              color: "red",
            });
            setLoading(false);
          }
        })}
      >
        <Stack>
          <TextInput
            required
            label="Correo electrónico o Nombre de usuario"
            placeholder="tu nombre de usuario"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Correo electrónico inválido"}
            radius="md"
            autoComplete="off"
          />

          <PasswordInput
            required
            label="Contraseña"
            placeholder="Tu contraseña"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "La contraseña debe tener al menos 8 caracteres"
            }
            radius="md"
            autoComplete="off"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component={Link}
            href={"/account/signup"}
            type="button"
            size="xs"
          >
            {"¿No tienes una cuenta? Regístrate"}
          </Anchor>
          <Button type="submit" radius="xl" loading={loading}>
            Iniciar sesión
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

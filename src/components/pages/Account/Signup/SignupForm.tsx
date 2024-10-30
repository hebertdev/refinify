"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
// servicios
import { signupAPI } from "services/accounts";

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

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      email: (val) =>
        /^\S+@\S+$/.test(val)
          ? null
          : "Dirección de correo electrónico inválida",
      username: (val) =>
        /^[a-zA-Z0-9]+$/.test(val)
          ? null
          : "Nombre de usuario inválido. Debe contener solo letras y números.",
      password: (val) =>
        val.length >= 8
          ? null
          : "La contraseña debe tener al menos 8 caracteres.",
      password_confirmation: (val, values) =>
        val === values.password
          ? null
          : "La confirmación de la contraseña no coincide con la contraseña.",
    },
  });

  return (
    <Paper radius="md" p="xl">
      <Text size="lg" fw={500}>
        Únete a refinify
      </Text>
      <br />

      <form
        onSubmit={form.onSubmit(async () => {
          if (loading) return;
          try {
            setLoading(true);
            await signupAPI(form.values);
            form.reset();
            showNotification({
              title: "¡Bienvenido a refinify!",
              message:
                "Tu cuenta ha sido creada exitosamente. ¡Nos alegra tenerte con nosotros!",
              color: "green",
            });
            router.push("/account/login");
            setLoading(false);
          } catch (error: any) {
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
            label="Correo electrónico"
            placeholder="hola@refinify.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Correo electrónico inválido"}
            radius="md"
            autoComplete="off"
            type="email"
          />
          <TextInput
            required
            label="Nombre de usuario"
            placeholder="refinify2023"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            error={form.errors.username && "Nombre de usuario inválido"}
            radius="md"
            autoComplete="off"
          />
          <TextInput
            required
            label="Nombre"
            placeholder="Nombre"
            value={form.values.first_name}
            onChange={(event) =>
              form.setFieldValue("first_name", event.currentTarget.value)
            }
            error={form.errors.first_name && "Nombre inválido"}
            radius="md"
            autoComplete="off"
          />
          <TextInput
            required
            label="Apellido"
            placeholder="Apellido"
            value={form.values.last_name}
            onChange={(event) =>
              form.setFieldValue("last_name", event.currentTarget.value)
            }
            error={form.errors.last_name && "Apellido inválido"}
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

          <PasswordInput
            required
            label="Confirmar Contraseña"
            placeholder="Confirma tu contraseña"
            value={form.values.password_confirmation}
            onChange={(event) =>
              form.setFieldValue(
                "password_confirmation",
                event.currentTarget.value
              )
            }
            error={
              form.errors.password_confirmation &&
              "La confirmación de la contraseña no coincide con la contraseña."
            }
            radius="md"
            autoComplete="off"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component={Link}
            href={"/account/login"}
            type="button"
            size="xs"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </Anchor>
          <Button type="submit" radius="xl" loading={loading}>
            Registrarse
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

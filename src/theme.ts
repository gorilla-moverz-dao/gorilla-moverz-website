import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        grayx: {
          50: { value: "#f9f9f9aa" },
          100: { value: "#edededaa" },
          200: { value: "#d3d3d3aa" },
          300: { value: "#b3b3b3aa" },
          400: { value: "#a0a0a0aa" },
          500: { value: "#898989aa" },
          600: { value: "#6c6c6caa" },
          700: { value: "#202020aa" },
          800: { value: "#121212aa" },
          900: { value: "#111111aa" },
        },
      },
    },
  },
});

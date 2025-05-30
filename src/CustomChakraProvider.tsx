import React from "react";
import {
  ChakraProvider as OriginalChakraProvider,
  extendTheme,
  type ThemeConfig,
  useColorMode,
} from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: "#fde8e8",
    100: "#f9c1c1",
    200: "#f59999",
    300: "#f17272",
    400: "#ee4b4b",
    500: "#ea5959",
    600: "#d84f4f",
    700: "#c64545",
    800: "#b43b3b",
    900: "#a23131",
  },
};

// Create a theme with the new color scheme
const theme = extendTheme({
  config,
  colors,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.800" : "gray.50",
        color: props.colorMode === "dark" ? "white" : "gray.800",
        transition: "background-color 0.2s, color 0.2s",
      },
      // Component-specific global styles
      ".task-item": {
        transition: "all 0.2s",
      },
      // Add global animations
      "@keyframes slideIn": {
        from: { transform: "translateY(100px)", opacity: 0 },
        to: { transform: "translateY(0)", opacity: 1 },
      },
      "@keyframes fadeOut": {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "medium",
        borderRadius: "md",
        transition: "all 0.2s",
      },
      variants: {
        solid: () => ({
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
          _disabled: {
            bg: "brand.300",
            cursor: "not-allowed",
          }
        }),
        outline: (props: StyleFunctionProps) => ({
          color: props.colorMode === "dark" ? "brand.300" : "brand.500",
          borderColor: "brand.500",
          _hover: {
            bg: props.colorMode === "dark" ? "brand.900" : "brand.50",
          },
        }),
      },
    },
    Badge: {
      baseStyle: {
        fontWeight: "medium",
        borderRadius: "md",
      },
    },
    Modal: {
      baseStyle: (props: StyleFunctionProps) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "gray.700" : "white",
          color: props.colorMode === "dark" ? "white" : "gray.800",
          transition: "background-color 0.2s, color 0.2s",
        },
      }),
    },
    Input: {
      baseStyle: (props: StyleFunctionProps) => ({
        field: {
          color: props.colorMode === "dark" ? "white" : "gray.800",
          bg: props.colorMode === "dark" ? "gray.700" : "white",
          _placeholder: {
            color: props.colorMode === "dark" ? "gray.400" : "gray.500",
          },
          transition: "all 0.2s",
        }
      })
    },
    Textarea: {
      baseStyle: (props: StyleFunctionProps) => ({
        color: props.colorMode === "dark" ? "white" : "gray.800",
        bg: props.colorMode === "dark" ? "gray.700" : "white",
        _placeholder: {
          color: props.colorMode === "dark" ? "gray.400" : "gray.500",
        },
        transition: "all 0.2s",
      })
    }
  },
});

const CustomChakraProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <OriginalChakraProvider theme={theme}>{children}</OriginalChakraProvider>
  );
};

export const useDarkMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return { isDark: colorMode === "dark", toggleDarkMode: toggleColorMode };
};

export default CustomChakraProvider;
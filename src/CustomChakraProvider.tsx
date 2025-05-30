import React from "react";
import {
  ChakraProvider as OriginalChakraProvider,
  extendTheme,
} from "@chakra-ui/react";

// Create a basic theme
const theme = extendTheme();

// Custom provider that bypasses type issues
const CustomChakraProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <OriginalChakraProvider theme={theme}>{children}</OriginalChakraProvider>
  );
};

export default CustomChakraProvider;

import { ReactNode } from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import clsx from "clsx";

// Define the theme structure
export type ThemeColors = {
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    link: string;
    error: string;
    success: string;
    warning: string;
  };
  background: {
    primary: string;
    secondary: string;
  };
};

// Default theme configuration
const defaultThemes: Record<"light" | "dark", ThemeColors> = {
  light: {
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-700",
      tertiary: "text-gray-500",
      link: "text-blue-600",
      error: "text-red-600",
      success: "text-green-600",
      warning: "text-amber-600",
    },
    background: {
      primary: "bg-white",
      secondary: "bg-gray-100",
    },
  },
  dark: {
    text: {
      primary: "text-gray-50",
      secondary: "text-gray-300",
      tertiary: "text-gray-400",
      link: "text-blue-400",
      error: "text-red-400",
      success: "text-green-400",
      warning: "text-amber-400",
    },
    background: {
      primary: "bg-gray-900",
      secondary: "bg-gray-800",
    },
  },
};

// Enhanced Text component props
export interface TextProps extends RNTextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "subtitle"
    | "body"
    | "caption"
    | "tiny"
    | "button"
    | "link";
  weight?: "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right";
  transform?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
  italic?: boolean;
  underline?: boolean;
  linethrough?: boolean;
  truncate?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "link"
    | "error"
    | "success"
    | "warning"
    | "inherit";
  children: ReactNode;
  className?: string;
}

/**
 * Themed Text component with predefined variants using NativeWind
 */
export function HText({
  variant = "body",
  weight = "normal",
  align = "left",
  transform,
  italic = false,
  underline = false,
  linethrough = false,
  truncate = false,
  color = "primary",
  children,
  className,
  ...props
}: TextProps) {
  return (
    <RNText
      className={clsx(
        // Color based on theme and color prop
        "dark:text-chalk text-void",

        // Variants
        {
          "text-4xl font-bold": variant === "h1",
          "text-3xl font-bold": variant === "h2",
          "text-2xl font-bold": variant === "h3",
          "text-xl font-bold": variant === "h4",
          "text-lg": variant === "subtitle",
          "text-base": variant === "body",
          "text-sm": variant === "caption",
          "text-[10px]": variant === "tiny",
          "text-base font-medium": variant === "button",
          underline: variant === "link",
        },

        // Font weight
        {
          "font-normal": weight === "normal",
          "font-medium": weight === "medium",
          "font-semibold tracking-tighter": weight === "semibold",
          "font-bold -tracking-widest": weight === "bold",
        },

        // Text alignment
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },

        // Text transform
        {
          uppercase: transform === "uppercase",
          lowercase: transform === "lowercase",
          capitalize: transform === "capitalize",
          "normal-case": transform === "normal-case",
        },

        // Text style
        {
          italic: italic,
          underline: underline,
          "line-through": linethrough,
          truncate: truncate,
        },

        // Additional custom classes
        className,
      )}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Export a non-context version for simpler usage when theme is not needed
export function StaticText({
  variant = "body",
  weight = "normal",
  align = "left",
  transform,
  italic = false,
  underline = false,
  linethrough = false,
  truncate = false,
  color,
  children,
  className,
  ...props
}: Omit<TextProps, "color"> & { color?: string }) {
  return (
    <RNText
      className={clsx(
        // Direct color class if provided
        color,

        // Variants
        {
          "text-4xl font-bold": variant === "h1",
          "text-3xl font-bold": variant === "h2",
          "text-2xl font-bold": variant === "h3",
          "text-xl font-bold": variant === "h4",
          "text-lg text-gray-700 dark:text-gray-300": variant === "subtitle",
          "text-base text-gray-900 dark:text-gray-100": variant === "body",
          "text-sm text-gray-500 dark:text-gray-400": variant === "caption",
          "text-base font-medium": variant === "button",
          "text-blue-600 dark:text-blue-400 underline": variant === "link",
        },

        // Font weight
        {
          "font-normal": weight === "normal",
          "font-medium": weight === "medium",
          "font-semibold": weight === "semibold",
          "font-bold": weight === "bold",
        },

        // Text alignment
        {
          "text-left": align === "left",
          "text-center": align === "center",
          "text-right": align === "right",
        },

        // Text transform
        {
          uppercase: transform === "uppercase",
          lowercase: transform === "lowercase",
          capitalize: transform === "capitalize",
          "normal-case": transform === "normal-case",
        },

        // Text style
        {
          italic: italic,
          underline: underline,
          "line-through": linethrough,
          truncate: truncate,
        },

        // Additional custom classes
        className,
      )}
      {...props}
    >
      {children}
    </RNText>
  );
}

/*

// Create theme context
type ThemeContextType = {
  colorMode: "light" | "dark";
  setColorMode: (mode: "light" | "dark" | "system") => void;
  theme: ThemeColors;
  updateTheme: (
    newTheme: Partial<Record<"light" | "dark", Partial<ThemeColors>>>,
  ) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider
export const ThemeProvider: FC<{
  children: ReactNode;
  initialTheme?: Partial<Record<"light" | "dark", Partial<ThemeColors>>>;
  initialColorMode?: "light" | "dark" | "system";
}> = ({ children, initialTheme, initialColorMode = "system" }) => {
  const systemColorScheme = useColorScheme() as "light" | "dark";
  const [colorMode, setColorModeState] = useState<"light" | "dark" | "system">(
    initialColorMode,
  );
  const [themes, setThemes] = useState(defaultThemes);

  // Merge initial theme with default theme if provided
  useEffect(() => {
    if (initialTheme) {
      updateTheme(initialTheme);
    }
  }, []);

  // Determine actual color mode based on setting and system
  const actualColorMode =
    colorMode === "system" ? systemColorScheme : colorMode;

  // Set color mode
  const setColorMode = (mode: "light" | "dark" | "system") => {
    setColorModeState(mode);
  };

  // Update theme function
  const updateTheme = (
    newTheme: Partial<Record<"light" | "dark", Partial<ThemeColors>>>,
  ) => {
    setThemes((prevThemes) => {
      const updatedThemes = { ...prevThemes };

      // Update light theme if provided
      if (newTheme.light) {
        updatedThemes.light = {
          text: { ...prevThemes.light.text, ...newTheme.light.text },
          background: {
            ...prevThemes.light.background,
            ...newTheme.light.background,
          },
        };
      }

      // Update dark theme if provided
      if (newTheme.dark) {
        updatedThemes.dark = {
          text: { ...prevThemes.dark.text, ...newTheme.dark.text },
          background: {
            ...prevThemes.dark.background,
            ...newTheme.dark.background,
          },
        };
      }

      return updatedThemes;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        colorMode: actualColorMode,
        setColorMode,
        theme: themes[actualColorMode],
        updateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

*/

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ViewStyle,
  TextStyle,
} from "react-native";
import Svg, {
  Rect,
  Line,
  Polygon,
  Defs,
  LinearGradient,
  Stop,
  Polyline,
} from "react-native-svg";

// Define color palette type and values
type ColorPalette = {
  neonBlue: string;
  lightGray: string;
  mediumGray: string;
  darkGray: string;
  white: string;
};

const COLORS: ColorPalette = {
  neonBlue: "#0A84FF",
  lightGray: "#f2f2f2",
  mediumGray: "#b8b8bd",
  darkGray: "#14141B",
  white: "#FAFAFA",
};

// Define theme type and configurations
type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

type ThemeOptions = {
  light: ThemeColors;
  dark: ThemeColors;
};

const THEMES: ThemeOptions = {
  light: {
    primary: COLORS.neonBlue,
    secondary: COLORS.lightGray,
    accent: COLORS.mediumGray,
    background: COLORS.white,
    text: COLORS.darkGray,
  },
  dark: {
    primary: COLORS.neonBlue,
    secondary: COLORS.darkGray,
    accent: COLORS.mediumGray,
    background: COLORS.darkGray,
    text: COLORS.white,
  },
};

// Define cyberpunk variant options
type CyberpunkDecalVariant =
  | "neonGrid"
  | "techHex"
  | "glitchEdge"
  | "dataStream";

// Define props for CyberpunkDecal component
interface CyberpunkDecalProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  variant?: CyberpunkDecalVariant;
  forceDarkMode?: boolean;
  forceTheme?: "light" | "dark";
}

// Define props for decal subcomponents
interface DecalComponentProps {
  theme: ThemeColors;
}

const CyberpunkDecal: React.FC<CyberpunkDecalProps> = ({
  children,
  style,
  variant = "neonGrid",
  forceDarkMode,
  forceTheme,
}) => {
  // Use system color scheme unless overridden
  const systemColorScheme = useColorScheme();
  const colorScheme: "light" | "dark" =
    forceTheme || forceDarkMode === true
      ? "dark"
      : forceDarkMode === false
        ? "light"
        : (systemColorScheme as "light" | "dark" | null) || "light";

  const theme = THEMES[colorScheme];

  // Select decal style based on variant
  const renderDecal = (): React.ReactNode => {
    switch (variant) {
      case "techHex":
        return <TechHexDecal theme={theme} />;
      case "glitchEdge":
        return <GlitchEdgeDecal theme={theme} />;
      case "dataStream":
        return <DataStreamDecal theme={theme} />;
      case "neonGrid":
      default:
        return <NeonGridDecal theme={theme} />;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.decalContainer}>{renderDecal()}</View>
      <View style={styles.textContainer}>{children}</View>
    </View>
  );
};

// Neon Grid decal - cyberpunk grid pattern with neon accents
const NeonGridDecal: React.FC<DecalComponentProps> = ({ theme }) => (
  <Svg height="100%" width="100%" viewBox="0 0 300 150" style={styles.svg}>
    <Defs>
      <LinearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor={theme.primary} stopOpacity="0.9" />
        <Stop offset="100%" stopColor={theme.primary} stopOpacity="0.3" />
      </LinearGradient>
    </Defs>

    {/* Background */}
    <Rect
      x="0"
      y="0"
      width="300"
      height="150"
      fill={theme.secondary}
      opacity="0.1"
    />

    {/* Grid lines */}
    {Array.from({ length: 15 }).map((_, i) => (
      <Line
        key={`h-${i}`}
        x1="0"
        y1={i * 10}
        x2="300"
        y2={i * 10}
        stroke={theme.accent}
        strokeWidth="0.5"
        opacity="0.2"
      />
    ))}

    {Array.from({ length: 30 }).map((_, i) => (
      <Line
        key={`v-${i}`}
        x1={i * 10}
        y1="0"
        x2={i * 10}
        y2="150"
        stroke={theme.accent}
        strokeWidth="0.5"
        opacity="0.2"
      />
    ))}

    {/* Neon accent elements */}
    <Polygon
      points="0,50 50,0 250,0 300,50 300,100 250,150 50,150 0,100"
      fill="none"
      stroke="url(#neonGrad)"
      strokeWidth="2"
    />

    <Polygon
      points="20,70 70,20 230,20 280,70 280,80 230,130 70,130 20,80"
      fill="none"
      stroke={theme.primary}
      strokeWidth="1"
      opacity="0.5"
    />

    {/* Sharp angular accent */}
    <Polygon points="150,10 170,30 130,30" fill={theme.primary} opacity="0.8" />

    <Polygon
      points="150,140 170,120 130,120"
      fill={theme.primary}
      opacity="0.8"
    />
  </Svg>
);

// Tech Hex decal - hexagonal tech pattern
const TechHexDecal: React.FC<DecalComponentProps> = ({ theme }) => (
  <Svg height="100%" width="100%" viewBox="0 0 300 150" style={styles.svg}>
    <Defs>
      <LinearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor={theme.primary} stopOpacity="0.8" />
        <Stop offset="100%" stopColor={theme.primary} stopOpacity="0.2" />
      </LinearGradient>
    </Defs>

    {/* Background */}
    <Rect
      x="0"
      y="0"
      width="300"
      height="150"
      fill={theme.secondary}
      opacity="0.1"
    />

    {/* Hexagonal pattern */}
    {Array.from({ length: 5 }).map((_, row) =>
      Array.from({ length: 10 }).map((_, col) => {
        const offsetX = row % 2 === 0 ? 0 : 15;
        const x = col * 30 + offsetX;
        const y = row * 26 + 25;

        // Only render hexagons within the viewBox
        if (x >= -30 && x <= 330 && y >= -30 && y <= 180) {
          return (
            <Polygon
              key={`hex-${row}-${col}`}
              points={`${x},${y} ${x + 10},${y - 17} ${x + 30},${y - 17} ${x + 40},${y} ${x + 30},${y + 17} ${x + 10},${y + 17}`}
              fill="none"
              stroke={theme.accent}
              strokeWidth="0.5"
              opacity="0.3"
            />
          );
        }
        return null;
      }),
    )}

    {/* Tech accent elements */}
    <Polygon
      points="20,75 50,25 250,25 280,75 250,125 50,125 20,75"
      fill="none"
      stroke="url(#techGrad)"
      strokeWidth="2"
    />

    {/* Circuit-like lines */}
    <Polyline
      points="50,50 80,50 90,60 120,60 130,50 170,50 180,60 210,60 220,50 250,50"
      fill="none"
      stroke={theme.primary}
      strokeWidth="1.5"
      opacity="0.7"
    />

    <Polyline
      points="50,100 80,100 90,90 120,90 130,100 170,100 180,90 210,90 220,100 250,100"
      fill="none"
      stroke={theme.primary}
      strokeWidth="1.5"
      opacity="0.7"
    />

    {/* Sharp corner accents */}
    <Polygon
      points="20,75 30,65 40,75 30,85"
      fill={theme.primary}
      opacity="0.9"
    />

    <Polygon
      points="280,75 270,65 260,75 270,85"
      fill={theme.primary}
      opacity="0.9"
    />
  </Svg>
);

// Glitch Edge decal - sharp, glitchy edges
const GlitchEdgeDecal: React.FC<DecalComponentProps> = ({ theme }) => (
  <Svg height="100%" width="100%" viewBox="0 0 300 150" style={styles.svg}>
    <Defs>
      <LinearGradient id="glitchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor={theme.primary} stopOpacity="0.9" />
        <Stop offset="50%" stopColor={theme.primary} stopOpacity="0.5" />
        <Stop offset="100%" stopColor={theme.primary} stopOpacity="0.9" />
      </LinearGradient>
    </Defs>

    {/* Background */}
    <Rect
      x="0"
      y="0"
      width="300"
      height="150"
      fill={theme.secondary}
      opacity="0.1"
    />

    {/* Glitch elements - jagged, offset rectangles */}
    <Rect
      x="0"
      y="30"
      width="300"
      height="10"
      fill={theme.primary}
      opacity="0.1"
    />
    <Rect
      x="0"
      y="70"
      width="300"
      height="10"
      fill={theme.primary}
      opacity="0.1"
    />
    <Rect
      x="0"
      y="110"
      width="300"
      height="10"
      fill={theme.primary}
      opacity="0.1"
    />

    {/* Glitch lines */}
    <Polyline
      points="0,40 20,40 25,45 40,45 45,40 70,40 75,45 100,45 105,40 300,40"
      fill="none"
      stroke={theme.primary}
      strokeWidth="1"
      opacity="0.7"
    />

    <Polyline
      points="0,80 30,80 35,75 60,75 65,80 90,80 95,75 120,75 125,80 300,80"
      fill="none"
      stroke={theme.primary}
      strokeWidth="1"
      opacity="0.7"
    />

    <Polyline
      points="0,120 40,120 45,115 80,115 85,120 110,120 115,115 140,115 145,120 300,120"
      fill="none"
      stroke={theme.primary}
      strokeWidth="1"
      opacity="0.7"
    />

    {/* Main glitch frame */}
    <Polygon
      points="10,10 290,10 290,140 10,140"
      fill="none"
      stroke="url(#glitchGrad)"
      strokeWidth="2"
    />

    {/* Glitch corner accents */}
    <Polygon points="10,10 30,10 10,30" fill={theme.primary} opacity="0.8" />

    <Polygon points="290,10 270,10 290,30" fill={theme.primary} opacity="0.8" />

    <Polygon points="10,140 30,140 10,120" fill={theme.primary} opacity="0.8" />

    <Polygon
      points="290,140 270,140 290,120"
      fill={theme.primary}
      opacity="0.8"
    />

    {/* Glitch offset elements */}
    {Array.from({ length: 5 }).map((_, i) => (
      <Rect
        key={`glitch-${i}`}
        x={40 + i * 50}
        y={50 + (i % 2) * 5}
        width={20}
        height={5}
        fill={theme.primary}
        opacity={0.5 + i * 0.1}
      />
    ))}
  </Svg>
);

// Data Stream decal - flowing data visualization
const DataStreamDecal: React.FC<DecalComponentProps> = ({ theme }) => (
  <Svg height="100%" width="100%" viewBox="0 0 300 150" style={styles.svg}>
    <Defs>
      <LinearGradient id="dataGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor={theme.primary} stopOpacity="0.2" />
        <Stop offset="50%" stopColor={theme.primary} stopOpacity="0.8" />
        <Stop offset="100%" stopColor={theme.primary} stopOpacity="0.2" />
      </LinearGradient>
    </Defs>

    {/* Background */}
    <Rect
      x="0"
      y="0"
      width="300"
      height="150"
      fill={theme.secondary}
      opacity="0.1"
    />

    {/* Data stream lines */}
    {Array.from({ length: 8 }).map((_, i) => (
      <Polyline
        key={`stream-${i}`}
        points={`0,${20 + i * 15} 30,${20 + i * 15} 40,${25 + i * 15} 60,${25 + i * 15} 70,${20 + i * 15}
                90,${20 + i * 15} 100,${25 + i * 15} 120,${25 + i * 15} 130,${20 + i * 15}
                150,${20 + i * 15} 160,${25 + i * 15} 180,${25 + i * 15} 190,${20 + i * 15}
                210,${20 + i * 15} 220,${25 + i * 15} 240,${25 + i * 15} 250,${20 + i * 15}
                270,${20 + i * 15} 280,${25 + i * 15} 300,${25 + i * 15}`}
        fill="none"
        stroke={theme.primary}
        strokeWidth="1"
        opacity={0.3 + (i % 3) * 0.2}
      />
    ))}

    {/* Data nodes - small rectangles along the streams */}
    {Array.from({ length: 20 }).map((_, i) => (
      <Rect
        key={`node-${i}`}
        x={15 + i * 15}
        y={25 + (i % 8) * 15 + (i % 2 ? 5 : 0)}
        width={4}
        height={4}
        fill={theme.primary}
        opacity={0.7 + (i % 3) * 0.1}
      />
    ))}

    {/* Main frame */}
    <Polygon
      points="5,5 295,5 295,145 5,145"
      fill="none"
      stroke="url(#dataGrad)"
      strokeWidth="2"
    />

    {/* Corner accents */}
    <Polygon
      points="5,5 25,5 25,10 10,10 10,25 5,25"
      fill={theme.primary}
      opacity="0.9"
    />

    <Polygon
      points="295,5 275,5 275,10 290,10 290,25 295,25"
      fill={theme.primary}
      opacity="0.9"
    />

    <Polygon
      points="5,145 25,145 25,140 10,140 10,125 5,125"
      fill={theme.primary}
      opacity="0.9"
    />

    <Polygon
      points="295,145 275,145 275,140 290,140 290,125 295,125"
      fill={theme.primary}
      opacity="0.9"
    />

    {/* Data blocks */}
    <Rect
      x="50"
      y="60"
      width="40"
      height="30"
      fill="none"
      stroke={theme.primary}
      strokeWidth="1"
      opacity="0.6"
    />
    <Rect
      x="210"
      y="60"
      width="40"
      height="30"
      fill="none"
      stroke={theme.primary}
      strokeWidth="1"
      opacity="0.6"
    />

    {/* Binary-like pattern */}
    {Array.from({ length: 4 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => {
        const x = 55 + col * 5;
        const y = 65 + row * 5;
        return (
          <Rect
            key={`bin-1-${row}-${col}`}
            x={x}
            y={y}
            width={3}
            height={3}
            fill={theme.primary}
            opacity={Math.random() > 0.5 ? 0.8 : 0.2}
          />
        );
      }),
    )}

    {Array.from({ length: 4 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => {
        const x = 215 + col * 5;
        const y = 65 + row * 5;
        return (
          <Rect
            key={`bin-2-${row}-${col}`}
            x={x}
            y={y}
            width={3}
            height={3}
            fill={theme.primary}
            opacity={Math.random() > 0.5 ? 0.8 : 0.2}
          />
        );
      }),
    )}
  </Svg>
);

// Define props for TextWithCyberpunkDecal component
interface TextWithCyberpunkDecalProps {
  text?: string;
  variant?: CyberpunkDecalVariant;
  darkMode?: boolean;
  theme?: "light" | "dark";
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  decalStyle?: ViewStyle | ViewStyle[];
}

// Example usage component
export const TextWithCyberpunkDecal: React.FC<TextWithCyberpunkDecalProps> = ({
  text = "CYBERPUNK",
  variant = "neonGrid",
  darkMode = true, // Default to dark mode for cyberpunk aesthetic
  theme,
  style,
  textStyle,
  decalStyle,
}) => {
  return (
    <CyberpunkDecal
      variant={variant}
      forceDarkMode={darkMode}
      forceTheme={theme}
      style={[styles.exampleDecal]}
    >
      <Text style={[styles.cyberpunkText, textStyle]}>{text}</Text>
    </CyberpunkDecal>
  );
};

// Demo component showing all variants
export const CyberpunkDecalDemo: React.FC = () => {
  return (
    <View style={styles.demoContainer}>
      <View style={styles.row}>
        <TextWithCyberpunkDecal
          text="NEON GRID"
          variant="neonGrid"
          darkMode={true}
          style={styles.demoItem}
        />
        <TextWithCyberpunkDecal
          text="NEON GRID"
          variant="neonGrid"
          darkMode={false}
          style={styles.demoItem}
        />
      </View>

      <View style={styles.row}>
        <TextWithCyberpunkDecal
          text="TECH HEX"
          variant="techHex"
          darkMode={true}
          style={styles.demoItem}
        />
        <TextWithCyberpunkDecal
          text="TECH HEX"
          variant="techHex"
          darkMode={false}
          style={styles.demoItem}
        />
      </View>

      <View style={styles.row}>
        <TextWithCyberpunkDecal
          text="GLITCH EDGE"
          variant="glitchEdge"
          darkMode={true}
          style={styles.demoItem}
        />
        <TextWithCyberpunkDecal
          text="GLITCH EDGE"
          variant="glitchEdge"
          darkMode={false}
          style={styles.demoItem}
        />
      </View>

      <View style={styles.row}>
        <TextWithCyberpunkDecal
          text="DATA STREAM"
          variant="dataStream"
          darkMode={true}
          style={styles.demoItem}
        />
        <TextWithCyberpunkDecal
          text="DATA STREAM"
          variant="dataStream"
          darkMode={false}
          style={styles.demoItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 4, // Sharper corners for cyberpunk aesthetic
  },
  decalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 1,
  },
  svg: {
    position: "absolute",
  },
  cyberpunkText: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: "#FAFAFA", // Default to light text for better contrast
    letterSpacing: 2, // Wider letter spacing for cyberpunk feel
    textShadowColor: "#0A84FF",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  exampleDecal: {
    height: 150,
    width: 300,
    marginVertical: 10,
  },
  demoContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#14141B", // Dark background for the demo
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  demoItem: {
    margin: 10,
    width: 300,
  },
});

export default CyberpunkDecal;

import React from "react";
import { Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { colors } from "../styles/theme";
import type { NavSection } from "../content/portfolio";

type OrbitCardProps = {
  title: string;
  eyebrow: string;
  description: string;
  section: NavSection;
  selected: boolean;
  compact: boolean;
  onPress: (section: NavSection) => void;
};

const desktopPositions: Record<NavSection, ViewStyle> = {
  about: { top: "12%", left: "8%" },
  projects: { top: "16%", right: "8%" },
  notes: { bottom: 0, left: "50%", marginLeft: -160 }
};

export function OrbitCard({ title, eyebrow, description, section, selected, compact, onPress }: OrbitCardProps) {
  return (
    <Pressable
      onPress={() => onPress(section)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Open ${title}`}
      style={({ pressed }) => [
        styles.card,
        compact ? styles.compactCard : desktopPositions[section],
        selected && styles.selected,
        pressed && styles.hot
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <ChevronRight size={18} color={selected ? colors.white : colors.cyan} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    width: 320,
    minHeight: 154,
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    overflow: "hidden",
    transform: [{ translateY: 0 }]
  },
  compactCard: {
    position: "relative",
    width: "100%",
    minHeight: 132
  },
  selected: {
    borderColor: colors.borderStrong,
    backgroundColor: colors.panelStrong
  },
  hot: {
    transform: [{ translateY: -3 }]
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  eyebrow: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 8
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20
  }
});

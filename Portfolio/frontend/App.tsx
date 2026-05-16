import React, { useEffect, useRef, useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { navCards, type NavSection } from "./src/content/portfolio";
import { OrbitCard } from "./src/components/OrbitCard";
import { OrbExperience } from "./src/components/OrbExperience";
import { SectionPanel } from "./src/components/SectionPanel";
import { colors } from "./src/styles/theme";

export default function App() {
  const [orbOpen, setOrbOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSection>("about");
  const [scrollRequest, setScrollRequest] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionPanelY = useRef<number | null>(null);
  const { width } = useWindowDimensions();
  const compact = width < 820;

  const scrollToSectionPanel = () => {
    if (sectionPanelY.current === null) {
      return;
    }

    const y = Math.max(sectionPanelY.current - (compact ? 10 : 18), 0);

    scrollViewRef.current?.scrollTo({ y, animated: true });

    if (Platform.OS === "web" && typeof window !== "undefined" && typeof window.scrollTo === "function") {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const selectSection = (section: NavSection) => {
    setOrbOpen(true);
    setActiveSection(section);
    setScrollRequest((request) => request + 1);
  };

  const toggleOrb = () => {
    setOrbOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    if (!orbOpen || scrollRequest === 0) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      scrollToSectionPanel();
      setTimeout(scrollToSectionPanel, 140);
    });

    return () => cancelAnimationFrame(frame);
  }, [compact, orbOpen, scrollRequest]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView ref={scrollViewRef} contentContainerStyle={[styles.scrollContent, compact && styles.scrollContentCompact]}>
        <View style={[styles.experience, compact && styles.experienceCompact]}>
          <View style={styles.identityStrip}>
            <Text style={styles.identityName}>Thomas Llanes</Text>
            <Text style={styles.identityRole}>Backend systems, SwiftUI iOS experiences, product-minded engineering.</Text>
          </View>

          <View
            style={[styles.orbStage, compact && styles.orbStageCompact]}
            accessible
            accessibilityRole="button"
            accessibilityLabel={orbOpen ? "Close Thomas Llanes portfolio sections" : "Open Thomas Llanes portfolio sections"}
            onAccessibilityTap={toggleOrb}
          >
            <OrbExperience active={orbOpen} onActivate={toggleOrb} />
          </View>

          {!orbOpen && (
            <View style={styles.tapHint} pointerEvents="none">
              <Text style={styles.tapHintText}>Click or tap the orb</Text>
            </View>
          )}

          {orbOpen && (
            <View pointerEvents="box-none" style={[styles.cardsLayer, compact && styles.cardsLayerCompact]}>
              {navCards.map((card) => (
                <OrbitCard
                  key={card.key}
                  title={card.title}
                  eyebrow={card.eyebrow}
                  description={card.description}
                  section={card.key}
                  selected={activeSection === card.key}
                  compact={compact}
                  onPress={selectSection}
                />
              ))}
            </View>
          )}
        </View>

        {orbOpen && (
          <View onLayout={(event) => {
            sectionPanelY.current = event.nativeEvent.layout.y;
          }}>
            <SectionPanel activeSection={activeSection} compact={compact} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundDeep
  },
  scrollContent: {
    minHeight: "100%",
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: colors.backgroundDeep
  },
  scrollContentCompact: {
    paddingHorizontal: 12
  },
  experience: {
    minHeight: 720,
    width: "100%",
    maxWidth: 1280,
    alignSelf: "center",
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  experienceCompact: {
    minHeight: 820,
    justifyContent: "flex-start",
    paddingTop: 28
  },
  identityStrip: {
    position: "absolute",
    top: 28,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 18,
    zIndex: 3
  },
  identityName: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 5
  },
  identityRole: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18
  },
  orbStage: {
    width: 390,
    height: 390,
    borderRadius: 390,
    overflow: "hidden",
    zIndex: 5
  },
  orbStageCompact: {
    width: 330,
    height: 330,
    marginTop: 82
  },
  tapHint: {
    position: "absolute",
    bottom: 128,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "rgba(8, 35, 62, 0.72)"
  },
  tapHintText: {
    color: colors.textSoft,
    fontSize: 13,
    fontWeight: "800"
  },
  cardsLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 4
  },
  cardsLayerCompact: {
    position: "relative",
    width: "100%",
    gap: 12,
    marginTop: 20
  }
});

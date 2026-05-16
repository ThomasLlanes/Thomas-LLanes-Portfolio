import React from "react";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Download, ExternalLink, Mail, MapPin } from "lucide-react-native";
import {
  engineeringNotes,
  profile,
  projects,
  type ContactLink,
  type NavSection,
} from "../content/portfolio";
import { colors } from "../styles/theme";

type SectionPanelProps = {
  activeSection: NavSection;
  compact: boolean;
};

function ProjectVideo({ altText, url }: { altText: string; url: string }) {
  if (Platform.OS === "web") {
    return (
      <View style={styles.videoFrame} accessibilityLabel={altText}>
        {React.createElement("video", {
          controls: true,
          playsInline: true,
          preload: "metadata",
          src: url,
          style: {
            backgroundColor: "#020814",
            border: 0,
            borderRadius: 8,
            display: "block",
            height: "100%",
            objectFit: "cover",
            width: "100%",
          },
        })}
      </View>
    );
  }

  return (
    <View style={styles.videoFallback} accessibilityLabel={altText}>
      <Text style={styles.videoLabel}>Video demo</Text>
      <Text style={styles.videoUrl}>{url}</Text>
    </View>
  );
}

function LinkButton({ link }: { link: ContactLink }) {
  const openLink = () => {
    if (Platform.OS === "web" && link.downloadFilename) {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.download = link.downloadFilename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      return;
    }

    Linking.openURL(link.url);
  };

  return (
    <Pressable
      accessibilityRole="link"
      onPress={openLink}
      style={({ pressed }) => [
        styles.linkButton,
        pressed && styles.linkButtonHot,
      ]}
    >
      <Text style={styles.linkText}>{link.label}</Text>
      {link.placeholder ? (
        <Text style={styles.placeholder}>Placeholder</Text>
      ) : link.downloadFilename ? (
        <Download size={15} color={colors.cyan} />
      ) : (
        <ExternalLink size={15} color={colors.cyan} />
      )}
    </Pressable>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
    </View>
  );
}

function AboutSection({ compact }: { compact: boolean }) {
  return (
    <View style={[styles.sectionGrid, compact && styles.sectionGridCompact]}>
      <View
        style={[
          styles.primaryColumn,
          styles.contentCard,
          compact && styles.mobileColumn,
        ]}
      >
        <Text style={styles.kicker}>About / Contact</Text>
        <Text style={[styles.name, compact && styles.nameCompact]}>
          {profile.name}
        </Text>
        <Text style={[styles.role, compact && styles.roleCompact]}>
          {profile.role}
        </Text>
        <Text style={styles.paragraph}>{profile.summary}</Text>
        <View style={styles.metaRow}>
          <MapPin size={16} color={colors.cyan} />
          <Text style={styles.metaText}>{profile.location}</Text>
        </View>
        <View style={styles.metaRow}>
          <Mail size={16} color={colors.cyan} />
          <Text style={styles.metaText}>{profile.email}</Text>
        </View>
        <View style={styles.linksGrid}>
          {profile.contactLinks.map((link) => (
            <LinkButton key={link.label} link={link} />
          ))}
        </View>
      </View>

      <View
        style={[
          styles.secondaryColumn,
          styles.miniCardGrid,
          compact && styles.mobileColumn,
        ]}
      >
        <View style={styles.contentCard}>
          <Text style={styles.blockTitle}>Current Focus</Text>
          <Text style={styles.paragraph}>{profile.currentWork}</Text>
        </View>
        <View style={styles.contentCard}>
          <Text style={styles.blockTitle}>Education</Text>
          <Text style={styles.paragraph}>{profile.education}</Text>
        </View>
        <View style={styles.contentCard}>
          <Text style={styles.blockTitle}>Previous Experience</Text>
          <Text style={styles.paragraph}>{profile.previousExperience}</Text>
        </View>
        <View style={styles.contentCard}>
          <Text style={styles.blockTitle}>Languages</Text>
          <View style={styles.chipWrap}>
            {profile.languages.map((language) => (
              <Chip key={language} label={language} />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.fullWidth}>
        <Text style={[styles.blockTitle, styles.sectionBlockTitle]}>
          Technical Strengths
        </Text>
        <View style={[styles.strengthGrid, compact && styles.mobileStack]}>
          {profile.strengths.map((strength) => (
            <View
              key={strength}
              style={[styles.strengthItem, compact && styles.mobileFullWidth]}
            >
              <Text style={styles.strengthText}>{strength}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function ProjectsSection({ compact }: { compact: boolean }) {
  return (
    <View>
      <Text style={styles.kicker}>Projects</Text>
      {projects.map((project) => (
        <View
          key={project.slug}
          style={[styles.projectLayout, compact && styles.sectionGridCompact]}
        >
          <View
            style={[
              styles.projectMediaColumn,
              compact && styles.mobileFullWidth,
            ]}
          >
            <ProjectVideo
              altText={project.media.altText}
              url={project.media.url}
            />
          </View>
          <View
            style={[
              styles.projectCopy,
              styles.miniCardGrid,
              compact && styles.mobileColumn,
            ]}
          >
            <View style={styles.contentCard}>
              <Text
                style={[
                  styles.projectTitle,
                  compact && styles.projectTitleCompact,
                ]}
              >
                {project.title}
              </Text>
              <Text style={styles.paragraph}>{project.longDescription}</Text>
            </View>
            <View style={styles.contentCard}>
              <Text style={styles.blockTitle}>Key Features</Text>
              {project.keyFeatures.map((feature) => (
                <Text key={feature} style={styles.bullet}>
                  - {feature}
                </Text>
              ))}
            </View>
            <View style={styles.contentCard}>
              <Text style={styles.blockTitle}>Technologies</Text>
              <View style={styles.chipWrap}>
                {project.technologies.map((technology) => (
                  <Chip key={technology} label={technology} />
                ))}
              </View>
            </View>
            <View style={styles.contentCard}>
              <Text style={styles.blockTitle}>Architecture Notes</Text>
              {project.architectureNotes.map((note) => (
                <Text key={note} style={styles.bullet}>
                  - {note}
                </Text>
              ))}
            </View>
            <View style={styles.contentCard}>
              <Text style={styles.blockTitle}>Links</Text>
              <View style={styles.linksGrid}>
                {project.links.map((link) => (
                  <LinkButton key={link.label} link={link} />
                ))}
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function NotesSection({ compact }: { compact: boolean }) {
  return (
    <View>
      <Text style={styles.kicker}>Engineering Notes</Text>
      <View style={styles.contentCard}>
        <Text style={styles.sectionIntro}>
          Case-study placeholders that show how Thomas thinks through product
          behavior, system boundaries, and correctness without exposing
          proprietary work.
        </Text>
      </View>
      <View style={[styles.notesGrid, compact && styles.mobileStack]}>
        {engineeringNotes.map((note) => (
          <View
            key={note.slug}
            style={[styles.noteCard, compact && styles.mobileFullWidth]}
          >
            <View style={styles.noteHeader}>
              <Text style={styles.noteTheme}>{note.theme}</Text>
              <Text style={styles.noteTitle}>{note.title}</Text>
            </View>
            <Text style={styles.paragraph}>{note.summary}</Text>
            <View style={styles.problemBlock}>
              <Text style={styles.problemLabel}>Problem</Text>
              <Text style={styles.problemText}>{note.problem}</Text>
            </View>
            <View style={styles.problemBlock}>
              <Text style={styles.problemLabel}>Investigation</Text>
              <Text style={styles.problemText}>{note.investigation}</Text>
            </View>
            <View style={styles.problemBlock}>
              <Text style={styles.problemLabel}>Solution</Text>
              <Text style={styles.problemText}>{note.solution}</Text>
            </View>
            <View style={styles.chipWrap}>
              {note.technologies.map((technology) => (
                <Chip key={technology} label={technology} />
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export function SectionPanel({ activeSection, compact }: SectionPanelProps) {
  return (
    <View style={[styles.panel, compact && styles.panelCompact]}>
      {activeSection === "about" && <AboutSection compact={compact} />}
      {activeSection === "projects" && <ProjectsSection compact={compact} />}
      {activeSection === "notes" && <NotesSection compact={compact} />}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
    overflow: "hidden",
    backgroundColor: colors.panel,
  },
  panelCompact: {
    borderWidth: 0,
    padding: 0,
    backgroundColor: "transparent",
    overflow: "visible",
  },
  sectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
  },
  sectionGridCompact: {
    gap: 16,
  },
  primaryColumn: {
    flexGrow: 1,
    flexBasis: 460,
    minWidth: 0,
  },
  secondaryColumn: {
    flexGrow: 1,
    flexBasis: 340,
    minWidth: 0,
  },
  mobileColumn: {
    width: "100%",
    flexGrow: 0,
    flexShrink: 1,
  },
  fullWidth: {
    width: "100%",
  },
  contentCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    backgroundColor: "rgba(8, 35, 62, 0.62)",
    minWidth: 0,
  },
  miniCardGrid: {
    gap: 12,
  },
  kicker: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  name: {
    color: colors.text,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900",
    marginBottom: 12,
  },
  nameCompact: {
    fontSize: 34,
    lineHeight: 40,
  },
  role: {
    color: colors.textSoft,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700",
    marginBottom: 16,
  },
  roleCompact: {
    fontSize: 19,
    lineHeight: 26,
  },
  paragraph: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  metaText: {
    color: colors.textSoft,
    fontSize: 15,
    flexShrink: 1,
  },
  linksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },
  linkButton: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    maxWidth: "100%",
    flexGrow: 1,
    backgroundColor: "rgba(15, 48, 82, 0.58)",
  },
  linkButtonHot: {
    borderColor: colors.borderStrong,
    backgroundColor: "rgba(30, 91, 140, 0.68)",
  },
  linkText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    flexShrink: 1,
  },
  placeholder: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: "700",
  },
  blockTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  sectionBlockTitle: {
    marginTop: 4,
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  chip: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 7,
    maxWidth: "100%",
    backgroundColor: "rgba(21, 62, 98, 0.54)",
  },
  chipText: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: "700",
    flexShrink: 1,
  },
  strengthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  strengthItem: {
    flexGrow: 1,
    flexBasis: 260,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    backgroundColor: "rgba(8, 35, 62, 0.62)",
    minWidth: 0,
  },
  mobileStack: {
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  mobileFullWidth: {
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    flexBasis: "auto",
    flexGrow: 0,
    flexShrink: 1,
  },
  strengthText: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 20,
  },
  projectLayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    marginBottom: 8,
  },
  projectMediaColumn: {
    flexGrow: 1,
    flexBasis: 340,
    minWidth: 0,
  },
  videoFrame: {
    width: "100%",
    minHeight: 220,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    overflow: "hidden",
    backgroundColor: "rgba(7, 24, 43, 0.92)",
  },
  videoFallback: {
    width: "100%",
    minHeight: 220,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(7, 24, 43, 0.92)",
  },
  videoLabel: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },
  videoUrl: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: "center",
  },
  projectCopy: {
    flexGrow: 2,
    flexBasis: 460,
    minWidth: 0,
  },
  projectTitle: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    marginBottom: 10,
  },
  projectTitleCompact: {
    fontSize: 26,
    lineHeight: 32,
  },
  bullet: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4,
  },
  sectionIntro: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 820,
    marginBottom: 0,
  },
  notesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    marginTop: 14,
  },
  noteCard: {
    flexGrow: 1,
    flexBasis: 330,
    minWidth: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    backgroundColor: "rgba(8, 35, 62, 0.62)",
  },
  noteHeader: {
    marginBottom: 10,
  },
  noteTheme: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  noteTitle: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "900",
  },
  problemBlock: {
    marginTop: 8,
  },
  problemLabel: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 3,
  },
  problemText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
});

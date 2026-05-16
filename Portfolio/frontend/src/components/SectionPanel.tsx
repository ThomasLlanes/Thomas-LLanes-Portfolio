import React from "react";
import { Linking, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Download, ExternalLink, Mail, MapPin } from "lucide-react-native";
import { engineeringNotes, profile, projects, type ContactLink, type NavSection } from "../content/portfolio";
import { colors } from "../styles/theme";

type SectionPanelProps = {
  activeSection: NavSection;
};

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
      style={({ pressed }) => [styles.linkButton, pressed && styles.linkButtonHot]}
    >
      <Text style={styles.linkText}>{link.label}</Text>
      {link.placeholder ? <Text style={styles.placeholder}>Placeholder</Text> : link.downloadFilename ? <Download size={15} color={colors.cyan} /> : <ExternalLink size={15} color={colors.cyan} />}
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

function AboutSection() {
  return (
    <View style={styles.sectionGrid}>
      <View style={styles.primaryColumn}>
        <Text style={styles.kicker}>About / Contact</Text>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.role}>{profile.role}</Text>
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

      <View style={styles.secondaryColumn}>
        <Text style={styles.blockTitle}>Current Focus</Text>
        <Text style={styles.paragraph}>{profile.currentWork}</Text>
        <Text style={styles.blockTitle}>Education</Text>
        <Text style={styles.paragraph}>{profile.education}</Text>
        <Text style={styles.blockTitle}>Previous Experience</Text>
        <Text style={styles.paragraph}>{profile.previousExperience}</Text>
        <Text style={styles.blockTitle}>Languages</Text>
        <View style={styles.chipWrap}>
          {profile.languages.map((language) => (
            <Chip key={language} label={language} />
          ))}
        </View>
      </View>

      <View style={styles.fullWidth}>
        <Text style={styles.blockTitle}>Technical Strengths</Text>
        <View style={styles.strengthGrid}>
          {profile.strengths.map((strength) => (
            <View key={strength} style={styles.strengthItem}>
              <Text style={styles.strengthText}>{strength}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function ProjectsSection() {
  return (
    <View>
      <Text style={styles.kicker}>Projects</Text>
      {projects.map((project) => (
        <View key={project.slug} style={styles.projectLayout}>
          <View style={styles.videoPlaceholder} accessibilityLabel={project.media.altText}>
            <Text style={styles.videoLabel}>Video demo placeholder</Text>
            <Text style={styles.videoUrl}>{project.media.url}</Text>
          </View>
          <View style={styles.projectCopy}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.paragraph}>{project.longDescription}</Text>
            <Text style={styles.blockTitle}>Key Features</Text>
            {project.keyFeatures.map((feature) => (
              <Text key={feature} style={styles.bullet}>- {feature}</Text>
            ))}
            <Text style={styles.blockTitle}>Technologies</Text>
            <View style={styles.chipWrap}>
              {project.technologies.map((technology) => (
                <Chip key={technology} label={technology} />
              ))}
            </View>
            <Text style={styles.blockTitle}>Architecture Notes</Text>
            {project.architectureNotes.map((note) => (
              <Text key={note} style={styles.bullet}>- {note}</Text>
            ))}
            <View style={styles.linksGrid}>
              {project.links.map((link) => (
                <LinkButton key={link.label} link={link} />
              ))}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function NotesSection() {
  return (
    <View>
      <Text style={styles.kicker}>Engineering Notes</Text>
      <Text style={styles.sectionIntro}>
        Case-study placeholders that show how Thomas thinks through product behavior, system boundaries, and correctness without exposing proprietary work.
      </Text>
      <View style={styles.notesGrid}>
        {engineeringNotes.map((note) => (
          <View key={note.slug} style={styles.noteCard}>
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

export function SectionPanel({ activeSection }: SectionPanelProps) {
  return (
    <View style={styles.panel}>
      {activeSection === "about" && <AboutSection />}
      {activeSection === "projects" && <ProjectsSection />}
      {activeSection === "notes" && <NotesSection />}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: "rgba(3, 13, 26, 0.72)"
  },
  sectionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24
  },
  primaryColumn: {
    flexGrow: 1,
    flexBasis: 460
  },
  secondaryColumn: {
    flexGrow: 1,
    flexBasis: 340
  },
  fullWidth: {
    width: "100%"
  },
  kicker: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase",
    marginBottom: 10
  },
  name: {
    color: colors.text,
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "900",
    marginBottom: 12
  },
  role: {
    color: colors.textSoft,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "700",
    marginBottom: 16
  },
  paragraph: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 14
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8
  },
  metaText: {
    color: colors.textSoft,
    fontSize: 15
  },
  linksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14
  },
  linkButton: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(15, 48, 82, 0.58)"
  },
  linkButtonHot: {
    borderColor: colors.borderStrong,
    backgroundColor: "rgba(30, 91, 140, 0.68)"
  },
  linkText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800"
  },
  placeholder: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: "700"
  },
  blockTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 8
  },
  chipWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8
  },
  chip: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: "rgba(21, 62, 98, 0.54)"
  },
  chipText: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: "700"
  },
  strengthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  strengthItem: {
    flexGrow: 1,
    flexBasis: 260,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    backgroundColor: "rgba(8, 35, 62, 0.62)"
  },
  strengthText: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 20
  },
  projectLayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24
  },
  videoPlaceholder: {
    flexGrow: 1,
    flexBasis: 340,
    minHeight: 260,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(7, 24, 43, 0.92)"
  },
  videoLabel: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8
  },
  videoUrl: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: "center"
  },
  projectCopy: {
    flexGrow: 2,
    flexBasis: 460
  },
  projectTitle: {
    color: colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    marginBottom: 10
  },
  bullet: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 4
  },
  sectionIntro: {
    color: colors.textMuted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 820,
    marginBottom: 20
  },
  notesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14
  },
  noteCard: {
    flexGrow: 1,
    flexBasis: 330,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    backgroundColor: "rgba(8, 35, 62, 0.62)"
  },
  noteHeader: {
    marginBottom: 10
  },
  noteTheme: {
    color: colors.cyan,
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 5
  },
  noteTitle: {
    color: colors.text,
    fontSize: 19,
    lineHeight: 24,
    fontWeight: "900"
  },
  problemBlock: {
    marginTop: 8
  },
  problemLabel: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 3
  },
  problemText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19
  }
});

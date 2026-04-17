/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';
import resumeData from '../data/resume.json';

// Use standard PDF fonts (Helvetica) for maximum reliability and to avoid fetch/404 errors
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    letterSpacing: 2,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    fontSize: 9,
    color: '#64748b',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    color: '#cbd5e1',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 4,
    marginBottom: 10,
    color: '#0f172a',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#334155',
  },
  mainContent: {
    flexDirection: 'row',
    gap: 30,
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
  experienceItem: {
    marginBottom: 15,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  expRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  expDates: {
    fontSize: 9,
    color: '#64748b',
  },
  expCompany: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 9,
    color: '#475569',
    lineHeight: 1.4,
    marginLeft: 10,
    marginBottom: 2,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  skillTagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  skillTag: {
    fontSize: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#f1f5f9',
    color: '#475569',
    borderRadius: 4,
  },
  softSkillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 9,
    marginBottom: 4,
    color: '#475569',
  },
  eduItem: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  eduInfo: {
    fontSize: 9,
    color: '#64748b',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#cbd5e1',
    textTransform: 'uppercase',
    letterSpacing: 2,
  }
});

export const ResumePDF = () => (
  <Document title={`Resume - ${resumeData?.basics?.name || 'Applicant'}`}>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.name}>{resumeData?.basics?.name}</Text>
        <Text style={styles.title}>{resumeData?.basics?.title}</Text>
        <View style={styles.contactRow}>
          {resumeData?.basics?.email && (
            <>
              <Link src={`mailto:${resumeData.basics.email}`} style={styles.link}>
                <Text>{resumeData.basics.email}</Text>
              </Link>
              <Text style={styles.separator}>|</Text>
            </>
          )}
          {resumeData?.basics?.phone && (
            <>
              <Link src={`tel:${resumeData.basics.phone}`} style={styles.link}>
                <Text>{resumeData.basics.phone}</Text>
              </Link>
              <Text style={styles.separator}>|</Text>
            </>
          )}
          <Text>{resumeData?.basics?.location}</Text>
          {resumeData?.basics?.links?.[0] && (
            <>
              <Text style={styles.separator}>|</Text>
              <Link src={resumeData.basics.links[0].url} style={styles.link}>
                Portfolio
              </Link>
            </>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{resumeData?.basics?.summary}</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.leftColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {resumeData?.experience?.map((exp, i) => (
              <View key={i} style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.expRole}>{exp.role}</Text>
                  <Text style={styles.expDates}>{exp.dates}</Text>
                </View>
                <Text style={styles.expCompany}>{exp.company}</Text>
                {exp.bullets?.map((bullet, j) => (
                  <Text key={j} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {resumeData?.projects?.map((project, i) => (
              <View key={i} style={styles.projectItem}>
                <View style={styles.projectHeader}>
                  {(project as any).url ? (
                    <Link src={(project as any).url} style={[styles.expRole, styles.link, { fontSize: 10 }]}>
                      {project.title}
                    </Link>
                  ) : (
                    <Text style={[styles.expRole, { fontSize: 10 }]}>{project.title}</Text>
                  )}
                  <Text style={{ fontSize: 8, color: '#94a3b8' }}>{project.stack}</Text>
                </View>
                {project.bullets?.map((bullet, j) => (
                  <Text key={j} style={styles.bullet}>• {bullet}</Text>
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 12 }]}>Technical Stack</Text>
            <View style={styles.skillTagContainer}>
              {Array.isArray(resumeData?.skills) && resumeData.skills.filter((s: any) => s.category !== 'Soft').map((skill: any, i: number) => (
                <Text key={i} style={styles.skillTag}>{skill.name}</Text>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 12 }]}>Certifications</Text>
            {resumeData?.certifications?.map((cert: any, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Link src={cert.url} style={[styles.summary, styles.link, { fontSize: 9, marginBottom: 2 }]}>
                  {cert.name}
                </Link>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: 12 }]}>Education</Text>
            {resumeData?.education?.map((edu, i) => (
              <View key={i} style={styles.eduItem}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduInfo}>{edu.institute}</Text>
                <Text style={[styles.expDates, { fontSize: 8 }]}>{edu.dates}</Text>
              </View>
            ))}
          </View>

        </View>
      </View>

      <Text style={styles.footer}>Generated from Interactive Portfolio</Text>

    </Page>
  </Document>
);

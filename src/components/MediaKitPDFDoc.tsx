import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { NAFYAD_INFO, PACKAGES, STATS, CREATOR_NAME, BUSINESS_EMAIL, SOCIAL_LINKS, WEBSITE } from '../lib/portfolio-data';

// Register fonts if needed, otherwise use defaults
// Using standard fonts for reliability in server-side rendering

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 180,
    backgroundColor: '#0a0a0a',
    padding: 25,
    color: '#ffffff',
  },
  mainContent: {
    marginLeft: 180,
    padding: 40,
    flex: 1,
  },
  sidebarTitle: {
    fontSize: 22,
    fontWeight: 'black',
    marginBottom: 4,
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  sidebarSubtitle: {
    fontSize: 8,
    color: '#9333ea',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 35,
    fontWeight: 'bold',
  },
  sidebarSection: {
    marginBottom: 25,
  },
  sidebarSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#4b5563',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sidebarLink: {
    fontSize: 8,
    color: '#9ca3af',
    marginBottom: 5,
  },
  sidebarContactBox: {
    position: 'absolute',
    bottom: 30,
    left: 25,
    right: 25,
    borderTop: '0.5pt solid #1f2937',
    paddingTop: 15,
  },
  header: {
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: -0.5,
  },
  mainSubtitle: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
  accentLine: {
    width: 30,
    height: 3,
    backgroundColor: '#9333ea',
    marginTop: 12,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 15,
  },
  paragraph: {
    fontSize: 9,
    lineHeight: 1.6,
    color: '#374151',
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 12,
    border: '0.5pt solid #f3f4f6',
    borderRadius: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  statLabel: {
    fontSize: 7,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  packageGrid: {
    marginTop: 5,
  },
  packageItem: {
    marginBottom: 8,
    padding: 10,
    backgroundColor: '#ffffff',
    border: '0.5pt solid #f3f4f6',
    borderLeft: '2.5pt solid #9333ea',
    borderRadius: 2,
  },
  packageHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  packageName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  packagePrice: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#9333ea',
  },
  packageDesc: {
    fontSize: 8,
    color: '#6b7280',
    lineHeight: 1.3,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 7,
    color: '#9ca3af',
  }
});

export const MediaKitPDFDoc = () => (
  <Document title={`${CREATOR_NAME} - Media Kit`}>
    <Page size="A4" style={styles.page}>
      {/* Dark Sidebar */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>{CREATOR_NAME}</Text>
        <Text style={styles.sidebarSubtitle}>Digital Strategist</Text>
        
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Our Pillars</Text>
          <Text style={styles.sidebarLink}>• Content Strategy</Text>
          <Text style={styles.sidebarLink}>• Digital Marketing</Text>
          <Text style={styles.sidebarLink}>• Audience Growth</Text>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Presence</Text>
          <Text style={styles.sidebarLink}>TikTok: @nafyad_</Text>
          <Text style={styles.sidebarLink}>YouTube: @NafTech00</Text>
          <Text style={styles.sidebarLink}>IG: @n.a.f.y.a.d</Text>
        </View>

        <View style={styles.sidebarContactBox}>
          <Text style={styles.sidebarSectionTitle}>Direct Line</Text>
          <Text style={styles.sidebarLink}>{BUSINESS_EMAIL}</Text>
          <Text style={{ ...styles.sidebarLink, marginTop: 8, color: '#9333ea', fontWeight: 'bold' }}>{WEBSITE}</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>OFFICIAL MEDIA KIT</Text>
          <Text style={styles.mainSubtitle}>Bridging Innovation & Audience Reach</Text>
          <View style={styles.accentLine} />
        </View>

        <View>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.paragraph}>
            Nafyad is a Computer Science graduate and research-driven digital strategist building high-impact identity for the modern market. Specialized in creating high-retention content and data-backed digital marketing strategies.
          </Text>
          <Text style={styles.paragraph}>
            Bridging the gap between technical innovation and audience engagement through high-fidelity storytelling and psychological triggers that drive growth. Delivering results that maximize reach and build authentic communities.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Impact Metrics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{STATS.totalFollowers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{STATS.produced}+</Text>
            <Text style={styles.statLabel}>Productions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>19.5M</Text>
            <Text style={styles.statLabel}>Monthly Reach</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>~96%</Text>
            <Text style={styles.statLabel}>Engagement</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Commercial Packages</Text>
        <View style={styles.packageGrid}>
          {PACKAGES.slice(0, 5).map((pkg) => (
            <View key={pkg.id} style={styles.packageItem}>
              <View style={styles.packageHead}>
                <Text style={styles.packageName}>{pkg.name}</Text>
                <Text style={styles.packagePrice}>{pkg.price}</Text>
              </View>
              <Text style={styles.packageDesc}>{pkg.description}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} {CREATOR_NAME} | Proprietary Partnership Doc</Text>
      </View>
    </Page>
  </Document>
);

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { CREATOR_NAME, BUSINESS_EMAIL, WEBSITE } from '../lib/portfolio-data';

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
    width: 175,
    backgroundColor: '#0d0d11',
    padding: 22,
    color: '#ffffff',
  },
  mainContent: {
    marginLeft: 175,
    padding: 35,
    flex: 1,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  sidebarSubtitle: {
    fontSize: 7.5,
    color: '#a855f7',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 35,
    fontWeight: 'bold',
  },
  sidebarSection: {
    marginBottom: 25,
  },
  sidebarSectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sidebarLink: {
    fontSize: 7.5,
    color: '#9ca3af',
    marginBottom: 5,
    lineHeight: 1.4,
  },
  sidebarContactBox: {
    position: 'absolute',
    bottom: 30,
    left: 22,
    right: 22,
    borderTop: '0.5pt solid #1f2937',
    paddingTop: 15,
  },
  header: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    letterSpacing: -0.5,
  },
  mainSubtitle: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: '#a855f7',
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 14,
  },
  paragraph: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#374151',
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 5,
  },
  bullet: {
    width: 6,
    fontSize: 8.5,
    color: '#a855f7',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    lineHeight: 1.4,
    color: '#374151',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
    marginTop: 5,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 10,
    border: '0.5pt solid #eaeaea',
    borderRadius: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#a855f7',
  },
  statLabel: {
    fontSize: 6.5,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginTop: 1,
  },
  targetBadge: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: '#a855f7',
    backgroundColor: '#f3e8ff',
    padding: '2 6',
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    right: 35,
    fontSize: 6.5,
    color: '#9ca3af',
  }
});

export const FurniturePDFDoc = () => (
  <Document title={`${CREATOR_NAME} - Furniture Media Kit & Strategy`}>
    <Page size="A4" style={styles.page}>
      {/* Sidebar with branding and contacts */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>{CREATOR_NAME}</Text>
        <Text style={styles.sidebarTitle}>DACHASA</Text>
        <Text style={styles.sidebarSubtitle}>Digital Strategist & SMM</Text>
        
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Core Competency</Text>
          <Text style={styles.sidebarLink}>• High-End Video Production</Text>
          <Text style={styles.sidebarLink}>• Luxury Interior Aesthetics</Text>
          <Text style={styles.sidebarLink}>• Retention Psychology</Text>
          <Text style={styles.sidebarLink}>• Trend Jacking Dynamics</Text>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Social Channels</Text>
          <Text style={styles.sidebarLink}>TikTok: @nafyad_</Text>
          <Text style={styles.sidebarLink}>YouTube: @NafTech00</Text>
          <Text style={styles.sidebarLink}>IG: @n.a.f.y.a.d</Text>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarSectionTitle}>Key Tools</Text>
          <Text style={styles.sidebarLink}>• Adobe Premiere Pro</Text>
          <Text style={styles.sidebarLink}>• Canva & Photoshop</Text>
          <Text style={styles.sidebarLink}>• CapCut (Mobile Fast-Cut)</Text>
          <Text style={styles.sidebarLink}>• HD Camera/Mobile Rig</Text>
        </View>

        <View style={styles.sidebarContactBox}>
          <Text style={styles.sidebarSectionTitle}>Direct Line</Text>
          <Text style={styles.sidebarLink}>{BUSINESS_EMAIL}</Text>
          <Text style={styles.sidebarLink}>Phone: 0909563789</Text>
          <Text style={{ ...styles.sidebarLink, marginTop: 6, color: '#a855f7', fontWeight: 'bold' }}>{WEBSITE}</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.mainTitle}>FURNITURE CONTENT STRATEGY</Text>
          <Text style={styles.mainSubtitle}>Bespoke Digital Media Kit & Roadmap</Text>
          <View style={styles.accentLine} />
        </View>

        {/* Executive Summary */}
        <View>
          <Text style={styles.sectionTitle}>Executive Summary & Vision</Text>
          <Text style={styles.paragraph}>
            As a Computer Science graduate, digital marketer, and founder of NafTech, I specialize in combining data analytics with high-end, immersive media production. While my technical background is grounded in software structures, my passion resides in the art of storytelling, high-retention editing, and consumer engagement psychology.
          </Text>
          <Text style={styles.paragraph}>
            For premium furniture showcases (located at Bole Atlas, Platinum Plaza, 3rd Floor), the objective is clear: to lift physical products into aspirational, digital content assets. By using professional tools (Adobe Premiere Pro and Canva), we will build beautiful, cinematic hooks that showcase grain textures, elegant angles, space-saving layouts, and the sheer comfort of every item—transforming casual online browsers into active customer sales prospects.
          </Text>
        </View>

        {/* Tactical Deliverables */}
        <View>
          <Text style={styles.sectionTitle}>Core Execution Pillars</Text>
          
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <View style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold', color: '#111827' }}>Cinematic Asset Production:</Text>
              <Text style={{ color: '#4b5563', marginTop: 1 }}>
                Developing short-form, hook-driven videos (TikTok, Instagram Reels, YouTube Shorts, and Telegram) utilizing smooth macro closeups of woodwork, fabric details, and styling configurations.
              </Text>
            </View>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <View style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold', color: '#111827' }}>Dynamic Copywriting & Storytelling:</Text>
              <Text style={{ color: '#4b5563', marginTop: 1 }}>
                Drafting rich, captivating captions in Amharic and English tailored for local buyer aspirations—highlighting home comfort, durability, prestige, and premium lifestyles.
              </Text>
            </View>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <View style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold', color: '#111827' }}>Daily Active Page Management & Funnels:</Text>
              <Text style={{ color: '#4b5563', marginTop: 1 }}>
                Maintaining a rigorous, high-tempo upload schedule, managing comments, and setting up instant response guidelines to drive direct message (DM) inquiries directly to physical showroom bookings.
              </Text>
            </View>
          </View>

          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <View style={styles.bulletText}>
              <Text style={{ fontWeight: 'bold', color: '#111827' }}>Strategic Trend-Jacking:</Text>
              <Text style={{ color: '#4b5563', marginTop: 1 }}>
                Aggressively adapting high-interest global interior decoration trends, ASMR assembly cues, satisfaction videos, and acoustic background rhythms to stay ahead of algorithms and spark organic viral growth.
              </Text>
            </View>
          </View>
        </View>

        {/* Reach and Metrics */}
        <View style={{ marginTop: 10 }}>
          <Text style={styles.sectionTitle}>NafTech Proven Audience Impact</Text>
          <Text style={styles.paragraph}>
            My established personal networks prove my capacity to command attention and trigger psychological engagement at massive volumes:
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>200K+</Text>
              <Text style={styles.statLabel}>Total Followers</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>430+</Text>
              <Text style={styles.statLabel}>Videos Produced</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>~96%</Text>
              <Text style={styles.statLabel}>Engagement Rate</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>Massive</Text>
              <Text style={styles.statLabel}>Local Outreach</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} {CREATOR_NAME} | Custom Furniture SMM Master Plan</Text>
      </View>
    </Page>
  </Document>
);

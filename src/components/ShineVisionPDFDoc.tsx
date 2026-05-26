import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 35,
    backgroundColor: '#fafbfc',
    fontFamily: 'Helvetica',
  },
  headerBanner: {
    backgroundColor: '#0f4c5c',
    borderRadius: 8,
    padding: 24,
    marginBottom: 20,
    color: '#ffffff',
    position: 'relative',
  },
  logoAccent: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fb8b24',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 10,
    color: '#e5e7eb',
    marginTop: 4,
    lineHeight: 1.4,
  },
  metaGrid: {
    flexDirection: 'row',
    marginTop: 15,
    paddingTop: 12,
    borderTop: '0.5pt solid rgba(255, 255, 255, 0.15)',
    justifyContent: 'space-between',
  },
  metaItem: {
    fontSize: 8,
    color: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f4c5c',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 15,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottom: '1pt solid #fb8b24',
  },
  paragraph: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: '#2d3748',
    marginBottom: 10,
  },
  priorityGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  priorityCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 6,
    border: '0.5pt solid #e2e8f0',
    borderLeft: '3pt solid #0f4c5c',
  },
  priorityHeader: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#0f4c5c',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  priorityText: {
    fontSize: 8,
    lineHeight: 1.4,
    color: '#4a5568',
  },
  workflowStep: {
    marginBottom: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 5,
    padding: 8,
    borderLeft: '2pt solid #fb8b24',
  },
  stepHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#0f4c5c',
  },
  stepText: {
    fontSize: 8,
    color: '#4a5568',
    lineHeight: 1.4,
    marginTop: 2,
  },
  highlightBox: {
    backgroundColor: '#0f4c5c',
    color: '#ffffff',
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    gap: 12,
  },
  highlightSubBox: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#fb8b24',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  highlightText: {
    fontSize: 8,
    lineHeight: 1.4,
    color: '#ffffff',
  },
  pillarGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
  },
  pillarCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    border: '0.5pt solid #e2e8f0',
    padding: 10,
    alignItems: 'center',
  },
  pillarEmoji: {
    fontSize: 14,
    marginBottom: 4,
  },
  pillarTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#0f4c5c',
    textAlign: 'center',
    marginBottom: 3,
  },
  pillarText: {
    fontSize: 7.5,
    lineHeight: 1.3,
    color: '#718096',
    textAlign: 'center',
  },
  finBox: {
    backgroundColor: '#fff7ed',
    border: '0.5pt solid #ffedd5',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    borderLeft: '3pt solid #fb8b24',
  },
  footerText: {
    position: 'absolute',
    bottom: 25,
    left: 35,
    right: 35,
    fontSize: 7,
    color: '#a0aec0',
    textAlign: 'center',
    borderTop: '0.5pt solid #e2e8f0',
    paddingTop: 8,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 25,
    right: 35,
    fontSize: 7,
    color: '#4a5568',
  }
});

export const ShineVisionPDFDoc = () => (
  <Document title="Strategic Content & Business Growth Proposal - Dr. Kidus / Shine Vision Center">
    {/* Page 1 */}
    <Page size="A4" style={styles.page}>
      {/* Header element */}
      <View style={styles.headerBanner}>
        <Text style={styles.logoAccent}>Shine Vision Center x NafTech Partnership</Text>
        <Text style={styles.mainTitle}>Strategic Content & Business Growth Proposal</Text>
        <Text style={styles.subtitle}>
          Launch strategy designed to establish Dr. Kidus' medical authority, drive foot traffic to the new Adama branch, and streamline workflow dynamics.
        </Text>
        <View style={styles.metaGrid}>
          <Text style={styles.metaItem}>CLIENT: Dr. Kidus / Shine Vision Center</Text>
          <Text style={styles.metaItem}>LOCATION: Adama Branch Launch</Text>
          <Text style={styles.metaItem}>DURATION: 3-Month Roadmap</Text>
        </View>
      </View>

      {/* 1. Core Goals and the Audience Funnel */}
      <View>
        <Text style={styles.sectionTitle}>1. Core Goals & Audience Funnel</Text>
        <Text style={styles.paragraph}>
          Our primary focus is commercial conversion. We want to turn online viewers into physical patients at the new Adama branch, using our current baseline of 4,000 followers as a launchpad for growth over the next 3 months.
        </Text>
        
        <View style={styles.priorityGrid}>
          <View style={styles.priorityCard}>
            <Text style={styles.priorityHeader}>Priority 1: Immediate Action</Text>
            <Text style={styles.priorityText}>
              Drive direct phone calls and physical visits to the vision center. Every video will feature a clear, localized call to action telling people exactly where to go or what number to call.
            </Text>
          </View>
          <View style={styles.priorityCard}>
            <Text style={styles.priorityHeader}>Priority 2: Community Building</Text>
            <Text style={styles.priorityText}>
              Redirect interested leads to the Shine Vision Telegram channel for long-term engagement, direct inquiries, and regular updates.
            </Text>
          </View>
        </View>
      </View>

      {/* 2. Content and Script Workflow */}
      <View>
        <Text style={styles.sectionTitle}>2. Content & Script Workflow</Text>
        <Text style={styles.paragraph}>
          To protect your time as a medical professional, we will use a highly efficient production pipeline. You do not need to worry about the social media mechanics; we will handle the virality and formatting structure.
        </Text>

        <View style={styles.workflowStep}>
          <Text style={styles.stepHeader}>Step 1: Topic Selection</Text>
          <Text style={styles.stepText}>
            We provide you with the specific content niche of the week. Based on that, you give us the specific optometric or eye health topics. We adjust and shape it into a performance-ready script.
          </Text>
        </View>

        <View style={styles.workflowStep}>
          <Text style={styles.stepHeader}>Step 2: Script Simplification</Text>
          <Text style={styles.stepText}>
            We translate complex medical concepts into simple, everyday analogies that the general public can understand instantly and relate to.
          </Text>
        </View>

        <View style={styles.workflowStep}>
          <Text style={styles.stepHeader}>Step 3: Practice Review</Text>
          <Text style={styles.stepText}>
            We send formatted scripts to you in advance so you can easily review and practice them before we shoot.
          </Text>
        </View>

        <View style={styles.workflowStep}>
          <Text style={styles.stepHeader}>Step 4: Rapid Recording</Text>
          <Text style={styles.stepText}>
            We hit the location and record the finalized content immediately with zero wasted time or clinic disruption.
          </Text>
        </View>
      </View>

      {/* Footer page 1 */}
      <Text style={styles.footerText}>
        Confidential Partnership Proposal | Designed by NafTech SMM
      </Text>
      <Text style={styles.pageNumber}>Page 1</Text>
    </Page>

    {/* Page 2 */}
    <Page size="A4" style={styles.page}>
      {/* 3. Production Schedule and Gear */}
      <View>
        <Text style={styles.sectionTitle}>3. Production Schedule & Gear</Text>
        <Text style={styles.paragraph}>
          We know you are busy managing customers and daily clinic operations. We will minimize disruptions to your schedule through batched, systematic production:
        </Text>

        <View style={styles.highlightBox}>
          <View style={styles.highlightSubBox}>
            <Text style={styles.highlightTitle}>The 1-Day Rule</Text>
            <Text style={styles.highlightText}>
              We record 3 distinct videos in a single production session. This means one single shoot day covers an entire week of content (3 videos per week). We manage the scheduling tightly to protect your clinic hours.
            </Text>
          </View>
          <View style={{ ...styles.highlightSubBox, borderLeft: '0.5pt solid rgba(255,255,255,0.2)', paddingLeft: 12 }}>
            <Text style={styles.highlightTitle}>Audio & Rig Quality</Text>
            <Text style={styles.highlightText}>
              We will use the neck mic you mentioned. Ensure it is fully charged and ready on every scheduled shoot day to maintain crisp, professional acoustic quality.
            </Text>
          </View>
        </View>
      </View>

      {/* 4. Growth and Distribution Strategy */}
      <View>
        <Text style={styles.sectionTitle}>4. Growth & Distribution Strategy</Text>
        <Text style={styles.paragraph}>
          Instead of generic content that reaches people who cannot visit the clinic, our distribution strategy is strictly localized to bring physical traffic to the Shine Vision Adama branch.
        </Text>
        <Text style={styles.paragraph}>
          • <Text style={{ fontWeight: 'bold' }}>Localized Hooks:</Text> The first 3 seconds of the videos will visually or verbally call out Adama to filter out irrelevant viewers and capture local residents immediately.
        </Text>
        <Text style={styles.paragraph}>
          • <Text style={{ fontWeight: 'bold' }}>Weekly Pricing Graphics:</Text> Post a weekly graphic post displaying different frame types and prices to keep the feed commercially active.
        </Text>

        <Text style={{ ...styles.stepHeader, fontSize: 8.5, marginTop: 4, marginBottom: 6 }}>Niche Rotation Pillars (The 12 Monthly Videos)</Text>
        <View style={styles.pillarGrid}>
          <View style={styles.pillarCard}>
            <Text style={styles.pillarEmoji}>👁️</Text>
            <Text style={styles.pillarTitle}>Eye Health Tips</Text>
            <Text style={styles.pillarText}>Relatable daily issues like digital screen strain and night driving. </Text>
          </View>
          <View style={styles.pillarCard}>
            <Text style={styles.pillarEmoji}>💡</Text>
            <Text style={styles.pillarTitle}>Insights</Text>
            <Text style={styles.pillarText}>Demystifying eye testing, lens options, and kids' eye health.</Text>
          </View>
          <View style={styles.pillarCard}>
            <Text style={styles.pillarEmoji}>👨‍⚕️</Text>
            <Text style={styles.pillarTitle}>Casual Vlogs</Text>
            <Text style={styles.pillarText}>Behind-the-scenes showing vlogs of custom glasses in 24 hours.</Text>
          </View>
        </View>
      </View>

      {/* 5. Financial, Tax, and Legal Alignment */}
      <View>
        <Text style={styles.sectionTitle}>5. Financial & Retainer Details</Text>
        <View style={styles.finBox}>
          <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0f4c5c', marginBottom: 4 }}>
            Monthly Retainer Rates
          </Text>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#fb8b24', marginBottom: 6, fontFamily: 'Helvetica' }}>
            50,000 ETB <Text style={{ fontSize: 8.5, color: '#4a5568', fontWeight: 'normal' }}>/ month</Text>
          </Text>
          <Text style={{ fontSize: 8, color: '#4a5568', lineHeight: 1.4 }}>
            • Payable upfront at the start of each production cycle to secure dedicated editor slots, scheduled recording sessions, and camera crew.
          </Text>
          <Text style={{ fontSize: 8, color: '#4a5568', lineHeight: 1.4, marginTop: 2 }}>
            • PLC compliant: Includes an official professional cash receipt with our registered TIN for your accounting team.
          </Text>
        </View>
      </View>

      {/* 6. Budget Optimization */}
      <View>
        <Text style={styles.sectionTitle}>6. Budget Optimization & Timeline</Text>
        <Text style={styles.paragraph}>
          We follow a smart, data-driven approach: organic testing first (3 videos), followed by paid campaigns only on the top 2-3 performing assets. Real authority requires sustained consistency, aiming for solid foot traffic rather than fleeting viral spikes.
        </Text>
      </View>

      {/* Next Steps */}
      <View style={{ marginTop: 2 }}>
        <Text style={{ fontSize: 9.5, fontWeight: 'bold', color: '#0f4c5c', textTransform: 'uppercase' }}>Next Steps</Text>
        <Text style={{ fontSize: 8, color: '#4a5568', lineHeight: 1.4, marginTop: 2 }}>
          Upon reviewing and accepting these terms, our legal counsel will issue the formal 3-month partnership contract to finalize engagement and authorize filming.
        </Text>
      </View>

      {/* Footer page 2 */}
      <Text style={styles.footerText}>
        Confidential Partnership Proposal | Designed by NafTech SMM
      </Text>
      <Text style={styles.pageNumber}>Page 2</Text>
    </Page>
  </Document>
);

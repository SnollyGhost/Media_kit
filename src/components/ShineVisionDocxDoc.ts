import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
} from "docx";

export function createShineVisionDocx(): Document {
  return new Document({
    sections: [
      {
        properties: {},
        children: [
          // MAIN HEADER BANNER AS A TABLE FOR BEAUTIFUL BORDER & SHADING
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: {
                      fill: "9333EA", // Royal purple primary brand color of the site
                    },
                    margins: {
                      top: 400,
                      bottom: 400,
                      left: 400,
                      right: 400,
                    },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "SHINE VISION CENTER × NAFTECH SMM PARTNERSHIP",
                            color: "FFFFFF",
                            bold: true,
                            size: 18,
                            font: "Arial",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 100, after: 100 },
                        children: [
                          new TextRun({
                            text: "Strategic Content & Business Growth Proposal",
                            color: "FFFFFF",
                            bold: true,
                            size: 32,
                            font: "Arial",
                          }),
                        ],
                      }),
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({
                            text: "Launch Strategy for Adama Branch • Personal Brand Expansion • Physical Foot Traffic",
                            color: "F5F5F5",
                            size: 18,
                            italics: true,
                            font: "Arial",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 300, after: 100 } }),

          // META BOX
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: {
                      fill: "F3F4F6", // Light grey
                    },
                    margins: {
                      top: 150,
                      bottom: 150,
                      left: 200,
                      right: 200,
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: "CLIENT: ", bold: true, color: "050505", size: 18, font: "Arial" }),
                          new TextRun({ text: "Dr. Kidus / Shine Vision Center", color: "2D3748", size: 18, font: "Arial" }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: "OBJECTIVE: ", bold: true, color: "050505", size: 18, font: "Arial" }),
                          new TextRun({ text: "Launch Adama, Build Personal Brand, Drive Direct Physical Foot Traffic", color: "2D3748", size: 18, font: "Arial" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 300, after: 100 } }),

          // SECTION 1
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 120 },
            children: [
              new TextRun({
                text: "1. Core Goals and the Audience Funnel",
                bold: true,
                color: "9333EA",
                size: 26,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 120 },
            children: [
              new TextRun({
                text: "Our primary focus is commercial conversion. We want to turn online viewers into physical patients at the new Adama branch, using our current baseline of 4,000 followers as a launchpad for growth over the next 3 months.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Priority Card block: Priority 1
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({ text: "•  Priority 1 (Immediate Action): ", bold: true, color: "3B82F6", size: 20, font: "Arial" }),
              new TextRun({
                text: "Drive direct phone calls and physical visits to the vision center. Every video will feature a clear, localized call to action telling people exactly where to go or what number to call.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Priority Card block: Priority 2
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 180 },
            children: [
              new TextRun({ text: "•  Priority 2 (Community Building): ", bold: true, color: "3B82F6", size: 20, font: "Arial" }),
              new TextRun({
                text: "Redirect interested leads to the Shine Vision Telegram channel for long-term engagement, direct inquiries, and regular updates.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // SECTION 2
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: "2. Content and Script Workflow",
                bold: true,
                color: "9333EA",
                size: 26,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 120 },
            children: [
              new TextRun({
                text: "To protect your time as a medical professional, we will use a highly efficient production pipeline. You do not need to worry about the social media mechanics; we will handle the virality and formatting structure.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // STEP 1
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({ text: "•  Step 1 (Topic Selection): ", bold: true, color: "9333EA", size: 20, font: "Arial" }),
              new TextRun({
                text: "We will provide you with the specific content niche for the week. Based on that niche, you give us the specific optometric or eye health topics you want to highlight. We will then adjust and shape the material into a performance-ready script.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // STEP 2
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({ text: "•  Step 2 (Script Simplification): ", bold: true, color: "9333EA", size: 20, font: "Arial" }),
              new TextRun({
                text: "We translate the complex medical concepts into simple, everyday analogies that the general public can understand instantly.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // STEP 3
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({ text: "•  Step 3 (Practice Review): ", bold: true, color: "9333EA", size: 20, font: "Arial" }),
              new TextRun({
                text: "We send the formatted scripts back to you in advance so you can easily review and practice them before we shoot.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // STEP 4
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 180 },
            children: [
              new TextRun({ text: "•  Step 4 (Rapid Recording): ", bold: true, color: "9333EA", size: 20, font: "Arial" }),
              new TextRun({
                text: "We hit the location and record the finalized content immediately with zero wasted time.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // SECTION 3
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: "3. Production Schedule and Gear",
                bold: true,
                color: "9333EA",
                size: 26,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 120 },
            children: [
              new TextRun({
                text: "We know you are busy managing customers and daily clinic operations. We will minimize disruptions to your schedule through batched production.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // The 1-Day Rule
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({ text: "•  The 1-Day Rule: ", bold: true, color: "3B82F6", size: 20, font: "Arial" }),
              new TextRun({
                text: "We will record 3 distinct videos in a single production session. This means one single shoot day covers an entire week of content (3 videos per week). We will manage the scheduling tightly so we don't disrupt your clinic hours.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Audio Quality
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 180 },
            children: [
              new TextRun({ text: "•  Audio Quality: ", bold: true, color: "3B82F6", size: 20, font: "Arial" }),
              new TextRun({
                text: "We will use the neck mic you mentioned. Please ensure it’s fully charged and ready on every scheduled shoot day so we avoid needing to use a smartphone as a backup microphone.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // SECTION 4
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: "4. Growth and Distribution Strategy",
                bold: true,
                color: "9333EA",
                size: 26,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 120 },
            children: [
              new TextRun({
                text: "Instead of generic content that reaches people who cannot visit the clinic, our distribution strategy is strictly localized to bring people to the center.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Localized Hooks
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({ text: "•  Localized Hooks: ", bold: true, color: "9333EA", size: 20, font: "Arial" }),
              new TextRun({
                text: "The first 3 seconds of the videos will visually or verbally call out Adama. This filters out irrelevant viewers and immediately captures local residents.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Weekly Pricing Graphics
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 120 },
            children: [
              new TextRun({ text: "•  Weekly Pricing Graphics: ", bold: true, color: "9333EA", size: 20, font: "Arial" }),
              new TextRun({
                text: "Apart from the 12 monthly videos, we will publish a weekly graphic post displaying different frame types and their prices to keep the feed commercially active.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Niche Rotation Pillars Subtitle
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [
              new TextRun({
                text: "•  Niche Rotation: The 12 monthly videos will rotate across three specific pillars to keep the page dynamic and engaging:",
                bold: true,
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Niche Rotation items (Nested lists)
          new Paragraph({
            indent: { left: 720 },
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: "o  Eye Health Tips: ", bold: true, color: "3B82F6", size: 20, font: "Arial" }),
              new TextRun({
                text: "Relatable daily issues like digital screen strain and night driving glares.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 720 },
            spacing: { before: 60, after: 60 },
            children: [
              new TextRun({ text: "o  Educational Insights: ", bold: true, color: "3B82F6", size: 20, font: "Arial" }),
              new TextRun({
                text: "Demystifying eye testing, lens options, and showcasing your long-term vision for kids' eye health and community charity.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 720 },
            spacing: { before: 60, after: 180 },
            children: [
              new TextRun({ text: "o  Casual Vlogs: ", bold: true, color: "3B82F6", size: 20, font: "Arial" }),
              new TextRun({
                text: "Showing the human side of Dr. Kidus and a behind-the-scenes look at how the clinic delivers custom glasses by the very next day.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // SECTION 5
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: "5. Financial, Tax, and Legal Alignment",
                bold: true,
                color: "9333EA",
                size: 26,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 120 },
            children: [
              new TextRun({
                text: "As a registered PLC, Shine Vision Center operates under strict financial auditing. We provide full professional compliance for your bookkeeping.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Professional Documentation
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({ text: "•  Professional Documentation: ", bold: true, color: "3B82F6", size: 20, font: "Arial" }),
              new TextRun({
                text: "We will provide an official, professional cash receipt clearly displaying our registered TIN for every transaction. This ensures your accounting team can process the expenses smoothly under Ethiopian revenue laws.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Payment Terms
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 180 },
            children: [
              new TextRun({ text: "•  Payment Terms: ", bold: true, color: "3B82F6", size: 20, font: "Arial" }),
              new TextRun({
                text: "To secure dedicated editor slots, production scheduling, and crew allocation, the monthly retainer of 50,000 ETB is payable upfront at the start of each production cycle.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // SECTION 6
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: "6. Budget Optimization & Growth Expectations",
                bold: true,
                color: "9333EA",
                size: 26,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 120 },
            children: [
              new TextRun({
                text: "To maximize our resources and set clear benchmarks for the next 3 months, we will follow a strategic approach to paid promotion and channel growth.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Organic Boosting Strategy
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 60 },
            children: [
              new TextRun({ text: "•  Organic Boosting Strategy: ", bold: true, color: "9333EA", size: 20, font: "Arial" }),
              new TextRun({
                text: "Because our monthly budget is structured efficiently, we will not waste money boosting every video. Instead, we will let our 3 weekly videos run naturally first. We will then select only the top 2 or 3 best-performing videos that show high organic engagement and watch time, and inject our promotion budget there to maximize our reach.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // Realistic Growth Timeline
          new Paragraph({
            indent: { left: 360 },
            spacing: { before: 100, after: 180 },
            children: [
              new TextRun({ text: "•  Realistic Growth Timeline: ", bold: true, color: "9333EA", size: 20, font: "Arial" }),
              new TextRun({
                text: "Social media algorithms do not build massive, high-converting audiences overnight. True digital authority requires sustained production quality and long-term consistency. Our focus for these first 3 months is laying a solid foundation of trust, establishing your personal brand, and creating steady, reliable foot traffic to the Adama center rather than chasing empty, temporary viral spikes.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // NEXT STEPS
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 240, after: 120 },
            children: [
              new TextRun({
                text: "Next Steps",
                bold: true,
                color: "9333EA",
                size: 26,
                font: "Arial",
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 60, after: 300 },
            children: [
              new TextRun({
                text: "Once you review and agree to the foundational points outlined in this strategy report, we will have our lawyer issue the official 3-month legal partnership contract to finalize our engagement and start filming.",
                color: "2D3748",
                size: 20,
                font: "Arial",
              }),
            ],
          }),

          // FOOTER INFO
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "Confidential Partnership Proposal • Shine Vision Center × NafTech • © 2026 All Rights Reserved",
                color: "A0AEC0",
                size: 16,
                italics: true,
                font: "Arial",
              }),
            ],
          }),
        ],
      },
    ],
  });
}

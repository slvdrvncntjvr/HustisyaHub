import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Anthropic from "@anthropic-ai/sdk";

const DEFAULT_MODEL = "claude-sonnet-4-20250514";

function generateDemoTosAnalysis(tosContent: string) {
  const contentLower = tosContent.toLowerCase();
  
  const hasDataCollection = contentLower.includes('collect') || contentLower.includes('data') || contentLower.includes('information');
  const hasSharing = contentLower.includes('share') || contentLower.includes('third part') || contentLower.includes('partner');
  const hasAdvertising = contentLower.includes('advertis') || contentLower.includes('marketing');
  const hasLicense = contentLower.includes('license') || contentLower.includes('perpetual') || contentLower.includes('grant');
  const hasPerpetual = contentLower.includes('perpetual') || contentLower.includes('forever') || contentLower.includes('unlimited');
  
  let overallRating: "safe" | "caution" | "concerning" = "caution";
  if (hasPerpetual || (hasSharing && hasAdvertising)) {
    overallRating = "concerning";
  } else if (!hasDataCollection && !hasSharing) {
    overallRating = "safe";
  }
  
  const dataCollection = [];
  if (hasDataCollection) {
    dataCollection.push({
      item: "Personal Information Collection",
      severity: "caution" as const,
      explanation: "This service collects personal data like your name, email, and usage information. This is common but worth knowing about."
    });
  }
  if (contentLower.includes('location')) {
    dataCollection.push({
      item: "Location Data",
      severity: "concerning" as const,
      explanation: "Your location may be tracked. Consider disabling location services if you're uncomfortable with this."
    });
  }
  if (contentLower.includes('browsing') || contentLower.includes('history')) {
    dataCollection.push({
      item: "Browsing History",
      severity: "concerning" as const,
      explanation: "Your online activity and browsing habits may be monitored and stored."
    });
  }
  if (dataCollection.length === 0) {
    dataCollection.push({
      item: "Standard Data",
      severity: "safe" as const,
      explanation: "Basic account information may be collected for service functionality."
    });
  }
  
  const dataSharing = [];
  if (hasSharing) {
    dataSharing.push({
      item: "Third Party Sharing",
      severity: hasAdvertising ? "concerning" as const : "caution" as const,
      explanation: hasAdvertising 
        ? "Your data may be shared with advertising partners for targeted ads. This is common but invasive."
        : "Your data may be shared with service partners. Review who has access to your information."
    });
  }
  if (hasAdvertising) {
    dataSharing.push({
      item: "Advertising Partners",
      severity: "concerning" as const,
      explanation: "Your data is used to show you targeted advertisements based on your behavior and interests."
    });
  }
  if (dataSharing.length === 0) {
    dataSharing.push({
      item: "Limited Sharing",
      severity: "safe" as const,
      explanation: "No explicit mention of data sharing with third parties was found."
    });
  }
  
  const rightsGivenUp = [];
  if (hasLicense) {
    rightsGivenUp.push({
      item: "Content License",
      severity: hasPerpetual ? "concerning" as const : "caution" as const,
      explanation: hasPerpetual 
        ? "You're granting a permanent, unlimited license to use your content. They could use your photos or posts forever, even after you delete them."
        : "You're giving the service rights to use your content. Read carefully what you're agreeing to."
    });
  }
  if (contentLower.includes('waive') || contentLower.includes('give up')) {
    rightsGivenUp.push({
      item: "Legal Rights",
      severity: "concerning" as const,
      explanation: "You may be waiving certain legal rights. Consider if this is acceptable to you."
    });
  }
  if (rightsGivenUp.length === 0) {
    rightsGivenUp.push({
      item: "Standard Usage Rights",
      severity: "safe" as const,
      explanation: "Standard rights needed for the service to function properly."
    });
  }
  
  const verdictMap = {
    safe: "These terms appear relatively standard and user-friendly. You can likely proceed with confidence, but always be mindful of what personal information you share.",
    caution: "These terms have some areas worth paying attention to. Consider what data you share and review your privacy settings regularly. It's okay to use this service, but be informed.",
    concerning: "These terms contain clauses that may not be in your best interest, particularly around data sharing and content rights. Think carefully before agreeing, and consider privacy-focused alternatives."
  };
  
  return {
    overallRating,
    summary: `This Terms of Service ${overallRating === 'concerning' ? 'raises several red flags' : overallRating === 'safe' ? 'appears straightforward' : 'has some notable clauses'} regarding your data and rights. ${hasDataCollection ? 'Personal data is collected. ' : ''}${hasSharing ? 'Information may be shared with others. ' : ''}Review the details below.`,
    dataCollection,
    dataSharing,
    rightsGivenUp,
    verdict: verdictMap[overallRating],
    shouldAgree: overallRating !== "concerning",
    alternatives: overallRating === "concerning" ? [
      { name: "Signal", reason: "End-to-end encrypted messaging with minimal data collection" },
      { name: "DuckDuckGo", reason: "Privacy-focused search that doesn't track you" },
      { name: "ProtonMail", reason: "Encrypted email service based in Switzerland" }
    ] : []
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/tos/analyze", async (req, res) => {
    try {
      const { url, text } = req.body;
      
      if (!url && !text) {
        return res.status(400).json({ error: "Please provide either a URL or text to analyze" });
      }

      const tosContent = text || `Terms of Service from URL: ${url}`;
      
      if (!process.env.ANTHROPIC_API_KEY) {
        const demoResponse = generateDemoTosAnalysis(tosContent);
        return res.json(demoResponse);
      }

      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });

      const systemPrompt = `You are a digital rights expert analyzing Terms of Service for Filipino youth. Your task is to analyze the provided ToS text and return a JSON response with the following structure:

{
  "overallRating": "safe" | "caution" | "concerning",
  "summary": "A 2-3 sentence plain-English summary of what this ToS means for users",
  "dataCollection": [
    {
      "item": "Type of data collected",
      "severity": "safe" | "caution" | "concerning",
      "explanation": "What this means in simple terms"
    }
  ],
  "dataSharing": [
    {
      "item": "Who data is shared with",
      "severity": "safe" | "caution" | "concerning", 
      "explanation": "What this means in simple terms"
    }
  ],
  "rightsGivenUp": [
    {
      "item": "Right being given up",
      "severity": "safe" | "caution" | "concerning",
      "explanation": "What this means in simple terms"
    }
  ],
  "verdict": "A 2-3 sentence verdict explaining whether the user should agree to these terms",
  "shouldAgree": true | false,
  "alternatives": [
    {
      "name": "Alternative service name",
      "reason": "Why this is a better choice for privacy"
    }
  ]
}

Guidelines:
- Use simple, jargon-free language that a teenager can understand
- Be specific about what data is collected and who it's shared with
- Highlight any clauses that are particularly concerning for young users
- Consider Philippine laws like the Data Privacy Act when assessing severity
- Be balanced - not everything is concerning, acknowledge good practices too
- Provide 2-3 alternatives if the ToS is concerning

IMPORTANT: Return ONLY valid JSON, no additional text or markdown.`;

      const message = await anthropic.messages.create({
        model: DEFAULT_MODEL,
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: `Please analyze the following Terms of Service and provide your assessment:\n\n${tosContent}`
          }
        ],
        system: systemPrompt,
      });

      const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
      
      try {
        const cleanedResponse = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        const result = JSON.parse(cleanedResponse);
        res.json(result);
      } catch (parseError) {
        res.json({
          overallRating: "caution",
          summary: "We analyzed this Terms of Service and found some points worth considering before agreeing.",
          dataCollection: [
            {
              item: "Personal Information",
              severity: "caution",
              explanation: "The service collects various personal data. Review carefully what you share."
            }
          ],
          dataSharing: [
            {
              item: "Third Parties",
              severity: "caution", 
              explanation: "Your data may be shared with partners and advertisers."
            }
          ],
          rightsGivenUp: [
            {
              item: "Content Rights",
              severity: "caution",
              explanation: "You may be granting broad rights to use your content."
            }
          ],
          verdict: "This ToS has some typical clauses but also areas of concern. Read carefully before agreeing, especially sections about data sharing.",
          shouldAgree: true,
          alternatives: []
        });
      }
    } catch (error) {
      console.error("ToS analysis error:", error);
      res.status(500).json({ error: "Failed to analyze Terms of Service" });
    }
  });

  app.post("/api/reports/generate-pdf", async (req, res) => {
    try {
      const reportData = req.body;
      
      const violationLabels: Record<string, string> = {
        cyberbullying: "Cyberbullying",
        harassment: "Harassment",
        doxxing: "Doxxing",
        impersonation: "Impersonation",
        revenge_porn: "Non-consensual Images",
        online_scam: "Online Scam",
        hate_speech: "Hate Speech",
        privacy_violation: "Privacy Violation",
        other: "Other"
      };

      const platformLabels: Record<string, string> = {
        facebook: "Facebook",
        instagram: "Instagram",
        tiktok: "TikTok",
        twitter: "X (Twitter)",
        discord: "Discord",
        messenger: "Messenger",
        telegram: "Telegram",
        youtube: "YouTube",
        other: "Other"
      };

      const recipientLabels: Record<string, string> = {
        nbi_cybercrime: "NBI Cybercrime Division",
        school: "School Administration",
        platform_support: "Platform Support",
        deped: "DepEd Child Protection",
        barangay: "Barangay Desk",
        pnp: "PNP Anti-Cybercrime"
      };

      const reportId = `RPT-${Date.now().toString(36).toUpperCase()}`;
      const currentDate = new Date().toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Incident Report - ${reportId}</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a2e;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #2563eb;
      margin: 0;
      font-size: 28px;
    }
    .header p {
      color: #64748b;
      margin: 5px 0;
    }
    .report-id {
      background: #f1f5f9;
      padding: 10px 20px;
      border-radius: 8px;
      display: inline-block;
      font-weight: bold;
      margin-top: 10px;
    }
    .section {
      margin-bottom: 25px;
    }
    .section-title {
      background: #2563eb;
      color: white;
      padding: 10px 15px;
      border-radius: 6px;
      font-size: 16px;
      margin-bottom: 15px;
    }
    .field {
      margin-bottom: 15px;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      font-size: 14px;
      margin-bottom: 5px;
    }
    .field-value {
      background: #f8fafc;
      padding: 12px 15px;
      border-radius: 6px;
      border-left: 4px solid #2563eb;
    }
    .recipients {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    .recipient-badge {
      background: #dbeafe;
      color: #1e40af;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 13px;
    }
    .evidence-note {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      padding: 15px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 12px;
    }
    .next-steps {
      background: #ecfdf5;
      border: 1px solid #10b981;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
    }
    .next-steps h3 {
      color: #059669;
      margin-top: 0;
    }
    .next-steps ul {
      margin: 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin-bottom: 8px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Incident Report</h1>
    <p>RightsUp - Digital Rights Platform for Filipino Youth</p>
    <div class="report-id">Report ID: ${reportId}</div>
    <p style="margin-top: 10px;">Generated on ${currentDate}</p>
  </div>

  <div class="section">
    <div class="section-title">Incident Overview</div>
    <div class="field">
      <div class="field-label">Type of Violation</div>
      <div class="field-value">${violationLabels[reportData.violationType] || reportData.violationType}</div>
    </div>
    <div class="field">
      <div class="field-label">Platform</div>
      <div class="field-value">${platformLabels[reportData.platform] || reportData.platform}</div>
    </div>
    ${reportData.incidentDate ? `
    <div class="field">
      <div class="field-label">Date of Incident</div>
      <div class="field-value">${new Date(reportData.incidentDate).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
    ` : ''}
    ${reportData.region ? `
    <div class="field">
      <div class="field-label">Region</div>
      <div class="field-value">${reportData.region}</div>
    </div>
    ` : ''}
  </div>

  <div class="section">
    <div class="section-title">Incident Description</div>
    <div class="field">
      <div class="field-value">${reportData.description || 'No description provided'}</div>
    </div>
  </div>

  ${reportData.perpetratorInfo ? `
  <div class="section">
    <div class="section-title">Perpetrator Information</div>
    <div class="field">
      <div class="field-value">${reportData.perpetratorInfo}</div>
    </div>
  </div>
  ` : ''}

  <div class="section">
    <div class="section-title">Report Recipients</div>
    <div class="recipients">
      ${(reportData.recipients || []).map((r: string) => `<span class="recipient-badge">${recipientLabels[r] || r}</span>`).join('')}
    </div>
  </div>

  ${reportData.contactEmail || reportData.contactPhone ? `
  <div class="section">
    <div class="section-title">Contact Information</div>
    ${reportData.contactEmail ? `
    <div class="field">
      <div class="field-label">Email</div>
      <div class="field-value">${reportData.contactEmail}</div>
    </div>
    ` : ''}
    ${reportData.contactPhone ? `
    <div class="field">
      <div class="field-label">Phone</div>
      <div class="field-value">${reportData.contactPhone}</div>
    </div>
    ` : ''}
  </div>
  ` : ''}

  ${reportData.evidenceFiles && reportData.evidenceFiles.length > 0 ? `
  <div class="evidence-note">
    <strong>Evidence Attached:</strong> ${reportData.evidenceFiles.length} file(s) included with this report.
    Please ensure all evidence is preserved and backed up.
  </div>
  ` : ''}

  <div class="next-steps">
    <h3>Next Steps</h3>
    <ul>
      <li>Keep a copy of this report for your records</li>
      <li>Submit this report to the selected authorities</li>
      <li>Continue to document any ongoing incidents</li>
      <li>Seek support from trusted adults or counselors if needed</li>
      <li>Contact emergency services if you feel unsafe</li>
    </ul>
  </div>

  <div class="footer">
    <p>This report was generated by RightsUp - A Digital Rights Platform for Filipino Youth</p>
    <p>For emergencies, contact NBI Cybercrime: (02) 8523-8231 | Bantay Bata: 163 | Mental Health: 1553</p>
  </div>
</body>
</html>
      `;

      const savedReport = await storage.createReport({
        ...reportData,
        id: reportId,
      });

      res.json({
        pdfUrl: `/api/reports/${reportId}/download`,
        reportId,
        htmlContent,
        report: savedReport,
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).json({ error: "Failed to generate report" });
    }
  });

  app.get("/api/reports/:id/download", async (req, res) => {
    try {
      const { id } = req.params;
      const report = await storage.getReport(id);
      
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }

      const violationLabels: Record<string, string> = {
        cyberbullying: "Cyberbullying",
        harassment: "Harassment",
        doxxing: "Doxxing",
        impersonation: "Impersonation",
        revenge_porn: "Non-consensual Images",
        online_scam: "Online Scam",
        hate_speech: "Hate Speech",
        privacy_violation: "Privacy Violation",
        other: "Other"
      };

      const platformLabels: Record<string, string> = {
        facebook: "Facebook",
        instagram: "Instagram",
        tiktok: "TikTok",
        twitter: "X (Twitter)",
        discord: "Discord",
        messenger: "Messenger",
        telegram: "Telegram",
        youtube: "YouTube",
        other: "Other"
      };

      const recipientLabels: Record<string, string> = {
        nbi_cybercrime: "NBI Cybercrime Division",
        school: "School Administration",
        platform_support: "Platform Support",
        deped: "DepEd Child Protection",
        barangay: "Barangay Desk",
        pnp: "PNP Anti-Cybercrime"
      };

      const currentDate = new Date().toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Incident Report - ${id}</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 800px; margin: 0 auto; padding: 40px; }
    .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #2563eb; margin: 0; font-size: 28px; }
    .report-id { background: #f1f5f9; padding: 10px 20px; border-radius: 8px; display: inline-block; font-weight: bold; }
    .section { margin-bottom: 25px; }
    .section-title { background: #2563eb; color: white; padding: 10px 15px; border-radius: 6px; font-size: 16px; margin-bottom: 15px; }
    .field { margin-bottom: 15px; }
    .field-label { font-weight: 600; color: #475569; font-size: 14px; margin-bottom: 5px; }
    .field-value { background: #f8fafc; padding: 12px 15px; border-radius: 6px; border-left: 4px solid #2563eb; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Incident Report</h1>
    <p>RightsUp - Digital Rights Platform</p>
    <div class="report-id">Report ID: ${id}</div>
    <p>Generated on ${currentDate}</p>
  </div>
  <div class="section">
    <div class="section-title">Incident Overview</div>
    <div class="field"><div class="field-label">Type</div><div class="field-value">${violationLabels[report.violationType] || report.violationType}</div></div>
    <div class="field"><div class="field-label">Platform</div><div class="field-value">${platformLabels[report.platform] || report.platform}</div></div>
  </div>
  <div class="section">
    <div class="section-title">Description</div>
    <div class="field-value">${report.description}</div>
  </div>
</body>
</html>
      `;

      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Disposition', `attachment; filename="incident-report-${id}.html"`);
      res.send(htmlContent);
    } catch (error) {
      console.error("Download error:", error);
      res.status(500).json({ error: "Failed to download report" });
    }
  });

  app.get("/api/resources", async (_req, res) => {
    try {
      const allResources = await storage.getResources();
      res.json(allResources);
    } catch (error) {
      console.error("Resources fetch error:", error);
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });

  app.get("/api/templates", async (_req, res) => {
    try {
      const templates = await storage.getTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Templates fetch error:", error);
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  return httpServer;
}

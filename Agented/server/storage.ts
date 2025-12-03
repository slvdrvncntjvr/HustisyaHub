import { randomUUID } from "crypto";
import type { Report, Resource, TemplateDocument, PhilippineRegion } from "@shared/schema";

export interface IStorage {
  createReport(report: Partial<Report>): Promise<Report>;
  getReport(id: string): Promise<Report | undefined>;
  getReports(): Promise<Report[]>;
  getResources(): Promise<Resource[]>;
  getTemplates(): Promise<TemplateDocument[]>;
}

const defaultResources: Resource[] = [
  {
    id: "nbi-cybercrime",
    name: "NBI Cybercrime Division",
    category: "emergency",
    type: "hotline",
    phone: "(02) 8523-8231",
    email: "cybercrime@nbi.gov.ph",
    website: "https://www.nbi.gov.ph",
    description: "The National Bureau of Investigation's specialized unit for cybercrime investigations.",
    hours: "24/7 for emergencies",
    languages: ["Filipino", "English"]
  },
  {
    id: "pnp-acg",
    name: "PNP Anti-Cybercrime Group",
    category: "emergency",
    type: "hotline",
    phone: "(02) 8723-0401",
    email: "acg@pnp.gov.ph",
    website: "https://acg.pnp.gov.ph",
    description: "Philippine National Police unit handling cybercrime cases.",
    hours: "24/7",
    languages: ["Filipino", "English"]
  },
  {
    id: "dswd-bantay-bata",
    name: "DSWD Bantay Bata 163",
    category: "emergency",
    type: "hotline",
    phone: "163",
    website: "https://bantaybata163.dswd.gov.ph",
    description: "24/7 hotline for child abuse cases including online exploitation.",
    hours: "24/7",
    languages: ["Filipino", "English", "Cebuano"]
  },
  {
    id: "hopeline",
    name: "Hopeline Philippines",
    category: "mental_health",
    type: "hotline",
    phone: "(02) 8804-4673",
    description: "Crisis support line for those experiencing emotional distress.",
    hours: "24/7",
    languages: ["Filipino", "English"]
  },
  {
    id: "natl-mental-health",
    name: "National Center for Mental Health",
    category: "mental_health",
    type: "hotline",
    phone: "1553",
    description: "Government mental health crisis line providing free counseling support.",
    hours: "24/7",
    languages: ["Filipino", "English"]
  }
];

const defaultTemplates: TemplateDocument[] = [
  {
    id: "school-complaint",
    title: "Formal Complaint to School",
    description: "Template for reporting cyberbullying incidents to school administrators",
    category: "complaint",
    template: `[Your Name]\n[Date]\n\nTo: [School Principal]\n\nSubject: Formal Complaint Regarding Cyberbullying\n\nDear [Principal],\n\nI am writing to report a cyberbullying incident...\n\n[Details]\n\nRespectfully,\n[Your Name]`
  },
  {
    id: "data-deletion",
    title: "Data Deletion Request",
    description: "Template for requesting platforms to delete your personal data",
    category: "data_deletion",
    template: `[Your Name]\n[Date]\n\nTo: Data Protection Officer\n\nSubject: Request for Erasure of Personal Data\n\nPursuant to the Data Privacy Act of 2012...\n\n[Details]\n\nSincerely,\n[Your Name]`
  }
];

export class MemStorage implements IStorage {
  private reports: Map<string, Report>;
  private resources: Resource[];
  private templates: TemplateDocument[];

  constructor() {
    this.reports = new Map();
    this.resources = defaultResources;
    this.templates = defaultTemplates;
  }

  async createReport(reportData: Partial<Report>): Promise<Report> {
    const id = reportData.id || randomUUID();
    const report: Report = {
      id,
      violationType: reportData.violationType || "other",
      platform: reportData.platform || "other",
      description: reportData.description || "",
      recipients: reportData.recipients || [],
      evidenceFiles: reportData.evidenceFiles,
      incidentDate: reportData.incidentDate,
      perpetratorInfo: reportData.perpetratorInfo,
      region: reportData.region,
      contactEmail: reportData.contactEmail,
      contactPhone: reportData.contactPhone,
    };
    this.reports.set(id, report);
    return report;
  }

  async getReport(id: string): Promise<Report | undefined> {
    return this.reports.get(id);
  }

  async getReports(): Promise<Report[]> {
    return Array.from(this.reports.values());
  }

  async getResources(): Promise<Resource[]> {
    return this.resources;
  }

  async getTemplates(): Promise<TemplateDocument[]> {
    return this.templates;
  }
}

export const storage = new MemStorage();

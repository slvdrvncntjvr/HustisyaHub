import { z } from "zod";

export const violationTypes = [
  "cyberbullying",
  "harassment",
  "doxxing",
  "impersonation",
  "revenge_porn",
  "online_scam",
  "hate_speech",
  "privacy_violation",
  "other"
] as const;

export const platforms = [
  "facebook",
  "instagram", 
  "tiktok",
  "twitter",
  "discord",
  "messenger",
  "telegram",
  "youtube",
  "other"
] as const;

export const philippineRegions = [
  "NCR",
  "CAR",
  "Region I",
  "Region II",
  "Region III",
  "Region IV-A",
  "Region IV-B",
  "Region V",
  "Region VI",
  "Region VII",
  "Region VIII",
  "Region IX",
  "Region X",
  "Region XI",
  "Region XII",
  "Region XIII",
  "BARMM"
] as const;

export const reportRecipients = [
  "nbi_cybercrime",
  "school",
  "platform_support",
  "deped",
  "barangay",
  "pnp"
] as const;

export const reportSchema = z.object({
  id: z.string().optional(),
  violationType: z.enum(violationTypes),
  platform: z.enum(platforms),
  description: z.string().min(10, "Please provide at least 10 characters describing what happened"),
  evidenceFiles: z.array(z.object({
    name: z.string(),
    type: z.string(),
    size: z.number(),
    dataUrl: z.string()
  })).optional(),
  incidentDate: z.string().optional(),
  perpetratorInfo: z.string().optional(),
  region: z.enum(philippineRegions).optional(),
  recipients: z.array(z.enum(reportRecipients)).min(1, "Please select at least one recipient"),
  contactEmail: z.string().email("Please enter a valid email").optional(),
  contactPhone: z.string().optional(),
});

export type Report = z.infer<typeof reportSchema>;
export type InsertReport = Report;
export type ViolationType = typeof violationTypes[number];
export type Platform = typeof platforms[number];
export type PhilippineRegion = typeof philippineRegions[number];
export type ReportRecipient = typeof reportRecipients[number];

export const tosAnalysisSchema = z.object({
  url: z.string().url("Please enter a valid URL").optional(),
  text: z.string().min(50, "Please paste at least 50 characters of ToS text").optional(),
});

export type TosAnalysisInput = z.infer<typeof tosAnalysisSchema>;

export const tosResultSchema = z.object({
  overallRating: z.enum(["safe", "caution", "concerning"]),
  summary: z.string(),
  dataCollection: z.array(z.object({
    item: z.string(),
    severity: z.enum(["safe", "caution", "concerning"]),
    explanation: z.string()
  })),
  dataSharing: z.array(z.object({
    item: z.string(),
    severity: z.enum(["safe", "caution", "concerning"]),
    explanation: z.string()
  })),
  rightsGivenUp: z.array(z.object({
    item: z.string(),
    severity: z.enum(["safe", "caution", "concerning"]),
    explanation: z.string()
  })),
  verdict: z.string(),
  shouldAgree: z.boolean(),
  alternatives: z.array(z.object({
    name: z.string(),
    reason: z.string()
  })).optional()
});

export type TosResult = z.infer<typeof tosResultSchema>;

export interface Resource {
  id: string;
  name: string;
  category: "emergency" | "legal_aid" | "platform_help" | "mental_health" | "government";
  type: "hotline" | "organization" | "website" | "template";
  contact?: string;
  phone?: string;
  email?: string;
  website?: string;
  description: string;
  regions?: PhilippineRegion[];
  hours?: string;
  languages?: string[];
}

export interface TemplateDocument {
  id: string;
  title: string;
  description: string;
  category: "complaint" | "data_deletion" | "cease_desist" | "foi";
  template: string;
}

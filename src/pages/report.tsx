import { useState, useCallback } from "react";
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle,
  AlignmentType
} from "docx";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  FileText,
  Check,
  Download,
  Share2,
  AlertTriangle,
  MessageSquare,
  UserX,
  Eye,
  Camera,
  Skull,
  Ban,
  Megaphone,
  Shield,
  HelpCircle
} from "lucide-react";
import { SiFacebook, SiInstagram, SiTiktok, SiDiscord, SiTelegram, SiYoutube } from "react-icons/si";
import { 
  violationTypes, 
  platforms, 
  philippineRegions, 
  reportRecipients,
  type ViolationType,
  type Platform,
  type PhilippineRegion,
  type ReportRecipient,
  type Report
} from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/language-provider";

const violationInfo: Record<ViolationType, { icon: React.ElementType; label: string; description: string }> = {
  cyberbullying: { icon: MessageSquare, label: "Cyberbullying", description: "Repeated online harassment, insults, or humiliation" },
  harassment: { icon: AlertTriangle, label: "Harassment", description: "Threatening or intimidating messages or behavior" },
  doxxing: { icon: Eye, label: "Doxxing", description: "Sharing private information without consent" },
  impersonation: { icon: UserX, label: "Impersonation", description: "Fake accounts pretending to be you" },
  revenge_porn: { icon: Camera, label: "Non-consensual Images", description: "Intimate images shared without consent" },
  online_scam: { icon: Skull, label: "Online Scam", description: "Fraud, phishing, or deceptive schemes" },
  hate_speech: { icon: Megaphone, label: "Hate Speech", description: "Discrimination based on identity" },
  privacy_violation: { icon: Shield, label: "Privacy Violation", description: "Data misuse or unauthorized access" },
  other: { icon: HelpCircle, label: "Other", description: "Something else not listed here" },
};

const platformInfo: Record<Platform, { icon: React.ElementType; label: string; color: string }> = {
  facebook: { icon: SiFacebook, label: "Facebook", color: "text-blue-600" },
  instagram: { icon: SiInstagram, label: "Instagram", color: "text-pink-600" },
  tiktok: { icon: SiTiktok, label: "TikTok", color: "text-foreground" },
  twitter: { icon: Ban, label: "X (Twitter)", color: "text-foregrou   nd" },
  discord: { icon: SiDiscord, label: "Discord", color: "text-indigo-500" },
  messenger: { icon: SiFacebook, label: "Messenger", color: "text-blue-500" },
  telegram: { icon: SiTelegram, label: "Telegram", color: "text-sky-500" },
  youtube: { icon: SiYoutube, label: "YouTube", color: "text-red-600" },
  other: { icon: HelpCircle, label: "Other", color: "text-muted-foreground" },
};

const recipientInfo: Record<ReportRecipient, { label: string; description: string }> = {
  nbi_cybercrime: { label: "NBI Cybercrime Division", description: "For serious criminal offenses" },
  school: { label: "School Administration", description: "For incidents involving students" },
  platform_support: { label: "Platform Support", description: "Report directly to the platform" },
  deped: { label: "DepEd Child Protection", description: "For school-related violations" },
  barangay: { label: "Barangay Desk", description: "Local community resolution" },
  pnp: { label: "PNP Anti-Cybercrime", description: "For urgent safety concerns" },
};

interface EvidenceFile {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

export default function ReportPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const steps = [
    { id: 1, title: t("Type"), description: t("What happened?") },
    { id: 2, title: t("Platform"), description: t("Where?") },
    { id: 3, title: t("Details"), description: t("Tell us more") },
    { id: 4, title: t("Evidence"), description: t("Upload proof") },
    { id: 5, title: t("Submit"), description: t("Choose recipients") },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [reportData, setReportData] = useState<Partial<Report>>({
    recipients: [],
    evidenceFiles: [],
  });
  const [generatedPdf, setGeneratedPdf] = useState<string | null>(null);

  const progress = (currentStep / steps.length) * 100;

  const fillDemoData = () => {
    setReportData({
      violationType: "cyberbullying",
      platform: "facebook",
      description: "I have been receiving threatening messages from a user named 'BadUser123' for the past week. They are posting mean comments on my photos and sending me private messages saying they will hurt me.",
      incidentDate: new Date().toISOString().split('T')[0],
      perpetrator: "BadUser123",
      evidenceFiles: [], 
      recipients: ["school", "platform_support"],
      contactEmail: "student@example.com",
      contactPhone: "09123456789"
    });
    toast({
      title: t("Demo Data Filled"),
      description: t("Form populated with sample data."),
    });
  };

  const generatePdfMutation = useMutation({
    mutationFn: async (data: Partial<Report>) => {
      try {
        // Helper to create labeled lines
        const createLine = (label: string, value: string) => {
          return new Paragraph({
            children: [
              new TextRun({ text: label + ": ", bold: true }),
              new TextRun({ text: value }),
            ],
            spacing: { after: 120 },
          });
        };

        // Client-side DOCX generation
        const doc = new Document({
          sections: [
            {
              properties: {},
              children: [
                // Header
                new Paragraph({
                  text: "CONFIDENTIAL INCIDENT REPORT",
                  heading: HeadingLevel.TITLE,
                  alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [
                    new TextRun(`Generated via RightsUp on ${new Date().toLocaleDateString()}`),
                    new TextRun({
                      text: "This document contains sensitive information.",
                      break: 1,
                      italics: true,
                      size: 20,
                    }),
                  ],
                }),
                new Paragraph({ text: "" }), // Spacer
                new Paragraph({ text: "" }),

                // Section 1: Incident Overview
                new Paragraph({
                  text: "1. INCIDENT OVERVIEW",
                  heading: HeadingLevel.HEADING_2,
                }),
                createLine("Violation Type", data.violationType?.toUpperCase() || "N/A"),
                createLine("Platform", data.platform?.toUpperCase() || "N/A"),
                createLine("Date of Incident", data.incidentDate || "N/A"),
                new Paragraph({ text: "" }),

                // Section 2: Reporter Information
                new Paragraph({
                  text: "2. REPORTER INFORMATION",
                  heading: HeadingLevel.HEADING_2,
                }),
                createLine("Contact Email", data.contactEmail || "Not provided"),
                createLine("Contact Phone", data.contactPhone || "Not provided"),
                new Paragraph({ text: "" }),

                // Section 3: Perpetrator Details
                new Paragraph({
                  text: "3. PERPETRATOR DETAILS",
                  heading: HeadingLevel.HEADING_2,
                }),
                createLine("Name / Handle", data.perpetrator || "Unknown"),
                new Paragraph({ text: "" }),

                // Section 4: Statement of Facts
                new Paragraph({
                  text: "4. STATEMENT OF FACTS",
                  heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                  text: data.description || "No description provided.",
                  alignment: AlignmentType.JUSTIFIED,
                }),
                new Paragraph({ text: "" }),

                // Section 5: Evidence
                new Paragraph({
                  text: "5. EVIDENCE SUMMARY",
                  heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                  text: data.evidenceFiles && data.evidenceFiles.length > 0 
                    ? `Attached Files: ${data.evidenceFiles.length} file(s) included with this report.`
                    : "No evidence files attached.",
                }),
                new Paragraph({ text: "" }),
                new Paragraph({ text: "" }),

                // Footer / Disclaimer
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "DISCLAIMER: This report was generated automatically based on user input. The user certifies that the information provided is true and correct to the best of their knowledge.",
                      italics: true,
                      size: 16, // 8pt
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                }),
              ],
            },
          ],
        });

        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        return { pdfUrl: url };
      } catch (error) {
        console.error("Error generating document:", error);
        throw new Error("Failed to generate report");
      }
    },

    
    onSuccess: (data) => {
      setGeneratedPdf(data.pdfUrl);
      toast({
        title: t("Report Generated!"),
        description: t("Your report has been created successfully."),
      });
    },
    onError: () => {
      toast({
        title: t("Error"),
        description: t("Failed to generate report. Please try again."),
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: t("File too large"),
          description: `${file.name} ${t("is larger than 10MB")}`,
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const newFile: EvidenceFile = {
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl: reader.result as string,
        };
        setReportData((prev) => ({
          ...prev,
          evidenceFiles: [...(prev.evidenceFiles || []), newFile],
        }));
      };
      reader.readAsDataURL(file);
    });
  }, [toast]);

  const removeFile = (index: number) => {
    setReportData((prev) => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles?.filter((_, i) => i !== index),
    }));
  };

  const toggleRecipient = (recipient: ReportRecipient) => {
    setReportData((prev) => {
      const current = prev.recipients || [];
      const updated = current.includes(recipient)
        ? current.filter((r) => r !== recipient)
        : [...current, recipient];
      return { ...prev, recipients: updated };
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!reportData.violationType;
      case 2:
        return !!reportData.platform;
      case 3:
        return !!reportData.description && reportData.description.length >= 10;
      case 4:
        return true;
      case 5:
        return reportData.recipients && reportData.recipients.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length) {
      generatePdfMutation.mutate(reportData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (generatedPdf) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <CardTitle className="text-2xl" data-testid="text-report-success">{t("Report Generated Successfully")}</CardTitle>
            <CardDescription className="text-base">
              {t("Your report has been created. Download it or share it with the appropriate authorities.")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border rounded-lg p-6 bg-muted/30">
              <div className="flex items-center gap-4 mb-4">
                <FileText className="h-10 w-10 text-primary" />
                <div>
                  <p className="font-medium">{t("Incident Report")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t(violationInfo[reportData.violationType as ViolationType]?.label)} {t("on")} {platformInfo[reportData.platform as Platform]?.label}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1" asChild data-testid="button-download-pdf">
                  <a href={generatedPdf} download="incident-report.docx">
                    <Download className="h-4 w-4 mr-2" />
                    {t("Download Report")}
                  </a>
                </Button>
                <Button variant="outline" className="flex-1" data-testid="button-share-report">
                  <Share2 className="h-4 w-4 mr-2" />
                  {t("Share Report")}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">{t("Next Steps")}</h3>
              <ul className="space-y-3 text-sm">
                {reportData.recipients?.map((recipient) => (
                  <li key={recipient} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Check className="h-4 w-4 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">{t(recipientInfo[recipient].label)}</p>
                      <p className="text-muted-foreground">{t(recipientInfo[recipient].description)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setCurrentStep(1);
                  setReportData({ recipients: [], evidenceFiles: [] });
                  setGeneratedPdf(null);
                }}
                data-testid="button-new-report"
              >
                {t("Create New Report")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-report-title">{t("Smart Report Builder")}</h1>
              <p className="text-muted-foreground">
                {t("Create a professional incident report step by step")}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
          <div className="flex items-end justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">{t("Step")} {currentStep} {t("of")} {steps.length}</span>
            <div className="text-right">
              <p className="font-semibold text-primary">{steps[currentStep - 1]?.title}</p>
              <p className="text-xs text-muted-foreground">{steps[currentStep - 1]?.description}</p>
            </div>
          </div>
          <Progress value={progress} className="h-2.5 rounded-full" />
        </div>

        <Card>
          <CardContent className="pt-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex justify-end">
                   <Button variant="ghost" size="sm" onClick={fillDemoData}>
                     {t("Fill with Demo Data")}
                   </Button>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-1">{t("What happened?")}</h2>
                  <p className="text-muted-foreground">{t("Select the type of violation you experienced")}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {violationTypes.map((type) => {
                    const info = violationInfo[type];
                    const Icon = info.icon;
                    const isSelected = reportData.violationType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setReportData({ ...reportData, violationType: type })}
                        className={`p-4 rounded-lg border text-left transition-all hover-elevate ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary hover:bg-accent"
                        }`}
                        data-testid={`button-violation-${type}`}
                      >
                        <Icon className={`h-6 w-6 mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <p className="font-medium text-sm">{t(info.label)}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t(info.description)}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-1">{t("Where did it happen?")}</h2>
                  <p className="text-muted-foreground">{t("Select the platform where the incident occurred")}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {platforms.map((platform) => {
                    const info = platformInfo[platform];
                    const Icon = info.icon;
                    const isSelected = reportData.platform === platform;
                    return (
                      <button
                        key={platform}
                        onClick={() => setReportData({ ...reportData, platform })}
                        className={`p-4 rounded-lg border text-center transition-all hover-elevate ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary hover:bg-accent"
                        }`}
                        data-testid={`button-platform-${platform}`}
                      >
                        <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? "text-primary" : info.color}`} />
                        <p className="font-medium text-sm">{info.label}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-1">{t("Tell us what happened")}</h2>
                  <p className="text-muted-foreground">{t("Provide details about the incident")}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="description">{t("Description")} *</Label>
                    <Textarea
                      id="description"
                      placeholder={t("Describe what happened in detail. Include who was involved, what they did, and how it affected you...")}
                      className="min-h-32"
                      value={reportData.description || ""}
                      onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
                      data-testid="input-description"
                    />
                    <p className="text-xs text-muted-foreground">
                      {(reportData.description?.length || 0)} / 10 {t("minimum characters")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="incident-date">{t("When did it happen?")}</Label>
                      <Input
                        id="incident-date"
                        type="date"
                        value={reportData.incidentDate || ""}
                        onChange={(e) => setReportData({ ...reportData, incidentDate: e.target.value })}
                        data-testid="input-date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">{t("Your Region")}</Label>
                      <Select
                        value={reportData.region}
                        onValueChange={(value) => setReportData({ ...reportData, region: value as PhilippineRegion })}
                      >
                        <SelectTrigger id="region" data-testid="select-region">
                          <SelectValue placeholder={t("Select region")} />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] shadow-xl duration-300">
                          {philippineRegions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="perpetrator">{t("Perpetrator Info (optional)")}</Label>
                    <Input
                      id="perpetrator"
                      placeholder={t("Username, account name, or any identifying information")}
                      value={reportData.perpetratorInfo || ""}
                      onChange={(e) => setReportData({ ...reportData, perpetratorInfo: e.target.value })}
                      data-testid="input-perpetrator"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-1">{t("Upload Evidence")}</h2>
                  <p className="text-muted-foreground">{t("Add screenshots or other proof (optional but recommended)")}</p>
                </div>

                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="evidence"
                    multiple
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                    data-testid="input-file-upload"
                  />
                  <label htmlFor="evidence" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-1">{t("Click to upload files")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("PNG, JPG, or PDF up to 10MB each")}
                    </p>
                  </label>
                </div>

                {reportData.evidenceFiles && reportData.evidenceFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>{t("Uploaded Files")}</Label>
                    <div className="space-y-2">
                      {reportData.evidenceFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(1)} KB
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                            data-testid={`button-remove-file-${index}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-warning">{t("Evidence Tips")}</p>
                      <ul className="mt-1 text-muted-foreground space-y-1">
                        <li>{t("Take full-page screenshots showing the date/time")}</li>
                        <li>{t("Include the perpetrator's username or profile")}</li>
                        <li>{t("Save URLs of posts or messages")}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold mb-1">{t("Who should receive this report?")}</h2>
                  <p className="text-muted-foreground">{t("Select one or more recipients")}</p>
                </div>

                <div className="space-y-3">
                  {reportRecipients.map((recipient) => {
                    const info = recipientInfo[recipient];
                    const isSelected = reportData.recipients?.includes(recipient);
                    return (
                      <button
                        key={recipient}
                        onClick={() => toggleRecipient(recipient)}
                        className={`w-full p-4 rounded-lg border text-left transition-all hover-elevate flex items-center gap-4 ${
                          isSelected
                            ? "border-primary bg-primary/5 ring-2 ring-primary"
                            : "border-border hover:border-primary hover:bg-accent"
                        }`}
                        data-testid={`button-recipient-${recipient}`}
                      >
                        <Checkbox checked={isSelected} className="pointer-events-none" />
                        <div>
                          <p className="font-medium">{t(info.label)}</p>
                          <p className="text-sm text-muted-foreground">{t(info.description)}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">{t("Your Email (optional)")}</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder={t("For follow-up communications")}
                      value={reportData.contactEmail || ""}
                      onChange={(e) => setReportData({ ...reportData, contactEmail: e.target.value })}
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">{t("Your Phone (optional)")}</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder={t("For urgent matters")}
                      value={reportData.contactPhone || ""}
                      onChange={(e) => setReportData({ ...reportData, contactPhone: e.target.value })}
                      data-testid="input-phone"
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("Back")}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed() || generatePdfMutation.isPending}
            data-testid="button-next"
          >
            {generatePdfMutation.isPending ? (
              t("Generating...")
            ) : currentStep === steps.length ? (
              <>
                {t("Generate Report")}
                <FileText className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                {t("Continue")}
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

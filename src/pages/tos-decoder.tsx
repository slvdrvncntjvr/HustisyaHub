import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Search, FileText, AlertTriangle, CheckCircle2, XCircle, Database, Share2, Shield, ArrowRight, Loader2, ThumbsUp, ThumbsDown, Copy, ExternalLink,
} from "lucide-react";

// --- UI Components (assuming these paths are correct) ---
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/language-provider";

// --- API and Type Configuration ---
// Note: TosResult is assumed to define the expected API response structure
import type { TosResult } from "@shared/schema"; 

const API_URL = "https://hyperaphic-unannihilated-wanita.ngrok-free.dev/webhook-test/generate-tos";
const API_KEY = "123";

type RiskLevel = "safe" | "caution" | "concerning";

const riskConfig: Record<RiskLevel, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  safe: { icon: CheckCircle2, color: "text-safe", bg: "bg-safe/10", label: "Safe" }, // Improved color utility naming
  caution: { icon: AlertTriangle, color: "text-caution", bg: "bg-caution/10", label: "Caution" },
  concerning: { icon: XCircle, color: "text-concerning", bg: "bg-concerning/10", label: "Concerning" },
};

function RiskBadge({ level }: { level: RiskLevel }) {
  const { t } = useLanguage();
  const config = riskConfig[level];
  const Icon = config.icon;
  return (
    <Badge variant="outline" className={`${config.bg} ${config.color} border-0`}>
      <Icon className="h-3 w-3 mr-1" />
      {t(config.label)}
    </Badge>
  );
}

// --- Error Component for Invalid API Response ---
function InvalidResponseError({ onReset }: { onReset: () => void }) {
    const { t } = useLanguage();
    return (
        <div className="text-center p-12 max-w-lg mx-auto bg-card rounded-lg shadow-lg mt-10 border border-destructive/50">
            <AlertTriangle className="h-10 w-10 mx-auto text-destructive mb-4" />
            <h2 className="text-xl font-bold text-destructive mb-2">{t("Error: Unexpected API Rating")}</h2>
            <p className="text-muted-foreground mb-6">
                {t("The analysis was successful, but the API returned an invalid overall rating. This component cannot render the result.")}
            </p>
            <Button onClick={onReset} className="mt-4" variant="destructive">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                {t("Go Back and Try Again")}
            </Button>
        </div>
    );
}


export default function TosDecoderPage() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [inputType, setInputType] = useState<"url" | "text">("text");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  // IMPORTANT: Cast result to TosResult | null.
  const [result, setResult] = useState<TosResult | null>(null); 
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateAnalysis = () => {
    setIsSimulating(true);
    // Simulate network delay
    setTimeout(() => {
      const mockResult: TosResult = {
        overallRating: "caution",
        summary: "This Terms of Service agreement has some concerning clauses regarding data sharing and user content rights. While it provides standard protections, users should be aware that their data may be used for targeted advertising and shared with third-party partners.",
        dataCollection: [
          {
            item: "Device Information",
            severity: "safe",
            explanation: "Collects standard device info for app functionality."
          },
          {
            item: "Location Data",
            severity: "caution",
            explanation: "Tracks precise location even when app is not in use."
          }
        ],
        dataSharing: [
          {
            item: "Third-Party Advertisers",
            severity: "concerning",
            explanation: "Shares personal data with advertisers for targeted ads."
          }
        ],
        rightsGivenUp: [
          {
            item: "Class Action Waiver",
            severity: "caution",
            explanation: "You waive your right to join class action lawsuits."
          },
          {
            item: "Content License",
            severity: "safe",
            explanation: "You retain ownership but grant a license to display content."
          }
        ],
        verdict: "Proceed with caution. Adjust privacy settings immediately after signing up.",
        shouldAgree: false,
        alternatives: [
          {
            name: "PrivacyFirst App",
            reason: "Does not track location or share data."
          }
        ]
      };
      setResult(mockResult);
      setIsSimulating(false);
      toast({
        title: t("Simulation Complete"),
        description: t("Generated a sample analysis for demonstration."),
      });
    }, 2000);
  };

  const analyzeMutation = useMutation({
    mutationFn: async (data: { url?: string; text?: string }): Promise<TosResult> => {
      // --- INTEGRATED CUSTOM FETCH CALL ---
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x_api_key": API_KEY, // Use your header auth
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
      }

      return res.json();
      // ----------------------------------
    },
    onSuccess: (data) => {
      // Set the result on successful API response
      setResult(data);
    },

    onError: (error) => {
      console.error("Analysis error:", error);
      toast({
        title: t("Analysis Failed"),
        description: error instanceof Error ? error.message : t("Could not analyze the Terms of Service. Please check the network connection."),
        variant: "destructive",
      });
      // Ensure the result is null on error to show the input form
      setResult(null); 
    },
  });

  const handleAnalyze = () => {
    // Clear previous results before starting a new analysis
    setResult(null); 

    if (inputType === "url" && url) {
      analyzeMutation.mutate({ url });
    } else if (inputType === "text" && text) {
      analyzeMutation.mutate({ text });
    }
  };

  const canAnalyze = (inputType === "url" && url.length > 0) || (inputType === "text" && text.length >= 50);

  const copyToClipboard = () => {
    if (!result) return;
    const summary = `ToS Analysis Summary:\n\nOverall Rating: ${result.overallRating}\n\n${result.summary}\n\nVerdict: ${result.verdict}`;
    navigator.clipboard.writeText(summary);
    toast({
      title: t("Copied!"),
      description: t("Summary copied to clipboard"),
    });
  };

  // --- RESULT DISPLAY LOGIC (WHERE THE ERROR OCCURRED) ---
  if (result) {
    // 1. **CRITICAL FIX**: Safely look up the configuration using a type assertion.
    // This allows access to riskConfig if the rating is valid.
    const overallRatingKey = result.overallRating as RiskLevel;
    const overallConfig = riskConfig[overallRatingKey];
    
    // 2. **GUARD CLAUSE**: If the API returned a rating that is NOT 'safe', 'caution', or 'concerning', 
    // overallConfig will be undefined, and we render the dedicated error component.
    if (!overallConfig) {
        return <InvalidResponseError onReset={() => setResult(null)} />;
    }

    // 3. Destructure the icon now that we are sure overallConfig is defined.
    const OverallIcon = overallConfig.icon;

    return (
      <div className="min-h-[calc(100vh-4rem)] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => setResult(null)}
            data-testid="button-back-to-input"
          >
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            {t("Analyze Another")}
          </Button>

          <Card className={`mb-8 ${overallConfig.bg} border-0`}>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${overallConfig.bg} flex items-center justify-center`}>
                    <OverallIcon className={`h-8 w-8 ${overallConfig.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("Overall Rating")}</p>
                    <h2 className={`text-2xl font-bold ${overallConfig.color}`} data-testid="text-tos-rating">
                      {t(overallConfig.label)}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${result.shouldAgree ? "bg-safe/10" : "bg-concerning/10"}`}>
                    {result.shouldAgree ? (
                      <>
                        <ThumbsUp className="h-5 w-5 text-safe" />
                        <span className="font-medium text-safe">{t("OK to Agree")}</span>
                      </>
                    ) : (
                      <>
                        <ThumbsDown className="h-5 w-5 text-concerning" />
                        <span className="font-medium text-concerning">{t("Think Twice")}</span>
                      </>
                    )}
                  </div>
                  <Button variant="outline" size="icon" onClick={copyToClipboard} data-testid="button-copy-summary">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{t("Summary")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" data-testid="text-tos-summary">{result.summary}</p>
            </CardContent>
          </Card>

          <Accordion type="multiple" className="space-y-4">
            {/* DATA COLLECTION ACCORDION */}
            <AccordionItem value="data-collection" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{t("What Data They Collect")}</span>
                  <Badge variant="secondary" className="ml-2">{result.dataCollection.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {result.dataCollection.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      {/* Note: RiskBadge handles its own internal validity check */}
                      <RiskBadge level={item.severity as RiskLevel} /> 
                      <div>
                        <p className="font-medium text-sm">{item.item}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* DATA SHARING ACCORDION */}
            <AccordionItem value="data-sharing" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{t("Who They Share With")}</span>
                  <Badge variant="secondary" className="ml-2">{result.dataSharing.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {result.dataSharing.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <RiskBadge level={item.severity as RiskLevel} />
                      <div>
                        <p className="font-medium text-sm">{item.item}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* RIGHTS GIVEN UP ACCORDION */}
            <AccordionItem value="rights" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{t("Rights You're Giving Up")}</span>
                  <Badge variant="secondary" className="ml-2">{result.rightsGivenUp.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {result.rightsGivenUp.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <RiskBadge level={item.severity as RiskLevel} />
                      <div>
                        <p className="font-medium text-sm">{item.item}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">{t("Our Verdict")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" data-testid="text-tos-verdict">{result.verdict}</p>
            </CardContent>
          </Card>

          {/* ALTERNATIVES CARD */}
          {result.alternatives && result.alternatives.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">{t("Better Alternatives")}</CardTitle>
                <CardDescription>{t("Consider these privacy-friendly options")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.alternatives.map((alt, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-safe/5 border-safe/20">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{alt.name}</p>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">{alt.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  // --- INPUT FORM (DEFAULT VIEW) ---
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-tos-title">{t("ToS Decoder")}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("Paste any Terms of Service and get a plain-English breakdown of what you're actually agreeing to")}
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs value={inputType} onValueChange={(v) => setInputType(v as "url" | "text")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="text" data-testid="tab-text">
                  <FileText className="h-4 w-4 mr-2" />
                  {t("Paste Text")}
                </TabsTrigger>
                <TabsTrigger value="url" data-testid="tab-url">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t("Enter URL")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tos-text">{t("Terms of Service Text")}</Label>
                  <Textarea
                    id="tos-text"
                    placeholder={t("Paste the Terms of Service text here... (minimum 50 characters)")}
                    className="min-h-48"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    data-testid="input-tos-text"
                  />
                  <p className="text-xs text-muted-foreground">
                    {text.length} / 50 {t("minimum characters")}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tos-url">{t("Terms of Service URL")}</Label>
                  <Input
                    id="tos-url"
                    type="url"
                    placeholder="https://example.com/terms-of-service"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    data-testid="input-tos-url"
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("Enter the direct link to the Terms of Service page")}
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              className="w-full mt-6"
              size="lg"
              onClick={handleAnalyze}
              disabled={!canAnalyze || analyzeMutation.isPending}
              data-testid="button-analyze"
            >
              {analyzeMutation.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  {t("Analyzing...")}
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  {t("Analyze ToS")}
                </>
              )}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("Or try a demo")}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={simulateAnalysis}
              disabled={isSimulating || analyzeMutation.isPending}
            >
              {isSimulating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("Simulating...")}
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  {t("Simulate Analysis")}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* RISK LEGEND */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-safe/10 border border-safe/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-safe" />
              <span className="font-medium text-safe">{t("Safe")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("Standard practices with clear policies")}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-caution/10 border border-caution/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-caution" />
              <span className="font-medium text-caution">{t("Caution")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("Some concerning clauses to consider")}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-concerning/10 border border-concerning/20">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-concerning" />
              <span className="font-medium text-concerning">{t("Concerning")}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("Excessive data collection or vague policies")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Search, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Database,
  Share2,
  Shield,
  ArrowRight,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  ExternalLink
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { TosResult } from "@shared/schema";

type RiskLevel = "safe" | "caution" | "concerning";

const riskConfig: Record<RiskLevel, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  safe: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", label: "Safe" },
  caution: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", label: "Caution" },
  concerning: { icon: XCircle, color: "text-concerning", bg: "bg-concerning/10", label: "Concerning" },
};

function RiskBadge({ level }: { level: RiskLevel }) {
  const config = riskConfig[level];
  const Icon = config.icon;
  return (
    <Badge variant="outline" className={`${config.bg} ${config.color} border-0`}>
      <Icon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
}

export default function TosDecoderPage() {
  const { toast } = useToast();
  const [inputType, setInputType] = useState<"url" | "text">("text");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState<TosResult | null>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (data: { url?: string; text?: string }) => {
      const res = await apiRequest("POST", "/api/tos/analyze", data);
      return res.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Could not analyze the Terms of Service. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAnalyze = () => {
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
      title: "Copied!",
      description: "Summary copied to clipboard",
    });
  };

  if (result) {
    const overallConfig = riskConfig[result.overallRating];
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
            Analyze Another
          </Button>

          <Card className={`mb-8 ${overallConfig.bg} border-0`}>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${overallConfig.bg} flex items-center justify-center`}>
                    <OverallIcon className={`h-8 w-8 ${overallConfig.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
                    <h2 className={`text-2xl font-bold ${overallConfig.color}`} data-testid="text-tos-rating">
                      {overallConfig.label}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${result.shouldAgree ? "bg-success/10" : "bg-concerning/10"}`}>
                    {result.shouldAgree ? (
                      <>
                        <ThumbsUp className="h-5 w-5 text-success" />
                        <span className="font-medium text-success">OK to Agree</span>
                      </>
                    ) : (
                      <>
                        <ThumbsDown className="h-5 w-5 text-concerning" />
                        <span className="font-medium text-concerning">Think Twice</span>
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
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" data-testid="text-tos-summary">{result.summary}</p>
            </CardContent>
          </Card>

          <Accordion type="multiple" className="space-y-4">
            <AccordionItem value="data-collection" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-primary" />
                  <span className="font-semibold">What Data They Collect</span>
                  <Badge variant="secondary" className="ml-2">{result.dataCollection.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {result.dataCollection.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <RiskBadge level={item.severity} />
                      <div>
                        <p className="font-medium text-sm">{item.item}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-sharing" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Who They Share With</span>
                  <Badge variant="secondary" className="ml-2">{result.dataSharing.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {result.dataSharing.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <RiskBadge level={item.severity} />
                      <div>
                        <p className="font-medium text-sm">{item.item}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rights" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Rights You're Giving Up</span>
                  <Badge variant="secondary" className="ml-2">{result.rightsGivenUp.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {result.rightsGivenUp.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <RiskBadge level={item.severity} />
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
              <CardTitle className="text-lg">Our Verdict</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground" data-testid="text-tos-verdict">{result.verdict}</p>
            </CardContent>
          </Card>

          {result.alternatives && result.alternatives.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Better Alternatives</CardTitle>
                <CardDescription>Consider these privacy-friendly options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {result.alternatives.map((alt, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-success/5 border-success/20">
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

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-tos-title">ToS Decoder</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Paste any Terms of Service and get a plain-English breakdown of what you're actually agreeing to
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Tabs value={inputType} onValueChange={(v) => setInputType(v as "url" | "text")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="text" data-testid="tab-text">
                  <FileText className="h-4 w-4 mr-2" />
                  Paste Text
                </TabsTrigger>
                <TabsTrigger value="url" data-testid="tab-url">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Enter URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tos-text">Terms of Service Text</Label>
                  <Textarea
                    id="tos-text"
                    placeholder="Paste the Terms of Service text here... (minimum 50 characters)"
                    className="min-h-48"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    data-testid="input-tos-text"
                  />
                  <p className="text-xs text-muted-foreground">
                    {text.length} / 50 minimum characters
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tos-url">Terms of Service URL</Label>
                  <Input
                    id="tos-url"
                    type="url"
                    placeholder="https://example.com/terms-of-service"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    data-testid="input-tos-url"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the direct link to the Terms of Service page
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
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Analyze ToS
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-success/10 border border-success/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="font-medium text-success">Safe</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Standard practices with clear policies
            </p>
          </div>
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span className="font-medium text-warning-foreground">Caution</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Some concerning clauses to consider
            </p>
          </div>
          <div className="p-4 rounded-lg bg-concerning/10 border border-concerning/20">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-concerning" />
              <span className="font-medium text-concerning">Concerning</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Excessive data collection or vague policies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

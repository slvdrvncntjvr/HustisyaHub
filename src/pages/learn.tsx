import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Copy,
  Check,
  Download,
  Edit,
  Save,
  RotateCcw,
  BookOpen,
  GraduationCap,
  Scale,
  Shield
} from "lucide-react";
import { templateDocuments } from "@/lib/resources-data";
import type { TemplateDocument } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { useLanguage } from "@/components/language-provider";

function TemplateCard({ template }: { template: TemplateDocument }) {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [content, setContent] = useState(language === 'fil' && template.templateFil ? template.templateFil : template.template);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setContent(language === 'fil' && template.templateFil ? template.templateFil : template.template);
  }, [language, template]);

  const copyTemplate = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({ title: t("Copied!"), description: t("Template copied to clipboard") });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTemplate = async () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: content.split('\n').map(line => 
              new Paragraph({
                children: [new TextRun(line)],
              })
            ),
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${template.title.replace(/\s+/g, '_').toLowerCase()}.docx`);
      toast({ title: t("Downloaded!"), description: t("Template saved as DOCX") });
    } catch (error) {
      console.error("Error generating DOCX:", error);
      toast({ 
        title: t("Download Failed"), 
        description: t("Could not generate the document. Please try again."),
        variant: "destructive" 
      });
    }
  };

  const categoryLabels = {
    complaint: t("Complaint"),
    data_deletion: t("Data Request"),
    cease_desist: t("Cease & Desist"),
    foi: t("FOI Request"),
  };

  return (
    <Card className="h-full hover-elevate transition-all group" data-testid={`card-template-${template.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{template.title}</CardTitle>
              <Badge variant="outline" className="mt-1 text-xs">
                {categoryLabels[template.category]}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="mt-2">{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full group-hover:border-primary group-hover:text-primary transition-colors">
              <FileText className="h-4 w-4 mr-2" />
              {t("View Template")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col gap-0 p-0 overflow-hidden">
            <div className="p-6 pb-4 border-b bg-muted/10">
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 text-left">
                    <DialogTitle className="text-xl">{template.title}</DialogTitle>
                    <DialogDescription className="text-base">{template.description}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
            </div>
            
            <div className="flex-1 overflow-hidden bg-muted/30 p-4 sm:p-6">
              <ScrollArea className="h-[50vh] w-full rounded-xl border bg-background shadow-sm">
                <div className="p-6 sm:p-8 min-h-full">
                  {isEditing ? (
                    <Textarea 
                      value={content} 
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-[40vh] border-0 focus-visible:ring-0 resize-none p-0 text-sm sm:text-base font-mono leading-relaxed bg-transparent shadow-none"
                      placeholder={t("Type your template content here...")}
                    />
                  ) : (
                    <pre className="text-sm sm:text-base whitespace-pre-wrap font-mono leading-relaxed text-foreground/90 selection:bg-primary/20">
                      {content}
                    </pre>
                  )}
                </div>
              </ScrollArea>
            </div>

            <div className="p-4 border-t bg-background flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex gap-2">
                <Button 
                  variant={isEditing ? "secondary" : "outline"} 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex-1 sm:flex-none"
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {t("Done")}
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      {t("Edit")}
                    </>
                  )}
                </Button>
                {isEditing && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setContent(language === 'fil' && template.templateFil ? template.templateFil : template.template)} 
                    title={t("Reset to original")}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={downloadTemplate} className="flex-1 sm:flex-none">
                  <Download className="h-4 w-4 mr-2" />
                  {t("Download")}
                </Button>
                <Button onClick={copyTemplate} className="flex-1 sm:flex-none min-w-[140px]">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {t("Copied!")}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      {t("Copy")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default function LearnPage() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground mb-5 shadow-xl shadow-primary/20">
            <GraduationCap className="h-10 w-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-learn-title">{t("Legal Knowledge Base")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("Empower yourself with legal templates and guides to protect your digital rights.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200/50 dark:border-blue-800/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 shadow-lg shadow-blue-500/20">
                <Scale className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">{t("Digital Rights")}</CardTitle>
              <CardDescription className="text-base">
                {t("Fundamental rights for every digital citizen")}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                {[
                  "Right to freedom of expression",
                  "Right to privacy",
                  "Right to credit for personal works",
                  "Right to digital access",
                  "Right to our identity",
                  "Right to assemble"
                ].map((right, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                    <span>{t(right)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200/50 dark:border-purple-800/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-3 shadow-lg shadow-purple-500/20">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl">{t("Digital Responsibilities")}</CardTitle>
              <CardDescription className="text-base">
                {t("Duties to ensure a safe digital environment")}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
                {[
                  "Responsibility to report bullying, harassing, sexting, or identity theft",
                  "Responsibility to cite works used for resources and researching",
                  "Responsibility to download music, videos, and other materials legally",
                  "Responsibility to model and teach students expectations of technology use",
                  "Responsibility to keep data/information safe from hackers",
                  "Responsibility not to falsify your identity in any way",
                  "Responsibility to comply with legislation, regulations, code of conduct and best practices"
                ].map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0"></span>
                    <span>{t(responsibility)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12 text-sm text-muted-foreground">
          <p>{t("Source")}: <a href="https://ijarcce.com/wp-content/uploads/2020/02/IJARCCE.2020.9204.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">International Journal of Advanced Research in Computer and Communication Engineering (IJARCCE)</a></p>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold">{t("Document Templates")}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateDocuments.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

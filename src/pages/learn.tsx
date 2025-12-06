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
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 text-primary mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold mb-4" data-testid="text-learn-title">{t("Legal Knowledge Base")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("Empower yourself with legal templates and guides to protect your digital rights.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-900">
            <CardHeader>
              <Scale className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>{t("Digital Rights")}</CardTitle>
              <CardDescription>
                {t("Fundamental rights for every digital citizen")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>{t("Right to freedom of expression")}</li>
                <li>{t("Right to privacy")}</li>
                <li>{t("Right to credit for personal works")}</li>
                <li>{t("Right to digital access")}</li>
                <li>{t("Right to our identity")}</li>
                <li>{t("Right to assemble")}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-100 dark:border-purple-900">
            <CardHeader>
              <Shield className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>{t("Digital Responsibilities")}</CardTitle>
              <CardDescription>
                {t("Duties to ensure a safe digital environment")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>{t("Responsibility to report bullying, harassing, sexting, or identity theft")}</li>
                <li>{t("Responsibility to cite works used for resources and researching")}</li>
                <li>{t("Responsibility to download music, videos, and other materials legally")}</li>
                <li>{t("Responsibility to model and teach students expectations of technology use")}</li>
                <li>{t("Responsibility to keep data/information safe from hackers")}</li>
                <li>{t("Responsibility not to falsify your identity in any way")}</li>
                <li>{t("Responsibility to comply with legislation, regulations, code of conduct and best practices")}</li>
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

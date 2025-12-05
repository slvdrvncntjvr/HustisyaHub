import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Phone,
  Globe,
  Mail,
  Clock,
  MapPin,
  ExternalLink,
  FileText,
  Copy,
  Check,
  AlertTriangle,
  Heart,
  Scale,
  Building,
  Smartphone
} from "lucide-react";
import { resources, templateDocuments, getResourcesByCategory } from "@/lib/resources-data";
import type { Resource, TemplateDocument, PhilippineRegion } from "@shared/schema";
import { philippineRegions } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const categoryInfo = {
  emergency: { icon: AlertTriangle, label: "Emergency Hotlines", color: "text-destructive" },
  mental_health: { icon: Heart, label: "Mental Health", color: "text-pink-500" },
  legal_aid: { icon: Scale, label: "Legal Aid", color: "text-blue-500" },
  government: { icon: Building, label: "Government", color: "text-purple-500" },
  platform_help: { icon: Smartphone, label: "Platform Help", color: "text-green-500" },
};

function ResourceCard({ resource }: { resource: Resource }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const catInfo = categoryInfo[resource.category];
  const Icon = catInfo.icon;

  const copyPhone = () => {
    if (resource.phone) {
      navigator.clipboard.writeText(resource.phone);
      setCopied(true);
      toast({ title: "Copied!", description: "Phone number copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="h-full hover-elevate transition-all" data-testid={`card-resource-${resource.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
              <Icon className={`h-5 w-5 ${catInfo.color}`} />
            </div>
            <div>
              <CardTitle className="text-base">{resource.name}</CardTitle>
              <Badge variant="secondary" className="mt-1 text-xs">
                {catInfo.label}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>

        {resource.phone && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${resource.phone}`} className="font-medium text-sm hover:text-primary">
                {resource.phone}
              </a>
            </div>
            <Button variant="ghost" size="icon" onClick={copyPhone} className="h-8 w-8">
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 text-xs">
          {resource.email && (
            <a
              href={`mailto:${resource.email}`}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary"
            >
              <Mail className="h-3 w-3" />
              Email
            </a>
          )}
          {resource.website && (
            <a
              href={resource.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary"
            >
              <Globe className="h-3 w-3" />
              Website
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          {resource.hours && (
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              {resource.hours}
            </span>
          )}
        </div>

        {resource.regions && resource.regions.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{resource.regions.join(", ")}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TemplateCard({ template }: { template: TemplateDocument }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyTemplate = () => {
    navigator.clipboard.writeText(template.template);
    setCopied(true);
    toast({ title: "Copied!", description: "Template copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const categoryLabels = {
    complaint: "Complaint",
    data_deletion: "Data Request",
    cease_desist: "Cease & Desist",
    foi: "FOI Request",
  };

  return (
    <Card className="h-full hover-elevate transition-all" data-testid={`card-template-${template.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
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
            <Button variant="outline" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              View Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{template.title}</DialogTitle>
              <DialogDescription>{template.description}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[50vh] rounded-lg border p-4">
              <pre className="text-sm whitespace-pre-wrap font-mono">{template.template}</pre>
            </ScrollArea>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={copyTemplate}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-success" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Template
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<PhilippineRegion | "all">("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegion === "all" ||
      !resource.regions ||
      resource.regions.includes(selectedRegion as PhilippineRegion);

    const matchesCategory = activeTab === "all" || resource.category === activeTab;

    return matchesSearch && matchesRegion && matchesCategory;
  });

  const emergencyResources = getResourcesByCategory("emergency");

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-resources-title">Resource Directory</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find emergency hotlines, legal aid organizations, and support services for Filipino youth
          </p>
        </div>

        <Card className="mb-8 bg-destructive/5 border-destructive/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Emergency Hotlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyResources.map((resource) => (
                <a
                  key={resource.id}
                  href={`tel:${resource.phone}`}
                  className="flex items-center gap-3 p-4 rounded-lg bg-background border hover-elevate transition-all hover:border-destructive/50 hover:bg-destructive/10"
                  data-testid={`link-emergency-${resource.id}`}
                >
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{resource.name}</p>
                    <p className="text-lg font-bold text-destructive">{resource.phone}</p>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-resources"
            />
          </div>
          <Select value={selectedRegion} onValueChange={(v) => setSelectedRegion(v as PhilippineRegion | "all")}>
            <SelectTrigger className="w-full sm:w-48" data-testid="select-region-filter">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] shadow-xl duration-300">
              <SelectItem value="all">All Regions</SelectItem>
              {philippineRegions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-all">
              All
            </TabsTrigger>
            <TabsTrigger value="legal_aid" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-legal">
              <Scale className="h-4 w-4 mr-1" />
              Legal Aid
            </TabsTrigger>
            <TabsTrigger value="mental_health" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-mental">
              <Heart className="h-4 w-4 mr-1" />
              Mental Health
            </TabsTrigger>
            <TabsTrigger value="government" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-government">
              <Building className="h-4 w-4 mr-1" />
              Government
            </TabsTrigger>
            <TabsTrigger value="platform_help" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid="tab-platform">
              <Smartphone className="h-4 w-4 mr-1" />
              Platform Help
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredResources.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No resources found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6" data-testid="text-templates-title">Template Documents</h2>
          <p className="text-muted-foreground mb-6">
            Ready-to-use letter templates for common situations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templateDocuments.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

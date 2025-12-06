import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  FileText, 
  Search, 
  BookOpen, 
  ArrowRight,
  Phone,
  Lock,
  Users,
  Zap,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Report Builder",
    description: "Step-by-step guide to report cyberbullying, harassment, and other violations to the right authorities.",
    href: "/report",
    cta: "Create Report"
  },
  {
    icon: Search,
    title: "ToS Decoder",
    description: "Paste any Terms of Service and get a plain-English breakdown of what you're actually agreeing to.",
    href: "/tos-decoder",
    cta: "Decode ToS"
  },
  {
    icon: BookOpen,
    title: "Directory and Contacts",
    description: "Find emergency hotlines, legal aid, and platform help centers specific to the Philippines.",
    href: "/resources",
    cta: "Browse Resources"
  }
];

const trustPoints = [
  {
    icon: Lock,
    title: "Privacy-First",
    description: "No login required. No tracking. Your data stays on your device."
  },
  {
    icon: Users,
    title: "For Filipinos",
    description: "Designed for Filipinos with plain language and mobile-first design."
  },
  {
    icon: Zap,
    title: "Fast & Free",
    description: "Works on slow connections. All tools are completely free to use."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="h-4 w-4" />
                Digital Rights for Filipinos
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight" data-testid="text-hero-title">
                Protect Your 
                <span className="text-primary"> Digital Rights</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl" data-testid="text-hero-description">
                Report violations, decode Terms of Service, and access resources designed specifically for Filipinos. 
                No login. No tracking. Just help when you need it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/report">
                  <Button size="lg" className="w-full sm:w-auto text-base" data-testid="button-hero-report">
                    <Phone className="h-5 w-5 mr-2" />
                    Report a Violation
                  </Button>
                </Link>
                <Link href="/tos-decoder">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base" data-testid="button-hero-tos">
                    <Search className="h-5 w-5 mr-2" />
                    Decode ToS
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>No sign-up needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>100% private</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl" />
                <div className="relative bg-card border rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Quick Help Available</p>
                      <p className="text-sm text-muted-foreground">24/7 Emergency Support</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-5 w-5 text-destructive" />
                      <div>
                        <p className="text-sm font-medium">NBI Cybercrime</p>
                        <p className="text-xs text-muted-foreground">(02) 8523-8231</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-5 w-5 text-warning" />
                      <div>
                        <p className="text-sm font-medium">Bantay Bata</p>
                        <p className="text-xs text-muted-foreground">163</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Mental Health Crisis</p>
                        <p className="text-xs text-muted-foreground">1553</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-tools-title">
              Tools Built for You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Practical tools designed specifically for Filipino students to protect their digital rights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.href} 
                  className="group hover-elevate transition-all duration-200"
                  data-testid={`card-feature-${feature.title.toLowerCase().replace(' ', '-')}`}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={feature.href}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {feature.cta}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="text-center" data-testid={`card-trust-${point.title.toLowerCase()}`}>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Right Now?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              If you're experiencing harassment or need immediate support, our tools can help you take action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/report">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" data-testid="button-cta-report">
                  <FileText className="h-5 w-5 mr-2" />
                  Start a Report
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-cta-resources">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Contacts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

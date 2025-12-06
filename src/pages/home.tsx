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
import { useLanguage } from "@/components/language-provider";

export default function Home() {
  const { t } = useLanguage();

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

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 animate-fade-in-up opacity-0 animate-fill-both">
                <Shield className="h-4 w-4" />
                {t("Digital Rights for Filipinos")}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in-up opacity-0 animate-fill-both animate-delay-100" data-testid="text-hero-title">
                {t("Protect Your")} 
                <span className="text-gradient"> {t("Digital Rights")}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-in-up opacity-0 animate-fill-both animate-delay-200" data-testid="text-hero-description">
                {t("Report violations, decode Terms of Service, and access resources designed specifically for Filipinos.")} 
                {t("No login. No tracking. Just help when you need it.")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0 animate-fill-both animate-delay-300">
                <Link href="/report">
                  <Button size="lg" className="w-full sm:w-auto text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 glow-primary" data-testid="button-hero-report">
                    <Phone className="h-5 w-5 mr-2" />
                    {t("Report a Violation")}
                  </Button>
                </Link>
                <Link href="/tos-decoder">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base hover:scale-[1.02] transition-all duration-300" data-testid="button-hero-tos">
                    <Search className="h-5 w-5 mr-2" />
                    {t("Decode ToS")}
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground pt-4 animate-fade-in-up opacity-0 animate-fill-both animate-delay-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>{t("Free to use")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>{t("No sign-up needed")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>{t("100% private")}</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center animate-fade-in-up opacity-0 animate-fill-both animate-delay-300">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-3xl blur-2xl animate-pulse-soft" />
                <div className="relative bg-card/80 backdrop-blur-sm border border-primary/10 rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg animate-float">
                      <Shield className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{t("Quick Help Available")}</p>
                      <p className="text-sm text-muted-foreground">{t("24/7 Emergency Support")}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a href="tel:+6285238231" className="flex items-center gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/10 hover:border-destructive/30 hover:bg-destructive/10 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{t("NBI Cybercrime")}</p>
                        <p className="text-xs text-muted-foreground">(02) 8523-8231</p>
                      </div>
                    </a>
                    <a href="tel:163" className="flex items-center gap-3 p-3 rounded-xl bg-warning/5 border border-warning/10 hover:border-warning/30 hover:bg-warning/10 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{t("Bantay Bata")}</p>
                        <p className="text-xs text-muted-foreground">163</p>
                      </div>
                    </a>
                    <a href="tel:1553" className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{t("Mental Health Crisis")}</p>
                        <p className="text-xs text-muted-foreground">1553</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-tools-title">
              {t("Tools Built for You")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("Practical tools designed specifically for Filipino students to protect their digital rights")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.href} 
                  className="group card-lift border-2 border-transparent hover:border-primary/20 bg-card/50 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`card-feature-${feature.title.toLowerCase().replace(' ', '-')}`}
                >
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-primary/80 group-hover:shadow-lg transition-all duration-300">
                      <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <CardTitle className="text-xl">{t(feature.title)}</CardTitle>
                    <CardDescription className="text-base">
                      {t(feature.description)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={feature.href}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                        {t(feature.cta)}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
            {trustPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div 
                  key={point.title} 
                  className="text-center p-6 rounded-2xl hover:bg-muted/50 transition-all duration-300" 
                  data-testid={`card-trust-${point.title.toLowerCase()}`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t(point.title)}</h3>
                  <p className="text-muted-foreground">{t(point.description)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("Need Help Right Now?")}
            </h2>
            <p className="text-lg opacity-90 mb-8">
              {t("If you're experiencing harassment or need immediate support, our tools can help you take action.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/report">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300" data-testid="button-cta-report">
                  <FileText className="h-5 w-5 mr-2" />
                  {t("Start a Report")}
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300" data-testid="button-cta-resources">
                  <Phone className="h-5 w-5 mr-2" />
                  {t("Emergency Contacts")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

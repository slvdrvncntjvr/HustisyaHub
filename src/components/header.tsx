import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, Menu, X, FileText, Search, BookOpen, Phone, ChevronDown, Wrench, GraduationCap } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "@/components/language-provider";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: "/resources", label: "Directory and Contacts", icon: BookOpen },
  ];

  const isToolsActive = location === "/report" || location === "/tos-decoder";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2 hover:bg-accent/50 transition-all duration-300" data-testid="link-home">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md shadow-primary/20">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden sm:block tracking-tight">{t("RightsUp")}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/learn" className="cursor-pointer">
              <Button
                variant={location === "/learn" ? "secondary" : "ghost"}
                className="gap-2 cursor-pointer"
                data-testid="link-nav-learn"
              >
                <GraduationCap className="h-4 w-4" />
                {t("Learn")}
              </Button>
            </Link>

            <Popover open={toolsOpen} onOpenChange={setToolsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={isToolsActive ? "secondary" : "ghost"}
                  className="gap-2 cursor-pointer"
                  data-testid="nav-tools"
                >
                  <Wrench className="h-4 w-4" />
                  {t("Tools")}
                  <ChevronDown className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="start">
                <div className="grid gap-1">
                  <Link href="/report">
                    <Button
                      variant={location === "/report" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2 cursor-pointer"
                      onClick={() => setToolsOpen(false)}
                    >
                      <FileText className="h-4 w-4" />
                      {t("Create Report")}
                    </Button>
                  </Link>
                  <Link href="/tos-decoder">
                    <Button
                      variant={location === "/tos-decoder" ? "secondary" : "ghost"}
                      className="w-full justify-start gap-2 cursor-pointer"
                      onClick={() => setToolsOpen(false)}
                    >
                      <Search className="h-4 w-4" />
                      {t("ToS Decoder")}
                    </Button>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href} className="cursor-pointer">
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="gap-2 cursor-pointer"
                    data-testid={`link-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <Icon className="h-4 w-4" />
                    {t(link.label)}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/report" className="hidden sm:block cursor-pointer">
              <Button data-testid="button-header-report" className="cursor-pointer shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                <Phone className="h-4 w-4 mr-2" />
                {t("Get Help Now")}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex w-9 px-0 rounded-xl hover:bg-accent/70 transition-colors"
              onClick={() => setLanguage(language === "en" ? "fil" : "en")}
              title={language === "en" ? "Switch to Filipino" : "Switch to English"}
            >
              <span className="font-bold text-xs">{language === "en" ? "FIL" : "EN"}</span>
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-fade-in">
          <nav className="flex flex-col p-4 gap-2">
            {/* Learn Link */}
            <Link href="/learn" onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
              <Button
                variant={location === "/learn" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 cursor-pointer rounded-xl h-12"
                data-testid="link-mobile-learn"
              >
                <GraduationCap className="h-4 w-4" />
                {t("Learn")}
              </Button>
            </Link>
            
            <div className="my-2 border-t border-border/50" />
            
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t("Tools")}</div>
            <Link href="/report" onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
              <Button
                variant={location === "/report" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 cursor-pointer pl-4 rounded-xl h-12"
              >
                <FileText className="h-4 w-4" />
                {t("Create Report")}
              </Button>
            </Link>
            <Link href="/tos-decoder" onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
              <Button
                variant={location === "/tos-decoder" ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 cursor-pointer pl-4 rounded-xl h-12"
              >
                <Search className="h-4 w-4" />
                {t("ToS Decoder")}
              </Button>
            </Link>
            
            <div className="my-2 border-t border-border/50" />
            
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 cursor-pointer rounded-xl h-12"
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <Icon className="h-4 w-4" />
                    {t(link.label)}
                  </Button>
                </Link>
              );
            })}
            <Link href="/report" onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
              <Button className="w-full mt-3 cursor-pointer rounded-xl h-12 shadow-md shadow-primary/20" data-testid="button-mobile-report">
                <Phone className="h-4 w-4 mr-2" />
                {t("Get Help Now")}
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 cursor-pointer rounded-xl h-12 mt-1"
              onClick={() => setLanguage(language === "en" ? "fil" : "en")}
            >
              <span className="font-bold text-xs">{language === "en" ? "FIL" : "EN"}</span>
              {language === "en" ? "Switch to Filipino" : "Switch to English"}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

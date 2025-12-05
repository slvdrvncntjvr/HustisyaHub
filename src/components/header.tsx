import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, Menu, X, FileText, Search, BookOpen, Phone } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/report", label: "Report", icon: FileText },
  { href: "/tos-decoder", label: "ToS Decoder", icon: Search },
  { href: "/resources", label: "Resources", icon: BookOpen },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 cursor-pointer rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors" data-testid="link-home">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden sm:block">RightsUp</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
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
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/report" className="hidden sm:block cursor-pointer">
              <Button data-testid="button-header-report" className="cursor-pointer">
                <Phone className="h-4 w-4 mr-2" />
                Get Help Now
              </Button>
            </Link>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 cursor-pointer"
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
            <Link href="/report" onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
              <Button className="w-full mt-2 cursor-pointer" data-testid="button-mobile-report">
                <Phone className="h-4 w-4 mr-2" />
                Get Help Now
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

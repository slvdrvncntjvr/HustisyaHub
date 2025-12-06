import { Link } from "wouter";
import { Shield, Heart } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border/50 bg-muted/20 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">RightsUp</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              {t("Empowering Filipinos to understand, exercise, and defend their digital rights. Free tools for reporting violations and understanding your online protections.")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">{t("Tools")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/report" className="hover:text-primary transition-colors duration-200 flex items-center gap-2" data-testid="link-footer-report">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  {t("Smart Report Builder")}
                </Link>
              </li>
              <li>
                <Link href="/tos-decoder" className="hover:text-primary transition-colors duration-200 flex items-center gap-2" data-testid="link-footer-tos">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  {t("ToS Decoder")}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-primary transition-colors duration-200 flex items-center gap-2" data-testid="link-footer-resources">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  {t("Resource Directory")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-foreground/80">{t("Emergency")}</h3>
            <ul className="space-y-3 text-sm">
              <li className="p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                <span className="block text-foreground font-medium text-xs uppercase tracking-wide">{t("NBI Cybercrime")}</span>
                <a href="tel:+6285238231" className="text-destructive font-semibold hover:underline">(02) 8523-8231</a>
              </li>
              <li className="p-3 rounded-xl bg-warning/5 border border-warning/10">
                <span className="block text-foreground font-medium text-xs uppercase tracking-wide">{t("Bantay Bata 163")}</span>
                <a href="tel:163" className="text-warning font-semibold hover:underline">163</a>
              </li>
              <li className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                <span className="block text-foreground font-medium text-xs uppercase tracking-wide">{t("Mental Health")}</span>
                <a href="tel:1553" className="text-primary font-semibold hover:underline">1553</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            {t("Made with")} <Heart className="h-4 w-4 text-destructive fill-destructive animate-pulse" /> {t("by PUP++ for Hack the Flood")}
          </p>
          <p className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            {t("Privacy-first. No login required. Your data stays yours.")}
          </p>
        </div>
      </div>
    </footer>
  );
}

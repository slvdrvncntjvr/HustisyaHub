import { Link } from "wouter";
import { Shield, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">RightsUp</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              Empowering Filipino youth to understand, exercise, and defend their digital rights. 
              Free tools for reporting violations and understanding your online protections.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/report" className="hover:text-foreground transition-colors" data-testid="link-footer-report">
                  Smart Report Builder
                </Link>
              </li>
              <li>
                <Link href="/tos-decoder" className="hover:text-foreground transition-colors" data-testid="link-footer-tos">
                  ToS Decoder
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-foreground transition-colors" data-testid="link-footer-resources">
                  Resource Directory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Emergency</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="block text-foreground font-medium">NBI Cybercrime</span>
                <a href="tel:+6285238231" className="hover:text-foreground transition-colors">(02) 8523-8231</a>
              </li>
              <li>
                <span className="block text-foreground font-medium">Bantay Bata 163</span>
                <a href="tel:163" className="hover:text-foreground transition-colors">163</a>
              </li>
              <li>
                <span className="block text-foreground font-medium">Mental Health</span>
                <a href="tel:1553" className="hover:text-foreground transition-colors">1553</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> by PUP++ for Hack the Flood
          </p>
          <p>
            Privacy-first. No login required. Your data stays yours.
          </p>
        </div>
      </div>
    </footer>
  );
}

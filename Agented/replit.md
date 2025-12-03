# RightsUp - Digital Rights Platform for Filipino Youth

## Overview

RightsUp is a web application that empowers Filipino youth to understand, exercise, and defend their digital rights. The platform provides free tools for reporting online violations (cyberbullying, harassment, doxxing), decoding Terms of Service agreements, and accessing emergency resources. Built with a focus on accessibility and youth-friendly design, it combines professional legal functionality with an approachable interface suitable for teenagers in crisis situations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript using Vite as the build tool

**Routing**: Wouter for lightweight client-side routing with four main routes:
- `/` - Home page
- `/report` - Smart Report Builder for filing violation reports
- `/tos-decoder` - Terms of Service analysis tool
- `/resources` - Emergency hotlines and resource directory

**UI Component System**: Shadcn UI (New York style variant) with Radix UI primitives
- Extensive component library including accordion, alert-dialog, badge, button, card, checkbox, dialog, dropdown-menu, form, input, select, tabs, textarea, toast, etc.
- Tailwind CSS for styling with custom color system and HSL-based theming
- Design system follows "Professional Protection, Youth Voice" principle - balancing trustworthy legal tools with youth-friendly engagement

**State Management**: 
- TanStack React Query v5 for server state and API caching
- Local React state for form and UI state
- Custom query client configuration with credential-based requests

**Styling System**:
- Tailwind CSS with custom configuration
- CSS variables for theming (light mode default with dark mode support)
- Custom color palette focused on accessibility (primary blue, success green, warning yellow, concerning/destructive red)
- Typography: Inter font family for all text (400, 500, 600, 700 weights)
- Spacing based on Tailwind's default scale (2, 4, 6, 8, 12, 16, 20, 24)

### Backend Architecture

**Runtime**: Node.js with Express.js framework

**Development Setup**: 
- TypeScript with ES modules
- tsx for development server
- esbuild for production builds with selective bundling

**API Structure**:
- RESTful endpoints under `/api/*` prefix
- Primary endpoint: `/api/tos/analyze` for Terms of Service analysis
- Static file serving for built frontend assets
- SPA fallback routing for client-side navigation

**Server Configuration**:
- HTTP server using Node's built-in `http` module
- JSON body parsing with raw body buffer access
- URL-encoded form data support
- Custom request logging middleware
- Development mode with HMR support via Vite middleware

**AI Integration**:
- Anthropic Claude API (Sonnet 4 model: claude-sonnet-4-20250514)
- Used for ToS analysis with structured JSON responses
- Analyzes data collection, sharing practices, and user rights
- Returns risk ratings: "safe", "caution", or "concerning"

### Data Storage Solutions

**ORM**: Drizzle ORM for database interactions

**Database**: PostgreSQL (configured but not actively used in current implementation)
- Neon Database serverless PostgreSQL driver (@neondatabase/serverless)
- Schema defined in `shared/schema.ts`
- Migration system via drizzle-kit

**Current Storage Strategy**: 
- In-memory storage implementation for reports and resources
- Default resource data hardcoded in `server/storage.ts` and `client/src/lib/resources-data.ts`
- No active database persistence in current build (prepared for future database integration)

**Data Models**:
- Reports: violation tracking with type, platform, region, evidence, recipients
- Resources: emergency hotlines, mental health services, legal aid, government agencies, platform help
- Template Documents: Letter templates for various report recipients
- Philippine-specific data: 17 regions (NCR, CAR, Regions I-XIII, BARMM)
- Platform types: Facebook, Instagram, TikTok, Twitter, Discord, Messenger, Telegram, YouTube
- Violation types: cyberbullying, harassment, doxxing, impersonation, revenge_porn, online_scam, hate_speech, privacy_violation

### Authentication and Authorization

**Current Implementation**: No authentication system
- Privacy-first approach: no login required
- No user tracking or session management
- All tools accessible anonymously
- Reports and analyses remain client-side

**Prepared Infrastructure** (not actively used):
- express-session with connect-pg-simple for PostgreSQL session store
- passport with passport-local strategy included in dependencies
- Session configuration ready but not initialized

### External Dependencies

**AI Services**:
- Anthropic Claude API for Terms of Service analysis
- API key via `ANTHROPIC_API_KEY` environment variable (optional)
- Demo mode: When no API key is configured, the ToS analyzer uses intelligent keyword-based analysis that provides meaningful results for testing and demonstration

**Database**:
- Neon Database serverless PostgreSQL (configured but optional in current build)
- Connection string via `DATABASE_URL` environment variable

**Font Resources**:
- Google Fonts CDN for Inter font family
- Loaded via preconnect and stylesheet link in HTML

**UI Component Libraries**:
- Radix UI primitives for accessible components (@radix-ui/react-*)
- Lucide React for icons
- react-icons for brand icons (social media platforms)
- cmdk for command palette functionality
- vaul for drawer components
- embla-carousel-react for carousels

**Development Tools**:
- Vite for frontend development and building
- Replit-specific plugins for error overlays, cartographer, and dev banner
- PostCSS with Tailwind and Autoprefixer

**Utility Libraries**:
- Zod for schema validation with drizzle-zod integration
- date-fns for date formatting
- clsx and tailwind-merge for className utilities
- class-variance-authority for component variants
- nanoid for unique ID generation

**Philippine-Specific Resources**:
- Hardcoded directory of emergency hotlines (NBI Cybercrime, PNP Anti-Cybercrime Group, DSWD Bantay Bata 163)
- Mental health services, legal aid organizations
- Government agencies and platform help centers
- All resources include Filipino/English language support with some Cebuano support
# RightsUp Platform - Design Guidelines

## Design Approach

**Reference-Based Hybrid**: Drawing from Linear's professional clarity + Duolingo's youth-friendly engagement + Gov.uk's accessibility standards. This creates a trustworthy yet approachable platform that Filipino youth will actually use.

**Core Principle**: "Professional Protection, Youth Voice" - serious enough for legal tools, welcoming enough for teenagers in crisis.

---

## Typography

**Font System** (via Google Fonts CDN):
- **Primary**: Inter (400, 500, 600, 700) - headings, UI elements, buttons
- **Body**: Inter (400, 500) - paragraphs, form labels, descriptions

**Type Scale**:
- Hero Headlines: text-5xl md:text-6xl font-bold
- Section Titles: text-3xl md:text-4xl font-bold
- Card Titles: text-xl font-semibold
- Body Text: text-base leading-relaxed
- Small Labels: text-sm font-medium
- Helper Text: text-sm text-gray-600

---

## Layout System

**Spacing Units**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-24
- Card gaps: gap-6 to gap-8
- Button padding: px-6 py-3

**Container Strategy**:
- Full-width sections with inner max-w-7xl mx-auto px-6
- Content cards: max-w-4xl for forms and reports
- Text content: max-w-2xl for readability

**Grid System**:
- Desktop tool cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Feature highlights: grid-cols-1 md:grid-cols-2
- Resource directory: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Mobile: Always single column for accessibility

---

## Component Library

### Navigation
- Sticky header with logo left, main nav center, CTA right
- Mobile: Hamburger menu with full-screen overlay
- Quick action buttons in header (Report Now, Get Help)
- Breadcrumb navigation for multi-step processes

### Homepage Hero
- Asymmetric split layout (60/40): Strong headline + illustration/photo on right
- Primary CTA: "Report a Violation" (prominent)
- Secondary CTAs: "Decode ToS" and "Check My Privacy"
- Trust indicators: "Used by 10,000+ Filipino students" with partner logos

### Tool Cards (Report Builder, ToS Decoder, Privacy Checkup)
- Large icon at top (Heroicons via CDN)
- Bold card title with 2-line description
- "Start Now" button at bottom
- Subtle hover lift effect (shadow transition)
- Border with rounded corners (rounded-xl border border-gray-200)

### Smart Report Builder Interface
- Progress stepper at top showing 5 steps (Evidence → Platform → Type → Details → Review)
- Single-column form layout with generous spacing (gap-8)
- Large, friendly form inputs with helpful placeholders
- File upload with drag-and-drop zone showing preview thumbnails
- Platform selector using icon buttons (Facebook, Instagram, TikTok, etc.)
- Violation type cards: grid layout with icons + descriptions
- Navigation: "Back" + "Continue" buttons, "Save Draft" link

### ToS Decoder Results
- Traffic light verdict card at top (prominent colored banner)
- Accordion sections for detailed breakdown:
  - "What Data They Collect" (red/yellow/green indicators)
  - "Who They Share With"
  - "Rights You're Giving Up"
  - "Our Verdict"
- "Better Alternatives" recommendation cards at bottom
- Share result button for social media

### Resource Directory
- Categorized card grid with icons
- Emergency hotlines: Large, tappable phone number cards with direct call buttons
- Filter tags at top (Legal Aid, Mental Health, Reporting, etc.)
- Each card: Icon + Organization name + Contact methods + Region tag
- Expandable details for hours, languages supported, services offered

### Interactive Learning Hub
- Scenario cards with illustration thumbnails
- Quiz interface: Question → Multiple choice options → Immediate feedback
- Progress bar tracking completion
- Certificate download for completed modules
- Video embed cards with play button overlay

### Forms & Inputs
- Labels above inputs (text-sm font-medium mb-2)
- Input fields: Large touch targets (h-12), rounded borders (rounded-lg)
- Textareas: min-h-32 for comfortable typing
- Select dropdowns: Custom styled with chevron icon
- Checkboxes/Radio: Large, clear with label click targets
- Error states: Red border + icon + helper text below
- Success states: Green border + checkmark icon

### Buttons & CTAs
- Primary: Bold solid background with white text (px-6 py-3 rounded-lg font-semibold)
- Secondary: Border outline with transparent fill
- Danger: Used for "Delete" or critical actions
- Icon buttons: Circular with centered icon (w-10 h-10 rounded-full)
- Disabled state: Reduced opacity (opacity-50 cursor-not-allowed)

### Data Display
- Report preview: Clean document-style layout with sections
- PDF download button: Prominent with download icon
- Statistics dashboard (for school admins): Number cards with icons
- Timeline view for incident reporting steps

### Modals & Overlays
- Centered modal with backdrop blur
- Close button (X) in top-right
- Max width constraints (max-w-2xl)
- Action buttons at bottom (Cancel left, Confirm right)

### Empty States
- Centered icon + message + CTA button
- "No saved reports yet" → "Create Your First Report"
- Friendly, encouraging tone

---

## Images

### Hero Section
**Image**: Illustration or photo of Filipino youth using smartphones/laptops in a supportive, empowering context (diverse students, bright but professional). Position on right side of split hero layout (40% width on desktop).

**Alternative Hero Treatment**: Bold typography-first with small illustrative icon elements floating around text (shield icons, chat bubbles, lock symbols).

### Tool Feature Cards
**Icons**: Use Heroicons (shield-check, document-magnifying-glass, lock-closed, academic-cap, phone) at 48px size, positioned at card top.

### Scenario Cards (Learning Hub)
**Thumbnails**: Simple illustrations depicting common scenarios (chat screenshots, social media mockups, privacy settings). 300x200px cards with rounded corners.

### Partner Logos
**Trust Indicators**: NBI, DepEd, DSWD logos in grayscale, 120px wide, aligned horizontally below hero.

### Evidence Upload Preview
**Placeholder**: Dotted border upload zone with cloud-upload icon (96px) centered.

---

## Accessibility & Performance

- ARIA labels on all interactive elements
- Keyboard navigation support throughout
- Skip to main content link
- Focus indicators visible on all clickable elements (ring-2 ring-offset-2)
- Image lazy loading for performance
- Optimized icon SVGs via CDN
- Mobile touch targets minimum 44x44px
- High contrast text ratios (WCAG AA minimum)

---

## Page-Specific Layouts

**Homepage**: Hero → Tool Cards (3-column grid) → Feature Highlights (2-column) → Testimonials (3 cards) → Emergency Resources (full-width banner) → Footer

**Report Builder**: Header → Progress Stepper → Form Section (centered max-w-3xl) → Navigation Footer (sticky)

**ToS Decoder**: Header → Input Section (paste URL) → Results (verdict + accordion) → Alternatives Grid → CTA

**Resource Directory**: Header → Filter Bar → Category Tabs → Resource Cards Grid (3-column) → Footer

**Learning Hub**: Header → Featured Scenarios (carousel) → Quiz Grid → Video Library → Downloadable Resources
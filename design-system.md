# TripMate Web Platform - Design System

**Source:** Google Stitch Project
**Project ID:** 1377637314482253765
**Last Updated:** 2026-07-06

---

## Brand & Style

The design system is built on a **Corporate / Modern** aesthetic, specifically tailored to bridge the gap between an inviting e-commerce travel platform and a high-productivity SaaS dashboard. It evokes a sense of reliability and excitement, ensuring users feel secure while booking adventures.

The visual language varies by user role to establish clear context:
- **Traveler:** Light, airy, and visual-heavy to inspire exploration.
- **Organizer:** Structured, clean, and efficiency-focused to support management tasks.
- **Admin:** Dense, high-utility, and authoritative for platform-wide oversight.

The system utilizes a refined balance of whitespace, subtle borders, and intentional color accents to maintain a "single product" feel across these three distinct experiences.

---

## Colors

The color palette is functionally driven to distinguish user roles and communicate system states instantly.

### Primary Colors
- **Primary (Sky Blue):** `#006591` - Used for primary actions, active navigation states, and brand-heavy elements
- **Primary Container:** `#0ea5e9` - Lighter variant for backgrounds
- **On Primary:** `#ffffff` - Text on primary color
- **On Primary Container:** `#003751` - Text on primary container

### Accent Colors
- **Secondary (Orange):** `#9d4300` - Reserved for high-conversion CTAs
- **Secondary Container:** `#fd761a` - Lighter orange for backgrounds
- **Tertiary:** `#8a5100` - Supporting accent
- **Tertiary Container:** `#de8712`

### Neutral Colors
- **Background:** `#f8f9ff`
- **Surface:** `#f8f9ff`
- **Surface Muted:** `#F8FAFC`
- **Surface Container:** `#e5eeff`
- **On Surface:** `#0b1c30`
- **On Surface Variant:** `#3e4850`

### Status Colors (Universal across all roles)
- **Pending:** `#F59E0B` (Amber)
- **Confirmed:** `#10B981` (Emerald)
- **Cancelled:** `#F43F5E` (Rose)
- **Inactive:** `#94A3B8` (Slate)

### Error Colors
- **Error:** `#ba1a1a`
- **On Error:** `#ffffff`
- **Error Container:** `#ffdad6`
- **On Error Container:** `#93000a`

### Admin-Specific
- **Admin Sidebar Background:** `#0F172A` - Deep dark for "Mode Operator" visual cue

### Border & Outline
- **Outline:** `#6e7881`
- **Outline Variant:** `#bec8d2`

---

## Typography

Font Family: **Plus Jakarta Sans** (contemporary, friendly, yet professional)

### Display
- **Display Large:**
  - Font Size: 40px
  - Font Weight: 700
  - Line Height: 48px
  - Letter Spacing: -0.02em
  
- **Display Large Mobile:**
  - Font Size: 32px
  - Font Weight: 700
  - Line Height: 40px
  - Letter Spacing: -0.02em

### Headlines
- **Headline Medium:**
  - Font Size: 28px
  - Font Weight: 600
  - Line Height: 36px

- **Headline Small:**
  - Font Size: 20px
  - Font Weight: 600
  - Line Height: 28px

### Body
- **Body Large:**
  - Font Size: 16px
  - Font Weight: 400
  - Line Height: 24px

- **Body Medium:**
  - Font Size: 14px
  - Font Weight: 400
  - Line Height: 20px

### Labels
- **Label Medium:**
  - Font Size: 13px
  - Font Weight: 500
  - Line Height: 18px
  - Letter Spacing: 0.01em

- **Label Small:**
  - Font Size: 12px
  - Font Weight: 600
  - Line Height: 16px

---

## Layout & Spacing

### Container & Grid
- **Container Max Width:** 1280px (centered for Traveler & Public)
- **Gutter:** 1.5rem (24px)
- **Mobile Margin:** 1rem (16px)
- **Sidebar Width:** 260px (for Organizer & Admin)

### Spacing Scale (8px base unit)
- **Stack Small:** 0.5rem (8px)
- **Stack Medium:** 1rem (16px)
- **Stack Large:** 2rem (32px)

### Breakpoints
- **Mobile:** < 640px - Single column, 16px side margins
- **Tablet:** 640px - 1024px - 2-column grids, collapsible sidebars
- **Desktop:** > 1024px - Full 12-column layouts, permanent sidebars

### Layout Strategy by Role
- **Traveler & Public:** Fixed-width container (1280px) centered
- **Organizer & Admin:** Fluid grid with fixed 260px sidebar

---

## Border Radius (Rounded)

- **Small:** 0.25rem (4px)
- **Default:** 0.5rem (8px)
- **Medium:** 0.75rem (12px)
- **Large:** 1rem (16px)
- **XL:** 1.5rem (24px)
- **Full:** 9999px (pill shape for badges)

---

## Elevation & Depth

Visual hierarchy through **Tonal Layers** and **Ambient Shadows**

### Shadow Levels
- **Level 0 (Background):** Base layer `#F8FAFC`
- **Level 1 (Cards/Surfaces):** White + soft shadow (Blur: 10px, Opacity: 0.05)
- **Level 2 (Modals/Popovers):** Pronounced shadow (Blur: 20px, Opacity: 0.1) + 1px border `#E2E8F0`

### Admin Specifics
Use flat, low-contrast outlines for data tables (utilitarian feel)

---

## Components

### Buttons
- **Primary:** Sky Blue background (#006591), white text
- **Accent:** Orange background (#fd761a), white text (High-priority CTA only)
- **Outline/Ghost:** For secondary actions (Cancel, View Details)
- **States:** 
  - Disabled: 50% opacity
  - Loading: Include spinner

### Chips & Badges
- **Status Badges:** 10% opacity background of status color with high-contrast text
  - Example: Emerald text on Light Emerald background
- **Role Badges:** Small labels in topbar/sidebar for session role
- **Shape:** Pill-shaped (full rounding)

### Inputs & Forms
- **Input Fields:** Clean borders with primary-blue focus ring
- **Loading States:** Use skeleton loaders
- **Validation:** Error state with error color

### Tables
- **Optimized For:** Density in Admin role
- **Features:** Sticky headers, row-hover highlights
- **Purpose:** Track data across wide screens

### Cards
- **Trip Card:**
  - Large image
  - Price in bottom right
  - Prominent status badge
  - Rounded corners (0.5rem)

- **Stat Card:** (Dashboard)
  - Large numerical value
  - Small icon
  - Descriptive label

### Feedback
- **Empty States:**
  - Centered illustration
  - Descriptive H3 heading
  - Clear CTA button

- **Toasts:**
  - Bottom-right corner
  - Success/error confirmations
  - Auto-dismiss or dismissible

---

## Design Principles by User Role

### Traveler Interface
- Light, airy, visual-heavy
- Inspire exploration
- Large imagery for trips
- Spacious layouts

### Organizer Interface
- Structured and clean
- Efficiency-focused
- Clear data presentation
- Management-oriented

### Admin Interface
- Dense, high-utility
- Authoritative feel
- Dark sidebar (#0F172A)
- Data-heavy tables
- Comprehensive oversight tools

---

## Implementation Notes

1. **Font Loading:** Use Google Fonts CDN or self-host Plus Jakarta Sans
2. **Color Variables:** Implement as CSS custom properties or Tailwind config
3. **Responsive:** Mobile-first approach with breakpoint-specific layouts
4. **Accessibility:** Ensure color contrast ratios meet WCAG AA standards
5. **Component Library:** Use shadcn/ui as base, customize with design tokens
# 🎨 CSS Reference Guide

Complete guide to all CSS classes and variables available in the system.

---

## Color Variables

```css
:root {
  /* Primary Colors */
  --primary: #0ea5e9;           /* Sky Blue */
  --primary-dark: #0284c7;      /* Darker Blue */
  --primary-light: #38bdf8;     /* Lighter Blue */
  
  /* Secondary Colors */
  --secondary: #a855f7;         /* Purple */
  --secondary-dark: #9333ea;    /* Darker Purple */
  --secondary-light: #c084fc;   /* Lighter Purple */
  
  /* Neutral Colors */
  --dark: #0f172a;              /* Very Dark */
  --dark-secondary: #1e293b;    /* Dark Secondary */
  --light: #f8fafc;             /* Very Light */
  --light-secondary: #e2e8f0;   /* Light Secondary */
  --gray: #94a3b8;              /* Gray */
  --gray-light: #cbd5e1;        /* Light Gray */
  
  /* Status Colors */
  --success: #10b981;           /* Green */
  --danger: #ef4444;            /* Red */
  --warning: #f59e0b;           /* Amber */
  --info: #3b82f6;              /* Blue */
}
```

---

## Spacing Scale

```css
--spacing-xs: 0.25rem    (4px)
--spacing-sm: 0.5rem     (8px)
--spacing-md: 1rem       (16px)
--spacing-lg: 1.5rem     (24px)
--spacing-xl: 2rem       (32px)
--spacing-2xl: 3rem      (48px)
--spacing-3xl: 4rem      (64px)
```

---

## Border Radius Scale

```css
--radius-sm: 0.375rem   (6px)
--radius-md: 0.5rem     (8px)
--radius-lg: 0.75rem    (12px)
--radius-xl: 1rem       (16px)
--radius-2xl: 1.5rem    (24px)
--radius-full: 9999px   (Pill-shaped)
```

---

## Shadow Scale

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1)
--shadow-2xl: 0 25px 50px -12px rgba(0,0,0,0.25)
--shadow-glow: 0 0 30px rgba(14,165,233,0.3)
```

---

## Layout Classes

### Flexbox

```css
.flex              /* display: flex */
.flex-center       /* flex + center align & justify */
.flex-between      /* flex + space-between */
.flex-col          /* flex + flex-direction: column */
```

### Grid

```css
.grid              /* display: grid */
.grid-2            /* 2 columns (responsive) */
.grid-3            /* 3 columns (responsive) */
.grid-4            /* 4 columns (responsive) */
```

### Container

```css
.container         /* max-width: 1280px + auto margin */
```

---

## Button Classes

### Variants

```css
.btn               /* Base button styles */
.btn-primary       /* Blue gradient button */
.btn-secondary     /* Purple gradient button */
.btn-outline       /* Bordered button */
.btn-ghost         /* Transparent button */
.btn-success       /* Green button */
.btn-danger        /* Red button */
```

### Sizes

```css
.btn-sm            /* Small button (12px padding) */
.btn (default)     /* Medium button (16px padding) */
.btn-lg            /* Large button (24px padding) */
```

### States

```css
.btn:hover         /* Hover state (elevated) */
.btn:active        /* Active state (pressed) */
.btn:disabled      /* Disabled state (faded) */
.btn-full          /* Full width button */
```

---

## Card Classes

```css
.card              /* Base card styling */
.card:hover        /* Hover: shadow lift + border color change */
.card-interactive  /* Interactive card (cursor pointer) */
.card-interactive:hover  /* Hover: translateY(-4px) */

.card-header       /* Card title styling */
.card-body         /* Card content styling */
.card-footer       /* Card footer styling */
```

---

## Input Classes

### Input Elements

```css
.form-group        /* Form group container */
.form-group label  /* Form label styling */
.input-field       /* Input, textarea, select styling */
```

### States

```css
.input-field:focus /* Focus state (blue border + shadow) */
.input-field:hover /* Hover state (light border) */
.input-field.error /* Error state (red border) */
.input-field.success /* Success state (green border) */
.input-field:disabled /* Disabled state (faded) */
```

### Feedback

```css
.form-error        /* Error message styling (red) */
.form-success      /* Success message styling (green) */
```

---

## Navigation Classes

```css
.navbar            /* Navigation bar container */
.navbar-container  /* Navigation flex container */
.navbar-brand      /* Logo/brand styling */
.nav-links         /* Navigation links list */
.nav-link          /* Individual link */
.nav-link::after   /* Underline animation */
.nav-link:hover    /* Hover state */
.nav-link.active   /* Active link state */
.nav-toggle        /* Mobile menu toggle button */
```

---

## Typography Classes

### Headings

```css
h1, h2, h3, h4, h5, h6  /* Responsive headings with clamp() */
```

### Text Utilities

```css
.text-muted        /* Gray text (#94a3b8) */
.text-small        /* Small text (0.875rem) */
.text-large        /* Large text (1.125rem) */
.text-center       /* Center aligned text */
.text-right        /* Right aligned text */
.gradient-text     /* Gradient text effect */
```

---

## Badge Classes

```css
.badge             /* Base badge styling */
.badge-primary     /* Blue badge */
.badge-secondary   /* Purple badge */
.badge-success     /* Green badge */
.badge-danger      /* Red badge */
.badge-warning     /* Amber badge */
.badge-info        /* Blue badge (alternate) */
```

---

## Alert Classes

```css
.alert             /* Base alert styling */
.alert-primary     /* Blue alert */
.alert-secondary   /* Purple alert */
.alert-success     /* Green alert */
.alert-danger      /* Red alert */
.alert-warning     /* Amber alert */
.alert-info        /* Blue alert (alternate) */

.alert-content     /* Alert flex container */
.alert-message     /* Alert message container */
.alert-title       /* Alert title styling */
.alert-text        /* Alert text styling */
.alert-close       /* Close button styling */
```

---

## Loading & Skeleton Classes

```css
.skeleton          /* Shimmer animation */
.skeleton-text     /* Text skeleton (height: 1rem) */
.skeleton-avatar   /* Avatar skeleton (circular) */
.loader            /* Rotating loader spinner */
```

---

## Table Classes

```css
.table             /* Table styling */
.table thead       /* Table header styling */
.table th          /* Table header cell styling */
.table td          /* Table cell styling */
.table tbody tr:hover  /* Row hover effect */
```

---

## Modal Classes

```css
.modal-overlay     /* Full screen overlay */
.modal             /* Modal dialog box */
.modal-header      /* Modal header */
.modal-title       /* Modal title */
.modal-close       /* Close button */
.modal-body        /* Modal content */
.modal-footer      /* Modal footer */
```

---

## Animation Classes

### Entrance Animations

```css
.animate-fade-in           /* Opacity animation (0.5s) */
.animate-fade-out          /* Opacity fade out (0.5s) */
.animate-slide-in-up       /* Slide up + fade (0.6s) */
.animate-slide-in-down     /* Slide down + fade (0.6s) */
.animate-slide-in-left     /* Slide left + fade (0.6s) */
.animate-slide-in-right    /* Slide right + fade (0.6s) */
.animate-scale-in          /* Scale up + fade (0.4s) */
```

### Continuous Animations

```css
.animate-bounce     /* Bouncing effect (1s loop) */
.animate-pulse      /* Pulsing opacity (2s loop) */
.animate-float      /* Floating effect (3s loop) */
```

---

## Spacing Utilities

### Margin Top
```css
.mt-1  /* margin-top: 0.5rem (8px) */
.mt-2  /* margin-top: 1rem (16px) */
.mt-3  /* margin-top: 1.5rem (24px) */
.mt-4  /* margin-top: 2rem (32px) */
```

### Margin Bottom
```css
.mb-1  /* margin-bottom: 0.5rem (8px) */
.mb-2  /* margin-bottom: 1rem (16px) */
.mb-3  /* margin-bottom: 1.5rem (24px) */
.mb-4  /* margin-bottom: 2rem (32px) */
```

### Padding
```css
.p-1  /* padding: 0.5rem (8px) */
.p-2  /* padding: 1rem (16px) */
.p-3  /* padding: 1.5rem (24px) */
.p-4  /* padding: 2rem (32px) */
```

### Gap
```css
.gap-1  /* gap: 0.5rem (8px) */
.gap-2  /* gap: 1rem (16px) */
.gap-3  /* gap: 1.5rem (24px) */
.gap-4  /* gap: 2rem (32px) */
```

---

## Responsive Utilities

### Visibility

```css
.hidden        /* display: none */
.visible       /* display: block */
.hide-mobile   /* hidden on screens < 768px */
.hide-desktop  /* hidden on screens > 768px */
```

### Responsive Grid

```css
/* At mobile: 1 column */
/* At tablet: changes based on class */
/* At desktop: full columns */
.grid-2   /* 2 columns on desktop */
.grid-3   /* 3 columns on desktop */
.grid-4   /* 4 columns on desktop */
```

---

## Responsive Breakpoints

```css
Mobile:        < 480px
Tablet:        480px - 768px
Desktop:       768px - 1024px
Large Desktop: > 1024px
```

---

## Keyframe Animations

```css
@keyframes fadeIn
@keyframes fadeOut
@keyframes slideInUp
@keyframes slideInDown
@keyframes slideInLeft
@keyframes slideInRight
@keyframes scaleIn
@keyframes bounce
@keyframes pulse
@keyframes shimmer
@keyframes gradient-shift
@keyframes rotate
@keyframes float
```

---

## Transition Variables

```css
--transition:      all 0.3s cubic-bezier(0.4, 0, 0.2, 1)  /* Default */
--transition-fast: all 0.15s ease-in-out                   /* Fast */
--transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1)  /* Slow */
```

---

## Special Classes

```css
.gradient-text    /* Gradient text effect (primary to secondary) */
.btn-full         /* Full width button */
.text-responsive  /* Responsive font sizing with clamp() */
.transition-smooth /* Apply smooth transition */
```

---

## Dark Mode

All components automatically support dark mode:

```css
@media (prefers-color-scheme: dark) {
  /* Dark theme colors automatically applied */
}
```

---

## Accessibility

```css
.focus-visible  /* Keyboard focus state (ring + offset) */

@media (prefers-reduced-motion: reduce) {
  /* All animations disabled */
}
```

---

## Print Styles

```css
@media print {
  .no-print    /* Hidden when printing */
  body         /* White background, no styling */
  .btn         /* Border instead of background */
}
```

---

## Examples

### Using Multiple Classes
```html
<!-- Centered, animated card with gradient text -->
<div class="flex-center p-4 card animate-scale-in">
  <h2 class="gradient-text text-responsive">Hello World</h2>
</div>
```

### Responsive Grid Layout
```html
<!-- 4 columns on desktop, 1 on mobile -->
<div class="grid-4 gap-3 mt-4">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
  <div class="card">Item 4</div>
</div>
```

### Form with Validation
```html
<div class="form-group">
  <label>Email</label>
  <input class="input-field error" />
  <span class="form-error">Invalid email</span>
</div>
```

### Button Group
```html
<div class="flex gap-2">
  <button class="btn btn-primary">Save</button>
  <button class="btn btn-outline">Cancel</button>
</div>
```

---

**Last Updated**: June 30, 2026
**Version**: 1.0

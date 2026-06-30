# 🚀 Quick Reference Card

## Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd frontend
npm install
npm run dev
```

### Step 2: Import Components
```jsx
import { Button, Card, Input, Alert, Badge } from './components';
import { motion } from 'framer-motion';
```

### Step 3: Use in Your Page
```jsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  <Card>
    <h2>Hello World</h2>
    <Input label="Name" required />
    <Button variant="primary">Click Me</Button>
  </Card>
</motion.div>
```

---

## Component Cheat Sheet

### Button
```jsx
<Button variant="primary" size="lg" loading={false}>Click</Button>
// Variants: primary, secondary, outline, ghost, success, danger
// Sizes: sm, md, lg
```

### Input
```jsx
<Input 
  label="Email" 
  type="email" 
  error={errors.email}
  required 
/>
```

### Card
```jsx
<Card interactive onClick={() => {}}>
  Content here
</Card>
```

### Alert
```jsx
<Alert type="success" title="Success!" message="Done" />
// Types: primary, secondary, success, danger, warning, info
```

### Badge
```jsx
<Badge variant="success">Active</Badge>
// Variants: primary, secondary, success, danger, warning, info
```

---

## CSS Utility Classes

### Grid
```html
<div class="grid-2"><!-- 2 columns responsive --></div>
<div class="grid-3"><!-- 3 columns responsive --></div>
<div class="grid-4"><!-- 4 columns responsive --></div>
```

### Flexbox
```html
<div class="flex"><!-- flex layout --></div>
<div class="flex-center"><!-- centered --></div>
<div class="flex-between"><!-- space between --></div>
<div class="flex-col"><!-- column direction --></div>
```

### Spacing
```html
<div class="mt-2 mb-3 p-4 gap-2">Content</div>
<!-- mt: margin-top | mb: margin-bottom | p: padding | gap: flex/grid gap -->
```

### Animations
```html
<div class="animate-fade-in">Fades in</div>
<div class="animate-slide-in-up">Slides up</div>
<div class="animate-scale-in">Scales in</div>
<div class="animate-bounce">Bounces</div>
```

### Text
```html
<h1>Large Heading (responsive)</h1>
<p class="text-muted">Gray text</p>
<span class="gradient-text">Gradient text</span>
```

---

## Color Palette

| Color | Hex | CSS Variable |
|-------|-----|--------------|
| Primary | #0ea5e9 | `--primary` |
| Secondary | #a855f7 | `--secondary` |
| Success | #10b981 | `--success` |
| Danger | #ef4444 | `--danger` |
| Warning | #f59e0b | `--warning` |
| Info | #3b82f6 | `--info` |

---

## Animation Classes

```css
/* Entrance */
.animate-fade-in
.animate-slide-in-up
.animate-slide-in-down
.animate-slide-in-left
.animate-slide-in-right
.animate-scale-in

/* Continuous */
.animate-bounce
.animate-pulse
.animate-float
```

---

## Responsive Breakpoints

```
Mobile: < 480px
Tablet: 480px - 768px
Desktop: 768px - 1024px
Large: > 1024px
```

---

## Framer Motion Quick Tips

### Page Entrance
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Hover Animation
```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### Staggered List
```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id}>{item}</motion.div>
  ))}
</motion.div>
```

---

## Form Validation Pattern

```jsx
const [formData, setFormData] = useState({ name: '', email: '' });
const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!formData.name) newErrors.name = 'Required';
  if (!formData.email.includes('@')) newErrors.email = 'Invalid';
  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validate();
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  // Submit form
};

return (
  <form onSubmit={handleSubmit}>
    <Input
      label="Name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      error={errors.name}
    />
    <Button type="submit">Submit</Button>
  </form>
);
```

---

## File Structure

```
frontend/
├── src/
│   ├── components/        (5 reusable components)
│   ├── pages/             (Update your pages)
│   ├── admin/             (Update admin pages)
│   ├── store/             (Zustand store)
│   ├── App.jsx            (Updated with animations)
│   ├── App.css            (Updated styling)
│   ├── index.css          (2000+ lines of professional CSS)
│   └── main.jsx
├── package.json           (Updated dependencies)
├── UI_DESIGN_GUIDE.md
├── IMPLEMENTATION_GUIDE.md
├── CSS_REFERENCE.md
└── README_MODERNIZATION.md
```

---

## Customization

### Change Colors
Edit `src/index.css`:
```css
:root {
  --primary: #YOUR_COLOR;
  --secondary: #YOUR_COLOR;
}
```

### Change Spacing
```css
:root {
  --spacing-md: 1.2rem;  /* Increase default spacing */
}
```

### Change Border Radius
```css
:root {
  --radius-lg: 1.25rem;  /* Larger rounded corners */
}
```

---

## Common Patterns

### Form Page
```jsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  <Card>
    {error && <Alert type="danger" message={error} />}
    <form onSubmit={handleSubmit}>
      <Input label="..." required />
      <Button type="submit" loading={loading}>Submit</Button>
    </form>
  </Card>
</motion.div>
```

### Grid Layout
```jsx
<div class="grid-3 gap-4">
  {items.map(item => (
    <Card interactive key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </Card>
  ))}
</div>
```

### Loading State
```jsx
<Button loading={loading} disabled={loading}>
  {loading ? 'Loading...' : 'Click Me'}
</Button>
```

---

## Testing Checklist

- [ ] Test on mobile (< 480px)
- [ ] Test on tablet (480px - 768px)
- [ ] Test on desktop (> 768px)
- [ ] Test dark mode
- [ ] Test keyboard navigation
- [ ] Test animations (should be smooth)
- [ ] Test form validation
- [ ] Test loading states

---

## Documentation Links

📖 **UI_DESIGN_GUIDE.md** - Complete component guide
📖 **IMPLEMENTATION_GUIDE.md** - Step-by-step updates
📖 **CSS_REFERENCE.md** - All CSS classes & variables
📖 **README_MODERNIZATION.md** - Full overview

---

**Print this card and keep it handy! 📌**

**Version 1.0 | June 30, 2026**

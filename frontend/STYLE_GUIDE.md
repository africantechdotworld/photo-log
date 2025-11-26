# PhotoLog Frontend Style Guide

This style guide documents the design patterns, components, and styling conventions used throughout the PhotoLog frontend application. Use this guide when creating new components to ensure consistency with the existing design system.

## Color Palette

### Primary Colors

- **Deep Green** (`#1a4d2e`)
  - Default: `bg-deep-green`, `text-deep-green`
  - Light: `bg-deep-green-light` (`#2d5f3e`)
  - Dark: `bg-deep-green-dark` (`#0f3a1f`)
  - Usage: Primary buttons, links, brand elements, page backgrounds

- **Cream** (`#f5f0e8`)
  - Default: `bg-cream`, `text-cream`
  - Light: `bg-cream-light` (`#faf8f4`)
  - Dark: `bg-cream-dark` (`#e8e0d4`)
  - Usage: Main content containers, card backgrounds, form backgrounds

### Accent Colors

- **Emerald** (`#50C878`)
  - Default: `bg-emerald`, `text-emerald`
  - Usage: Success states, positive indicators, secondary actions

- **Deep Gold** (`#D4AF37`)
  - Default: `bg-deep-gold`, `text-deep-gold`
  - Usage: Highlights, badges, admin indicators, special elements

- **Gold** (`#FFD700`)
  - Default: `bg-gold`, `text-gold`
  - Usage: Premium features, shimmer effects

- **Teal Brown** (`#5f8a7f`)
  - Default: `bg-teal-brown`, `text-teal-brown`
  - Usage: Secondary elements, storage indicators

### Neutral Colors

- **Black/Text**: `text-black` for primary text
- **Black/Opacity**: `text-black/70` for secondary text, `text-black/60` for tertiary text, `text-black/50` for subtle text
- **Borders**: `border-black/10` for light borders, `border-black/5` for very light borders
- **White**: `bg-white` for card backgrounds, form inputs

### Status Colors

- **Error**: `bg-red-50`, `border-red-200`, `text-red-700`
- **Success**: `bg-emerald/10`, `text-emerald`

## Typography

### Font Family

- **Primary**: Stack Sans Text (fallback: sans-serif)
- Applied globally via Tailwind config

### Heading Sizes

- **H1**: `text-3xl sm:text-4xl lg:text-5xl` (page titles)
- **H2**: `text-2xl sm:text-3xl lg:text-4xl` (section titles)
- **H3**: `text-xl sm:text-2xl` (subsection titles)
- **H4**: `text-lg sm:text-xl` (card titles)

### Body Text

- **Large**: `text-base sm:text-lg lg:text-xl` (hero text, descriptions)
- **Default**: `text-base sm:text-lg` (body text)
- **Small**: `text-sm sm:text-base` (labels, captions)
- **Extra Small**: `text-xs sm:text-sm` (metadata, badges)

### Font Weights

- **Bold**: `font-bold` (headings, emphasis)
- **Semibold**: `font-semibold` (buttons, important text)
- **Medium**: `font-medium` (labels, links)
- **Regular**: Default weight (body text)

### Text Colors

- **Primary**: `text-black`
- **Secondary**: `text-black/70`
- **Tertiary**: `text-black/60`
- **Subtle**: `text-black/50`
- **On Dark**: `text-white` or `text-cream`

## Layout Patterns

### Page Structure

All pages follow this structure:

```jsx
<div className="min-h-screen bg-deep-green">
  <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-6 lg:py-12">
    <div className="overflow-hidden rounded-2xl bg-cream sm:rounded-3xl">
      {/* Navigation */}
      <nav className="px-4 py-3 border-b sm:px-6 sm:py-4 lg:px-12 lg:py-6 border-cream-dark/20">
        {/* Navigation content */}
      </nav>
      
      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
        {/* Page content */}
      </div>
    </div>
  </div>
</div>
```

### Container Sizes

- **Max Width**: `max-w-7xl` (main container)
- **Content Width**: `max-w-md` (forms), `max-w-2xl` (centered content)

### Spacing Scale

- **Padding**: `px-4 py-4` (mobile) → `sm:px-6 sm:py-6` → `lg:px-8 lg:py-8` or `lg:px-12 lg:py-12`
- **Gaps**: `gap-3 sm:gap-4` or `gap-4 sm:gap-6 lg:gap-8`
- **Margins**: `mb-4 sm:mb-6` or `mb-8 sm:mb-10 lg:mb-12`

### Border Radius

- **Small**: `rounded-lg` (buttons, small cards)
- **Medium**: `rounded-xl` (cards, inputs)
- **Large**: `rounded-2xl` (main containers on mobile)
- **Extra Large**: `sm:rounded-3xl` (main containers on desktop)

## Component Patterns

### Buttons

#### Primary Button

```jsx
<button className="px-6 py-3 text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark focus:outline-none focus:ring-2 focus:ring-deep-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
  Button Text
</button>
```

#### Secondary Button

```jsx
<button className="px-6 py-3 text-base font-semibold text-black rounded-xl border-2 transition-colors sm:py-4 border-black/10 sm:text-lg hover:bg-cream-dark">
  Button Text
</button>
```

#### Icon Button

```jsx
<button className="rounded-lg p-2 text-black/60 transition-colors hover:bg-cream-dark hover:text-black">
  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
</button>
```

#### Button with Icon

```jsx
<button className="inline-flex gap-2 items-center px-6 py-3 text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark">
  <Icon className="w-5 h-5" />
  <span>Button Text</span>
</button>
```

### Form Inputs

#### Text Input

```jsx
<input
  className="px-4 py-3 w-full text-black bg-white rounded-xl border transition-all border-black/10 placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
  placeholder="Placeholder text"
/>
```

#### Label

```jsx
<label className="block mb-2 text-sm font-medium text-black sm:text-base">
  Label Text
</label>
```

#### Checkbox

```jsx
<input
  type="checkbox"
  className="mt-1 w-4 h-4 rounded border-black/20 text-deep-green focus:ring-2 focus:ring-deep-green focus:ring-offset-0"
/>
```

#### Error Message

```jsx
<div className="p-3 rounded-xl bg-red-50 border border-red-200">
  <p className="text-sm text-red-700">{error}</p>
</div>
```

### Cards

#### Stat Card

```jsx
<div className="p-4 bg-white rounded-xl border sm:p-6 sm:rounded-2xl border-black/5">
  <div className="flex justify-between items-center">
    <div>
      <p className="text-xs font-medium sm:text-sm text-black/60">Label</p>
      <p className="mt-1 text-2xl font-bold text-black sm:text-3xl">Value</p>
    </div>
    <div className="p-2 rounded-lg sm:p-3 bg-deep-green/10">
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-deep-green" />
    </div>
  </div>
</div>
```

#### Content Card

```jsx
<div className="overflow-hidden bg-white rounded-xl border transition-shadow sm:rounded-2xl border-black/5 hover:shadow-lg">
  {/* Card content */}
</div>
```

#### Card with Light Background

```jsx
<div className="rounded-xl border border-cream-dark/30 bg-cream-light p-5 sm:p-6">
  {/* Card content */}
</div>
```

### Navigation

#### Header Navigation

```jsx
<nav className="px-4 py-3 border-b sm:px-6 sm:py-4 lg:px-12 lg:py-6 border-cream-dark/20">
  <div className="flex gap-2 justify-between items-center sm:gap-4">
    <Link to="/" className="flex-shrink-0 text-lg font-bold text-black sm:text-xl lg:text-2xl">
      PhotoLog
    </Link>
    <div className="flex gap-3 items-center sm:gap-4">
      {/* Navigation items */}
    </div>
  </div>
</nav>
```

#### Navigation Link

```jsx
<Link
  to="/path"
  className="px-2 text-xs font-medium text-black whitespace-nowrap transition-colors sm:text-sm lg:text-base hover:text-deep-green sm:px-0"
>
  Link Text
</Link>
```

### Badges and Status Indicators

#### Status Badge

```jsx
<span className={`rounded-lg px-2 py-1 text-xs font-medium ${
  status === 'active' 
    ? 'bg-emerald/10 text-emerald' 
    : 'bg-black/10 text-black/70'
}`}>
  {status}
</span>
```

#### Admin Badge

```jsx
<div className="rounded-lg border border-deep-gold/30 bg-gold/10 px-2 py-1">
  <span className="text-xs font-semibold text-deep-gold sm:text-sm">ADMIN</span>
</div>
```

### Loading States

#### Page Loading

```jsx
<div className="flex justify-center items-center min-h-screen bg-deep-green">
  <div className="text-center">
    <div className="inline-block w-8 h-8 rounded-full border-4 border-solid animate-spin border-cream border-r-transparent"></div>
    <p className="mt-4 text-cream">Loading...</p>
  </div>
</div>
```

#### Content Loading

```jsx
<div className="py-12 text-center bg-white rounded-xl border sm:py-16 lg:py-20 sm:rounded-2xl border-black/5">
  <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-deep-green/10 text-deep-green">
    <Icon className="w-8 h-8 animate-pulse" />
  </div>
  <h3 className="mb-2 text-lg font-bold text-black sm:text-xl">Loading...</h3>
</div>
```

### Empty States

```jsx
<div className="py-12 text-center bg-white rounded-xl border sm:py-16 lg:py-20 sm:rounded-2xl border-black/5">
  <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-deep-green/10 text-deep-green">
    <Icon className="w-8 h-8" />
  </div>
  <h3 className="mb-2 text-lg font-bold text-black sm:text-xl">No items yet</h3>
  <p className="mb-6 text-base text-black/60 sm:text-lg">Description text</p>
  <button className="inline-flex gap-2 items-center px-6 py-3 text-base font-semibold text-white rounded-xl transition-colors sm:py-4 bg-deep-green sm:text-lg hover:bg-deep-green-dark">
    <Icon className="w-5 h-5" />
    Action Button
  </button>
</div>
```

### Success States

```jsx
<div className="flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
  <div className="mx-auto w-full max-w-2xl text-center">
    <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full bg-emerald/10 text-emerald">
      <CheckIcon className="w-8 h-8" />
    </div>
    <h1 className="mb-3 text-3xl font-bold text-black sm:text-4xl lg:text-5xl sm:mb-4">
      Success Title
    </h1>
    <p className="mb-8 text-base leading-relaxed sm:text-lg text-black/70 sm:mb-10">
      Success message
    </p>
  </div>
</div>
```

## Icons

### Icon Library

- **Library**: Heroicons (outline version)
- **Import**: `import { IconName } from '@heroicons/react/24/outline'`

### Icon Sizes

- **Small**: `h-4 w-4` (inline with text)
- **Medium**: `h-5 w-5` (buttons, links)
- **Large**: `h-6 w-6 sm:h-8 sm:w-8` (feature icons, stat cards)
- **Extra Large**: `h-8 w-8` (empty states, success states)

### Icon Usage

- Always use outline version unless filled is specifically needed
- Icons should match text color or use appropriate color classes
- Use semantic icons that match the action or content

## Responsive Design

### Breakpoints

- **Mobile**: Default (no prefix)
- **Small**: `sm:` (640px+)
- **Large**: `lg:` (1024px+)

### Responsive Patterns

- **Text Sizes**: Always scale up on larger screens
  - Example: `text-base sm:text-lg lg:text-xl`

- **Spacing**: Increase padding/margins on larger screens
  - Example: `px-4 py-4 sm:px-6 sm:py-6 lg:px-12 lg:py-12`

- **Grid Layouts**: Stack on mobile, grid on desktop
  - Example: `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`

- **Visibility**: Hide/show elements based on screen size
  - Example: `hidden sm:flex` or `lg:hidden`

## Image Patterns

### Image Containers

```jsx
<div className="aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl">
  <img
    src="image.jpg"
    alt="Description"
    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
  />
</div>
```

### Common Aspect Ratios

- **Square**: `aspect-square`
- **4:3**: `aspect-[4/3]`
- **16:9**: `aspect-[16/9]`
- **4:5**: `aspect-[4/5]`

## Special Effects

### Gold Shimmer

Use the `.gold-shimmer` utility class for animated gold shimmer effects:

```jsx
<button className="gold-shimmer px-6 py-3 text-white rounded-xl">
  Premium Feature
</button>
```

### Hover Effects

- **Scale on Hover**: `transition-transform duration-300 hover:scale-105` (images)
- **Shadow on Hover**: `transition-shadow hover:shadow-lg` (cards)
- **Color Transitions**: `transition-colors hover:bg-deep-green-dark` (buttons)

## Common Patterns

### Two-Column Layout

```jsx
<div className="grid gap-6 px-4 py-8 lg:grid-cols-2 sm:gap-8 lg:gap-12 sm:px-6 lg:px-12 sm:py-12 lg:py-16">
  <div className="flex flex-col justify-center order-2 lg:order-1">
    {/* Left content */}
  </div>
  <div className="order-1 lg:order-2">
    {/* Right content */}
  </div>
</div>
```

### Stats Grid

```jsx
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
  {/* Stat cards */}
</div>
```

### Divider

```jsx
<div className="relative my-6 sm:my-8">
  <div className="flex absolute inset-0 items-center">
    <div className="w-full border-t border-black/10"></div>
  </div>
  <div className="flex relative justify-center text-sm">
    <span className="px-4 bg-cream text-black/50">Or continue with</span>
  </div>
</div>
```

## Best Practices

1. **Consistency**: Always use the established color palette and spacing scale
2. **Responsive First**: Design mobile-first, then enhance for larger screens
3. **Accessibility**: Use semantic HTML, proper contrast ratios, and focus states
4. **Performance**: Use appropriate image sizes and lazy loading
5. **Clean Design**: Avoid decorative elements, gradients (except gold shimmer), and emojis
6. **Icon Consistency**: Always use Heroicons outline version
7. **Spacing**: Use the spacing scale consistently (4, 6, 8, 12, 16, etc.)
8. **Typography**: Follow the heading and body text size patterns

## Quick Reference

### Common Class Combinations

- **Primary Button**: `px-6 py-3 text-base font-semibold text-white rounded-xl bg-deep-green hover:bg-deep-green-dark`
- **Secondary Button**: `px-6 py-3 text-base font-semibold text-black rounded-xl border-2 border-black/10 hover:bg-cream-dark`
- **Input Field**: `px-4 py-3 w-full text-black bg-white rounded-xl border border-black/10 focus:ring-2 focus:ring-deep-green`
- **Card**: `bg-white rounded-xl border border-black/5`
- **Page Container**: `min-h-screen bg-deep-green`
- **Content Container**: `px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8`
- **Cream Card**: `rounded-2xl bg-cream sm:rounded-3xl`


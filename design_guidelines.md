# Algorithm Complexity Comparison Platform - Design Guidelines

## Design Approach

**Selected Framework:** Design System Approach with data visualization focus
**Primary Inspiration:** Linear (typography/spacing), Observable (data presentation), Vercel (clean layouts)
**Design Philosophy:** Educational clarity meets professional precision - prioritize readability, visual hierarchy, and immediate comprehension of complex data.

## Typography System

**Font Stack:**
- Headings: Inter (weights: 600, 700)
- Body & UI: Inter (weights: 400, 500)
- Code/Algorithms: JetBrains Mono (weight: 400)

**Type Scale:**
- Page Title: text-4xl font-bold (desktop), text-3xl (mobile)
- Section Headers: text-2xl font-semibold
- Card Titles: text-xl font-semibold
- Algorithm Names: text-lg font-medium
- Body Text: text-base
- Metadata/Labels: text-sm
- Code Snippets: text-sm (monospace)
- Chart Labels: text-xs

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-16
- Card spacing: p-6
- Gap between elements: gap-4, gap-6, gap-8

**Container Strategy:**
- Max width: max-w-7xl
- Main content area: px-6 lg:px-8
- No full-bleed hero - start directly with functional interface

## Page Structure

### Header (Sticky)
- Logo/title on left
- Primary navigation (Algorithms, Benchmark, About)
- Subtle border-bottom for definition
- Height: h-16
- Background: Slightly elevated from page background

### Main Dashboard Layout (2-Column on Desktop)

**Left Sidebar (30% width, lg:w-80):**
- Algorithm selector with categorized groups
- Checkboxes for multi-select comparison
- Collapsible sections: Sorting Algorithms, Search Algorithms
- Configuration panel:
  - Dataset size slider (100-100,000)
  - Input type selector (Random, Sorted, Reverse)
  - Run Benchmark button (prominent, full-width)
- Each algorithm item shows complexity badge (O(n log n), O(n²))

**Main Content Area (70% width):**
- Benchmark results section (top)
- Large interactive chart area (center, min-h-96)
- Algorithm details cards grid (bottom, 2-3 columns)

### Component Library

**Algorithm Selector Item:**
- Checkbox + algorithm name + complexity badge
- Hover state: subtle background change
- Selected state: accent border-left indicator
- Compact height (h-10 to h-12)

**Benchmark Results Cards:**
- Grid layout (2-3 columns)
- Each card displays: Algorithm name, execution time (large, prominent), dataset size, theoretical complexity
- Visual ranking indicator (fastest gets accent highlight)
- Card structure: p-6, rounded-lg, border

**Chart Component:**
- Full-width container with responsive aspect ratio
- Multi-line chart with distinct line styles for each algorithm
- X-axis: Dataset size (logarithmic or linear scale option)
- Y-axis: Execution time (ms)
- Legend positioned top-right inside chart area
- Grid lines for readability
- Tooltips on hover showing exact values
- Responsive: maintains readability on tablet/mobile

**Complexity Explanation Cards:**
- Icon/visual indicator of complexity class
- Title: Algorithm name
- Subtitle: O-notation with plain English explanation
- Description: 2-3 sentences explaining when to use
- Code snippet preview (optional, expandable)
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

**Control Panel:**
- Range slider with visible value display
- Radio buttons for input type selection
- Grouped logically with labels
- Clear visual separation between control groups

**Run Benchmark Button:**
- Prominent size (h-12, text-base)
- Full-width in sidebar
- Loading state with spinner
- Disabled state when no algorithms selected

### Mobile Adaptations
- Stack sidebar above main content
- Collapsible sidebar toggle button
- Chart: reduce height, simplify legend placement
- Cards: single column stacking
- Maintain all functionality, optimize tap targets (min h-12)

## Interaction Patterns

**Progressive Disclosure:**
- Algorithm details expand on click
- Code examples shown in modal/drawer
- Chart data points revealed on hover

**Feedback:**
- Benchmark progress indicator (percentage + estimated time)
- Success/error states for operations
- Real-time chart updates during benchmark

**Data Visualization:**
- Smooth chart animations (duration-300)
- Color-coded algorithm lines (distinct, accessible)
- Clear axis labels and units
- Zoomable/pannable chart on desktop

## Content Density

- Balanced information density - not sparse, not cluttered
- White space used deliberately for grouping
- Visual breathing room around chart
- Compact but readable sidebar controls

## Accessibility

- High contrast text throughout
- Chart colors distinguishable for colorblind users
- Keyboard navigation for all controls
- ARIA labels for interactive elements
- Focus indicators on all interactive components

## Professional Polish

- Subtle shadows for elevation (shadow-sm, shadow-md)
- Rounded corners throughout (rounded-lg for cards, rounded-md for inputs)
- Consistent border treatment
- No distracting animations except chart rendering and loading states
- Clean, crisp visual hierarchy emphasizing data and results
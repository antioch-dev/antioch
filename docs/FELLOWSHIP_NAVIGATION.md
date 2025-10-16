# Fellowship Navigation System

This document describes the new navigation system for fellowship-level pages (`/[fellowship_id]/*`).

## Overview

The new navigation system provides:
- **Top Navigation Bar**: Sticky header with fellowship branding and quick access to tools
- **App Switcher Modal**: Organized grid view of all fellowship apps, categorized by function
- **Breadcrumb Navigation**: Shows current location within the fellowship site
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Components

### FellowshipNavigation Component

Location: `src/components/fellowship-navigation.tsx`

This is the main navigation component that wraps all fellowship pages. It includes:

1. **Header Bar**:
   - Fellowship logo and name
   - Current app indicator (desktop only)
   - App switcher button (grid icon)
   - Theme toggle
   - User menu

2. **Mobile Menu**:
   - Hamburger menu for mobile devices
   - Categorized list of all apps
   - Quick access to all fellowship features

3. **Breadcrumb Bar**:
   - Shows navigation path from fellowship home
   - Automatically generated from URL structure
   - Smart app name detection from configuration

### App Configuration

Location: `src/config/fellowship-apps.ts`

Defines all fellowship apps with metadata:
- App ID and name
- Description
- URL path
- Icon
- Category (Ministry, Management, Communication, Analytics)
- Theme color

**Categories:**
- **Ministry**: Bible, Prayer, Worship Music, Evangelism
- **Management**: Forms, Tasks, Leadership, Finance
- **Communication**: Polling, Q&A, Feedback
- **Analytics**: Sunday Analytics, Reports

## Usage

The navigation is automatically applied to all routes under `/[fellowship_id]/` through the layout file.

### Layout Integration

File: `src/app/[fellowship_id]/layout.tsx`

```tsx
import { FellowshipNavigation } from "@/components/fellowship-navigation"

export default async function Layout({ children, params }: LayoutProps) {
  const { fellowship_id } = await params

  return (
    <>
      <FellowshipNavigation 
        fellowshipId={fellowship_id} 
        fellowshipName="Fellowship Platform" 
      />
      <main className="min-h-screen bg-background">{children}</main>
      <Footer />
    </>
  )
}
```

### Adding New Apps

To add a new app to the navigation:

1. Add an entry to `fellowship-apps.ts`:

```typescript
{
  id: "new-app",
  name: "New App",
  description: "Description of the new app",
  href: `/${fellowshipId}/new-app`,
  icon: YourIcon,
  category: "ministry", // or "management", "communication", "analytics"
  color: "bg-blue-500",
}
```

2. The app will automatically appear in:
   - App switcher modal (categorized)
   - Mobile menu (categorized)
   - Breadcrumb navigation (when active)

## Features

### App Switcher Modal

- **Search**: Filter apps by name, description, or category
- **Grid Layout**: Visual cards with icons and descriptions
- **Categories**: Apps organized by function
- **Highlight**: Current app is highlighted
- **Responsive**: 2-column on mobile, 3-column on desktop

### Breadcrumb Navigation

- **Auto-generated**: Based on current URL path
- **Smart Labels**: Uses app names from configuration
- **Home Link**: Always includes fellowship home
- **Current Page**: Last breadcrumb is non-clickable
- **Clean URLs**: Handles URL segments gracefully

### Responsive Behavior

**Desktop (>768px)**:
- Horizontal navigation bar with all controls
- App switcher as modal dialog
- Breadcrumb always visible
- Current app indicator shown

**Mobile (<768px)**:
- Hamburger menu for app list
- Sheet/drawer from left side
- Categorized app list
- All features accessible

## Theme Support

The navigation fully supports light/dark theme switching via the ModeToggle component:
- Theme toggle button in header
- All colors adapt to current theme
- Accent colors maintain contrast

## Accessibility

- Semantic HTML with proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Focus management in modals
- High contrast support

## Future Enhancements

Potential improvements:
- User role-based app filtering
- Recently accessed apps section
- Favorites/pinned apps
- Notification badges per app
- Custom fellowship branding (logo upload)
- Search across all apps (not just app switcher)

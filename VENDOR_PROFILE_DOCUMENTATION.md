# Vendor Profile Pages Documentation

## Overview

The **Vendor Profile Pages** feature provides a comprehensive marketing platform for vendors to showcase their services, portfolio, reviews, and contact information. Each vendor gets a dedicated profile page accessible via a clean URL structure.

---

## URL Structure

```
/v/[vendorName]
```

**Examples:**
- `/v/vishal-interiors` - Vishal Interiors profile
- `/v/urbancraft-interiors` - UrbanCraft Interiors profile
- `/v/prime-paint-co` - Prime Paint Co. profile

**URL Components:**
- `/v/` - Vendors section prefix
- `[vendorName]` - Vendor slug (URL-friendly identifier)

---

## Features

### 1. **Hero Section**
- Full-width cover image
- Vendor logo overlay
- Company name and tagline
- Key stats (rating, reviews, years of experience)
- Location information
- Quick action buttons (Get Quote, Share, Favorite)

### 2. **About Section**
- Detailed company description
- Brand story and values
- Service philosophy

### 3. **Why Choose Us**
- Highlighted features and benefits
- Checkmark-style list for easy scanning
- Key differentiators

### 4. **Services Offered**
- Grid layout of all services
- Clickable service cards
- Visual hierarchy

### 5. **Specializations**
- Badge-style display
- Key areas of expertise
- Industry focus areas

### 6. **Portfolio Gallery**
- Image showcase of completed projects
- Category filtering
- Horizontal scroll navigation
- Hover effects with project details
- Lightbox-style viewing

### 7. **Customer Reviews**
- Star ratings
- Customer testimonials
- Service-specific feedback
- Date stamps
- Avatar placeholders

### 8. **Certifications & Awards**
- Industry certifications
- Awards and recognitions
- Trust indicators

### 9. **Sidebar Information**
- **Quick Stats**: Projects completed, years in business, rating
- **Contact Information**: Phone, email, WhatsApp, website
- **Service Areas**: Geographic coverage
- **Availability**: Operating days and hours
- **Pricing**: Starting price range
- **Social Media**: Links to social profiles

### 10. **Contact Form Modal**
- Pop-up quote request form
- Service selection dropdown
- Required fields validation
- Direct submission to vendor

---

## File Structure

```
/app/v/[vendorName]/
  └── page.tsx             # Dynamic vendor profile page

/lib/
  └── vendor-data.ts       # Vendor profiles database

/components/
  └── smart-search.tsx     # Updated to link to vendor profiles

/lib/
  └── search-utils.ts      # Updated to use vendor-data.ts
```

---

## Data Structure

### VendorProfile Type

```typescript
export type VendorProfile = {
  // Basic Info
  slug: string                    // URL-friendly identifier
  name: string                    // Business name
  tagline: string                 // Marketing tagline
  description: string             // Detailed description
  
  // Branding
  logo?: string                   // Logo image path
  coverImage: string              // Hero cover image
  
  // Stats
  rating: number                  // Average rating (0-5)
  totalReviews: number            // Number of reviews
  yearsExperience: number         // Years in business
  projectsCompleted: number       // Total projects
  
  // Location
  city: string                    // Primary city
  areas: string[]                 // Service areas
  
  // Services
  categories: string[]            // Main categories
  services: string[]              // Specific services offered
  specializations: string[]       // Areas of expertise
  certifications: string[]        // Certifications and licenses
  
  // Portfolio
  gallery: {
    image: string                 // Image path
    title: string                 // Project title
    category: string              // Project category
  }[]
  
  // Reviews
  reviews: {
    name: string                  // Customer name
    rating: number                // Rating (0-5)
    date: string                  // Review date
    comment: string               // Review text
    service: string               // Service reviewed
    avatar?: string               // Customer avatar
  }[]
  
  // Contact
  contact: {
    phone: string
    email: string
    whatsapp?: string
    website?: string
  }
  
  // Social Media
  socialMedia?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
  
  // Pricing
  pricing: {
    starting: string              // Starting price
    currency: string              // Currency code
  }
  
  // Availability
  availability: {
    days: string[]                // Operating days
    hours: string                 // Operating hours
  }
  
  // Marketing
  highlights: string[]            // Key highlights
  awards?: string[]               // Awards won
}
```

---

## Adding a New Vendor

### Step 1: Add Vendor Profile

Edit `/lib/vendor-data.ts`:

```typescript
export const vendorProfiles: VendorProfile[] = [
  // ... existing vendors
  {
    slug: 'your-vendor-slug',
    name: 'Your Vendor Name',
    tagline: 'Your Catchy Tagline',
    description: 'Detailed description of your business...',
    coverImage: '/path/to/cover-image.jpg',
    rating: 4.8,
    totalReviews: 150,
    yearsExperience: 10,
    projectsCompleted: 500,
    city: 'Your City',
    areas: ['Area 1', 'Area 2', 'Area 3'],
    categories: ['Category 1', 'Category 2'],
    services: [
      'Service 1',
      'Service 2',
      'Service 3'
    ],
    specializations: [
      'Specialization 1',
      'Specialization 2'
    ],
    certifications: [
      'Certification 1',
      'Certification 2'
    ],
    gallery: [
      {
        image: '/path/to/project1.jpg',
        title: 'Project 1',
        category: 'Category Name'
      }
    ],
    reviews: [
      {
        name: 'Customer Name',
        rating: 5,
        date: '2024-09-15',
        comment: 'Great service!',
        service: 'Service Name'
      }
    ],
    contact: {
      phone: '+91 98765 43210',
      email: 'info@vendor.com',
      whatsapp: '+91 98765 43210',
      website: 'www.vendor.com'
    },
    socialMedia: {
      facebook: 'https://facebook.com/vendor',
      instagram: 'https://instagram.com/vendor',
      linkedin: 'https://linkedin.com/company/vendor'
    },
    pricing: {
      starting: '₹1,00,000',
      currency: 'INR'
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '9:00 AM - 6:00 PM'
    },
    highlights: [
      'Highlight 1',
      'Highlight 2',
      'Highlight 3'
    ],
    awards: [
      'Award 1',
      'Award 2'
    ]
  }
]
```

### Step 2: Add Images

1. Add vendor images to `/public/` folder
2. Use consistent naming: `vendor-name-cover.jpg`, `vendor-name-logo.png`
3. Add portfolio images: `vendor-name-project-1.jpg`, etc.

### Step 3: Test

1. Navigate to `/v/your-vendor-slug`
2. Verify all sections display correctly
3. Test contact form
4. Check mobile responsiveness

---

## Integration with Search

### How It Works

1. **Search Results**: When users search for services, matching vendors appear
2. **Vendor Cards**: Clickable vendor cards in search results
3. **Navigation**: Clicking a vendor card navigates to `/v/[slug]`

### Code Flow

```typescript
// In smart-search.tsx
<Card onClick={() => router.push(`/v/${vendor.slug}`)}>
  <div>{vendor.name}</div>
  <div>⭐ {vendor.rating} • {vendor.city}</div>
</Card>
```

---

## Customization

### Styling

All styles use Tailwind CSS classes. Key design elements:

```css
/* Card styling */
rounded-3xl        /* Large rounded corners */
shadow-xl          /* Elevated shadow */
hover:scale-[1.02] /* Subtle hover scale */

/* Color palette */
bg-tatva-orange              /* Primary brand color */
bg-tatva-orange-hover        /* Hover state */
text-tatva-charcoal          /* Dark text */
text-tatva-gray              /* Secondary text */
```

### Layout

```
┌─────────────────────────────────────────┐
│          Hero Section (Cover)           │
│  ┌────┐                                 │
│  │Logo│  Vendor Name                    │
│  └────┘  Tagline                        │
└─────────────────────────────────────────┘
┌──────────────────┬──────────────────────┐
│                  │                      │
│  Main Content    │   Sidebar            │
│  - About         │   - Quick Stats      │
│  - Services      │   - Contact Info     │
│  - Portfolio     │   - Service Areas    │
│  - Reviews       │   - Availability     │
│                  │   - Pricing          │
└──────────────────┴──────────────────────┘
```

---

## SEO Optimization

### Meta Tags (To be added)

```typescript
// In page.tsx
export async function generateMetadata({ params }) {
  const vendor = getVendorBySlug(params.vendorName)
  
  return {
    title: `${vendor.name} - ${vendor.tagline}`,
    description: vendor.description,
    openGraph: {
      title: vendor.name,
      description: vendor.tagline,
      images: [vendor.coverImage],
    }
  }
}
```

### Static Generation

```typescript
// Generate static pages for all vendors
export async function generateStaticParams() {
  return getAllVendorSlugs().map(slug => ({
    vendorName: slug
  }))
}
```

---

## Features Roadmap

### Current Features ✅
- [x] Dynamic vendor profile pages
- [x] Hero section with cover image
- [x] About and services sections
- [x] Portfolio gallery with filtering
- [x] Customer reviews display
- [x] Contact information sidebar
- [x] Quick stats display
- [x] Contact form modal
- [x] Social media links
- [x] Integration with search

### Planned Features 🚀
- [ ] Vendor dashboard for self-service updates
- [ ] Real-time availability booking
- [ ] Photo upload functionality
- [ ] Video testimonials
- [ ] Before/after project comparisons
- [ ] Service area map visualization
- [ ] Price calculator integration
- [ ] Lead tracking for vendors
- [ ] Analytics dashboard
- [ ] Verified badge system
- [ ] Premium listing features
- [ ] Featured vendor carousel
- [ ] Comparison tool
- [ ] Favorite/bookmark functionality

---

## Marketing Features

### 1. **Share Functionality**
Vendors can share their profile via:
- Direct link copying
- Social media sharing
- QR code generation (planned)

### 2. **Lead Generation**
- Quote request form
- Direct phone/email contact
- WhatsApp integration
- Website traffic tracking

### 3. **Trust Indicators**
- Star ratings display
- Customer review count
- Years of experience
- Projects completed
- Certifications
- Awards

### 4. **Visual Appeal**
- High-quality images
- Professional layout
- Consistent branding
- Mobile-optimized design

---

## Mobile Responsiveness

### Breakpoints

```css
/* Mobile (< 768px) */
- Single column layout
- Stacked sections
- Full-width cards
- Touch-friendly buttons

/* Tablet (768px - 1024px) */
- Two-column layout for some sections
- Optimized spacing
- Responsive images

/* Desktop (> 1024px) */
- Three-column layout
- Sidebar on right
- Maximum width container
- Hover effects enabled
```

---

## Performance Optimization

### Image Optimization
```typescript
// Using Next.js Image component
<Image
  src={vendor.coverImage}
  alt={vendor.name}
  fill
  className="object-cover"
  priority  // For hero image
/>
```

### Code Splitting
- Dynamic imports for heavy components
- Lazy loading for gallery images
- Optimized bundle size

### Caching Strategy
- Static generation for vendor pages
- ISR (Incremental Static Regeneration) for updates
- Client-side caching for repeat visits

---

## Analytics & Tracking

### Key Metrics to Track
- Profile views
- Quote request submissions
- Contact button clicks
- Social media link clicks
- Average time on page
- Scroll depth
- Portfolio image views

### Implementation (Planned)
```typescript
// Track profile view
useEffect(() => {
  analytics.track('vendor_profile_viewed', {
    vendorSlug: vendor.slug,
    vendorName: vendor.name,
    timestamp: new Date()
  })
}, [])

// Track quote request
const handleFormSubmit = (e) => {
  analytics.track('quote_requested', {
    vendorSlug: vendor.slug,
    service: formData.service
  })
  // ... rest of form handling
}
```

---

## Testing Checklist

### Functionality
- [ ] Vendor profile loads correctly
- [ ] All images display properly
- [ ] Contact form works
- [ ] Navigation to/from search works
- [ ] Social media links open correctly
- [ ] Gallery filtering works
- [ ] Scroll navigation functions
- [ ] 404 handling for invalid slugs

### Cross-Browser
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge
- [ ] Mobile Safari
- [ ] Mobile Chrome

### Responsiveness
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1440px+)

### Performance
- [ ] Page load time < 3s
- [ ] Images optimized
- [ ] No console errors
- [ ] Smooth animations
- [ ] Fast time to interactive

---

## Best Practices

### 1. **Image Guidelines**
- **Cover Image**: 1920x500px, high quality
- **Logo**: 400x400px, transparent background
- **Portfolio**: 800x600px, consistent aspect ratio
- **Format**: WebP preferred, fallback to JPG/PNG
- **Size**: < 500KB per image

### 2. **Content Guidelines**
- **Name**: Clear, official business name
- **Tagline**: 3-8 words, memorable
- **Description**: 100-200 words, include keywords
- **Services**: Be specific, use searchable terms
- **Highlights**: Focus on unique selling points

### 3. **SEO Guidelines**
- Use descriptive alt text for images
- Include location in description
- Add structured data markup (planned)
- Optimize page title and meta description
- Use semantic HTML

---

## Troubleshooting

### Issue: Vendor profile not found
**Solution**: Check that the slug in URL matches exactly the slug in vendor-data.ts

### Issue: Images not loading
**Solution**: 
1. Verify image path in vendor-data.ts
2. Check that image exists in /public folder
3. Ensure image name is correct (case-sensitive)

### Issue: Gallery filtering not working
**Solution**: Verify all gallery items have correct category values

### Issue: Contact form not submitting
**Solution**: Check browser console for errors, verify form validation

---

## API Integration (Future)

### Vendor Management API

```typescript
// GET /api/vendors/[slug]
// Get vendor profile data

// PUT /api/vendors/[slug]
// Update vendor profile

// POST /api/vendors/[slug]/leads
// Submit lead/quote request

// GET /api/vendors/[slug]/analytics
// Get vendor analytics data
```

---

## Conclusion

The Vendor Profile Pages feature provides a powerful marketing platform for service providers on TatvaOps. With comprehensive information display, portfolio showcase, customer reviews, and easy contact options, vendors can effectively showcase their services and generate leads.

**Key Benefits:**
- 🎨 Professional, branded presence
- 📸 Visual portfolio showcase
- ⭐ Social proof through reviews
- 📞 Multiple contact options
- 📱 Mobile-optimized design
- 🔍 SEO-friendly URLs
- 💼 Lead generation tools

---

**Version:** 1.0  
**Last Updated:** October 6, 2025  
**Maintained By:** TatvaOps Development Team



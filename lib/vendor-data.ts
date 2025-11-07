export type VendorProfile = {
  slug: string
  name: string
  tagline: string
  description: string
  logo?: string
  coverImage: string
  rating: number
  totalReviews: number
  yearsExperience: number
  projectsCompleted: number
  city: string
  areas: string[]
  categories: string[]
  services: string[]
  specializations: string[]
  certifications: string[]
  gallery: {
    image: string
    title: string
    category: string
  }[]
  reviews: {
    name: string
    rating: number
    date: string
    comment: string
    service: string
    avatar?: string
  }[]
  contact: {
    phone: string
    email: string
    whatsapp?: string
    website?: string
  }
  socialMedia?: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
  pricing: {
    starting: string
    currency: string
  }
  availability: {
    days: string[]
    hours: string
  }
  highlights: string[]
  awards?: string[]
}

export const vendorProfiles: VendorProfile[] = [
  {
    slug: 'vishal-interiors',
    name: 'Vishal Interiors',
    tagline: 'Transforming Spaces, Creating Dreams',
    description: 'Vishal Interiors is Mumbai\'s premier interior design and renovation company with over 15 years of experience in creating stunning residential and commercial spaces. We specialize in modular kitchens, wardrobe design, false ceilings, and complete home renovations. Our team of expert designers and craftsmen work closely with clients to bring their vision to life, ensuring quality, timely delivery, and exceptional customer service.',
    logo: '/tatva-ops-logo.png',
    coverImage: '/modern-interior-design-living-room-with-natural-li.jpg',
    rating: 4.9,
    totalReviews: 247,
    yearsExperience: 15,
    projectsCompleted: 850,
    city: 'Mumbai',
    areas: ['Andheri', 'Bandra', 'Powai', 'Thane', 'Navi Mumbai'],
    categories: ['Interior Design & Renovation', 'Home Improvement & Decor'],
    services: [
      'Interior Design Consultation',
      'Modular Kitchen Design',
      'Wardrobe Design',
      'False Ceiling',
      'Wallpaper Installation',
      'Space Planning',
      'Complete Home Renovation',
      'Office Interior Design',
      'Furniture Design & Manufacturing'
    ],
    specializations: [
      'Contemporary Design',
      'Minimalist Interiors',
      'Luxury Home Design',
      'Space Optimization',
      'Sustainable Design',
      'Smart Home Integration'
    ],
    certifications: [
      'ISO 9001:2015 Certified',
      'Green Building Certified Professional',
      'NSIC Registered',
      'Award-winning Designer 2023'
    ],
    gallery: [
      {
        image: '/modern-interior-design-living-room-with-natural-li.jpg',
        title: 'Natural Light Living Room Design',
        category: 'Living Room'
      },
      {
        image: '/modern-living-room-city-view.png',
        title: 'Luxury Living Room with City View',
        category: 'Living Room'
      },
      {
        image: '/modern-kitchen-design.png',
        title: 'Modern Modular Kitchen',
        category: 'Kitchen Design'
      },
      {
        image: '/luxury-living-room-marble.png',
        title: 'Luxury Living Room with Marble Flooring',
        category: 'Living Room'
      },
      {
        image: '/modern-bedroom-design.png',
        title: 'Contemporary Master Bedroom',
        category: 'Bedroom'
      },
      {
        image: '/modern-bathroom-design.png',
        title: 'Spa-Style Modern Bathroom',
        category: 'Bathroom'
      },
      {
        image: '/construction-worker-building-modern-home.jpg',
        title: 'Complete Home Renovation Project',
        category: 'Renovation'
      },
      {
        image: '/professional-painter-working-on-wall-renovation.jpg',
        title: 'Premium Wall Finishing Work',
        category: 'Renovation'
      }
    ],
    reviews: [
      {
        name: 'Priya Sharma',
        rating: 5,
        date: '2024-09-15',
        comment: 'Absolutely loved working with Vishal Interiors! They transformed our 2BHK apartment into a modern, functional space. The modular kitchen is stunning and the team was very professional throughout the project.',
        service: 'Complete Home Interior',
        avatar: '/placeholder-user.jpg'
      },
      {
        name: 'Rajesh Patel',
        rating: 5,
        date: '2024-08-22',
        comment: 'Excellent work on our office interiors. They understood our requirements perfectly and delivered beyond expectations. The space planning was brilliant and they completed everything on time.',
        service: 'Office Interior Design'
      },
      {
        name: 'Sneha Desai',
        rating: 4,
        date: '2024-07-10',
        comment: 'Great experience overall. The wardrobe design is exactly what we wanted. Only minor delay in installation but the quality makes up for it. Highly recommended!',
        service: 'Wardrobe Design'
      },
      {
        name: 'Amit Kumar',
        rating: 5,
        date: '2024-06-05',
        comment: 'Professional team with great attention to detail. Our modular kitchen has been the highlight of our home. Everyone who visits compliments the design. Worth every rupee!',
        service: 'Modular Kitchen'
      },
      {
        name: 'Kavita Mehta',
        rating: 5,
        date: '2024-05-18',
        comment: 'Vishal Interiors did a complete renovation of our 3BHK. From false ceiling to furniture, everything is top-notch. The designer listened to all our requirements and gave valuable suggestions.',
        service: 'Home Renovation'
      }
    ],
    contact: {
      phone: '+91 98765 43210',
      email: 'info@vishalinteriors.com',
      whatsapp: '+91 98765 43210',
      website: 'www.vishalinteriors.com'
    },
    socialMedia: {
      facebook: 'https://facebook.com/vishalinteriors',
      instagram: 'https://instagram.com/vishalinteriors',
      linkedin: 'https://linkedin.com/company/vishalinteriors'
    },
    pricing: {
      starting: '₹1,50,000',
      currency: 'INR'
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '9:00 AM - 7:00 PM'
    },
    highlights: [
      '15+ Years of Excellence',
      '850+ Projects Delivered',
      'On-Time Completion Guaranteed',
      'Free Design Consultation',
      '5-Year Warranty on Work',
      '24/7 Customer Support',
      'Transparent Pricing',
      'In-House Manufacturing'
    ],
    awards: [
      'Best Interior Designer 2023 - Mumbai',
      'Excellence in Home Design Award 2022',
      'Customer Choice Award 2023'
    ]
  },
  {
    slug: 'urbancraft-interiors',
    name: 'UrbanCraft Interiors',
    tagline: 'Crafting Urban Living Spaces',
    description: 'UrbanCraft Interiors brings modern design sensibilities to urban homes. We specialize in space-efficient designs perfect for city apartments and compact homes.',
    coverImage: '/modern-living-room-city-view.png',
    rating: 4.8,
    totalReviews: 156,
    yearsExperience: 10,
    projectsCompleted: 520,
    city: 'Mumbai',
    areas: ['South Mumbai', 'Worli', 'Lower Parel', 'BKC'],
    categories: ['Interior Design & Renovation', 'Home Improvement & Decor'],
    services: [
      'Interior Design',
      'Home Renovation',
      'Modular Furniture',
      'Space Planning'
    ],
    specializations: [
      'Compact Home Design',
      'Urban Minimalism',
      'Multi-functional Spaces'
    ],
    certifications: [
      'NCIDQ Certified',
      'Green Building Council Member'
    ],
    gallery: [
      {
        image: '/modern-living-room-city-view.png',
        title: 'Urban Living Space with City View',
        category: 'Living Room'
      },
      {
        image: '/modern-bedroom-design.png',
        title: 'Compact Bedroom Design',
        category: 'Bedroom'
      },
      {
        image: '/modern-kitchen-design.png',
        title: 'Space-Efficient Kitchen',
        category: 'Kitchen'
      },
      {
        image: '/modern-interior-design-living-room-with-natural-li.jpg',
        title: 'Minimalist Living Room',
        category: 'Living Room'
      },
      {
        image: '/luxury-living-room-marble.png',
        title: 'Contemporary Living Space',
        category: 'Living Room'
      },
      {
        image: '/modern-bathroom-design.png',
        title: 'Modern Bathroom Design',
        category: 'Bathroom'
      }
    ],
    reviews: [
      {
        name: 'Ananya Singh',
        rating: 5,
        date: '2024-08-10',
        comment: 'Perfect for our small apartment. They maximized every inch of space beautifully!',
        service: 'Interior Design'
      }
    ],
    contact: {
      phone: '+91 98765 11111',
      email: 'hello@urbancraft.in'
    },
    pricing: {
      starting: '₹1,20,000',
      currency: 'INR'
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '10:00 AM - 6:00 PM'
    },
    highlights: [
      '10+ Years Experience',
      'Space Optimization Experts',
      'Quick Turnaround Time',
      'Affordable Pricing'
    ]
  },
  {
    slug: 'prime-paint-co',
    name: 'Prime Paint Co.',
    tagline: 'Colors that Speak, Walls that Inspire',
    description: 'Prime Paint Co. is Pune\'s leading painting and waterproofing specialist. We provide premium quality painting services for residential and commercial properties with a focus on durability and aesthetics.',
    coverImage: '/professional-painter-working-on-wall-renovation.jpg',
    rating: 4.7,
    totalReviews: 203,
    yearsExperience: 12,
    projectsCompleted: 1200,
    city: 'Pune',
    areas: ['Koregaon Park', 'Aundh', 'Baner', 'Hinjewadi', 'Wakad'],
    categories: ['Home Improvement & Decor'],
    services: [
      'Interior Painting',
      'Exterior Painting',
      'Waterproofing',
      'Texture Painting',
      'Wall Treatment',
      'Wood Painting'
    ],
    specializations: [
      'Asian Paints Premium',
      'Waterproofing Solutions',
      'Textured Finishes',
      'Eco-Friendly Paints'
    ],
    certifications: [
      'Asian Paints Certified Contractor',
      'Berger Paints Authorized Partner'
    ],
    gallery: [
      {
        image: '/professional-painter-working-on-wall-renovation.jpg',
        title: 'Professional Wall Painting Service',
        category: 'Painting'
      },
      {
        image: '/construction-worker-building-modern-home.jpg',
        title: 'Exterior Painting Project',
        category: 'Painting'
      },
      {
        image: '/modern-living-room-city-view.png',
        title: 'Living Room Wall Paint Finish',
        category: 'Interior Painting'
      },
      {
        image: '/modern-bedroom-design.png',
        title: 'Bedroom Wall Painting',
        category: 'Interior Painting'
      },
      {
        image: '/luxury-living-room-marble.png',
        title: 'Premium Wall Finish',
        category: 'Interior Painting'
      },
      {
        image: '/modern-interior-design-living-room-with-natural-li.jpg',
        title: 'Natural Finish Wall Treatment',
        category: 'Painting'
      }
    ],
    reviews: [
      {
        name: 'Rahul Joshi',
        rating: 5,
        date: '2024-09-01',
        comment: 'Excellent painting work! Very clean and professional. Completed our entire house in just 5 days.',
        service: 'Interior Painting'
      },
      {
        name: 'Meera Kulkarni',
        rating: 4,
        date: '2024-07-20',
        comment: 'Good quality work. The waterproofing has solved our leakage issues completely.',
        service: 'Waterproofing'
      }
    ],
    contact: {
      phone: '+91 98765 22222',
      email: 'contact@primepaint.in',
      whatsapp: '+91 98765 22222'
    },
    pricing: {
      starting: '₹15/sq ft',
      currency: 'INR'
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: '8:00 AM - 8:00 PM'
    },
    highlights: [
      '12+ Years in Business',
      '1200+ Happy Customers',
      'Premium Paint Brands',
      '1-Year Service Warranty',
      'Free Color Consultation',
      'Same-Day Quote'
    ]
  }
]

export function getVendorBySlug(slug: string): VendorProfile | undefined {
  return vendorProfiles.find(vendor => vendor.slug === slug)
}

export function getAllVendorSlugs(): string[] {
  return vendorProfiles.map(vendor => vendor.slug)
}


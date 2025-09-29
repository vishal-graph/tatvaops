# Tatva Ops

A modern, intelligent home services platform that connects customers with verified service providers through AI-powered search and seamless enquiry management.

## 🚀 Features

### Intelligent Search
- **AI-Powered Search**: Advanced search with Long Cat AI integration for intelligent result re-ranking
- **Fuzzy Search**: Smart matching with synonyms, aliases, and prefix matching
- **Spell Correction**: Google-like "Did you mean..." suggestions
- **Real-time Suggestions**: Dynamic search suggestions as you type

### Service Management
- **Service Categories**: Organized by Interior Design, Painting, Plumbing, Electrical, and more
- **Scrollable Image Galleries**: Visual service examples with smooth scrolling
- **Service Details**: Comprehensive service information and descriptions

### Enquiry System
- **Smart Enquiry Form**: Reordered fields (Questions → Phone OTP → Name/Location)
- **Phone Verification**: OTP-based phone number verification
- **AI-Generated Questions**: 5 diagnostic questions tailored to each service category
- **Login Integration**: Secure enquiry submission with user authentication

### User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, minimalist interface with glass-morphism effects
- **Smooth Animations**: Engaging transitions and hover effects
- **Sidebar Navigation**: Context-aware navigation with conditional rendering

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **AI Integration**: Long Cat AI for search re-ranking
- **Deployment**: Vercel-ready configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishal-graph/tatvaops.git
   cd tatvaops
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Import your GitHub repository
   - Vercel will automatically detect Next.js configuration

2. **Environment Variables** (if needed)
   - Add any required environment variables in Vercel dashboard

3. **Deploy**
   - Automatic deployment on every push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 📁 Project Structure

```
tatvaops/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── search/            # Search page
│   └── [category]/        # Dynamic category pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── hero-section.tsx  # Homepage hero
│   ├── navigation-header.tsx
│   ├── smart-search.tsx  # Main search component
│   ├── service-popup.tsx # Service enquiry popup
│   ├── login-popup.tsx   # User authentication
│   └── sidebar.tsx       # Navigation sidebar
├── lib/                  # Utility functions
│   ├── search-utils.ts   # Search algorithms
│   └── service-data.ts   # Service data and categories
└── public/               # Static assets
```

## 🔧 Configuration

### AI Search Configuration
The search system uses Long Cat AI for intelligent re-ranking. Configuration is in `lib/search-utils.ts`:

```typescript
const AI_CONFIG = {
  apiKey: 'your-api-key',
  endpoint: 'https://api.longcat.ai/v1/rerank'
}
```

### Service Data
Service categories and data are managed in `lib/service-data.ts`. Add new services by updating the `categories` and `flatItems` arrays.

## 🎨 Customization

### Styling
- **Design System**: Custom CSS variables in `app/globals.css`
- **Colors**: Tatva Ops brand colors defined as CSS variables
- **Components**: Tailwind CSS with custom component classes

### Adding New Services
1. Update `lib/service-data.ts` with new service data
2. Add service images to `public/` directory
3. Update diagnostic questions in `components/service-popup.tsx`

## 📱 Features in Detail

### Search Functionality
- **3-letter prefix matching**: Search starts working after 3 characters
- **AI re-ranking**: Results are intelligently reordered using AI
- **Spell correction**: Automatic suggestions for misspelled queries
- **Category filtering**: Services grouped by category with AI tags

### Enquiry Form Flow
1. **Service Questions**: 5 diagnostic questions about project requirements
2. **Phone Verification**: OTP-based phone number verification
3. **Personal Details**: Name and location information
4. **Login & Submit**: User authentication before enquiry submission

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Tablet support**: Responsive layout for tablet screens
- **Desktop enhanced**: Full features on desktop with sidebar navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Long Cat AI** for intelligent search re-ranking
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Next.js** for the React framework
- **Lucide** for beautiful icons

## 📞 Support

For support, email support@tatvaops.com or create an issue in this repository.

---

**Built with ❤️ for better home services**

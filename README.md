# Property Listing Web Application

A modern, responsive property listing web application built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This application allows users to browse, filter, and view detailed information about properties.

## 🏗️ Project Structure

```
property-app/
├── README.md
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── components.json
├── postcss.config.mjs
├── pnpm-lock.yaml
├── .gitignore
│
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout component
│   └── page.tsx                 # Home page component
│
├── components/                   # React components
│   ├── add-property-form.tsx    # Form for adding new properties
│   ├── header.tsx               # Application header
│   ├── property-card.tsx        # Individual property card
│   ├── property-filters.tsx     # Property filtering controls
│   ├── property-modal.tsx       # Property details modal
│   ├── theme-provider.tsx       # Theme context provider
│   └── ui/                      # Reusable UI components (shadcn/ui)
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── skeleton.tsx
│       ├── toast.tsx
│       └── ... (other UI components)
│
├── contexts/                     # React contexts
│   ├── property-context.tsx     # Property state management
│   └── theme-context.tsx        # Theme management
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.tsx           # Mobile detection hook
│   └── use-toast.ts             # Toast notifications hook
│
├── lib/                          # Utility functions
│   └── utils.ts                 # Common utilities (cn, etc.)
│
├── public/                       # Static assets
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   ├── placeholder-user.jpg
│   ├── placeholder.jpg
│   └── placeholder.svg
│
├── styles/                       # Additional styles
│   └── globals.css
│
└── types/                        # TypeScript type definitions
    └── property.ts              # Property-related types
```

## ✨ Features

- 🏠 **Property Listings**: Browse through a collection of properties
- 🔍 **Advanced Filtering**: Filter properties by type, location, and other criteria
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark/Light Mode**: Toggle between light and dark themes
- 📋 **Property Details**: View detailed information about each property
- ➕ **Add Properties**: Add new properties to the listing
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- ⚡ **Fast Performance**: Powered by Next.js 15 with App Router

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15.2.4
- **React Version**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Theme**: next-themes for dark/light mode
- **Build Tool**: Next.js built-in build system

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Version 18.x or higher
- **pnpm**: Version 8.x or higher (recommended) or **npm**: Version 8.x or higher
- **Git**: For version control

### Installing pnpm (Recommended)

This project uses pnpm as the primary package manager. Install it globally:

```bash
npm install -g pnpm
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shubhamsk2000/Property-listing-webapp.git
cd Property-listing-webapp/property-app
```

### 2. Install Dependencies

⚠️ **Important**: This project requires a specific installation method due to peer dependency conflicts with React 19.

#### Using pnpm (Recommended)

```bash
pnpm install --legacy-peer-deps
```

#### Using npm (Alternative)

```bash
npm install --legacy-peer-deps
```

**Why `--legacy-peer-deps`?**
The project uses React 19, but some dependencies (like `vaul@0.9.9`) have peer dependencies that only officially support React 16.8-18.x. Using `--legacy-peer-deps` bypasses these conflicts and allows the installation to proceed. This is safe as most React components work fine with newer versions.

### 3. Start the Development Server

#### Using pnpm (Recommended)

```bash
pnpm dev
```

#### Using npm (Alternative)

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

#### Using pnpm

```bash
pnpm build
```

#### Using npm

```bash
npm run build
```

### 5. Start Production Server

#### Using pnpm

```bash
pnpm start
```

#### Using npm

```bash
npm start
```

## 📦 Available Scripts

| Script | pnpm | npm | Description |
|--------|------|-----|-------------|
| Development | `pnpm dev` | `npm run dev` | Starts the development server |
| Build | `pnpm build` | `npm run build` | Builds the app for production |
| Start | `pnpm start` | `npm start` | Runs the built app in production mode |
| Lint | `pnpm lint` | `npm run lint` | Runs the linter to check for code issues |

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url_here
```

### Tailwind CSS

The project uses a custom Tailwind CSS configuration. You can modify the theme in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Your custom theme extensions
    },
  },
  plugins: [],
}
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible UI components. All components are:

- **Accessible**: Built on Radix UI primitives
- **Customizable**: Easily styled with Tailwind CSS
- **Type-safe**: Full TypeScript support
- **Modern**: Latest design patterns and best practices

## 🐛 Troubleshooting

### Common Issues

1. **Dependency Installation Errors**
   - Always use `pnpm install --legacy-peer-deps` or `npm install --legacy-peer-deps`
   - Clear package manager cache: 
     - pnpm: `pnpm store prune`
     - npm: `npm cache clean --force`

2. **Build Errors**
   - Ensure Node.js version is 18.x or higher
   - Delete `node_modules` and package lock files, then reinstall:
     ```bash
     rm -rf node_modules pnpm-lock.yaml package-lock.json
     pnpm install --legacy-peer-deps
     # or
     npm install --legacy-peer-deps
     ```

3. **Port Already in Use**
   - The default port is 3000. If it's occupied, Next.js will automatically use the next available port
   - Or specify a custom port: 
     - pnpm: `pnpm dev --port 3001`
     - npm: `npm run dev -- -p 3001`

### Getting Help

If you encounter any issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [React 19 migration guide](https://react.dev/blog/2024/04/25/react-19)
3. Check [shadcn/ui documentation](https://ui.shadcn.com/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shubham SK**
- GitHub: [@Shubhamsk2000](https://github.com/Shubhamsk2000)

---

⭐ If you found this project helpful, please give it a star on GitHub!

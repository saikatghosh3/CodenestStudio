# CodeNest Studio - Portfolio & Project Management System

A modern, full-featured portfolio website and admin dashboard for CodeNest Studio, a professional web development agency. Built with **Next.js 13**, **React 18**, **Tailwind CSS**, and **MongoDB**.

![Next.js](https://img.shields.io/badge/Next.js-13.5.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=flat-square&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-9.6-green?style=flat-square&logo=mongodb)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Authentication](#authentication)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contact](#contact)

---

## 🎯 Overview

CodeNest Studio is a **production-ready portfolio and project management platform** that combines:

- **Public-facing marketing website** showcasing services, projects, and client testimonials
- **Secure admin dashboard** for managing projects and portfolio content
- **Responsive design** optimized for all devices with modern animations
- **REST API** for backend operations with JWT authentication
- **MongoDB database** for persistent data storage

Perfect for agencies, studios, and freelancers who want to showcase their work professionally while managing their portfolio efficiently.

---

## ✨ Features

### 🌐 Public Website

- **Modern Hero Section** with parallax mouse effects and animated gradients
- **Responsive Navigation** with mobile menu and smooth transitions
- **Services Showcase** highlighting 4 core competencies:
  - Web Development
  - UI/UX Design
  - Mobile Development
  - Cloud Solutions
- **Featured Projects Gallery** with category filtering and live preview modal
- **Pricing Plans** section with transparent pricing models
- **Client Testimonials** carousel showcasing real client success stories
- **FAQ Accordion** with 5 common questions and answers
- **Call-to-Action Sections** throughout the site
- **WhatsApp Integration** for direct client contact
- **Privacy & Terms Pages** for compliance
- **Smooth Animations** using Framer Motion for engaging UX

### 🔐 Admin Dashboard

- **Secure Login System** with email/password authentication
- **Dashboard Overview** with project statistics:
  - Total projects count
  - Featured projects count
  - Unique project categories
- **Project Management (CRUD)**:
  - Create new projects with full details
  - Edit existing projects
  - Delete projects
  - Toggle featured status
- **Live Project Preview** in modal with iframe
- **Session Management** with JWT authentication
- **Error Handling** for database connection issues
- **Responsive Admin UI** with sidebar navigation

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 13.5.1 (App Router)
- **Language**: React 18.2 with TypeScript 5.2
- **Styling**: Tailwind CSS 3.3.3 with CSS variables
- **UI Components**: Shadcn/ui (40+ pre-built components)
- **Animations**: Framer Motion 12.40.0
- **Forms**: React Hook Form 7.53.0 + Zod validation
- **Icons**: Lucide React 0.446.0
- **Charts**: Recharts 2.12.7
- **Notifications**: Sonner (toast library)
- **Utilities**: clsx, slugify, tailwind-merge, date-fns

### Backend
- **Runtime**: Node.js
- **API**: Next.js Route Handlers
- **Database**: MongoDB with Mongoose 9.6.2
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: bcryptjs 3.0.3
- **Validation**: Zod 3.23.8

### Deployment
- **Hosting**: Netlify
- **Build Plugin**: @netlify/plugin-nextjs 5.15.1

---

## 📁 Project Structure

```
project/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js          # Login endpoint
│   │   │   └── me/route.js             # Current user/logout
│   │   └── projects/
│   │       ├── route.js                # List & create projects
│   │       ├── [id]/route.js           # Update & delete projects
│   │       └── by-slug/[slug]/route.js # Get project by slug
│   ├── admin/
│   │   ├── layout.jsx                  # Admin layout
│   │   ├── dashboard/page.jsx          # Dashboard overview
│   │   ├── login/page.jsx              # Login page
│   │   └── projects/
│   │       ├── page.jsx                # Projects list
│   │       ├── create/page.jsx         # Create project
│   │       └── edit/[id]/page.jsx      # Edit project
│   ├── projects/[slug]/page.jsx        # Public project detail
│   ├── privacy/page.jsx                # Privacy policy
│   ├── terms/page.jsx                  # Terms of service
│   ├── layout.tsx                      # Root layout
│   ├── page.jsx                        # Homepage
│   └── globals.css                     # Global styles
├── components/
│   ├── home/                           # Homepage sections
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Pricing.jsx
│   │   ├── Clients.jsx
│   │   ├── FAQ.jsx
│   │   ├── CTA.jsx
│   │   ├── Footer.jsx
│   │   └── WhatsAppWidget.jsx
│   ├── admin/
│   │   └── Sidebar.jsx                 # Admin navigation
│   └── ui/                             # Shadcn/ui components (40+)
├── lib/
│   ├── auth.js                         # JWT token utilities
│   ├── db.js                           # MongoDB connection
│   └── utils.ts                        # Tailwind utilities
├── models/
│   └── Project.js                      # Mongoose schema
├── services/
│   └── projectServices.js              # Project business logic
├── hooks/
│   └── use-toast.ts                    # Toast notification hook
├── utils/
│   └── constants.js                    # Navigation, FAQs, testimonials
├── next.config.js                      # Next.js configuration
├── tailwind.config.ts                  # Tailwind configuration
├── tsconfig.json                       # TypeScript configuration
├── postcss.config.js                   # PostCSS configuration
├── package.json                        # Dependencies
└── netlify.toml                        # Netlify deployment config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher (or yarn)
- **MongoDB** database (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codenest-studio.git
   cd codenest-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env.local` file** with required environment variables
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables** (see [Environment Variables](#environment-variables))

5. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Run Type Checking

```bash
npm run typecheck
```

---

## 📡 API Documentation

### Authentication Endpoints

#### **POST** `/api/auth/login`
Login with admin credentials.

**Request Body:**
```json
{
  "email": "admin@codenest.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```

**Responses:**
- `200`: Login successful (JWT token set in HTTP-only cookie)
- `401`: Invalid email or password
- `500`: Server error

---

#### **GET** `/api/auth/me`
Check current session and get user info.

**Authentication:** HTTP-only cookie required

**Response (200):**
```json
{
  "authenticated": true,
  "message": "User authenticated"
}
```

**Responses:**
- `200`: User is authenticated
- `401`: No valid session

---

#### **POST** `/api/auth/me`
Logout current user (clear authentication cookie).

**Authentication:** HTTP-only cookie required

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### Project Endpoints

#### **GET** `/api/projects`
Get all projects with optional filtering.

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "Web App", "Mobile App")
- `featured` (optional): Filter featured projects ("true" or "false")

**Example:**
```
GET /api/projects?category=Web%20App&featured=true
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "E-commerce Platform",
      "slug": "ecommerce-platform",
      "description": "Full-featured online store",
      "thumbnail": "https://...",
      "images": ["https://..."],
      "technologies": ["Next.js", "React", "MongoDB"],
      "liveLink": "https://ecommerce.example.com",
      "githubLink": "https://github.com/...",
      "category": "Web App",
      "featured": true,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Responses:**
- `200`: Success
- `503`: Database connection error

---

#### **POST** `/api/projects`
Create a new project.

**Authentication:** HTTP-only cookie required

**Request Body:**
```json
{
  "title": "E-commerce Platform",
  "slug": "ecommerce-platform",
  "description": "Full-featured online store with payment integration",
  "thumbnail": "https://example.com/thumb.jpg",
  "images": ["https://example.com/img1.jpg"],
  "technologies": ["Next.js", "React", "MongoDB", "Stripe"],
  "liveLink": "https://ecommerce.example.com",
  "githubLink": "https://github.com/user/repo",
  "category": "Web App",
  "featured": true
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": { /* full project object */ }
}
```

**Responses:**
- `201`: Project created
- `400`: Invalid data or duplicate slug
- `401`: Not authenticated
- `503`: Database error

---

#### **GET** `/api/projects/by-slug/[slug]`
Get a specific project by slug.

**Example:**
```
GET /api/projects/by-slug/ecommerce-platform
```

**Response (200):**
```json
{
  "success": true,
  "data": { /* project object */ }
}
```

**Responses:**
- `200`: Success
- `404`: Project not found
- `503`: Database error

---

#### **PUT** `/api/projects/[id]`
Update an existing project.

**Authentication:** HTTP-only cookie required

**Request Body:** (All fields optional)
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "featured": false
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "data": { /* updated project object */ }
}
```

**Responses:**
- `200`: Updated successfully
- `401`: Not authenticated
- `404`: Project not found
- `503`: Database error

---

#### **DELETE** `/api/projects/[id]`
Delete a project.

**Authentication:** HTTP-only cookie required

**Response (200):**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

**Responses:**
- `200`: Deleted successfully
- `401`: Not authenticated
- `404`: Project not found
- `503`: Database error

---

## 🗄 Database

### MongoDB Collections

#### **Projects Collection**

Schema Definition:
```javascript
{
  _id: ObjectId,
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: [String],
  technologies: [String],
  liveLink: {
    type: String,
    default: ""
  },
  githubLink: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: "Web App",
    index: true
  },
  featured: {
    type: Boolean,
    default: false,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

**Indexes:**
- `slug` (unique)
- `category` (for filtering)
- `featured` (for featured projects queries)

**Connection:**
- Uses global connection pool to avoid reconnection overhead
- Connection string from `MONGODB_URI` environment variable

---

## 🔐 Authentication

### JWT-Based Authentication

- **Type**: JSON Web Tokens (JWT)
- **Storage**: HTTP-only cookies (secure, not accessible via JavaScript)
- **Token Expiry**: 7 days
- **Algorithm**: HS256 (HMAC with SHA-256)

### Admin Credentials

By default, admin credentials are:
- **Email**: `admin@codenest.com`
- **Password**: `admin123`

**⚠️ Important**: Change these credentials in production via environment variables.

### Protected Routes

Protected API routes require:
1. Valid JWT token in HTTP-only cookie
2. Token must be signed with `JWT_SECRET`
3. Token must not be expired

Protected routes:
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

---

## ⚙️ Configuration

### Next.js Configuration (`next.config.js`)

- **ESLint**: Disabled during builds for faster development
- **Images**: Unoptimized and configured for external URLs
- **Remote Patterns**: Allows all HTTPS URLs (customizable)

### TypeScript Configuration (`tsconfig.json`)

- **Target**: ES5
- **Strict Mode**: Enabled for type safety
- **Path Aliases**: `@/*` maps to root directory

### Tailwind Configuration (`tailwind.config.ts`)

- **Color Scheme**: Dark mode support with class strategy
- **CSS Variables**: Custom theme colors
- **Base Colors**: Neutral with Primary, Secondary, Accent variants
- **Compatible** with Shadcn/ui components

### Netlify Configuration (`netlify.toml`)

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18.x
- **Build Function**: Uses Netlify Next.js plugin

---

## 📦 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/codenest?retryWrites=true&w=majority

# Admin Credentials
ADMIN_EMAIL=admin@codenest.com
ADMIN_PASSWORD=your_secure_password_here

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-super-secret-key-change-in-production-12345

# Node Environment
NODE_ENV=development
```

### Variable Descriptions

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `ADMIN_EMAIL` | Admin login email | No | admin@codenest.com |
| `ADMIN_PASSWORD` | Admin login password | No | admin123 |
| `JWT_SECRET` | Secret key for JWT signing | No | codenest-secret-key-change-in-production |
| `NODE_ENV` | Environment (development/production) | No | development |

---

## 🌐 Deployment

### Deploy to Netlify

1. **Push code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect GitHub to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository
   - Choose main branch

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Set environment variables**
   - Go to Site settings → Environment
   - Add all variables from `.env.local`

5. **Deploy**
   - Netlify will automatically build and deploy on push

### Deploy to Vercel

1. **Push code to GitHub**

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Select your repository

3. **Configure environment variables**
   - Add all variables from `.env.local`

4. **Deploy**
   - Vercel will automatically deploy

---

## 📝 Scripts

```bash
# Development
npm run dev                # Start dev server (http://localhost:3000)

# Production
npm run build             # Build for production
npm start                 # Start production server

# Quality
npm run lint              # Run ESLint
npm run typecheck         # TypeScript type checking
```

---

## 📊 Performance Features

- **Image Optimization**: Lazy loading for images
- **Code Splitting**: Automatic route-based code splitting
- **Database Connection Pooling**: Reuses MongoDB connections
- **Caching**: Optimized queries with indexes
- **CDN**: Netlify CDN for fast global delivery
- **Animation Performance**: Hardware-accelerated Framer Motion

---

## 🎨 Customization

### Update Company Information

Edit [utils/constants.js](utils/constants.js):
- Company name
- Services offered
- Navigation links
- FAQ items
- Testimonials
- Contact information

### Customize Theme

Edit [tailwind.config.ts](tailwind.config.ts):
- Colors and brand palette
- Typography
- Spacing
- Breakpoints

### Modify Components

All homepage components are in [components/home/](components/home/):
- Replace hero section
- Customize projects layout
- Update pricing plans
- Modify testimonials

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**CodeNest Studio**

- **Email**: [codersync9@gmail.com](mailto:codersync9@gmail.com)
- **Phone**: +880 1758197272
- **Location**: Dhaka, Bangladesh
- **WhatsApp**: [Direct Message](https://wa.me/8801758197272)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [MongoDB](https://www.mongodb.com/) - Database
- [Netlify](https://netlify.com/) - Hosting platform

---

**Made with ❤️ by CodeNest Studio**

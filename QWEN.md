# DevNest - Forum Application

## Project Overview

DevNest is a Next.js forum application designed for developers to create threads, post messages, and engage in discussions on various technical topics. The application provides a modern, authenticated platform with features such as thread management, posts and replies, and tagging.

### Key Features
- **Thread Management:** Users can create, view, edit, and delete threads
- **Posts and Replies:** Users can post messages within threads and reply to other users' posts
- **Tagging:** Threads can be categorized with tags for easy discovery
- **User Authentication:** Secure sign-in and sign-up using NextAuth.js with GitHub provider
- **User Profiles:** Each user has a profile page displaying their created threads and posts
- **Anonymous User Support:** The application supports both authenticated and anonymous users

### Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) 15
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **UI:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** React Hook Form, Zod for validation

### Architecture
The application follows a modern Next.js architecture with:
- App Router pattern
- Server Components and Client Components
- Server Actions for data mutations
- Database interactions via Prisma ORM
- Component-based UI with shadcn/ui
- Path aliases (`@/*` maps to `./src/*`)

## Database Schema

The application uses PostgreSQL with the following main entities:
- **User**: User accounts with authentication data, including support for anonymous users
- **Thread**: Discussion threads with titles and descriptions
- **Post**: Posts within threads, including support for replies
- **Tag**: Categorization tags that can be associated with both threads and posts
- **Account, Session, VerificationToken, Authenticator**: Authentication-related tables managed by NextAuth.js

## Building and Running

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- GitHub OAuth application for authentication

### Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file with:
```env
DATABASE_URL="your_postgresql_database_url"
DIRECT_URL="your_postgresql_direct_url"
GITHUB_ID="your_github_oauth_app_id"
GITHUB_SECRET="your_github_oauth_app_secret"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

3. Set up the database:
```bash
npx prisma db push
npx prisma generate
```

4. Run the application:
```bash
# Development (with Turbopack):
npm run dev

# Production:
npm run build
npm run start
```

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Development Conventions

### Code Style
- TypeScript with strict mode enabled
- ESLint for code linting
- Import path aliases using `@/*` for `./src/*`
- Use functional components with hooks
- Server Components preferred for data fetching when possible

### Component Architecture
- Use shadcn/ui components for consistent UI
- Custom components located in `src/components/`
- Page-specific components in `src/app/*/components/`
- Shared utility functions in `src/lib/`

### Database Interactions
- Use Prisma Client for all database operations
- Define schema in `prisma/schema.prisma`
- Use Prisma Migrate for database schema changes

### Authentication
- NextAuth.js with GitHub provider
- User accounts support both OAuth and anonymous modes
- Session management via database storage

### Styling
- Tailwind CSS with CSS variables
- Theme configuration for light/dark modes
- Consistent spacing and typography using utility classes
- Responsive design principles

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/          # API routes
│   ├── components/   # Page-specific components
│   ├── signin/       # Authentication pages
│   ├── thread/       # Thread-related pages
│   ├── user/         # User profile pages
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/       # Reusable UI components
├── lib/              # Utility functions and business logic
├── middleware/       # Next.js middleware
└── types/            # TypeScript type definitions
```

## Environment Variables

- `DATABASE_URL` - PostgreSQL database connection string
- `DIRECT_URL` - Direct database connection string for Prisma
- `GITHUB_ID` - GitHub OAuth application ID
- `GITHUB_SECRET` - GitHub OAuth application secret
- `NEXTAUTH_SECRET` - Secret for NextAuth.js
- `NEXTAUTH_URL` - Base URL for NextAuth.js callbacks
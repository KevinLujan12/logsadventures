# Happy Fishermen Community

This project implements all the requirements for the Fishermen application, including Next.js App Router, NextAuth, Prisma PostgreSQL, `html2pdf.js`, and Sentry integrations.

## Setup Instructions

1. **Install dependencies:**
   `npm install`

2. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/fishermen"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_SENTRY_DSN="your-sentry-dsn-url"
   ```

3. **Initialize the Database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Sentry Testing
Click the red "Trigger Sentry Error" button on the home page to fire an error. Then check your Sentry.io dashboard and take the required screenshots.

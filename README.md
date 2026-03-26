# Sorriso Food

A premium, luxury Next.js 14 restaurant and e-commerce application.

## 🚀 Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Payments**: PayHere Sri Lanka

## 🛠️ Setup Instructions

### 1. Database (Supabase) Setup
1. Create a project on [Supabase.com](https://supabase.com/).
2. Navigate to the **SQL Editor** in your Supabase Dashboard.
3. Open `supabase/migrations/20240101_init_schema.sql` and run the entire script. This will generate your tables and insert 16 luxury menu items.
4. Go to Project Settings -> API and copy your URL and `anon` public key.
5. Create a `.env.local` file from the example:
   ```bash
   cp .env.local.example .env.local
   ```
6. Paste your credentials.

### 2. PayHere Setup
1. Obtain an account at PayHere Sandbox or Production.
2. In your PayHere portal, navigate to Integration -> App credentials.
3. Copy your `PAYHERE_MERCHANT_ID` and `PAYHERE_SECRET` into your `.env.local` file.
4. Set `NEXT_PUBLIC_PAYHERE_ENV` to `sandbox` for testing.

### 3. Local Development
1. Run `npm install`
2. Run `npm run dev`
3. Access at `http://localhost:3000`

### 4. Vercel Deployment
1. Push your repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Add the environment variables from your `.env.local` to Vercel's Environment Variables settings.
4. Deploy!

## Features included
- **Cinematic Landing Page**: Complete front-page with stagger animations and horizontal scroll.
- **Glassmorphic Menu Filter**: Instantly filtering categories from the seed datastore.
- **Interactive Checkouts & Cart**: Real-time state management using React Context. Floating label UI.
- **Secure Integrations**: Ready infrastructure for Supabase inserts and PayHere hashes.

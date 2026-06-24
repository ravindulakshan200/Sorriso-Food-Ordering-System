# Sorriso Food

Sorriso Food is a premium restaurant and online ordering web application for Sorriso in Battaramulla, built with Next.js and Supabase. It combines a polished customer experience with a functional admin dashboard for managing menu items, orders, reservations, and customer messages.

## Overview

This project provides a complete digital restaurant experience with:

- a modern landing experience for showcasing the brand and menu
- online ordering with cart and payment integration
- order tracking and customer communication flows
- an admin panel for managing business operations
- bilingual support for English and Sinhala

## Key Features

### Customer Experience

- Cinematic landing page with animated sections
- Interactive menu with category filtering and search
- Size-based item selection
- Shopping cart and checkout experience
- PayHere payment integration
- Order tracking via phone number
- Reservations and contact form
- Language toggle for English and Sinhala
- Delivery platform links and location details

### Admin Panel

- Dashboard overview
- Orders management with payment and fulfillment status
- Booking confirmation and cancellation
- Menu management with availability controls
- Image upload support for menu items
- Contact message inbox with read/unread handling

## Tech Stack

- Framework: Next.js 14 (App Router)
- UI: React, Tailwind CSS, Framer Motion
- Backend/Data: Supabase (PostgreSQL + Storage)
- Payments: PayHere Sri Lanka
- Language Support: English and Sinhala

## Project Structure

```text
src/
  app/              # App router pages and API routes
  components/       # Reusable UI components
  lib/              # Config, constants, utilities, Supabase helpers
  types/            # Shared TypeScript types
supabase/           # Database schema and migration files
```

## Prerequisites

Make sure you have the following installed:

- Node.js 18 or newer
- npm or pnpm

## Installation

1. Clone the repository

   ```bash
   git clone <your-repo-url>
   cd foooood
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create your environment file

   ```bash
   cp .env.example .env.local
   ```

4. Configure the required environment variables in `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_PAYHERE_MERCHANT_ID=your-merchant-id
   NEXT_PUBLIC_PAYHERE_SANDBOX=true
   PAYHERE_SECRET=your-payhere-secret
   NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/SorrisoFood
   NEXT_PUBLIC_PICKME_URL=https://pickme.lk/en/food
   NEXT_PUBLIC_UBER_EATS_URL=https://www.ubereats.com/lk
   ```

## Database Setup

Apply the Supabase migration files in order from the `supabase/migrations` folder:

1. `20240101_init_schema.sql`
2. `20240102_add_sizes_and_new_items.sql`
3. `20240103_remove_demo_items.sql`
4. `20240603_enhancements.sql`

You can also create an admin account in Supabase Authentication before signing in at `/admin/login`.

## Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Deployment

This project is ready for deployment on Vercel or any compatible Node.js hosting platform.

### Vercel

1. Push the project to GitHub
2. Import it into Vercel
3. Add the environment variables from `.env.local`
4. Deploy the app

Set `NEXT_PUBLIC_SITE_URL` to your production domain such as `https://sorrisofood.lk`.

## Contributing

Contributions are welcome. If you want to improve the app, open an issue or submit a pull request with your proposed changes.

## Contact

For business or project-related inquiries, please reach out through the contact form or the project repository.

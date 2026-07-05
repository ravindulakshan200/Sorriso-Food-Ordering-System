# 🍕 Sorriso Food

A modern full-stack restaurant ordering and reservation platform built with **Next.js**, **Supabase**, and **TypeScript**. Sorriso Food offers a seamless digital dining experience, allowing customers to browse menus, place orders, make table reservations, and track their orders in real-time, all powered by a robust backend and beautiful, animated user interface.

## ✨ Features

- **🍽️ Digital Menu**: Interactive and visually appealing menu with categories and item details.
- **🛒 Shopping Cart & Checkout**: Intuitive cart management with a streamlined checkout process.
- **💳 PayHere Integration**: Secure online payment processing via PayHere.
- **📦 Order Tracking**: Real-time order status updates for customers.
- **📅 Table Reservations**: Easy-to-use booking system for dine-in customers.
- **🔐 Secure Admin Dashboard**: Comprehensive admin panel for managing the restaurant.
  - **📊 Order Management**: View, update, and process incoming orders.
  - **🍔 Menu Management**: Add, edit, or remove menu items and upload images.
  - **📆 Reservation Management**: Handle table bookings.
  - **✉️ Messages**: View customer inquiries and contact forms.
- **📱 Responsive & Animated Design**: Built with Tailwind CSS and Framer Motion for a fluid experience across all devices.

---

## 🏗️ Project Structure

The project is structured as a monorepo containing the Next.js frontend and Supabase configurations.

```text
foooood/
├── frontend/             # Next.js Application (App Router)
│   ├── src/
│   │   ├── app/          # App router pages (admin, cart, menu, reservations, etc.)
│   │   ├── components/   # Reusable React components (UI, layout, home, etc.)
│   │   ├── lib/          # Utilities, PayHere logic, and Supabase client
│   │   ├── types/        # TypeScript interfaces and type definitions
│   │   └── ...
│   ├── public/           # Static assets
│   ├── package.json      
│   └── tailwind.config.ts
│
├── supabase/             # Supabase database configuration
│   └── migrations/       # SQL migration files
│
├── package.json          # Workspace root package.json
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend & Database (BaaS)
- **Platform**: [Supabase](https://supabase.com/)
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for menu images)

### Payments
- **Gateway**: [PayHere](https://www.payhere.lk/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project
- PayHere merchant account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd foooood
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file inside the `frontend` directory:
   ```bash
   cd frontend
   touch .env.local
   ```
   Add the following variables to `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # PayHere Credentials
   NEXT_PUBLIC_PAYHERE_MERCHANT_ID=your_merchant_id
   PAYHERE_SECRET=your_payhere_secret
   ```

4. **Run the development server**
   ```bash
   # From the project root
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 👨‍💻 Author

**Ravindu Lakshan**

---

## 📄 License

This project is licensed under the **MIT License**.

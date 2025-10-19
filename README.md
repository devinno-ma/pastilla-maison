# Pastilla Maison - Moroccan Restaurant Website

A modern, full-stack restaurant website built with Next.js, React, and Supabase. Features include online ordering, table reservations, menu management, and an admin dashboard.

## Features

- **Online Ordering System** - Browse menu items and place orders
- **Table Reservations** - Book tables with date/time selection
- **Shopping Cart** - Add items to cart with persistent storage
- **Admin Dashboard** - Manage menu items, orders, and reservations
- **Responsive Design** - Mobile-first design that works on all devices
- **Authentication** - Secure admin login with Supabase Auth
- **Database** - PostgreSQL database with Supabase

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel

## Prerequisites

Before you begin, make sure you have:

- Node.js 18+ installed
- A Supabase account (free tier available at https://supabase.com)
- A Vercel account (free tier available at https://vercel.com)
- Git installed

## Local Development Setup

### Step 1: Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd pastillamaison
\`\`\`

### Step 2: Install Dependencies

\`\`\`bash
npm install
\`\`\`

### Step 3: Set Up Supabase

1. Go to https://supabase.com and sign in or create an account
2. Click "New Project" and create a new project
3. Wait for the project to be created (this takes a few minutes)
4. Go to **Settings > API** in your Supabase dashboard
5. Copy the following values:
   - **Project URL** (under "API")
   - **Anon Key** (under "Project API keys")

### Step 4: Create Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
SUPABASE_NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supSUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_PASSWORD=your-admin-password
\`\`\`

Replace the values with your actual Supabase credentials.

### Step 5: Set Up the Database

1. Go to your Supabase dashboard
2. Click on **SQL Editor** in the left sidebar
3. Create a new query and copy the contents of `scripts/01-init-database.sql`
4. Run the query to create all tables
5. Create another query and copy the contents of `scripts/02-seed-admin.sql`
6. Run the query to seed the admin account and menu items

**Test Admin Account:**
- Email: `admin@pastillamaison.com`
- Password: `admin123`

### Step 6: Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

\`\`\`
pastillamaison/
├── app/
│   ├── api/                    # API routes
│   │   ├── orders/            # Order management
│   │   ├── reservations/      # Reservation management
│   │   └── auth/              # Authentication
│   ├── admin/                 # Admin dashboard
│   ├── cart/                  # Shopping cart page
│   ├── reservations/          # Reservations page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── header.tsx             # Navigation header
│   ├── contact.tsx            # Contact section
│   ├── dish-carousel.tsx      # Menu carousel
│   └── ...                    # Other components
├── context/
│   └── cart-context.tsx       # Cart state management
├── lib/
│   └── supabase/              # Supabase client setup
├── scripts/
│   ├── 01-init-database.sql   # Database initialization
│   └── 02-seed-admin.sql      # Admin account & menu seeding
└── public/                    # Static assets
\`\`\`

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | `eyJhbGc...` |
| `NEXT_PUBLIC_APP_URL` | Your app URL | `http://localhost:3000` |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin login password | `your-secure-password` |

### How to Find Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Settings** in the left sidebar
4. Click **API** tab
5. You'll see:
   - **Project URL** - Copy this to `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** section - Copy the **anon** key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Database Schema

### Tables

- **admin_users** - Admin account credentials
- **menu_items** - Restaurant menu items
- **orders** - Customer orders
- **order_items** - Individual items in orders
- **reservations** - Table reservations

All tables have Row Level Security (RLS) policies enabled for security.

## Available Scripts

\`\`\`bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
\`\`\`

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Features Guide

### Placing an Order

1. Browse the menu on the home page
2. Click "Order" on any dish to add it to your cart
3. Click the shopping cart icon in the header to view your cart
4. Review items and click "Checkout" to place the order

### Making a Reservation

1. Go to the Reservations page
2. Select your preferred date and time
3. Enter your party size and contact information
4. Click "Book Table" to confirm

### Admin Dashboard

1. Go to `/admin` and log in with:
   - Email: `admin@pastillamaison.com`
   - Password: `admin123`
2. Manage menu items, view orders, and manage reservations

## Troubleshooting

### "Your project's URL and Key are required"

This error means your environment variables are not set correctly.

**Solution:**
1. Check that `.env.local` file exists in the root directory
2. Verify the values are correct (copy from Supabase dashboard)
3. Restart the development server: `npm run dev`

### Database connection errors

**Solution:**
1. Verify your Supabase project is active
2. Check that the database tables were created (run the SQL scripts)
3. Ensure your Supabase credentials are correct

### Cart not persisting

The cart uses browser localStorage. If items aren't persisting:
1. Check that localStorage is enabled in your browser
2. Clear browser cache and try again

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the Supabase documentation: https://supabase.com/docs
3. Check Next.js documentation: https://nextjs.org/docs

## License

This project is private and for internal use only.

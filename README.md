# Patient Care Coordinator - Tambo AI

An AI-powered clinical workflow management system for doctors, nurses, and patients. Built with Next.js, Tambo AI, and Supabase.

## Features

- **Role-Based Views**: Tailored interfaces for Doctors (Schedule, Prescription), Nurses (Vitals, Tasks), and Patients (Appointments).
- **Generative UI**: Intelligent components that render based on AI-driven clinical context.
- **Tambo AI Integration**: Seamless real-time assistance for medical staff.
- **Supabase Backend**: Secure data handling for appointments, history, and vitals.

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd patient-care-coordinator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Copy `.env.example` to `.env.local` and fill in your keys:
   ```bash
   cp .env.example .env.local
   ```

   Required variables:
   - `NEXT_PUBLIC_TAMBO_API_KEY`: Get this from your Tambo AI dashboard.
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Deployment

### Vercel

The easiest way to deploy is using [Vercel](https://vercel.com/new).

1. Connect your GitHub repository.
2. Add the environment variables listed in `.env.example` to the Vercel project settings.
3. Deploy!

### Manual Build

```bash
npm run build
npm start
```

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Lucide Icons.
- **AI**: Tambo AI React SDK.
- **Database**: Supabase.
- **Validation**: Zod.

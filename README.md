# Tambo Patient Care Coordinator

**Suggested Repository Name**: `tambo-patient-coordinator`

An AI-powered clinical workflow management system designed for modern healthcare teams. This project leverages **Next.js 16**, **Tambo AI**, and **Supabase** to provide role-based assistance for Doctors, Nurses, and Patients.

> [!WARNING]
> **Status: Under Active Development**
> This project is in a development phase. Some features may require finalized backend integration or API key configurations.

## Architecture & Logic

### 1. Generative UI (Tambo AI)
The project uses the Tambo AI React SDK to create a "Generative UI" experience. 
- **Context Helpers**: Located in `src/app/page.tsx`, these provide the AI with real-time data about the user's role and identity.
- **System Prompt**: Dynamically adjusted to guide the AI behavior (e.g., instructing the AI to use specific forms like `PrescriptionForm` for doctors).
- **Component Registry**: Found in `src/lib/tambo-config.tsx`, which maps AI-called "Tools" to React components.

### 2. Role-Based Views
- **Doctor**: Can view medical history, write prescriptions, and manage schedules.
- **Nurse**: Focused on recording patient vitals and managing pending tasks.
- **Patient**: View personal appointment schedules and history.

### 3. Core Components
- **`AppointmentList`**: A unified schedule viewer with role-specific filters.
- **`MedicalHistory`**: A dashboard for viewing categorical patient diagnoses and notes.
- **`VitalsForm`**: A specialized form for nurses to record metrics (BP, Temp, HR).
- **`PrescriptionForm`**: A secure form for authorized medication orders.

---

## 🛠 Required Setup

1. **Clone & Install**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_TAMBO_API_KEY=your_key
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. **Run**:
   ```bash
   npm run dev
   ```

---

## ⚠️ Potential Errors & Troubleshooting

Since the project is in developmental stages, you might encounter the following:

- **"API Key Not Found"**: Ensure `NEXT_PUBLIC_TAMBO_API_KEY` is correctly set in `.env.local`. If you see "MOCK_API_KEY" in the logs, the environment variable isn't being picked up.
- **"Streaming Response Error"**: Usually caused by a mismatch between the Tool output and the Component props. Check `tambo-config.tsx` to ensure `propsSchema` matches the expected data.
- **"Supabase Connection Failed"**: Verify your `SUPABASE_URL`. Ensure the Edge Functions listed in `tambo-config.tsx` (like `appointments`, `medical-history`) are actually deployed in your Supabase project.
- **"Implicit Any" (TypeScript)**: We have fixed the core components, but adding new fields might trigger lint warnings. Ensure every new interface is documented in its component file.

---

## 🚀 Deployment

- **Hosting**: Recommended host is **Vercel**.
- **Variables**: Don't forget to add all `.env` variables to your Vercel Dashboard!

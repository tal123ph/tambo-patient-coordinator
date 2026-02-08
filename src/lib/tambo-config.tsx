import { AppointmentList } from "@/components/tambo/AppointmentList";
import { AppointmentForm } from "@/components/tambo/AppointmentForm";
import { VitalsForm } from "@/components/tambo/VitalsForm";
import { PrescriptionForm } from "@/components/tambo/PrescriptionForm";
import { MedicalHistory } from "@/components/tambo/MedicalHistory";
import { MedicalRecordForm } from "@/components/tambo/MedicalRecordForm";
import { NewPatientForm } from "@/components/tambo/NewPatientForm";

// --- COMPONENT REGISTRATION ---
export const tamboComponents: TamboComponent[] = [
    // ... (previous ones)
    {
        name: "MedicalRecordForm",
        description: "A form to add a new clinical entry to a patient's medical history.",
        component: MedicalRecordForm,
        propsSchema: z.object({
            patientName: z.string().optional().default(""),
            doctorName: z.string().optional().default("Sarah"),
        }),
    },
    // ... 
];

// --- HELPER FOR SUPABASE FUNCTIONS ---
async function callSupabaseFunction(name: string, body: any) {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/${name}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(body),
    });
    return response.json();
}

// --- TOOL DEFINITIONS ---
export const tamboTools: TamboTool[] = [
    defineTool({
        name: "getAppointments",
        description: "Fetches appointments based on user role and context from Supabase backend.",
        inputSchema: z.object({
            role: z.string(),
            patientName: z.string().optional().describe("Only for patients to see their own"),
        }),
        outputSchema: z.object({
            appointments: z.array(z.any()),
        }),
        tool: async (input) => {
            const normalizedInput = {
                ...input,
                role: input.role.toLowerCase()
            };
            return await callSupabaseFunction('appointments', normalizedInput);
        },
    }),
    defineTool({
        name: "getMedicalHistory",
        description: "Fetches medical history for a patient from Supabase backend. ONLY accessible by DOCTORS.",
        inputSchema: z.object({
            patientName: z.string(),
        }),
        outputSchema: z.object({
            patientName: z.string(),
            history: z.array(z.any()),
        }),
        tool: async (input) => {
            return await callSupabaseFunction('medical-history', input);
        },
    }),
    defineTool({
        name: "registerPatient",
        description: "Registers a new patient in the medical system using Supabase backend.",
        inputSchema: z.object({
            name: z.string(),
            dob: z.string(),
            notes: z.string().optional(),
        }),
        outputSchema: z.object({
            success: z.boolean(),
            message: z.string(),
            patientId: z.string(),
        }),
        tool: async (input) => {
            return await callSupabaseFunction('register-patient', input);
        },
    }),
    defineTool({
        name: "scheduleAppointment",
        description: "Schedules a new appointment in the system.",
        inputSchema: z.object({
            patientName: z.string(),
            date: z.string(),
            time: z.string(),
            reason: z.string(),
        }),
        outputSchema: z.object({
            success: z.boolean(),
            message: z.string(),
        }),
        tool: async (input) => {
            // Mocking the backend call
            console.log("Scheduling Appointment:", input);
            return { success: true, message: "Appointment scheduled successfully" };
        },
    }),
];

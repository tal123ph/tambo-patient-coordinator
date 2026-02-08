import { type TamboComponent, type TamboTool, defineTool } from "@tambo-ai/react";
import { z } from "zod";
import { AppointmentList } from "@/components/tambo/AppointmentList";
import { AppointmentForm } from "@/components/tambo/AppointmentForm";
import { VitalsForm } from "@/components/tambo/VitalsForm";
import { PrescriptionForm } from "@/components/tambo/PrescriptionForm";
import { MedicalHistory } from "@/components/tambo/MedicalHistory";
import { MedicalRecordForm } from "@/components/tambo/MedicalRecordForm";
import { NewPatientForm } from "@/components/tambo/NewPatientForm";

// --- MOCK DATA ---
const MOCK_APPOINTMENTS = [
    { id: "1", patientName: "John Doe", time: "9:00 AM", reason: "Follow-up, Diabetes", status: "scheduled", room: "1", doctor: "Sarah" },
    { id: "2", patientName: "Mary Smith", time: "10:30 AM", reason: "New Patient, Flu symptoms", status: "scheduled", room: "2", doctor: "Sarah" },
    { id: "3", patientName: "Bob Johnson", time: "2:00 PM", reason: "Annual Checkup", status: "scheduled", room: "3", doctor: "Mike" },
];

const MOCK_HISTORY = [
    { date: "Oct 12, 2025", diagnosis: "Type 2 Diabetes", doctor: "Sarah", notes: "Patient shows improving A1C levels. Continued Metformin." },
    { date: "Jan 05, 2025", diagnosis: "Hypertension", doctor: "Mike", notes: "Blood pressure elevated. Recommended low sodium diet." },
];

// --- COMPONENT REGISTRATION ---
export const tamboComponents: TamboComponent[] = [
    {
        name: "AppointmentList",
        description: "Displays a list of medical appointments for doctors, nurses, or patients.",
        component: AppointmentList,
        propsSchema: z.object({
            role: z.string().optional().default("patient"),
            appointments: z.array(z.any()).default([]),
        }),
    },
    {
        name: "AppointmentForm",
        description: "A form to schedule a new medical appointment.",
        component: AppointmentForm,
        propsSchema: z.object({
            patientName: z.string().optional().default(""),
            doctorName: z.string().optional().default("Sarah"),
        }),
    },
    {
        name: "VitalsForm",
        description: "A form to record patient vitals like blood pressure, temperature, and weight.",
        component: VitalsForm,
        propsSchema: z.object({
            patientId: z.string().optional().default(""),
            patientName: z.string().optional().default(""),
        }),
    },
    {
        name: "PrescriptionForm",
        description: "A form for doctors to prescribe medication to patients.",
        component: PrescriptionForm,
        propsSchema: z.object({
            patientId: z.string().optional().default(""),
            patientName: z.string().optional().default(""),
            doctorName: z.string().optional().default("Sarah"),
        }),
    },
    {
        name: "MedicalHistory",
        description: "Displays a patient's medical history highlights.",
        component: MedicalHistory,
        propsSchema: z.object({
            patientName: z.string().optional().default("Unknown Patient"),
            history: z.array(z.any()).default([]),
        }),
    },
    {
        name: "MedicalRecordForm",
        description: "A form to add a new clinical entry to a patient's medical history.",
        component: MedicalRecordForm,
        propsSchema: z.object({
            patientName: z.string().optional().default(""),
            doctorName: z.string().optional().default("Sarah"),
        }),
    },
    {
        name: "NewPatientForm",
        description: "A form to register a new patient in the system.",
        component: NewPatientForm,
        propsSchema: z.object({
            patientName: z.string().optional(),
        }),
    },
];

// --- HELPER FOR SUPABASE FUNCTIONS ---
async function callSupabaseFunction(name: string, body: any) {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/${name}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify(body),
        });
        return response.json();
    } catch (e) {
        console.error("Supabase Call Error:", e);
        return { error: "Failed to connect to backend" };
    }
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

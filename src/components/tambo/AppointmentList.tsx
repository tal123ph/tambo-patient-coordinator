import React from "react";
import { Calendar, Clock, User, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
    id: string;
    patientName: string;
    time: string;
    reason: string;
    status: "scheduled" | "completed" | "cancelled";
    room?: string;
    doctor?: string;
}

interface AppointmentListProps {
    appointments: Appointment[];
    role: "doctor" | "nurse" | "patient";
}

export function AppointmentList({ appointments: rawAppointments = [], role: rawRole = "patient" }: AppointmentListProps) {
    // Debug log to identify data shape
    console.log("AppointmentList Data:", { rawAppointments, rawRole });

    const role = (rawRole || "patient").toString().toLowerCase() as "doctor" | "nurse" | "patient";

    // Normalize appointments data safely
    let appointments: Appointment[] = [];
    if (Array.isArray(rawAppointments)) {
        appointments = rawAppointments;
    } else if (rawAppointments && typeof rawAppointments === 'object') {
        const anyRaw = rawAppointments as any;
        if (Array.isArray(anyRaw.appointments)) {
            appointments = anyRaw.appointments;
        } else if (anyRaw.id) {
            appointments = [anyRaw as Appointment];
        }
    }

    return (
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                    {role === "doctor" && <Clock className="w-5 h-5" />}
                    {role === "nurse" && <FileText className="w-5 h-5" />}
                    {role === "patient" && <Calendar className="w-5 h-5" />}
                    {role === "doctor" ? "Today's Schedule" : role === "nurse" ? "Pending Tasks" : "My Appointments"}
                </h3>
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2.5 py-1 rounded-full">
                    {appointments.length} {appointments.length === 1 ? 'Entry' : 'Entries'}
                </span>
            </div>
            {appointments.length === 0 && (
                <div className="p-8 text-center text-slate-400 italic">
                    No appointments found.
                </div>
            )}
            <div className="divide-y divide-blue-50">
                {appointments
                    .filter((a: Appointment) => a && a.id) // Filter out nulls or malformed entries
                    .map((appt: Appointment) => (
                        <div key={appt.id} className="p-4 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-white p-2 rounded-lg border border-blue-100 shadow-sm">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-slate-900">{appt.patientName}</p>
                                            {appt.room && (
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                                    Room {appt.room}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                                            <Clock className="w-3.5 h-3.5" /> {appt.time}
                                            <span className="text-slate-300 mx-1">•</span>
                                            <span className="italic">{appt.reason}</span>
                                        </p>
                                        {role === "doctor" && (
                                            <div className="flex gap-2 mt-3">
                                                <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors">
                                                    View History
                                                </button>
                                                <button className="text-xs bg-white text-slate-700 border border-slate-200 px-3 py-1.5 rounded-md font-medium hover:bg-slate-50 transition-colors">
                                                    Prescribe
                                                </button>
                                            </div>
                                        )}
                                        {role === "nurse" && appt.status !== "completed" && (
                                            <button className="mt-3 text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-md font-medium hover:bg-emerald-600 transition-colors flex items-center gap-1.5">
                                                Record Vitals
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors" />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

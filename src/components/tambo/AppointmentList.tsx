import React from "react";
import { Calendar, Clock, User, FileText, ChevronRight, Activity } from "lucide-react";
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
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 bg-white p-2 rounded-xl border border-blue-100 shadow-sm group-hover:border-blue-300 transition-colors">
                                        <Clock className="w-4 h-4 text-blue-500" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-slate-900">{appt.patientName}</p>
                                            {appt.status && (
                                                <span className={cn(
                                                    "text-[8px] uppercase tracking-widest font-black px-2 py-0.5 rounded-full",
                                                    appt.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                                                        appt.status === "cancelled" ? "bg-red-100 text-red-700" :
                                                            "bg-amber-100 text-amber-700"
                                                )}>
                                                    {appt.status}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                                            <Clock className="w-3.5 h-3.5 opacity-60" /> {appt.time}
                                            {appt.room && (
                                                <>
                                                    <span className="text-slate-300 mx-1">•</span>
                                                    <span className="font-semibold text-blue-600">Room {appt.room}</span>
                                                </>
                                            )}
                                        </p>
                                        <p className="text-sm text-slate-600 italic mt-2 bg-slate-50/80 px-3 py-2 rounded-lg border border-slate-100">
                                            {appt.reason}
                                        </p>
                                        {role === "doctor" && (
                                            <div className="flex gap-2 mt-4">
                                                <button className="text-[10px] uppercase font-bold tracking-wider bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                                                    Check History
                                                </button>
                                                <button className="text-[10px] uppercase font-bold tracking-wider bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all">
                                                    Prescribe
                                                </button>
                                            </div>
                                        )}
                                        {role === "nurse" && appt.status !== "completed" && (
                                            <button className="mt-4 text-[10px] uppercase font-bold tracking-wider bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center gap-2">
                                                <Activity className="w-3 h-3" /> Record Vitals
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all group-hover:bg-blue-50">
                                    <ChevronRight className="w-4 h-4 text-blue-400" />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

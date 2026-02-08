import React, { useState } from "react";
import { Calendar, Clock, User, FileText, Send, CheckCircle2 } from "lucide-react";

interface AppointmentData {
    patientName: string;
    date: string;
    time: string;
    reason: string;
}

interface AppointmentFormProps {
    patientName?: string;
    doctorName?: string;
    onSubmit?: (data: AppointmentData) => void;
}

export function AppointmentForm({ patientName: initialPatientName = "", doctorName = "Sarah", onSubmit = () => { } }: AppointmentFormProps) {
    const [formData, setFormData] = useState<AppointmentData>({
        patientName: initialPatientName,
        date: "",
        time: "",
        reason: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center max-w-md shadow-lg animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Appointment Scheduled</h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                    A new session has been booked for <strong>{formData.patientName}</strong> on {formData.date} at {formData.time}.
                </p>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        Schedule Another
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-900 p-6 text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-black tracking-tight uppercase">New Booking</h3>
                </div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest relative z-10 ml-1">
                    Care Coordinator Interface
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Patient Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300"
                            placeholder="e.g. John Doe"
                            value={formData.patientName}
                            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date</label>
                        <div className="relative group">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="date"
                                required
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Time</label>
                        <div className="relative group">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="time"
                                required
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-800"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Reason for Visit</label>
                    <div className="relative group">
                        <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <textarea
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-600 min-h-[100px] resize-none"
                            placeholder="Consultation details..."
                            value={formData.reason}
                            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-xl shadow-xl shadow-blue-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 border border-blue-500"
                >
                    <Send className="w-4 h-4 shadow-sm" /> Finalize Appointment
                </button>
            </form>
        </div>
    );
}

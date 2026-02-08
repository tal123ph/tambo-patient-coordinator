import React, { useState } from "react";
import { Pill, Send, AlertCircle, CheckCircle2 } from "lucide-react";

interface PrescriptionData {
    medication: string;
    dosage: string;
    instructions: string;
}

interface PrescriptionFormProps {
    patientId: string;
    patientName: string;
    doctorName: string;
    onSubmit: (data: PrescriptionData) => void;
}

export function PrescriptionForm({ patientId, patientName, doctorName = "Sarah", onSubmit = () => { } }: PrescriptionFormProps) {
    const [medication, setMedication] = useState("");
    const [dosage, setDosage] = useState("");
    const [instructions, setInstructions] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ medication, dosage, instructions });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center max-w-md shadow-sm">
                <CheckCircle2 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-blue-900 mb-2">Prescription Sent</h3>
                <p className="text-blue-700">Prescription for <strong>{medication}</strong> has been sent to the pharmacy for <strong>{patientName}</strong>.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-6 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Pill className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">New Prescription</h3>
                </div>
                <div className="flex items-center gap-2 text-slate-400 relative z-10 ml-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400/80">Authorized Clinical Order</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex justify-between items-center mb-2">
                    <div>
                        <p className="text-[8px] uppercase font-black text-slate-400 tracking-tighter">Patient</p>
                        <p className="text-sm font-bold text-slate-700">{patientName}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] uppercase font-black text-slate-400 tracking-tighter">Physician</p>
                        <p className="text-sm font-bold text-slate-700">Dr. {doctorName}</p>
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">Medication Name</label>
                    <div className="relative group">
                        <input
                            type="text"
                            autoFocus
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 font-bold text-slate-800"
                            placeholder="e.g. Amoxicillin"
                            value={medication}
                            onChange={(e) => setMedication(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">Dosage</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 font-semibold"
                            placeholder="500mg"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">Frequency</label>
                        <div className="relative">
                            <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none font-semibold cursor-pointer">
                                <option>Once daily</option>
                                <option>Twice daily</option>
                                <option>Three times daily</option>
                                <option>As needed</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                <Send className="w-3 h-3 rotate-90" />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">Special Instructions</label>
                    <textarea
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 min-h-[100px] text-sm text-slate-600 resize-none font-medium"
                        placeholder="Take with food, avoid alcohol..."
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </div>

                <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100 shadow-sm animate-pulse-slow">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-800 leading-relaxed font-semibold">
                        CRITICAL: Verify medication, dosage, and patient allergies before authorization. This action is recorded.
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-widest text-[10px] py-5 rounded-xl shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 border border-slate-800"
                >
                    <Send className="w-4 h-4 text-blue-400" /> Authorize & Send Order
                </button>
            </form>
        </div>
    );
}

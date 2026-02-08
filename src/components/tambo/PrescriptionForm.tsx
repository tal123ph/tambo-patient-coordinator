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
            <div className="bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-3 mb-1">
                    <Pill className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold italic">New Prescription</h3>
                </div>
                <p className="text-slate-400 text-xs">Doctor: {doctorName} | Patient: {patientName}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 block">Medication Name</label>
                    <input
                        type="text"
                        autoFocus
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 font-medium"
                        placeholder="e.g. Amoxicillin"
                        value={medication}
                        onChange={(e) => setMedication(e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 block">Dosage</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                            placeholder="500mg"
                            value={dosage}
                            onChange={(e) => setDosage(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 block">Frequency</label>
                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none">
                            <option>Once daily</option>
                            <option>Twice daily</option>
                            <option>Three times daily</option>
                            <option>As needed</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2 block">Instructions</label>
                    <textarea
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-300 min-h-[100px]"
                        placeholder="Take with food, avoid alcohol..."
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </div>

                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-700 leading-relaxed">
                        Please verify all dosage information and check for any known patient allergies before submitting this request.
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                >
                    <Send className="w-4 h-4" /> Authorize & Send
                </button>
            </form>
        </div>
    );
}

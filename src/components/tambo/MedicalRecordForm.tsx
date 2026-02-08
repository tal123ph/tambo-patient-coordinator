import React, { useState } from "react";
import { FileText, Save, CheckCircle2, User, Stethoscope } from "lucide-react";

interface RecordData {
    patientName: string;
    diagnosis: string;
    doctor: string;
    notes: string;
}

interface MedicalRecordFormProps {
    patientName?: string;
    doctorName?: string;
    onSubmit?: (data: RecordData) => void;
}

export function MedicalRecordForm({ patientName: initialPatientName = "", doctorName = "Sarah", onSubmit = () => { } }: MedicalRecordFormProps) {
    const [formData, setFormData] = useState<RecordData>({
        patientName: initialPatientName,
        diagnosis: "",
        doctor: doctorName,
        notes: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center max-w-md shadow-lg animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-2">Record Updated</h3>
                <p className="text-emerald-700 text-sm leading-relaxed">
                    New clinical history entry for <strong>{formData.patientName}</strong> has been saved successfully.
                </p>
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-800 transition-colors"
                    >
                        Add Another Entry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-900 p-6 text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                        <FileText className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-black tracking-tight uppercase">Update History</h3>
                </div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest relative z-10 ml-1">
                    Clinical Note Interface
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Patient Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300"
                            placeholder="e.g. John Doe"
                            value={formData.patientName}
                            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Primary Diagnosis</label>
                    <div className="relative group">
                        <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300"
                            placeholder="e.g. Chronic Hypertension"
                            value={formData.diagnosis}
                            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Clinical Observations</label>
                    <div className="relative group">
                        <FileText className="absolute left-4 top-4 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <textarea
                            required
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-slate-600 min-h-[120px] resize-none"
                            placeholder="Detailed notes on patient condition, symptoms, and plan..."
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-[10px] py-4 rounded-xl shadow-xl shadow-emerald-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 border border-emerald-500"
                >
                    <Save className="w-4 h-4 shadow-sm" /> Save Clinical Entry
                </button>
            </form>
        </div>
    );
}

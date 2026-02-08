import React, { useState } from "react";
import { UserPlus, Save, X, User, Calendar, FileText } from "lucide-react";

interface NewPatientFormProps {
    onSubmit?: (data: any) => void;
}

interface PatientFormData {
    name: string;
    dob: string;
    gender: string;
    notes: string;
}

export function NewPatientForm({ onSubmit = () => { } }: NewPatientFormProps) {
    const [formData, setFormData] = useState<PatientFormData>({
        name: "",
        dob: "",
        gender: "Male",
        notes: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        alert(`Patient ${formData.name} added successfully! (Mock)`);
    };

    return (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
            <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                <div className="flex items-center gap-4 mb-2 relative z-10">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight">Register Patient</h3>
                        <p className="text-blue-100 text-xs font-medium uppercase tracking-widest">New Medical Record Entry</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">
                            Full Legal Name
                        </label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                required
                                className="w-full px-11 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-700 font-bold transition-all"
                                placeholder="e.g. Jane Doe"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">
                            Date of Birth
                        </label>
                        <div className="relative group">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="date"
                                required
                                className="w-full px-11 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-700 font-bold transition-all"
                                value={formData.dob}
                                onChange={e => setFormData({ ...formData, dob: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block ml-1">
                        Clinical Notes & Observations
                    </label>
                    <div className="relative group">
                        <FileText className="absolute left-4 top-5 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <textarea
                            className="w-full px-11 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-700 font-medium min-h-[140px] resize-none transition-all"
                            placeholder="Reason for visit, initial symptoms, medical prerequisites..."
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-blue-100"
                    >
                        <Save className="w-5 h-5" /> Initialize Medical Record
                    </button>
                    <button
                        type="button"
                        className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px] py-5 rounded-2xl transition-all active:scale-[0.98]"
                    >
                        Discard
                    </button>
                </div>
            </form>
        </div>
    );
}

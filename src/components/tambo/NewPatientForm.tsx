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
            <div className="bg-blue-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-1">
                    <UserPlus className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Register New Patient</h3>
                </div>
                <p className="text-blue-100 text-sm">Fill in the details to create a new medical record.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                            <User className="w-3 h-3" /> Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium"
                            placeholder="e.g. Jane Doe"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                            <Calendar className="w-3 h-3" /> Date of Birth
                        </label>
                        <input
                            type="date"
                            required
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium"
                            value={formData.dob}
                            onChange={e => setFormData({ ...formData, dob: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                        <FileText className="w-3 h-3" /> Initial Notes / Diagnosis
                    </label>
                    <textarea
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium min-h-[100px]"
                        placeholder="Describe initial symptoms or reason for visit..."
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                        <Save className="w-5 h-5" /> Save Record
                    </button>
                    <button
                        type="button"
                        className="px-6 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-2.5 rounded-xl transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

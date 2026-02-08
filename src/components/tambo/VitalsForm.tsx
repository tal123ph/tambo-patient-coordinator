import React, { useState } from "react";
import { Activity, Thermometer, Weight, Heart, CheckCircle2 } from "lucide-react";

interface VitalsData {
    bp: string;
    temp: string;
    heartRate: string;
    weight: string;
}

interface VitalsFormProps {
    patientId: string;
    patientName: string;
    onSubmit: (data: VitalsData) => void;
}

export function VitalsForm({ patientId, patientName, onSubmit = () => { } }: VitalsFormProps) {
    const [vitals, setVitals] = useState<VitalsData>({
        bp: "",
        temp: "",
        heartRate: "",
        weight: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSave = () => {
        onSubmit(vitals);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center max-w-md shadow-sm">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-900 mb-2">Vitals Recorded</h3>
                <p className="text-emerald-700">Medical record for <strong>{patientName}</strong> has been updated successfully.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden">
            <div className="bg-emerald-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-1">
                    <Activity className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Record Vitals</h3>
                </div>
                <p className="text-emerald-100 text-sm">Patient: {patientName}</p>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Blood Pressure</label>
                        <div className="relative group">
                            <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="120/80"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                                value={vitals.bp}
                                onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Temp (°F)</label>
                        <div className="relative group">
                            <Thermometer className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="98.6"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                                value={vitals.temp}
                                onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Heart Rate</label>
                        <div className="relative group">
                            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="72"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                                value={vitals.heartRate}
                                onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Weight (kg)</label>
                        <div className="relative group">
                            <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="70"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                                value={vitals.weight}
                                onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    <Activity className="w-4 h-4" /> Save Patient Vitals
                </button>
            </div>
        </div>
    );
}

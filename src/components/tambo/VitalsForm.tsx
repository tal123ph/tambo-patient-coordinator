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
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="bg-primary p-6 text-white">
                <div className="flex items-center gap-3 mb-1">
                    <Activity className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Record Vitals</h3>
                </div>
                <p className="text-blue-100 text-sm">Patient: {patientName}</p>
            </div>

            <div className="p-6 space-y-4">
                <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Blood Pressure (mmHg)</label>
                    <div className="relative">
                        <Activity className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="120/80"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                            value={vitals.bp}
                            onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Temp (°F)</label>
                        <div className="relative">
                            <Thermometer className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="98.6"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                                value={vitals.temp}
                                onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Weight (kg)</label>
                        <div className="relative">
                            <Weight className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="70"
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                                value={vitals.weight}
                                onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Heart Rate (bpm)</label>
                    <div className="relative">
                        <Heart className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="72"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                            value={vitals.heartRate}
                            onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4"
                >
                    Save Patient Vitals
                </button>
            </div>
        </div>
    );
}

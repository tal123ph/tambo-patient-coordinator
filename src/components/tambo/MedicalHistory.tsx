import React from "react";
import { History, ClipboardList, Thermometer, User, Calendar } from "lucide-react";

interface MedicalHistoryProps {
    patientName: string;
    history: {
        date: string;
        diagnosis: string;
        doctor: string;
        notes: string;
    }[];
}

export function MedicalHistory({ patientName, history: rawHistory }: MedicalHistoryProps) {
    // Debug log to help identify what the AI is passing
    console.log("MedicalHistory Props:", { patientName, rawHistory });

    // Handle cases where the AI might pass the whole tool result as 'history' prop
    let history = Array.isArray(rawHistory) ? rawHistory :
        (rawHistory && typeof rawHistory === 'object' && Array.isArray((rawHistory as any).history)) ? (rawHistory as any).history :
            [];

    return (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-emerald-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-1">
                    <History className="w-6 h-6" />
                    <h3 className="text-xl font-bold">Medical History</h3>
                </div>
                <p className="text-emerald-100 text-sm">Patient: {patientName || "Unknown"}</p>
            </div>

            <div className="p-0 bg-white">
                {(!Array.isArray(history) || history.length === 0) ? (
                    <div className="p-10 text-center text-slate-400">
                        <History className="w-10 h-10 mx-auto mb-3 opacity-20" />
                        <p className="text-sm font-medium">No medical history records found for this patient.</p>
                        <div className="mt-4 p-2 bg-slate-50 rounded text-[10px] text-left overflow-auto max-h-32">
                            <p className="font-bold mb-1">Debug Info:</p>
                            <pre>{JSON.stringify({ patientName, historyType: typeof history, isArray: Array.isArray(history), historyData: history }, null, 2)}</pre>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 p-2">
                        {history.filter((r: any) => r !== null).map((record: any, idx: number) => (
                            <div key={idx} className="p-6 hover:bg-slate-50/80 transition-all duration-300 group rounded-xl my-1 border border-transparent hover:border-emerald-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                            <ClipboardList className="w-4 h-4 text-emerald-600" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                            {record.diagnosis}
                                        </h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-100 px-3 py-1 rounded-full shadow-sm">
                                        <Calendar className="w-3 h-3 text-emerald-500" /> {record.date}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                                            {record.doctor?.split(' ').map((n: string) => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 leading-none mb-1">Attending Physician</p>
                                            <p className="text-sm font-semibold text-slate-700">{record.doctor}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 relative overflow-hidden group-hover:bg-white transition-colors">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-50"></div>
                                    <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 flex items-center gap-2">
                                        <ClipboardList className="w-3 h-3" /> Clinical Notes
                                    </p>
                                    <p className="text-sm text-slate-600 leading-relaxed italic">
                                        {record.notes}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

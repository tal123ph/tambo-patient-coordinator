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
                    history.filter(r => r !== null).map((record: any, idx: number) => (
                        <div key={idx} className="p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-600 uppercase tracking-tighter">{record.date || 'N/A'}</span>
                                </div>
                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full font-medium flex items-center gap-1.5">
                                    <User className="w-3 h-3" /> Dr. {record.doctor || 'Unknown'}
                                </span>
                            </div>

                            <h4 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                                <ClipboardList className="w-5 h-5 text-emerald-500" />
                                {record.diagnosis || 'No Diagnosis Recorded'}
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed bg-white p-3 rounded-lg border border-slate-100 shadow-sm mt-3 italic">
                                "{record.notes || 'No notes available'}"
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

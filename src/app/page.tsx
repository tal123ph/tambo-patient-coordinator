"use client";

import React, { useState } from "react";
import { TamboProvider, useTamboThread, useTamboThreadInput } from "@tambo-ai/react";
import { tamboComponents, tamboTools } from "@/lib/tambo-config";
import { User, Activity, Shield, LogOut, Send, Bot, UserCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface Role {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  role: "doctor" | "nurse" | "patient";
}

const ROLES: Role[] = [
  { id: "doctor", name: "Dr. Sarah", icon: UserCircle, color: "bg-blue-600", role: "doctor" },
  { id: "nurse", name: "Nurse Mike", icon: Activity, color: "bg-emerald-600", role: "nurse" },
  { id: "patient", name: "John Doe", icon: User, color: "bg-orange-500", role: "patient" },
];

const SUGGESTIONS = {
  doctor: [
    { label: "Check my schedule", prompt: "Show me my schedule for today" },
    { label: "Medical history", prompt: "View medical history for John Doe" },
    { label: "New prescription", prompt: "I need to write a new prescription" }
  ],
  nurse: [
    { label: "Pending tasks", prompt: "Show me my pending tasks for today" },
    { label: "Record vitals", prompt: "I need to record patient vitals" },
    { label: "Add patient", prompt: "Register a new patient in the system" }
  ],
  patient: [
    { label: "My appointments", prompt: "See my upcoming appointments" },
    { label: "Medical advice", prompt: "I have a question about my medication" },
    { label: "Talk to assistant", prompt: "Connect me with a health assistant" }
  ]
};

function ChatInterface({ currentRole }: { currentRole: Role }) {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  const handleSuggestionClick = (prompt: string) => {
    setValue(prompt);
    // Use a small timeout to allow state to update before submit
    setTimeout(() => submit(), 50);
  };

  const suggestions = SUGGESTIONS[currentRole.role] || [];

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-200 shadow-2xl">
      <div className="p-6 border-b border-slate-200 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 tracking-tight">Care Assistant</h1>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active • AI Powered</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {thread.messages.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <Bot className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">How can I help you, {currentRole.name}?</h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
              Ask me about your schedule, patient records, or recording vitals.
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(s.prompt)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
        {thread.messages.map((message) => {
          const contentString = Array.isArray(message.content)
            ? message.content.map(p => p.type === 'text' ? p.text : '').join('')
            : String(message.content);

          const isRawJson = contentString.trim().startsWith('{') && contentString.trim().endsWith('}');

          return (
            <div key={message.id} className={cn("flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300", message.role === "user" ? "items-end" : "items-start")}>
              {!isRawJson && (
                <div className={cn(
                  "max-w-[85%] rounded-2xl p-4 text-sm shadow-sm",
                  message.role === "user"
                    ? "bg-slate-900 text-white rounded-tr-none"
                    : "bg-white text-slate-700 border border-slate-100 rounded-tl-none font-medium"
                )}>
                  {Array.isArray(message.content) ? (
                    message.content.map((part, i) =>
                      part.type === "text" ? <p key={i} className="leading-relaxed">{part.text}</p> : null
                    )
                  ) : (
                    <p className="leading-relaxed">{String(message.content)}</p>
                  )}
                </div>
              )}
              {message.renderedComponent && (
                <div className="w-full mt-2 animate-in zoom-in-95 duration-500">
                  {message.renderedComponent}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 bg-white border-t border-slate-200">
        <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {thread.messages.length > 0 && suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(s.prompt)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm shrink-0"
            >
              {s.label}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          className="relative group"
        >
          <input
            className="w-full bg-slate-100 border-none rounded-2xl pl-5 pr-14 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            placeholder="Type your message..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending || !value.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-white rounded-xl flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-primary/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-medium">
          Logged in as <strong>{currentRole.role}</strong> • Sensitive data encrypted
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentRole, setCurrentRole] = useState(ROLES[0]);

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY || "MOCK_API_KEY"}
      components={tamboComponents}
      tools={tamboTools}
      contextHelpers={{
        user: async () => ({
          role: currentRole.role,
          name: currentRole.name,
          id: currentRole.id
        }),
        currentTime: () => new Date().toLocaleTimeString(),
        systemPrompt: () => [
          {
            role: "system",
            content: `You are the Tambo Health Care Assistant. You are currently assisting ${currentRole.name} who is a ${currentRole.role}. 
            
            CORE DIRECTIVE:
            - ALWAYS prioritize using UI components over long text explanations.
            - If a request involves structured data (History, Appointments, Vitals), use the corresponding tool/component immediately.
            - PROACTIVE UI LOGIC: If a tool returns NO DATA (e.g., empty appointments or history), DO NOT just tell the user it's empty. Instead, IMPROVISE by showing a FORM to add/register that data.
            
            SPECIFIC COMPONENT LOGIC:
            - Appointments: 
               - Call 'getAppointments'. 
               - If result is empty array -> Render 'AppointmentForm'.
               - If result has data -> Render 'AppointmentList'.
            - Medical History:
               - Call 'getMedicalHistory' (Doctors only).
               - If patient not found or history empty -> Render 'MedicalRecordForm' to add a clinical entry.
               - If they are entirely new to the clinic -> Render 'NewPatientForm'.
            - Prescriptions: 
               - IMMEDIATELY show 'PrescriptionForm'.
            - Vitals: 
               - IMMEDIATELY show 'VitalsForm'.
               
            RULES:
            - When you call a tool, you MUST immediately render the corresponding component.
            - Pass results from tool CALL directly into the component's props.
            - NEVER output raw tool result JSON.`
          }
        ]
      }}
    >
      <main className="flex h-screen bg-slate-50 font-sans overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 flex flex-col p-6 shadow-xl z-10 healthcare-gradient/20">
          <div className="flex items-center gap-3 mb-10 p-2 bg-white/50 backdrop-blur rounded-2xl shadow-sm border border-white/80">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <Shield className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic">TAMBO <span className="text-primary not-italic">HEALTH</span></h2>
          </div>

          <div className="space-y-1 flex-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-3">Switch Identity</h3>
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => setCurrentRole(role)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl transition-all group relative overflow-hidden",
                  currentRole.id === role.id
                    ? "bg-slate-900 text-white shadow-xl translate-x-2"
                    : "hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all",
                  currentRole.id === role.id ? "bg-white/10" : "bg-slate-100 group-hover:bg-white border border-slate-200 shadow-sm"
                )}>
                  <role.icon className={cn("w-5 h-5", currentRole.id === role.id ? "text-white" : "text-slate-500")} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm leading-none mb-1">{role.name}</p>
                  <p className={cn("text-[10px] uppercase font-bold tracking-wider", currentRole.id === role.id ? "text-blue-200" : "text-slate-400")}>
                    {role.role}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-slate-100">
            <button className="flex items-center gap-3 p-4 w-full rounded-xl hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all font-bold text-sm">
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Chat / Main Content Area */}
        <div className="flex-1 h-full overflow-hidden">
          <ChatInterface currentRole={currentRole} />
        </div>
      </main>
    </TamboProvider>
  );
}

/**
 * Lead storage layer. Prototype uses localStorage (single browser only, not secure,
 * not shared). To centralise later, replace the bodies of `saveLead`, `getLeads`
 * and `clearLeads` with Lovable Cloud database calls — callers stay unchanged.
 */
export type LeadSource =
  | "Contact Form"
  | "Consultation Booking"
  | "Eligibility Checker"
  | "WhatsApp Click";

export interface Lead {
  id: string;
  createdAt: string; // ISO
  fullName: string;
  phone: string;
  email: string;
  service: string;
  consultationDate: string;
  preferredContact: string;
  eligibilityResult: string;
  source: LeadSource;
  message: string;
  consent: boolean;
}

const KEY = "imperial_leads_v1";

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Lead[];
  } catch {
    return [];
  }
}

export function saveLead(input: Partial<Lead> & { source: LeadSource }): Lead {
  const lead: Lead = {
    id: "LD-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase(),
    createdAt: new Date().toISOString(),
    fullName: "",
    phone: "",
    email: "",
    service: "",
    consultationDate: "",
    preferredContact: "",
    eligibilityResult: "",
    message: "",
    consent: false,
    ...input,
  };
  const all = getLeads();
  all.unshift(lead);
  localStorage.setItem(KEY, JSON.stringify(all));
  return lead;
}

export function clearLeads() {
  localStorage.removeItem(KEY);
}

export function trackWhatsApp(context: string) {
  try {
    saveLead({ source: "WhatsApp Click", message: `WhatsApp CTA clicked: ${context}` });
  } catch {
    /* ignore */
  }
}

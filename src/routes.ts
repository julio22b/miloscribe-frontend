export const ROUTES = {
    LOGIN: '/login',
    PATIENTS: '/patients',
    PATIENTS_NEW: '/patients/new',
    CONSULTATION_NEW: '/patients/consultation/new',
    CONSULTATION_NEW_EXISTING_PATIENT: '/patients/:id/consultation/new',
    CONSULTATION_DOCUMENT: '/consultations/:id/document',
} as const;

import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/authSlice';
import patientsSlice from '@/features/patients/patientsSlice';
import consultationsSlice from '@/features/consultations/consultationsSlice';

const rootReducer = {
    auth: authSlice,
    patients: patientsSlice,
    consultations: consultationsSlice,
};

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

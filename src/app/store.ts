import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/authSlice';
import patientsSlice from '@/features/patients/patientsSlice';

const rootReducer = {
    auth: authSlice,
    patients: patientsSlice,
};

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

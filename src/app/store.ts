import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/features/auth/authSlice';

const rootReducer = {
    auth: authSlice.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

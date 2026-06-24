import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type Consultation } from '@/types/types';
import api from '@/api/axiosInstance';
import { getErrorMessage } from '@/lib/utils';

interface ConsultationsState {
    currentConsultation: Consultation | null;
    document: Document | null;
    processingMessage: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: ConsultationsState = {
    currentConsultation: null,
    document: null,
    processingMessage: null,
    loading: false,
    error: null,
};

export const createConsultation = createAsyncThunk<Consultation, FormData, { rejectValue: string }>(
    'consultations/createConsultation',
    async (payload, thunkAPI) => {
        try {
            const data = (await api.post<Consultation>('/consultations', payload)).data;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error));
        }
    },
);

export const processConsultation = createAsyncThunk<Consultation, { consultationID: number }, { rejectValue: string }>(
    'consultations/processConsultation',
    async (payload, thunkAPI) => {
        try {
            const data = (await api.post<Consultation>(`/consultations/${payload.consultationID}/process`, payload))
                .data;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(getErrorMessage(error));
        }
    },
);

const consultationsSlice = createSlice({
    name: 'consultations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createConsultation.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.processingMessage = 'Creating consultation...';
            })
            .addCase(createConsultation.fulfilled, (state, action) => {
                state.loading = false;
                state.processingMessage = null;
                state.currentConsultation = action.payload;
                state.document = null;
                state.error = null;
            })
            .addCase(createConsultation.rejected, (state, action) => {
                state.loading = false;
                state.processingMessage = null;
                state.error = action.payload ?? null;
            });
    },
});

export default consultationsSlice.reducer;

import api from '@/api/axiosInstance';
import { getErrorMessage } from '@/lib/utils';
import type { CreatePatientFormState, Patient } from '@/types/types';
import { createAsyncThunk, createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';

interface PatientsStateInterface {
    patients: Patient[];
    loading: boolean;
    error: string | null;
    search: string;
}

const initialState: PatientsStateInterface = {
    patients: [],
    loading: false,
    error: null,
    search: '',
};

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async (_, thunkAPI) => {
    try {
        const data = (await api.get<{ patients: Patient[] }>('/patients')).data;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
});

export const createPatient = createAsyncThunk(
    'patients/createPatient',
    async (payload: CreatePatientFormState, thunkApi) => {
        try {
            const patient = (await api.post<{ patient: Patient }>('/patients', payload)).data.patient;
            return patient;
        } catch (error) {
            return thunkApi.rejectWithValue(getErrorMessage(error));
        }
    },
);

export const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.loading = false;
                state.patients = action.payload.patients;
            })
            .addCase(createPatient.fulfilled, (state, action) => {
                state.loading = false;
                state.patients = [action.payload, ...state.patients];
            })
            .addMatcher(isAnyOf(fetchPatients.pending, createPatient.pending), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isAnyOf(fetchPatients.rejected, createPatient.rejected), (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSearch } = patientsSlice.actions;

export default patientsSlice.reducer;

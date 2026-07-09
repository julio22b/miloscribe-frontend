import api from '@/api/axiosInstance';
import { getErrorMessage } from '@/lib/utils';
import type { CreatePatientFormState, Patient, UpdatePatientFormState } from '@/types/types';
import { createAsyncThunk, createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';

interface PatientsStateInterface {
    patients: Patient[];
    loading: boolean;
    error: string | null;
    search: string;
    patientDetails: Patient | null;
}

const initialState: PatientsStateInterface = {
    patients: [],
    loading: false,
    error: null,
    search: '',
    patientDetails: null,
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

export const fetchPatient = createAsyncThunk('patients/fetch', async (id: number, thunkApi) => {
    try {
        const patient = (await api.get<{ patient: Patient }>(`/patients/${id}`)).data.patient;
        return patient;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
});

export const updatePatient = createAsyncThunk('patients/update', async (payload: UpdatePatientFormState, thunkApi) => {
    try {
        const patient = (await api.put<{ patient: Patient }>(`/patients/${payload.id}`, payload)).data.patient;
        return patient;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
});

export const deletePatient = createAsyncThunk('patients/delete', async (id: number, thunkApi) => {
    try {
        await api.patch(`/patients/${id}`);
        return id;
    } catch (error) {
        return thunkApi.rejectWithValue(getErrorMessage(error));
    }
});

export const patientsSlice = createSlice({
    name: 'patients',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setPatientDetails: (state, action: PayloadAction<Patient | null>) => {
            state.patientDetails = action.payload;
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
            .addCase(fetchPatient.fulfilled, (state, action) => {
                state.loading = false;
                state.patientDetails = action.payload;
            })
            .addCase(updatePatient.fulfilled, (state, action) => {
                state.loading = false;
                state.patients = state.patients.map((patient) =>
                    patient.id === action.payload.id ? action.payload : patient,
                );
                if (state.patientDetails?.id === action.payload.id) {
                    state.patientDetails = action.payload;
                }
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.loading = false;
                state.patients = state.patients.filter((patient) => patient.id !== action.payload);
                if (state.patientDetails?.id === action.payload) {
                    state.patientDetails = null;
                }
            })
            .addMatcher(
                isAnyOf(
                    fetchPatients.pending,
                    createPatient.pending,
                    fetchPatient.pending,
                    updatePatient.pending,
                    deletePatient.pending,
                ),
                (state) => {
                    state.loading = true;
                    state.error = null;
                },
            )
            .addMatcher(
                isAnyOf(
                    fetchPatients.rejected,
                    createPatient.rejected,
                    fetchPatient.rejected,
                    updatePatient.rejected,
                    deletePatient.rejected,
                ),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                },
            );
    },
});

export const { setSearch, setPatientDetails } = patientsSlice.actions;

export default patientsSlice.reducer;

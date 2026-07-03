import { useRef, useState } from 'react';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import type { CreatePatientFormState } from '@/types/types';
import { getAgeFromDOB, getDOBFromAge } from '@/lib/utils';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createPatient } from '@/features/patients/patientsSlice';
import { useNavigate } from 'react-router';
import FullPageLoader from '../common/FullPageLoader';
import { toast } from 'sonner';
import GoBackBtn from '../common/GoBackBtn';
import { UserPlus } from 'lucide-react';
import { PATIENT_FORM_INITIAL_STATE } from '@/app/constants';
import GenderSelector from '../common/GenderSelector';

interface PatientFormProps {
    value?: CreatePatientFormState;
    onChange?: (data: CreatePatientFormState) => void;
    isInlineForm?: boolean;
}

const PatientForm = ({ value, onChange, isInlineForm }: PatientFormProps) => {
    const { loading, error } = useAppSelector((state) => state.patients);
    const [internalState, setInternalState] = useState<CreatePatientFormState>(PATIENT_FORM_INITIAL_STATE);
    const formState = value ?? internalState;
    const setFormState = isInlineForm ? onChange! : setInternalState;
    const [age, setAge] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const nameRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.date_of_birth) {
            setErrors(['Name and date of birth are required']);
            if (!formState.name) nameRef.current?.focus();
            return;
        }

        try {
            await dispatch(createPatient(formState)).unwrap();
            toast.success('Patient successfully created');
            navigate(-1);
        } catch {
            toast.error('Error creating patient. Please try again');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className={`${!isInlineForm ? 'h-screen' : ''}`}>
            {loading && <FullPageLoader />}
            <form className={`flex flex-col gap-4 ${!isInlineForm ? 'p-4 h-full' : ''}`}>
                <div className='flex items-center gap-4'>
                    <GoBackBtn />
                    <div>
                        {!isInlineForm ? (
                            <>
                                <h1 className='text-xl font-bold'>Add new patient</h1>
                                <p className='text-sm text-muted-foreground'>
                                    They'll appear in your recent appointments.
                                </p>
                            </>
                        ) : (
                            <>
                                <h1 className='text-xl font-bold'>Quick Record</h1>
                                <p className='text-sm text-muted-foreground'>New patient will be created.</p>
                            </>
                        )}
                    </div>
                </div>
                <FieldGroup className={`${isInlineForm && 'bg-white rounded-lg p-4 border border-gray-200'}`}>
                    <div className='flex gap-2'>
                        <Field className='flex-3'>
                            <FieldLabel htmlFor='name'>
                                Name <span className='text-destructive'>*</span>
                            </FieldLabel>
                            <Input
                                id='name'
                                placeholder='e.g. Alejandro Travieso'
                                type='text'
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                ref={nameRef}
                            />
                        </Field>
                        {isInlineForm && <GenderSelector setFormState={setFormState} formState={formState} isSmaller />}
                    </div>
                    <div className='flex gap-2'>
                        <Field className='flex-3'>
                            <FieldLabel htmlFor='date_of_birth'>
                                Date of birth <span className='text-destructive'>*</span>
                            </FieldLabel>
                            <Input
                                id='date_of_birth'
                                type='date'
                                required
                                value={formState.date_of_birth}
                                onChange={(e) => {
                                    const dob = e.target.value;
                                    setFormState({ ...formState, date_of_birth: dob });
                                    if (dob) {
                                        const age = getAgeFromDOB(dob);
                                        setAge(age >= 0 ? age.toString() : '');
                                    } else {
                                        setAge('');
                                    }
                                }}
                            />
                        </Field>
                        <Field className='flex-1'>
                            <FieldLabel htmlFor='age'>Age</FieldLabel>
                            <Input
                                id='age'
                                type='number'
                                min={0}
                                max={100}
                                placeholder='e.g. 45'
                                value={age}
                                onChange={(e) => {
                                    setAge(e.target.value);
                                    const n = parseInt(e.target.value, 10);
                                    if (!isNaN(n) && n > 0 && n <= 100) {
                                        setFormState({ ...formState, date_of_birth: getDOBFromAge(n) });
                                    }
                                }}
                            />
                        </Field>
                    </div>
                    {!isInlineForm && <GenderSelector setFormState={setFormState} formState={formState} />}
                    {errors.map((error, index) => (
                        <p key={index} className='text-sm font-medium text-destructive mb-2 w-full'>
                            {error}
                        </p>
                    ))}
                    {error && <p className='text-sm font-medium text-destructive mb-2 w-full'>{error}</p>}
                </FieldGroup>
                {!isInlineForm && (
                    <div className='flex flex-col mt-auto gap-4 bg-white py-8 border-t border-gray-200 px-4 -mx-4 -mb-4'>
                        <Button type='submit' onClick={handleSubmit} className='py-6'>
                            <UserPlus className='mr-2 text-2xl' />
                            Add patient
                        </Button>
                        <Button variant='outline' onClick={handleCancel} className='py-6'>
                            Cancel
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default PatientForm;

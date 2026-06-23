import { useRef, useState } from 'react';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import type { CreatePatientFormState } from '@/types/types';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createPatient } from '@/features/patients/patientsSlice';
import { useNavigate } from 'react-router';
import FullPageLoader from '../common/FullPageLoader';
import { toast } from 'sonner';

const PatientForm = () => {
    const { loading, error } = useAppSelector((state) => state.patients);
    const [formState, setFormState] = useState<CreatePatientFormState>({
        name: '',
        date_of_birth: '',
        gender: 'MALE',
    });
    const [errors, setErrors] = useState<string[]>([]);
    const nameRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.date_of_birth) {
            setErrors(['Name and date of birth are required']);
            if (!formState.name) nameRef.current?.focus();
            return;
        }

        dispatch(createPatient(formState));
        navigate(-1);
        toast.success('Patient created successfully');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            {loading && <FullPageLoader />}
            <form className='flex flex-col gap-4 p-4'>
                <h1 className='text-xl font-bold'>Add new patient</h1>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor='name'>
                            Name <span className='text-destructive'>*</span>
                        </FieldLabel>
                        <Input
                            id='name'
                            type='text'
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            ref={nameRef}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor='date_of_birth'>
                            Date of birth <span className='text-destructive'>*</span>
                        </FieldLabel>
                        <Input
                            id='date_of_birth'
                            type='date'
                            required
                            value={formState.date_of_birth}
                            onChange={(e) => setFormState({ ...formState, date_of_birth: e.target.value })}
                        />
                    </Field>
                    <RadioGroup
                        value={formState.gender}
                        onValueChange={(value: 'MALE' | 'FEMALE') => setFormState({ ...formState, gender: value })}
                    >
                        <div className='flex gap-2 mt-2'>
                            <RadioGroupItem value='MALE' id='male' />
                            <Label htmlFor='male'>Male</Label>
                        </div>
                        <div className='flex gap-2 my-2'>
                            <RadioGroupItem value='FEMALE' id='female' />
                            <Label htmlFor='female'>Female</Label>
                        </div>
                    </RadioGroup>
                    {errors.map((error, index) => (
                        <p key={index} className='text-sm font-medium text-destructive mb-2 w-full'>
                            {error}
                        </p>
                    ))}
                    {error && <p className='text-sm font-medium text-destructive mb-2 w-full'>{error}</p>}
                </FieldGroup>
                <div className='flex justify-end gap-4'>
                    <Button variant='outline' onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type='submit' onClick={handleSubmit}>
                        Add patient
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;

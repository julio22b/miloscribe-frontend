import { useRef, useState } from 'react';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import type { CreatePatientFormState } from '@/types/types';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createPatient } from '@/features/patients/patientsSlice';
import { useNavigate } from 'react-router';
import FullPageLoader from '../common/FullPageLoader';
import { toast } from 'sonner';
import GoBackBtn from '../common/GoBackBtn';
import { ToggleGroupItem, ToggleGroup } from '../ui/toggle-group';
import { UserPlus } from 'lucide-react';

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
        <div className='h-screen'>
            {loading && <FullPageLoader />}
            <form className='flex flex-col gap-4 p-4 h-full'>
                <div className='flex items-center gap-4'>
                    <GoBackBtn />
                    <div>
                        <h1 className='text-xl font-bold'>Add new patient</h1>
                        <p className='text-sm text-muted-foreground'>They'll appear in your recent appointments.</p>
                    </div>
                </div>
                <FieldGroup>
                    <Field>
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
                    <ToggleGroup
                        onValueChange={(value: 'MALE' | 'FEMALE') => setFormState({ ...formState, gender: value })}
                        value={formState.gender}
                        variant='outline'
                        size='lg'
                        type='single'
                        className='flex justify-around w-full bg-gray-200 p-1.5 **:data-[state=on]:bg-blue-500 **:data-[state=on]:text-white **:data-[state=on]:shadow-md **:data-[state=on]:scale-105 **:data-[state=on]:font-semibold'
                    >
                        <ToggleGroupItem className='tracking-wider' value='MALE' id='male'>
                            Male
                        </ToggleGroupItem>
                        <ToggleGroupItem className='tracking-wider' value='FEMALE' id='female'>
                            Female
                        </ToggleGroupItem>
                    </ToggleGroup>
                    {errors.map((error, index) => (
                        <p key={index} className='text-sm font-medium text-destructive mb-2 w-full'>
                            {error}
                        </p>
                    ))}
                    {error && <p className='text-sm font-medium text-destructive mb-2 w-full'>{error}</p>}
                </FieldGroup>
                <div className='flex flex-col mt-auto gap-4 bg-white py-8 border-t border-gray-200 px-4 -mx-4 -mb-4'>
                    <Button type='submit' onClick={handleSubmit} className='py-6'>
                        <UserPlus className='mr-2 text-2xl' />
                        Add patient
                    </Button>
                    <Button variant='outline' onClick={handleCancel} className='py-6'>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PatientForm;

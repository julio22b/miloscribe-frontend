import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { logIn } from '@/features/auth/authSlice';
import { Spinner } from '../ui/spinner';
import { ROUTES } from '@/routes';

const LogIn = () => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const { loading, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(logIn(formState)).unwrap();
            navigate(ROUTES.PATIENTS);
        } catch {
            // error is handled in slice
        }
    };

    return (
        <div className='h-screen'>
            <div className='text-center my-12'>
                <h1 className='text-2xl font-bold'>MediScribe</h1>
                <p className='text-muted-foreground text-sm'>Clinical AI Assistant</p>
            </div>
            <form onSubmit={handleSubmit} className='p-4 flex flex-col justify-center items-center'>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor='username'>
                            Username <span className='text-destructive'>*</span>
                        </FieldLabel>
                        <Input
                            id='username'
                            type='text'
                            required
                            value={formState.username}
                            onChange={(e) => setFormState({ ...formState, username: e.target.value })}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor='password'>
                            Password <span className='text-destructive'>*</span>
                        </FieldLabel>
                        <Input
                            id='password'
                            type='password'
                            required
                            value={formState.password}
                            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                        />
                    </Field>
                    {error && <p className='text-sm font-medium text-destructive mb-2 w-full'>{error}</p>}
                    <Field orientation='horizontal' className='flex w-full justify-end'>
                        <Button type='submit' disabled={loading || !formState.username || !formState.password}>
                            Login
                            {loading && <Spinner data-icon='inline-end' />}
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    );
};

export default LogIn;

import { ArrowLeft, Bookmark, InfoIcon, Mic, Pause } from 'lucide-react';
import { Button } from '../ui/button';
import { useLocation, useNavigate } from 'react-router';
import type { DocumentType, Patient } from '@/types/types';
import { useState } from 'react';
import { DOCUMENT_TYPES } from '@/app/constants';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const RecordingSession = () => {
    const [documentType, setDocumentType] = useState<DocumentType>(DOCUMENT_TYPES.MEDICAL_HISTORY.value);
    const navigate = useNavigate();
    const location = useLocation();
    const patient = location.state.patient as Patient | null;

    return (
        <section className='flex flex-col bg-accent h-screen p-4 gap-6'>
            <header className='flex items-center justify-between'>
                <Button variant='outline' size='icon' className='rounded-full' onClick={() => navigate(-1)}>
                    <ArrowLeft />
                </Button>
                <div>
                    <h1 className='text-sm tracking-wider text-center text-muted-foreground'>Recording Session</h1>
                    <p className='font-bold text-center'>{patient && patient.name}</p>
                </div>
                <InfoIcon />
            </header>
            <ToggleGroup
                onValueChange={(value: DocumentType) => setDocumentType(value || documentType)}
                value={documentType}
                variant='outline'
                size='lg'
                type='single'
                className='flex justify-between w-full bg-gray-200 p-1.5 **:data-[state=on]:bg-blue-500 **:data-[state=on]:text-white **:data-[state=on]:shadow-md **:data-[state=on]:scale-105 **:data-[state=on]:font-semibold'
            >
                {Object.values(DOCUMENT_TYPES).map(({ value, label }) => (
                    <ToggleGroupItem className='tracking-wider' value={value}>{label}</ToggleGroupItem>
                ))}
            </ToggleGroup>
            <canvas className='w-100 h-80 border-2 my-6'></canvas>
            <p className='font-bold text-3xl text-center'>timer</p>
            <p className='font-semibold text-green-600 text-center'>Capturing active</p>
            <div className='flex justify-around items-center'>
                <Button className='size-14 bg-white rounded-full shadow-2xl'>
                    <Pause className='size-7 fill-black text-black' />
                </Button>
                <Button className='size-24 rounded-full bg-blue-500 shadow-2xl'>
                    <Mic className='size-12' />
                </Button>
                <Button className='size-14 bg-white rounded-full shadow-2xl'>
                    <Bookmark className='size-7 fill-black text-black'/>
                </Button>
            </div>
        </section>
    );
};

export default RecordingSession;

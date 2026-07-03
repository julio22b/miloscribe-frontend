import type { CreatePatientFormState } from '@/types/types';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

interface GenderSelectorProps {
    setFormState: (data: CreatePatientFormState) => void;
    formState: CreatePatientFormState;
    isSmaller?: boolean;
}

const GenderSelector = ({ setFormState, formState, isSmaller }: GenderSelectorProps) => {
    return (
        <ToggleGroup
            onValueChange={(value: 'MALE' | 'FEMALE') => setFormState({ ...formState, gender: value })}
            value={formState.gender}
            variant='outline'
            size={isSmaller ? 'sm' : 'lg'}
            type='single'
            className={`${isSmaller ? 'flex-1 self-end p-1 w-full' : 'w-fit p-1.5'} flex justify-around bg-gray-200 **:data-[state=on]:bg-blue-500 **:data-[state=on]:text-white **:data-[state=on]:shadow-md **:data-[state=on]:scale-105 **:data-[state=on]:font-semibold`}
        >
            <ToggleGroupItem className={`tracking-wider ${isSmaller ? 'flex-1' : ''}`} value='MALE' id='male'>
                {isSmaller ? 'M' : 'Male'}
            </ToggleGroupItem>
            <ToggleGroupItem className={`tracking-wider ${isSmaller ? 'flex-1' : ''}`} value='FEMALE' id='female'>
                {isSmaller ? 'F' : 'Female'}
            </ToggleGroupItem>
        </ToggleGroup>
    );
};

export default GenderSelector;

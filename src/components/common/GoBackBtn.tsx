import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router';

const GoBackBtn = () => {
    const navigate = useNavigate();

    return (
        <Button variant='outline' size='icon' className='rounded-full' onClick={() => navigate(-1)}>
            <ArrowLeft />
        </Button>
    );
};

export default GoBackBtn;

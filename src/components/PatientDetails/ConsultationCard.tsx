import { getDocumentPreview, getLastVisitDate } from '@/lib/utils';
import { ROUTES } from '@/routes';
import type { Consultation, Patient } from '@/types/types';
import { ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router';
import DocumentTypeChip from '../common/DocumentTypeChip';

interface ConsultationCardProps {
    consultation: Consultation;
    patient: Patient;
}

const ConsultationCard = ({ consultation, patient }: ConsultationCardProps) => {
    const document = consultation.documents?.[0];

    if (!document) {
        return (
            <div className='rounded-xl border border-gray-200 bg-white p-4 text-sm text-muted-foreground'>
                No document generated for this visit
            </div>
        );
    }

    return (
        <Link
            to={ROUTES.CONSULTATION_DOCUMENT.replace(':id', String(consultation.id))}
            state={{ document, patient }}
            className='flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4'
        >
            <div className='flex items-center justify-between gap-2'>
                <DocumentTypeChip type={document.type} />
                <p className='text-xs text-muted-foreground'>{getLastVisitDate(document.created_at)}</p>
            </div>
            <div className='flex items-start justify-between gap-2'>
                <p className='line-clamp-2 text-sm text-gray-600'>{getDocumentPreview(document.content)}</p>
                <ArrowRightIcon className='text-muted-foreground size-5 shrink-0 self-center' />
            </div>
        </Link>
    );
};

export default ConsultationCard;

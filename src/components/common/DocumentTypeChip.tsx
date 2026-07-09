import { DOCUMENT_TYPES } from '@/app/constants';
import type { DocumentType } from '@/types/types';
import { FileText } from 'lucide-react';

interface DocumentTypeChipProps {
    type: DocumentType;
}

const UNKNOWN_DOCUMENT_TYPE = {
    label: 'Unknown',
    textColor: 'text-gray-600',
    bgColor: 'bg-gray-100',
};

const DocumentTypeChip = ({ type }: DocumentTypeChipProps) => {
    const { label, textColor, bgColor } =
        (DOCUMENT_TYPES as Partial<typeof DOCUMENT_TYPES>)[type] ?? UNKNOWN_DOCUMENT_TYPE;

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${textColor} ${bgColor}`}
        >
            <FileText className='size-3.5' />
            {label}
        </span>
    );
};

export default DocumentTypeChip;

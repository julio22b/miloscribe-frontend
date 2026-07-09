import { useLocation } from 'react-router';
import type { Document as DocumentModel, Patient } from '@/types/types';
import DocumentTypeChip from '../common/DocumentTypeChip';
import PatientHeader from '../common/PatientHeader';
import NotFound from '../common/NotFound';
import { Card, CardContent } from '../ui/card';

const Document = () => {
    const location = useLocation();
    const { document, patient } = (location.state ?? {}) as {
        document?: DocumentModel;
        patient?: Patient;
    };

    if (!document || !patient) return <NotFound message='No document found' />;

    return (
        <section className='flex flex-col p-4 gap-4'>
            <PatientHeader patient={patient} />
            <div className='self-start'>
                <DocumentTypeChip type={document.type} />
            </div>
            <Card>
                <CardContent>
                    <p className='text-sm whitespace-pre-wrap'>{document.content}</p>
                </CardContent>
            </Card>
        </section>
    );
};

export default Document;

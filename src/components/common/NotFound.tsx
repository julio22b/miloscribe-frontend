import GoBackBtn from './GoBackBtn';

interface NotFoundProps {
    message: string;
}

const NotFound = ({ message }: NotFoundProps) => {
    return (
        <section className='flex flex-col p-4 gap-4'>
            <GoBackBtn />
            <p className='rounded-xl border border-gray-200 bg-white py-8 text-center text-sm text-muted-foreground'>
                {message}
            </p>
        </section>
    );
};

export default NotFound;

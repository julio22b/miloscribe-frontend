import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

export const LoadingSpinner = ({ size = 24, className, ...props }: ISVGProps) => {
    return <Loader2 size={size} className={cn('animate-spin text-primary', className)} {...props} />;
};

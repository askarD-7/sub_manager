import React, { useState } from 'react';
import { getServiceIcon } from '@/lib/service-icons';
import { cn } from '@/lib/utils';

interface ServiceIconProps {
    name: string;
    size?: number; // px, default 40
    className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, size = 40, className }) => {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <div
                className={cn(
                    "flex items-center justify-center bg-[#7B61FF]/20 text-[#7B61FF] font-bold rounded-xl",
                    className
                )}
                style={{ width: size, height: size, fontSize: size * 0.5 }}
            >
                {name.charAt(0).toUpperCase()}
            </div>
        );
    }

    return (
        <div className={cn("bg-white/10 p-1.5 rounded-xl inline-flex items-center justify-center shrink-0", className)}>
            <img
                src={getServiceIcon(name)}
                alt={name}
                width={size}
                height={size}
                className="object-contain"
                onError={() => setError(true)}
                style={{ width: size, height: size }}
            />
        </div>
    );
};

import { useState, useEffect } from 'react';

export function useCountUp(target: number, duration: number = 1200) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // easeOutExpo implementation
            const easeOut = 1 - Math.pow(2, -10 * progress);

            setCount(easeOut * target);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [target, duration]);

    return count;
}

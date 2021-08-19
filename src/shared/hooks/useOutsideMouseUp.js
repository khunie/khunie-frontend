import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideMouseUp(
    ref,
    callback = () => console.log('outside mouseup'),
    onInside = () => {}
) {
    useEffect(() => {
        function handleMouseUp(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback(event);
            } else {
                onInside(event);
            }
        }

        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [ref, callback, onInside]);
}

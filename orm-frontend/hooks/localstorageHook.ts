import { useState, useEffect } from "react";


function useLocalStorageState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const [state, setState] = useState<T>(() => {
        if( typeof window === 'undefined') return defaultValue; // Handle SSR case
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);
    
    return [state, setState];
}

export default useLocalStorageState;
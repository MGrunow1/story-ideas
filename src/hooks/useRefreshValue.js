import { useEffect } from "react";

export function useRefreshValue(newValue, oldValue, setter) {
    useEffect(() => {
        if(newValue !== oldValue) {
            setter(newValue);
        }
    }, [newValue, oldValue, setter])
}

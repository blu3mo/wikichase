import React from "react";

export function useValueRef<T>(val: T) {
    const ref = React.useRef(val);
    React.useEffect(() => {
        ref.current = val;
    }, [val]);
    return ref;
}
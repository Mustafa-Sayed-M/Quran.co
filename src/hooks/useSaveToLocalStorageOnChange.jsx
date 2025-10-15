import React from "react";

function useSaveToLocalStorageOnChange(valueName, value,) {

    React.useEffect(() => {
        localStorage.setItem(valueName, value);
    }, [valueName, value]);

    return null;
}

export default useSaveToLocalStorageOnChange;
import { useEffect } from "react";

function useStopAllTransition() {
    useEffect(() => {
        let resizeTimer;
        const handleResize = () => {
            document.body.classList.add("disable-transitions");
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                document.body.classList.remove("disable-transitions");
            }, 200);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    return null;
}

export default useStopAllTransition;
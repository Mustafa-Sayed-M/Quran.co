import { useCallback } from "react";

function TimeDisplay({ className = "", time }) {
    const formatTime = useCallback((timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        return {
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0")
        };
    }, []);

    const formattedTime = formatTime(time);

    return (
        <p className={`time-duration font-medium text-white/70 w-[65px] shrink-0 text-center ${className}`}>
            {formattedTime.hours}
            :
            {formattedTime.minutes}
            :
            {formattedTime.seconds}
        </p>
    )
}

export default TimeDisplay;
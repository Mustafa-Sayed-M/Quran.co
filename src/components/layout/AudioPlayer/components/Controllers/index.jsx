import { ImSpinner3 } from "react-icons/im";
import { IoMdVolumeHigh } from "react-icons/io";
import { MdPauseCircle, MdPlayCircleFilled, MdSkipNext, MdSkipPrevious } from "react-icons/md";

function Controllers({
    chapterId = 1,
    setChapterId = () => { },
    isLoading = true,
    play = false,
    setPlay = () => { },
    className = ""
}) {
    return (
        <div className={`controllers flex items-center justify-center gap-3 ${className}`}>
            {/* Prev */}
            <button
                type="button"
                disabled={Number(chapterId) === 1}
                aria-label="Previous Chapter / السورة السابقة"
                title={Number(chapterId) === 1 ? "" : "السورة السابقة"}
                onClick={() => setChapterId(prev => prev > 1 ? Number(prev) - 1 : prev)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 sm:hover:bg-white/20 disabled:hover:bg-white/10 disabled:!cursor-default transition"
            >
                <MdSkipNext size={22} />
            </button>
            {/* Play */}
            <button
                type="button"
                disabled={isLoading}
                aria-label="Play Chapter"
                onClick={() => setPlay(prev => !prev)}
                title={isLoading ? "جاري التحميل" : play ? "أيقاف" : "تشغيل"}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${play ? "bg-white/10 sm:hover:bg-white/20" : ""} bg-white/10 transition`}
            >
                {
                    isLoading ? (
                        <ImSpinner3 size={22} className="animate-spin" />
                    ) : play ? (
                        <MdPauseCircle size={22} />
                    ) : (
                        <MdPlayCircleFilled size={22} />
                    )
                }
            </button>
            {/* Next */}
            <button
                type="button"
                disabled={Number(chapterId) === 114}
                aria-label="Next Chapter / السورة التالية"
                title={Number(chapterId) === 114 ? "" : "السورة التالية"}
                onClick={() => setChapterId(prev => prev < 114 ? Number(prev) + 1 : prev)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 sm:hover:bg-white/20 disabled:hover:bg-white/10 transition disabled:!cursor-default"
            >
                <MdSkipPrevious size={22} />
            </button>

            {/* Volume */}
            <button
                type="button"
                aria-label="Volume Controller"
                className="w-10 h-10 flex items-center justify-center rounded-full sm:hover:bg-white/10 transition max-sm:ms-auto"
            >
                <IoMdVolumeHigh size={22} />
            </button>
        </div>
    )
}

export default Controllers;
function ProgressBar({ duration, currentTime, rangeChangeHandler = () => { } }) {
    return (
        <div className="progress-bar absolute top-0 -mt-1 left-0 w-full">
            <input
                type="range"
                name="range"
                min={0}
                step={0.1}
                max={duration}
                value={currentTime}
                onChange={rangeChangeHandler}
                className="custom-range w-full absolute left-0 top-0 z-10 cursor-pointer h-1 bg-transparent appearance-none"
            />
            <div
                className="bg-[#797979] h-1"
            >
                <div
                    style={{
                        width: `${(currentTime / duration) * 100}%`
                    }}
                    className="bg-[#01ac52] w-0 h-full transition"
                ></div>
            </div>
        </div>
    )
}

export default ProgressBar;
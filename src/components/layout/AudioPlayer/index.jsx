import { useChapterContext } from "@contexts/ChapterContext";
import { useQuery } from "@tanstack/react-query";
import { GET_AUDIO_FILE_OF_CHAPTER } from "@utils/api";
import { useCallback, useEffect, useRef, useState } from "react";
import TimeDisplay from "./components/TimeDisplay";
import Controllers from "./components/Controllers";
import ProgressBar from "./components/ProgressBar";

function AudioPlayer({ ref }) {

    const {
        chapterId,
        setChapterId,
        reciterId,
        setActiveWord
    } = useChapterContext();

    const { data, isLoading } = useQuery({
        queryKey: [`CHAPTER_AUDIO_FILE`, reciterId, chapterId],
        queryFn: () => GET_AUDIO_FILE_OF_CHAPTER(reciterId, chapterId),
        refetchOnWindowFocus: false,
        enabled: Boolean(chapterId)
    });
    const audioRef = useRef(null);
    const [play, setPlay] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(localStorage.getItem('currentTime') || 0);
    const [timestamps, setTimestamps] = useState([]);

    useEffect(() => { // Handle Stored Current Time
        if (!audioRef.current) return;
        const storedCurrentTime = localStorage.getItem('currentTime');
        if (storedCurrentTime) {
            audioRef.current.currentTime = storedCurrentTime;
        }
    }, []);
    useEffect(() => { // Handle Timestamp
        if (data && !isLoading) {
            setTimestamps(data.audio_file.timestamps);
        }
    }, [data, isLoading]);
    useEffect(() => { // Handle Play Audio
        const audio = audioRef.current;

        if (audio && data && !isLoading) {
            if (play) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [data, isLoading, play]);

    // # Handlers:
    const onEndedHandler = useCallback(() => {
        setPlay(false);
        setCurrentTime(0)
        setActiveWord({ verse_key: null, position: null });
    }, [setActiveWord]);
    const getActiveWordHandler = useCallback((currentMs) => {
        const verse = timestamps.find(v =>
            currentMs >= v.timestamp_from && currentMs <= v.timestamp_to
        );

        if (!verse) return;

        // eslint-disable-next-line no-unused-vars
        const segment = verse.segments.find(([_, from, to]) =>
            currentMs >= from && currentMs <= to
        );

        if (segment) {
            const [position] = segment;
            setActiveWord(prev => {
                if (
                    prev.verse_key === verse.verse_key &&
                    prev.position === position
                ) {
                    return prev;
                }
                return { verse_key: verse.verse_key, position };
            });
        }
    }, [timestamps, setActiveWord]);
    const onLoadedMetadataHandler = useCallback((e) => {
        setDuration(e.target.duration);
    }, []);
    const onTimeUpdateHandler = useCallback((e) => {
        const current = e.target.currentTime;
        const currentMs = e.target.currentTime * 1000;
        localStorage.setItem("currentTime", current);
        setCurrentTime(current);
        getActiveWordHandler(currentMs);
    }, [getActiveWordHandler]);
    const rangeChangeHandler = useCallback((e) => {
        audioRef.current.currentTime = e.target.value;
    }, []);

    return (
        <div ref={ref} className="audio-player bg-slate-800 text-white py-3 sm:py-5 relative">

            <audio
                ref={audioRef}
                className="hidden"
                onEnded={onEndedHandler}
                onTimeUpdate={onTimeUpdateHandler}
                src={data && data?.audio_file?.audio_url}
                onLoadedMetadata={onLoadedMetadataHandler}
            />

            {/* Progress Bar */}
            <ProgressBar
                duration={duration}
                currentTime={currentTime}
                rangeChangeHandler={rangeChangeHandler}
            />

            <div className="container flex sm:items-center flex-wrap justify-between gap-3">
                {/* Time Duration */}
                <TimeDisplay time={duration} />
                {/* Controllers */}
                <Controllers
                    className="max-sm:w-full max-sm:-order-1"
                    play={play}
                    setPlay={setPlay}
                    chapterId={chapterId}
                    isLoading={isLoading}
                    setChapterId={setChapterId}
                />
                {/* Time Current */}
                <TimeDisplay time={currentTime} className="max-sm:order-1" />
            </div>
        </div>
    )
}

export default AudioPlayer;
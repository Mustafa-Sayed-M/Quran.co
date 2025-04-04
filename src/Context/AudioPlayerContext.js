import React from "react";
import { getFromLocalStorage } from "../Utils/handlers";

const AudioPlayerContext = React.createContext();

export const AudioPlayerContextProvider = ({ children }) => {

    const [audioFile, setAudioFile] = React.useState(() => {
        return getFromLocalStorage('audioFile') || null;
    });
    const [chapterId, setChapterId] = React.useState(getFromLocalStorage('chapterId') || 1);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [verseKey, setVerseKey] = React.useState(null);
    const [timestamps, setTimestamps] = React.useState(getFromLocalStorage('timestamps') || []);

    return (
        <AudioPlayerContext.Provider
            value={{
                audioFile, setAudioFile,
                chapterId, setChapterId,
                isPlaying, setIsPlaying,
                verseKey, setVerseKey,
                timestamps, setTimestamps
            }}
        >
            {children}
        </AudioPlayerContext.Provider>
    )
};

export const useAudioPlayer = () => React.useContext(AudioPlayerContext);
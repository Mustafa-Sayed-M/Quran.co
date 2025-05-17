import React from 'react';
import AudioPlayer from '../Components/Players/AudioPlayer/AudioPlayer';

const AudioPlayerContext = React.createContext();

export const AudioPlayerContextProvider = ({ children }) => {

    const [isPlay, setIsPlay] = React.useState(false);
    const [audioVolume, setAudioVolume] = React.useState(() => {
        return localStorage.getItem('audioVolume') || 50;
    });

    const [reciterId, setReciterId] = React.useState(() => {
        return localStorage.getItem('reciterId') || 4;
    })

    React.useEffect(() => {
        localStorage.setItem('audioVolume', audioVolume);
    }, [audioVolume]);

    React.useEffect(() => {
        localStorage.setItem('reciterId', reciterId);
    }, [reciterId]);

    return (
        <AudioPlayerContext.Provider
            value={{
                isPlay, setIsPlay,
                audioVolume, setAudioVolume,
                reciterId, setReciterId
            }}
        >
            {children}
        </AudioPlayerContext.Provider>
    )
};

export const useAudioPlayer = () => React.useContext(AudioPlayerContext);
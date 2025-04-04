import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useQueryHook from '../../../Hooks/useQueryHook';
import { useAudioPlayer } from '../../../Context/AudioPlayerContext';
import VersesList from '../../../Components/VersesList/VersesList';
import { getAudioFile, getVersesByChapter } from '../../../Utils/api';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import VersesListSkeleton from '../../../Components/Skeletons/VersesListSkeleton';
import SidebarToggler from '../../../Components/Sidebar/Components/SidebarToggler';
import ChapterPlay from '../../../Components/VersesList/Components/ChapterPlay';
import { useSettings } from '../../../Context/SettingsContext';
import { TafsirModalContextProvider } from '../../../Context/TafsirModalContext';
import { saveToLocalStorage } from '../../../Utils/handlers';
// Tafsir Modal:
import TafsirModal from '../../../Components/Modals/TafsirModal';

function Chapter() {

    const { chapterId } = useParams();
    const [searchParams] = useSearchParams();
    const { translatorId, reciter } = useSettings();
    const { setAudioFile, setTimestamps, setChapterId } = useAudioPlayer();

    // Chapter Verses:
    const { data: chapterVerses, isLoading: versesIsLoading } = useQueryHook({
        queryKey: [`chapter-verses-${chapterId}-${translatorId}`],
        queryFn: () => getVersesByChapter(chapterId, translatorId)
    });
    // Chapter Audio File:
    const { data: audioFileData, isLoading: audioFileIsLoading } = useQueryHook({
        queryKey: [`chapter-audio-file-${chapterId}-${reciter.id}`],
        queryFn: () => getAudioFile(reciter.id, chapterId)
    });

    React.useEffect(() => {
        if (audioFileData) {
            setChapterId(chapterId);
            setAudioFile(audioFileData.audio_file.audio_url);
            setTimestamps(audioFileData.audio_file.timestamps);

            saveToLocalStorage('chapterId', chapterId);
            saveToLocalStorage('audioFile', audioFileData.audio_file.audio_url);
            saveToLocalStorage('timestamps', audioFileData.audio_file.timestamps);
        }
    }, [audioFileData, setAudioFile, setTimestamps, setChapterId, chapterId]);

    return (
        <TafsirModalContextProvider>
            {/* Tafsir Modal */}
            <TafsirModal />
            {/* Chapter Page */}
            <div className='chapter-page'>
                <div className='container'>
                    {/* Content Flex */}
                    <div className='content-flex flex gap-5'>
                        {/* Verses List Container */}
                        <div className='verses-list-container flex-1 pb-10 space-y-5 bg-body-color'>
                            {/* Header */}
                            <div className='header rounded-b-md flex items-center flex-wrap gap-x-3 gap-y-5 bg-card-color px-3 sticky z-30 top-[62px] md:top-[70px] pt-10 pb-3 border-b border-b-border-color'>
                                {/* Chapter Name */}
                                <h2
                                    className='text-2xl me-auto max-sm:w-full  max-sm:text-center'
                                    title={searchParams.get('chapterName')}
                                >سورة {searchParams.get('chapterName')}</h2>
                                {/* Sidebar Toggler */}
                                <SidebarToggler icon={'fa-solid fa-sliders'} state={true} />
                                {/* Chapter Play */}
                                <ChapterPlay
                                    audioFileData={audioFileData}
                                    isLoading={audioFileIsLoading}
                                />
                            </div>
                            {/* Verses List */}
                            {
                                versesIsLoading ? (
                                    <VersesListSkeleton />
                                ) : (
                                    <VersesList versesData={chapterVerses.verses || []} />
                                )
                            }
                        </div>
                        {/* Sidebar */}
                        <Sidebar />
                    </div>
                </div>
            </div>
        </TafsirModalContextProvider>
    )
}

export default Chapter;
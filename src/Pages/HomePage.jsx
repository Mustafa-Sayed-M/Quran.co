import React from 'react';
import ChaptersSide from '../Components/ChaptersSide/ChaptersSide';
import { useParams } from 'react-router-dom';
import { useSettings } from '../Context/SettingsContext';
import Verses from '../Components/Verses/Verses';
import VersesSearch from '../Components/Verses/Components/VersesSearch';

function HomePage() {

    const { chapterId } = useParams();
    const { setLastChapterId } = useSettings();

    React.useEffect(() => {
        setLastChapterId(chapterId);
    }, [chapterId, setLastChapterId]);

    return (
        <div className='home-page'>
            {/* Verses Search */}
            <VersesSearch />
            {/* Main Content */}
            <main>
                <div className='container flex flex-row-reverse items-start gap-5'>
                    {/* Chapters Side */}
                    <ChaptersSide />
                    {/* Verses List */}
                    <Verses />
                </div>
            </main>
        </div>
    )
}

export default HomePage;
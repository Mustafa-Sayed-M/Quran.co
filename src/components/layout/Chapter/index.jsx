import { useChapterContext } from "@contexts/ChapterContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_VERSES_BY_CHAPTER } from "@utils/api";
import VerseCard from "./components/VerseCard";
import { List, useDynamicRowHeight, useListRef } from "react-window";
import { useEffect } from "react";

function Chapter() {

    const { chapterId, translatorId, activeWord } = useChapterContext();
    const listRef = useListRef(null);
    const queryClient = useQueryClient();
    const verseChapterCashed = queryClient.getQueryData([`VERSES_CHAPTER_${chapterId}`, chapterId, translatorId]);

    const { data, isLoading } = useQuery({
        queryKey: [`VERSES_CHAPTER_${chapterId}`, chapterId, translatorId],
        queryFn: () => GET_VERSES_BY_CHAPTER(chapterId),
        refetchOnWindowFocus: false,
        initialData: verseChapterCashed,
        enabled: Boolean(!verseChapterCashed)
    });

    useEffect(() => {
        if (!data && isLoading) return;
        if (activeWord?.verse_key) {
            const verseIndex = data?.verses.findIndex(v => v.verse_key === activeWord.verse_key);
            if (verseIndex !== -1) {
                setTimeout(() => {
                    listRef.current.scrollToRow({
                        index: verseIndex,
                        align: "start",
                        behavior: "smooth"
                    });
                }, 20);
            }
        }
    }, [activeWord, data, isLoading, listRef]);

    const rowHeight = useDynamicRowHeight({
        defaultRowHeight: 200
    });

    const RowComponent = ({ index, style }) => {
        const verse = data?.verses[index];
        return (
            <div style={style} className="nth-last-of-type-[2]:[&>div.verse-card]:border-b-0" role="listitem">
                <VerseCard verse={verse} />
            </div>
        );
    };

    return (
        <div className="chapter w-full h-full max-h-full bg-white rounded-sm shadow-md overflow-auto">
            {
                isLoading ? (
                    Array.from({ length: 10 }).map((_, index) => (<div className="verse-card-skeleton border-b border-b-gray-300 p-5" key={index}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-full max-w-[200px] h-5 bg-slate-300 animate-pulse rounded-sm"></div>
                            <div className="w-7 h-5 bg-slate-300 animate-pulse rounded-sm"></div>
                        </div>
                        <div className="w-20 h-5 bg-slate-300 animate-pulse rounded-sm mb-5"></div>
                        <div className="flex items-center gap-2 justify-end">
                            <div className="w-7 h-7 bg-slate-300 animate-pulse rounded-full"></div>
                            <div className="w-7 h-7 bg-slate-300 animate-pulse rounded-full"></div>
                            <div className="w-7 h-7 bg-slate-300 animate-pulse rounded-full"></div>
                        </div>
                    </div>))
                ) : (<List
                    rowComponent={RowComponent}
                    rowCount={data?.verses.length}
                    rowHeight={rowHeight}
                    rowProps={{ verses: data?.verses }}
                    listRef={listRef}
                />)
            }
        </div>
    );
}

export default Chapter;
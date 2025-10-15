import { useChapterContext } from "@contexts/ChapterContext";
import VerseActions from "./VerseActions";

function VerseCard({ verse = {} }) {

    const { textType, activeWord } = useChapterContext();

    return (
        <div className="verse-card border-b border-b-gray-300 p-5">
            {/* Header */}
            <div className="card-header flex items-start justify-between gap-5 mb-5">
                <p className="text-2xl leading-[2.5rem] font-semibold selection:bg-[#01ac52] selection:text-white flex items-center flex-wrap gap-2">
                    {
                        verse.words.map(word => (<span
                            className={`last-of-type:hidden transition${(word.position === activeWord.position) && (word.verse_key === activeWord.verse_key)
                                ? " text-[#01ac52]" : ""}`}
                            key={word.id}
                        >
                            {word[textType]}
                        </span>))
                    }
                </p>
                <div className="text-[#01ac52] text-lg font-medium">{verse.verse_key}</div>
            </div>
            {/* Actions */}
            <VerseActions verse={verse} />
        </div>
    )
}

export default VerseCard;
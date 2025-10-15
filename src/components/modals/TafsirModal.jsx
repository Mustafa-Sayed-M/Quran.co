import SelectInput from "@components/common/SelectInput";
import { useChapterContext } from "@contexts/ChapterContext";
import { useTafsirContext } from "@contexts/TafsirContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_TAFSIRS, GET_VERSE_TAFSIR } from "@utils/api";

function TafsirModal() {

    const { open, closeModal, verseKey, interpreterSlug, setInterpreterSlug } = useTafsirContext();
    const { textType } = useChapterContext();
    const queryClient = useQueryClient();

    const CASHED_TAFSIRS_DATA = queryClient.getQueryData(['TAFSIRS']);
    const CASHED_VERSE_TAFSIR_DATA = queryClient.getQueryData(['VERSE_TAFSIR', verseKey, interpreterSlug]);

    const { data: tafsirsData, isLoading: tafsirsIsLoading } = useQuery({
        queryKey: ['TAFSIRS'],
        queryFn: GET_TAFSIRS,
        refetchOnWindowFocus: false,
        enabled: Boolean(open && verseKey && !CASHED_TAFSIRS_DATA)
    });
    const { data: verseTafisrData, isLoading: verseTafsirIsLoading } = useQuery({
        queryKey: ['VERSE_TAFSIR', verseKey, interpreterSlug],
        queryFn: () => GET_VERSE_TAFSIR(interpreterSlug, verseKey),
        refetchOnWindowFocus: false,
        enabled: Boolean(open && verseKey && !CASHED_VERSE_TAFSIR_DATA)
    });

    const tafsirs = tafsirsData?.tafsirs.filter(t => t.language_name === "arabic").map(t => ({
        id: t.slug,
        name: t.translated_name.name
    })) || [];

    return (
        <div
            onClick={closeModal}
            className={`tafsir-modal absolute z-50 top-0 left-0 w-full h-full py-10 bg-black/50 backdrop-blur-xs transition ${open ? "" : "pointer-events-none opacity-0"}`}
        >
            <div className="container h-full flex items-center">
                <div
                    onClick={e => e.stopPropagation()}
                    className="bg-white shadow-md rounded-md w-full md:w-[750px] md:mx-auto h-[500px]  overflow-y-auto"
                >
                    {/* Header */}
                    <div className="header sticky top-0 bg-white border-b border-b-gray-200 z-10 flex md:items-center flex-col md:flex-row justify-between gap-3 p-5">
                        {/* Verse Text */}
                        <p className="font-medium">تفسير أيه رقم ( {String(verseKey).split(":")[1]} )</p>
                        {/* Tafsirs Select */}
                        <SelectInput
                            id="tafsirs"
                            name="tafsirs"
                            data={tafsirs}
                            className={'md:!w-fit'}
                            isLoading={tafsirsIsLoading}
                            placeholder="اكتب اسم المفسر"
                            onSelect={item => setInterpreterSlug(item.id)}
                            defaultValue={tafsirs.find(t => t.id === interpreterSlug)}
                        />
                    </div>
                    {/* Verse */}
                    <div className="verse-content my-5 p-5 border-b border-b-gray-200">
                        <p className="flex items-center flex-wrap gap-1 font-['Amiri'] font-semibold text-lg leading-loose bg-[#01ac52]/10 text-[#01ac52] p-4 rounded-sm selection:bg-[#01ac52] selection:text-white">
                            {
                                verseTafsirIsLoading ? (
                                    <>Loading...</>
                                ) : (
                                    verseTafisrData?.tafsir.verses[verseKey][textType]
                                )
                            }
                        </p>
                    </div>
                    {/* Tafsir */}
                    <div className="tafsir-content p-5">
                        {
                            verseTafsirIsLoading ? (
                                <>Loading...</>
                            ) : (
                                <div
                                    className="prose max-w-none leading-relaxedC font-medium leading-loose [&>p>span]:font-bold [&>p>span]:text-[#01ac52]"
                                    dangerouslySetInnerHTML={{ __html: verseTafisrData?.tafsir.text }}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TafsirModal;
{/* <div
    className="prose max-w-none leading-relaxed text-gray-800"
    dangerouslySetInnerHTML={{ __html: verseTafisrData.tafsir.text }}
/> */}
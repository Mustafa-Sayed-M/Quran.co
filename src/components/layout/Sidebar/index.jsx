import { useSettingContext } from "@contexts/SettingContext";
import RecitationsSelect from "./components/RecitationsSelect";
import TextTypeSelect from "./components/TextTypeSelect";
import TranslationsSelect from "./components/TranslationsSelect";
import ChapterSelect from "./components/ChapterSelect";
import { useChapterContext } from "@contexts/ChapterContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_CHAPTERS, GET_RECITATIONS, GET_TRANSLATIONS } from "@utils/api";

function Sidebar() {

    const { openSetting } = useSettingContext();
    const {
        chapterId,
        setChapterId,
        translatorId,
        setTranslatorId,
        reciterId,
        setReciterId,
        textType,
        setTextType
    } = useChapterContext();
    const queryClient = useQueryClient();
    const sidebarDataCashed = queryClient.getQueryData(["SIDEBAR_DATA"]);

    const { data, isLoading } = useQuery({
        queryKey: ["SIDEBAR_DATA"],
        queryFn: async () => {
            const [chaptersRes, translationsRes, recitationsRes] = await Promise.all([
                GET_CHAPTERS(),
                GET_TRANSLATIONS(),
                GET_RECITATIONS()
            ]);
            return {
                chapters: chaptersRes?.chapters || [],
                translations: translationsRes?.translations || [],
                recitations: recitationsRes?.recitations || []
            };
        },
        refetchOnWindowFocus: false,
        initialData: sidebarDataCashed,
        enabled: Boolean(!sidebarDataCashed)
    });

    const chapters = data?.chapters.map(c => ({
        id: c.id,
        name: c.name_arabic
    })) || [];
    const translations = data?.translations.map(t => ({
        id: t.id,
        name: t.translated_name.name
    })) || [];
    const recitations = data?.recitations.map(r => ({
        id: r.id,
        name: `${r.translated_name.name} (${r.style || "Murattal"})`
    })) || [];

    return (
        <aside className={`bg-white w-full lg:w-[420px] p-5 lg:rounded-sm shadow-md max-lg:absolute max-lg:z-40 max-lg:top-0 max-lg:left-0 max-lg:transition-all duration-300 ease-out ${openSetting ? "max-lg:max-h-[1000px]" : "max-lg:max-h-0 max-lg:overflow-hidden max-lg:py-0"}`}>
            <div className="max-lg:container space-y-3">
                {/* Chapter Select */}
                <ChapterSelect
                    isLoading={isLoading}
                    chapterId={chapterId}
                    setChapterId={setChapterId}
                    chapters={chapters}
                />
                {/* Translations Select */}
                <TranslationsSelect
                    isLoading={isLoading}
                    translatorId={translatorId}
                    setTranslatorId={setTranslatorId}
                    translations={translations}
                />
                {/* Recitations Select */}
                <RecitationsSelect
                    isLoading={isLoading}
                    reciterId={reciterId}
                    setReciterId={setReciterId}
                    recitations={recitations}
                />
                {/* Text Type Select */}
                <TextTypeSelect
                    isLoading={isLoading}
                    textType={textType}
                    setTextType={setTextType}
                />
            </div>
        </aside>
    )
}

export default Sidebar;
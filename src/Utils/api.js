const quranApi = 'https://api.quran.com/api/v4';
const ahadisApi = 'https://hadis-api-id.vercel.app';

const fetchData = async (endpoint, options) => {
    try {
        const res = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        });
        return await res.json();
    } catch (err) {
        console.log(err)
    }
};

// Quran:
export const getChapters = async () => {
    return await fetchData(`${quranApi}/chapters`);
};
export const getVersesByChapter = async (id, translator) => {
    return await fetchData(`${quranApi}/verses/by_chapter/${id}?fields=text_uthmani,text_indopak,text_imlaei_simple&words=true&word_fields=text_uthmani,text_indopak,text_imlaei_simple,location&word_translation_language=en&per_page=1000&translations=${translator}`);
};
export const getReciters = async () => {
    return await fetchData(`${quranApi}/resources/recitations?language=ar&translation_language=fr`);
};
export const getAudioFile = async (reciterId = 4, chapterId = 2) => {
    return await fetchData(`${quranApi}/chapter_recitations/${reciterId}/${chapterId}?segments=true`);
};
export const getTranslations = async () => {
    return await fetchData(`${quranApi}/resources/translations`);
};
export const getTafsirs = async () => {
    return await fetchData(`${quranApi}/resources/tafsirs`);
};
export const getVerseTafsir = async (tafsirSlug, verseKey) => {
    return await fetchData(`${quranApi}/tafsirs/${tafsirSlug}/by_ayah/${verseKey}?fields=text_uthmani`);
};

// Ahadis:
export const getAhadisList = async () => {
    return await fetchData(`${ahadisApi}/hadith`);
};
export const getAhadis = async (slug, limit) => {
    return await fetchData(`${ahadisApi}/hadith/${slug}?limit=${limit}`);
};
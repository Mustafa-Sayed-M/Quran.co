const quranApi = 'https://api.quran.com/api/v4';

const fetchData = async (endpoint) => {
    try {
        const res = await fetch(endpoint);
        return await res.json();
    } catch (err) {
        console.log(err)
    }
};

export const getChapters = async () => {
    return await fetchData(`${quranApi}/chapters`);
};

export const getVersesByChapter = async (id, translationsIds) => {
    return await fetchData(`${quranApi}/verses/by_chapter/${id}?fields=text_uthmani,text_indopak,text_imlaei_simple&words=true&word_fields=text_uthmani,text_indopak,text_imlaei_simple,location&translations=${translationsIds.join(',')}&per_page=1000`);
};

export const getTranslations = async () => {
    return await fetchData(`${quranApi}/resources/translations`);
};

export const getAudioFile = async (reciterId = 4, chapterId = 1) => {
    return await fetchData(`${quranApi}/chapter_recitations/${reciterId}/${chapterId}?segments=true`);
};

export const getReciters = async () => {
    return await fetchData(`${quranApi}/resources/recitations?language=ar&translation_language=fr`);
};

export const getTafsirs = async () => {
    return await fetchData(`${quranApi}/resources/tafsirs`);
};

export const getVerseTafsir = async (tafsirSlug, verseKey) => {
    return await fetchData(`${quranApi}/tafsirs/${tafsirSlug}/by_ayah/${verseKey}?fields=text_uthmani,text_indopak,text_imlaei_simple`);
};
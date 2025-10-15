const api = 'https://api.quran.com/api/v4';

const fetchData = async (endpoint = '', options = {}) => {
    try {
        const res = await fetch(`${api}${endpoint}`, options);
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

export const GET_CHAPTERS = async () => {
    return await fetchData('/chapters');
};
export const GET_VERSES_BY_CHAPTER = async (chapterId = 1) => {
    return await fetchData(`/verses/by_chapter/${chapterId}?words=true&translation_fields=resource_name,language_id&per_page=1000&fields=text_uthmani,chapter_id,hizb_number,text_imlaei_simple&translations=131&reciter=7&word_translation_language=en&page=1&word_fields=verse_key,verse_id,page_number,location,text_uthmani,text_imlaei_simple&mushaf=2`);
};
export const GET_AUDIO_FILE_OF_CHAPTER = async (reciterId = 4, chapterId = 1) => {
    return await fetchData(`/chapter_recitations/${reciterId}/${chapterId}?segments=true`);
};
export const GET_TRANSLATIONS = async () => {
    return await fetchData('/resources/translations');
};
export const GET_RECITATIONS = async () => {
    return await fetchData('/resources/recitations');
};
export const GET_TAFSIRS = async () => {
    return await fetchData('/resources/tafsirs?language=ar');
};
export const GET_VERSE_TAFSIR = async (interpreterSlug = "ar-tafsir-al-baghawi", verseKey = "1:1") => {
    return await fetchData(`/tafsirs/${interpreterSlug}/by_ayah/${verseKey}?fields=text_imlaei_simple,text_uthmani,text&mushaf=2`);
};
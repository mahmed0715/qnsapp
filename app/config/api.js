export default {
  apiBaseUrl: `http://qnsacademy.com/api/public/`,
  quranList: `api/quran`,
  quranDetails: object => `api/quran-ayat-by-chapter/${object.id}`,
  bukhariList: object => `api/hadith-book-by-collection/${object.id}`,
  bukhariDetails: (object) => `api/hadith-by-book/${object.contextBookId}/${object.id}`,
  quranAudioSingle: ({audio_file})=> `https://www.qnsacademy.com/files/verses/${audio_file}`,
  quranAudioSurah: surah => `http://www.qnsacademy.com/files/source/00_quran/03_quran_mp3_sheikh_sudais_shuraim/${surah.id}_surat_${surah.name.toLowerCase().replace(/-/g, '_')}_with_audio_english_translation_sheikh_sudais_shuraim.mp3`
}
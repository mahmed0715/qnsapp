export default {
  apiBaseUrl: `http://academicbd.com/qns_public/public/`,
  quranList: `api/quran`,
  quranDetails: object => `api/quran-ayat-by-chapter/${object.id}`,
  bukhariList: object => `api/hadith-book-by-collection/${object.id}`,
  bukhariDetails: 'api/hadith-by-book/',
  quranAudioSurah: surah => `http://www.qnsacademy.com/files/source/00_quran/03_quran_mp3_sheikh_sudais_shuraim/${surah.id}_surat_${surah.name.toLowerCase().replace(/-/g, '_')}_with_audio_english_translation_sheikh_sudais_shuraim.mp3`
}
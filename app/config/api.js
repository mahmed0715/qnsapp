export default {
  apiBaseUrl: 'http://academicbd.com/qns_public/public/',
  quranList: 'api/quran',
  bukhariList: 'api/hadith-book-by-collection/1',
  quranAudioSurah: surah => `http://www.qnsacademy.com/files/source/00_quran/03_quran_mp3_sheikh_sudais_shuraim/${surah.id}_surat_${surah.name.toLowerCase().replace(/-/g, '_')}_with_audio_english_translation_sheikh_sudais_shuraim.mp3`
}
export default {
<<<<<<< HEAD
  apiBaseUrl: 'http://academicbd.com/qns_public/public/',
  quranList: 'api/quran',
  quranDetails: 'api/quran-ayat-by-chapter/',
  bukhariList: 'api/hadith-book-by-collection/1',
  bukhariDetails: 'api/hadith-by-book/',
=======
  apiBaseUrl: `http://academicbd.com/qns_public/public/`,
  quranList: `api/quran`,
  quranDetails: object => `api/quran-ayat-by-chapter/${object.id}`,
  bukhariList: object => `api/hadith-book-by-collection/${object.id}`,
>>>>>>> fc54709df036c59147e577f0bafb19c1e9b0b2c6
  quranAudioSurah: surah => `http://www.qnsacademy.com/files/source/00_quran/03_quran_mp3_sheikh_sudais_shuraim/${surah.id}_surat_${surah.name.toLowerCase().replace(/-/g, '_')}_with_audio_english_translation_sheikh_sudais_shuraim.mp3`
}
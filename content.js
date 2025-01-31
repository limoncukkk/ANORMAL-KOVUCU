// Yerel depolamadan engellenen yazarları al
chrome.storage.sync.get(["blockedAuthors"], (result) => {
  if (result.blockedAuthors) {
    const blockedAuthors = result.blockedAuthors;

    // Sayfadaki her entry'i kontrol et
    document.querySelectorAll('.entryauthor').forEach(authorElement => {
      let author = authorElement.innerText.trim(); // Yazar ismini al
      if (blockedAuthors.includes(author)) {
        let entry = authorElement.closest('.entry'); // En yakın 'entry' elemanını bul
        if (entry) {
          entry.style.display = 'none'; // Entry'yi gizle
        }
      }
    });
  }
});

// Engellenen yazarları kontrol et
chrome.storage.local.get(['engellenenYazarlar'], function (result) {
    const engellenenYazarlar = result.engellenenYazarlar || [];

    setInterval(function() {
        // Sayfadaki tüm yazarları al
        const yazarlariBul = document.querySelectorAll('.entryauthor');
        
        yazarlariBul.forEach(function (yazar) {
            const yazarLink = yazar.getAttribute('href');
            
            // Eğer yazarın linki engellenmişse, entry'yi gizle
            if (engellenenYazarlar.some(link => yazarLink.includes(link))) {
                yazar.closest('.entry').style.display = 'none';
            }
        });
    }, 1000); // 1 saniyede bir kontrol et
});

// Engellenen yazarları yükle
chrome.storage.local.get(['engellenenYazarlar'], function(result) {
    const engellenenYazarlar = result.engellenenYazarlar || [];
    const yazarListesi = document.getElementById('yazarListesi');

    // Listeyi güncelle
    engellenenYazarlar.forEach(function(link) {
        const li = document.createElement('li');
        li.textContent = link;
        const silButonu = document.createElement('button');
        silButonu.textContent = 'Sil';
        silButonu.onclick = function() {
            // Yazar silme
            const index = engellenenYazarlar.indexOf(link);
            if (index > -1) {
                engellenenYazarlar.splice(index, 1);
            }
            chrome.storage.local.set({ engellenenYazarlar: engellenenYazarlar });
            li.remove();
        };
        li.appendChild(silButonu);
        yazarListesi.appendChild(li);
    });
});

// Yazar ekleme işlemi
document.getElementById('ekle').addEventListener('click', function() {
    let yazarLink = document.getElementById('yazarLink').value.trim();
    if (yazarLink) {
        // '-' işaretlerini kaldır, boşlukları '-' ile değiştir
        yazarLink = yazarLink.replace(/\s+/g, '-').toLowerCase();  // Kelimeleri '-' ile ayır
        
        const tamYazarLink = `/yazar/${yazarLink}`; // Tam linki oluştur

        chrome.storage.local.get(['engellenenYazarlar'], function(result) {
            const engellenenYazarlar = result.engellenenYazarlar || [];

            if (!engellenenYazarlar.includes(tamYazarLink)) {
                engellenenYazarlar.push(tamYazarLink);
                chrome.storage.local.set({ engellenenYazarlar: engellenenYazarlar });

                // Listeye ekle
                const li = document.createElement('li');
                li.textContent = tamYazarLink;
                const silButonu = document.createElement('button');
                silButonu.textContent = 'Sil';
                silButonu.onclick = function() {
                    const index = engellenenYazarlar.indexOf(tamYazarLink);
                    if (index > -1) {
                        engellenenYazarlar.splice(index, 1);
                    }
                    chrome.storage.local.set({ engellenenYazarlar: engellenenYazarlar });
                    li.remove();
                };
                li.appendChild(silButonu);
                document.getElementById('yazarListesi').appendChild(li);
            }
        });

        document.getElementById('yazarLink').value = '';
    } else {
        alert('Lütfen yazar ismini giriniz!');
    }
});

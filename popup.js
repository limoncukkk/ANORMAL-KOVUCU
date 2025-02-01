// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function () {
    // Engellenen yazarları al ve listeyi güncelle
    updateYazarList();

    // Yazar ekleme butonuna tıklama işlemi
    document.getElementById('ekleBtn').addEventListener('click', function () {
        const yazarInput = document.getElementById('yazarInput').value.trim();
        if (yazarInput) {
            addYazar(yazarInput);
        }
    });
});

// Yazar ekleme fonksiyonu
function addYazar(yazar) {
    chrome.storage.local.get(['engellenenYazarlar'], function (result) {
        let engellenenYazarlar = result.engellenenYazarlar || [];

        // Yeni yazarı listeye ekle
        engellenenYazarlar.push(yazar);

        // Listeyi kaydet
        chrome.storage.local.set({ engellenenYazarlar: engellenenYazarlar }, function () {
            updateYazarList();
        });
    });
}

// Engellenen yazarları güncelleme fonksiyonu
function updateYazarList() {
    chrome.storage.local.get(['engellenenYazarlar'], function (result) {
        const yazarListesi = result.engellenenYazarlar || [];
        const yazarListesiDiv = document.getElementById('engellenenList');

        // Listeyi sıfırla
        yazarListesiDiv.innerHTML = '';

        // Her engellenen yazarı listele
        yazarListesi.forEach(function (yazar) {
            const yazarDiv = document.createElement('div');
            yazarDiv.textContent = yazar;
            yazarDiv.style.marginBottom = '5px';

            // Silme butonu
            const silBtn = document.createElement('button');
            silBtn.textContent = 'Sil';
            silBtn.addEventListener('click', function () {
                removeYazar(yazar);
            });
            yazarDiv.appendChild(silBtn);

            yazarListesiDiv.appendChild(yazarDiv);
        });
    });
}

// Yazar silme fonksiyonu
function removeYazar(yazar) {
    chrome.storage.local.get(['engellenenYazarlar'], function (result) {
        let engellenenYazarlar = result.engellenenYazarlar || [];
        
        // Silinecek yazarı listeden çıkar
        engellenenYazarlar = engellenenYazarlar.filter(item => item !== yazar);
        
        // Listeyi güncelle
        chrome.storage.local.set({ engellenenYazarlar: engellenenYazarlar }, function () {
            updateYazarList();
        });
    });
}

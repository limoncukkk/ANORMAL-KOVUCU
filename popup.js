const addAuthorButton = document.getElementById("addAuthorBtn");
const authorInput = document.getElementById("authorInput");
const authorList = document.getElementById("authorList");

let blockedAuthors = [];

// Yazarları yerel depolamadan (localStorage) al
chrome.storage.sync.get(["blockedAuthors"], (result) => {
  if (result.blockedAuthors) {
    blockedAuthors = result.blockedAuthors;
    updateAuthorList();
  }
});

// Yazar ekleme butonuna tıklandığında
addAuthorButton.addEventListener("click", () => {
  const authorName = authorInput.value.trim();
  if (authorName && !blockedAuthors.includes(authorName)) {
    blockedAuthors.push(authorName);
    chrome.storage.sync.set({ blockedAuthors: blockedAuthors }, () => {
      updateAuthorList();
    });
  }
  authorInput.value = "";
});

// Listeyi güncelle
function updateAuthorList() {
  authorList.innerHTML = "";
  blockedAuthors.forEach((author, index) => {
    const li = document.createElement("li");
    li.textContent = author;

    // Silme butonu ekleyelim
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "ayy kıyamam ya";
    deleteButton.onclick = () => removeAuthor(index); // Butona tıklanıldığında yazarı sil

    li.appendChild(deleteButton);
    authorList.appendChild(li);
  });
}

// Yazar silme fonksiyonu
function removeAuthor(index) {
  blockedAuthors.splice(index, 1); // Yazar listeden çıkarılır
  chrome.storage.sync.set({ blockedAuthors: blockedAuthors }, () => {
    updateAuthorList(); // Listeyi güncelle
  });
}

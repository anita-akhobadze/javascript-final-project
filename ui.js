export function renderBooks(books, booksContainer) {
    booksContainer.innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        let cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/200";

        let title = book.title || "No title";
        let author = book.author_name ? book.author_name[0] : "Unknown";

        booksContainer.innerHTML += `
            <div class="bookCard" onclick="openBook('${title}', '${author}', '${cover}')">
                <img src="${cover}">
                <h3>${title}</h3>
                <p>${author}</p>
            </div>
        `;
    }
}
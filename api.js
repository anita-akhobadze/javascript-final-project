export async function fetchBooks() {
    const res = await fetch("https://openlibrary.org/search.json?q=adventure");
    if (!res.ok) {
        throw new Error("Error");
    }
    const data = await res.json();
    return data.docs;
}
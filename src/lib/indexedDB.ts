export const openDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open("QuizDB", 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest).result;
            if (!db.objectStoreNames.contains("history")) {
                db.createObjectStore("history", { keyPath: "date" });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
};

export const saveQuizAttempt = async (attempt: { score: number; date: string }) => {
    const db = await openDB();
    const transaction = db.transaction("history", "readwrite");
    transaction.objectStore("history").add(attempt);
};

export const getQuizHistory = async () => {
    const db = await openDB();
    const transaction = db.transaction("history", "readonly");
    const store = transaction.objectStore("history");

    return new Promise<{ score: number; date: string }[]>((resolve) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
    });
};

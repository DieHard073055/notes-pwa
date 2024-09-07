// IndexedDB setup
const dbName = 'NotesDB';
const dbVersion = 1;
let db;

if (!window.indexedDB) {
    console.error("Your browser doesn't support IndexedDB");
}
  
function initIndexedDB() {
  const request = indexedDB.open(dbName, dbVersion);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
    objectStore.createIndex('content', 'content', { unique: false });
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log('IndexedDB initialized');
    loadNotesFromIndexedDB();
  };

  request.onerror = (event) => {
    console.error('Error initializing IndexedDB:', event.target.errorCode);
  };
}

function saveNoteToIndexedDB(note) {
  const transaction = db.transaction(['notes'], 'readwrite');
  const objectStore = transaction.objectStore('notes');
  const request = objectStore.add(note);

  request.onsuccess = () => {
    console.log('Note added to IndexedDB');
  };
}

function loadNotesFromIndexedDB() {
  const transaction = db.transaction(['notes'], 'readonly');
  const objectStore = transaction.objectStore('notes');
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const notes = event.target.result;
    console.log('Notes loaded from IndexedDB:', notes);
    displayNotes(notes);  // Function to display notes in the UI
  };
}

initIndexedDB();

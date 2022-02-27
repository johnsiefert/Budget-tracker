let db;
const request = indexedDB.open('budget_tracker', 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
  const db = event.target.result;
  db.createObjectStore('new_budget', { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;
  // check if app is online, if yes run checkDatabase() function to send all local db data to api
  if (navigator.onLine) {
    uploadBudget();
  }
};

request.onerror = function(event) {
 console.log(event.target.errorCode);
  };

  function saveRecord(record) {
     const transaction = db.transaction(['new_budget'], 'readwrite');
    // access the object store for `new_budget`
    const budgetObjectStore = transaction.objectStore('new_budget');
    // add record to your store with add method.
    budgetObjectStore.add(record);
  }



window.addEventListener('online', uploadBudget);
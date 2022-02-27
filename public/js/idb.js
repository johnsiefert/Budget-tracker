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




window.addEventListener('online', uploadBudget);
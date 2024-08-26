var scenarioUnits = {};
var accuracyUnits = {};
var validScenarios = {
    "edge":  [ "Offline", "SingleStream", "MultiStream" ],
    "datacenter": [ "Server", "Offline" ]
}

models_datacenter = [ "llama2-70b-99", "llama2-70b-99.9", "gptj-99", "gptj-99.9", "bert-99", "bert-99.9",  "stable-diffusion-xl", "dlrm-v2-99", "dlrm-v2-99.9", "retinanet", "resnet", "3d-unet-99", "3d-unet-99.9", "rnnt"];

models_edge = [ "gptj-99", "gptj-99.9", "bert-99", "stable-diffusion-xl", "retinanet", "resnet", "3d-unet-99", "3d-unet-99.9", "rnnt"];

const dbName = "mlperf_inference";
const dbVersion = 3;
const objStore = "inference_results";


function fetchSummaryData() {
    // Open (or create) the database
    var request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function(event) {
        var db = event.target.result;

        switch (event.oldVersion) {

            case 1:
                if (db.objectStoreNames.contains(objStore)) {
                    db.deleteObjectStore(objStore);
                    console.log("Old object store removed");
                }
            default:

                // Create an object store with "Location" as the keyPath
                if (!db.objectStoreNames.contains(objStore)) {
                    var objectStore = db.createObjectStore(objStore, { autoIncrement: true });
                }
                fetchAndStoreData(db);

        }

    };

    request.onsuccess = function(event) {
        var db = event.target.result;

        // Fetch the JSON data from the URL and store it in IndexedDB
        //fetchAndStoreData(db);
    };

    request.onerror = function(event) {
        console.error("Error opening IndexedDB: " + event.target.errorCode);
    };
}

function fetchAndStoreData(db) {
    $.getJSON("https://raw.githubusercontent.com/GATEOverflow/inference_results_v4.0/main/summary_results.json", function(data) {
        // Begin a transaction to save data in IndexedDB
        var transaction = db.transaction([objStore], "readwrite");
        var objectStore = transaction.objectStore(objStore);

        var count = 0;
        for(i = 0; i < data.length; i++) {
            item = data[i];
            var request = objectStore.add(item);
            request.onsuccess = function(event) {
                if(i % 1000 === 0)
                    console.log("Data has been added to your database, record:", i+1);
            };

            request.onerror = function(event) {
                //console.error("Error adding data: " + event.target.errorCode+ event.target);
                //console.log(item);
            };
        }

        transaction.oncomplete = function() {
            console.log("All data has been successfully added to IndexedDB.");
        };

        transaction.onerror = function(event) {
            console.error("Transaction error: " + event.target.errorCode);
        };
    }).fail(function(jqxhr, textStatus, error) {
        console.error("Request Failed: " + textStatus + ", " + error);
    });
}

// read all data from database
function readAllData() {
    return new Promise((resolve, reject) => {
        // Open the database
        var request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = function(event) {
            var db = event.target.result;
            var transaction = db.transaction([objStore], "readonly");
            var objectStore = transaction.objectStore(objStore);

            // Open a cursor to iterate through all records
            var data = [];
            var cursorRequest = objectStore.openCursor();

            cursorRequest.onsuccess = function(event) {
                var cursor = event.target.result;
                if (cursor) {
                    data.push(cursor.value); // Push each record to the data array
                    cursor.continue(); // Move to the next record
                } else {
                    resolve(data); // Resolve the promise with the data array when done
                }
            };

            cursorRequest.onerror = function(event) {
                reject("Error reading data: " + event.target.errorCode);
            };
        };

        request.onerror = function(event) {
            reject("Error opening IndexedDB: " + event.target.errorCode);
        };
    });
}


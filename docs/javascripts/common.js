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
    console.log(request)

    request.onsuccess = function(event) {
        console.log("Database opened successfully!");
        var db = event.target.result; // Get the database instance
    
        // You can check if the object store exists here if needed
        if (db.objectStoreNames.contains(objStore)) {
            console.log("Object store exists.");
        } else {
            console.log("Object store does not exist.");
        }
    };

    request.onerror = function(event) {
        console.error("Error opening IndexedDB: " + event);
    };
    

    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        console.log(event.oldVersion);
        switch (dbVersion - event.oldVersion) {
            case 1:
                if (db.objectStoreNames.contains(objStore)) {
                    db.deleteObjectStore(objStore);
                    console.log("Old object store removed");
                }
            default:

                // Create an object store with "Location" as the keyPath
                if (!db.objectStoreNames.contains(objStore)) {
                    var objectStore = db.createObjectStore(objStore, { autoIncrement: true });
                    console.log("object store created")
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

// for collapsable items
document.addEventListener("DOMContentLoaded", function() {
    const collapsibleButtons = document.querySelectorAll(".collapsible");

    collapsibleButtons.forEach(button => {
        button.addEventListener("click", function() {
            this.classList.toggle("active");
            const content = this.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    });
});

function getUniqueValues(data, key) {
    let uniqueValues = [];
    $.each(data, function(index, item) {
        if (item[key] && uniqueValues.indexOf(item[key]) === -1) {
            uniqueValues.push(item[key]);
        }
    });
    return uniqueValues;
}

function updateScenarioUnits(data) {
    $.each(data, function(index, item) {
if (!scenarioUnits.hasOwnProperty(item['Scenario'])) {
            scenarioUnits[item['Scenario']] = {}
            scenarioUnits[item['Scenario']]['Performance_Units'] = item['Performance_Units'];
        }
        if (item.hasOwnProperty('Power_Units')) {
            if(!scenarioUnits[item['Scenario']].hasOwnProperty('Power_Units')) {
                scenarioUnits[item['Scenario']]['Power_Units'] = item['Power_Units'];
            }
        }
    });
}


function getUniqueValuesCombined(data, sep, keys) {
    let uniqueValues = [];
    $.each(data, function(index, item) {
        values = []
        for(key in keys)
            values.push(item[keys[key]]);
        merged = values.join(sep);
        if (uniqueValues.indexOf(merged) === -1) {
            uniqueValues.push(merged);
        }
    });
    return uniqueValues;
}

function filterData(data, keys, values, extra_filter=null) {
    let filtered_data = [];
    if (!data) return filtered_data;

    data.forEach(function(item) {
        let mismatch = false;

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = values[i];

            if (key == "Suite") {
                if (!item[key].includes(value)) {
                    mismatch = true;
                    break;
                }
            }
            else if (item[key] !== value) {
                mismatch = true;
                break;
            }
            if(extra_filter) {
                if(extra_filter == "accelerator_only"){
                    if (!(item['a#'] > 0)) {
                        mismatch = true;
                        break;
                    }
                }
                else if(extra_filter == "cpu_only"){
                    if (item['a#'] > 0) {
                        mismatch = true;
                        break;
                    }
                }
                else if(extra_filter == "power"){
                    if (!(item.hasOwnProperty('Power_Result'))) {
                        mismatch = true;
                        break;
                    }
                }
            }
        }

        if (!mismatch) {
            filtered_data.push(item);
        }
    });

    return filtered_data;
}

function buildSelectOption(array, selectId, selected=null) {

    $select = $('#'+selectId);
    $select.empty();
$.each(array, function(index, value) {
    if(selected && value == selected) {
        sel_text = " selected ";
    }
    else {
        sel_text = ""
    }
    let $option = $('<option '+sel_text+'></option>') // Create a new option element
        .val(value.replace(/ /g, '_')) // Optionally set a value attribute
        .text(value); // Set the display text

    $select.append($option); // Append the option to the select element
});
}

let tableposhtml = `
            <!-- pager -->
            <div class="pager">
            <img src="https://mottie.github.io/tablesorter/addons/pager/icons/first.png" class="first"/>
            <img src="https://mottie.github.io/tablesorter/addons/pager/icons/prev.png" class="prev"/>
            <span class="pagedisplay"></span> <!-- this can be any element, including an input -->
            <img src="https://mottie.github.io/tablesorter/addons/pager/icons/next.png" class="next"/>
            <img src="https://mottie.github.io/tablesorter/addons/pager/icons/last.png" class="last"/>
            <select class="pagesize" title="Select page size">
            <option selected="selected" value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="all">All</option>
            </select>
            <select class="gotoPage" title="Select page number"></select>
            </div>
        `;




$( document ).on( "click", "athead th", function() {
    drawPerfCharts();
});

var device_column_name = "Processor";
var device_count_column_name = "Total Physical Cores";
var additional_metric_column_name = "Performance per accelerator";
var version = "v4.0";

function updateContent(myData) {
    var models = getUniqueValues(myData, "Model");
    var platforms = getUniqueValues(myData, "Platform");
    var accelerators = getUniqueValues(myData, "Accelerator");
    var devices = getUniqueValuesCombined(myData, " x ", [ "Accelerator", "a#" ]);
    var platforms = getUniqueValuesCombined(myData, " : ", [ "version", "Platform" ]);
    var scenarios = validScenarios["datacenter"];// getUniqueValues(myData, "Scenario");
    model = $("#model").val(); 
    updateScenarioUnits(myData);
    buildSelectOption(models, "model", model);
    buildSelectOption(scenarios, "scenario");
    buildSelectOption(platforms, "filter_systems");
    buildSelectOption(devices, "filter_devices");
    //console.log(models);
    //console.log(platforms);
    //console.log(accelerators);
    division = $("#division").val(); 
    scenario = $("#scenario").val(); 
    tablehtml = constructTable(division, scenario, model, myData);
    //console.log(division+scenario);
    //console.log(tablehtml);
    document.getElementById("topresults_table_wrapper").innerHTML = tablehtml;

}
$(document).ready(function() {
    readAllData().then(function(allData) {
        //console.log(allData);
        keys = [ "Suite", "Category", "Availability" ];
        values = [ "datacenter", "closed", "available" ];

        myData = filterData(allData, keys, values);
        updateContent(myData);
    }).catch(function(error) {
        console.error(error);
    });

    console.log("The page is fully loaded.");
});


function constructTable(division, scenario, model, result) {
    let html = `
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

    let theader = `
        <th>System</th>
        <th>Submitter</th>
        <th>${device_column_name}</th>
        <th>${device_count_column_name}</th>
        <th>Framework</th>
    `;

    if (division === "open") {
        theader += `
            <th>Model</th>
            <th>Accuracy</th>
        `;
    }

    if (additional_metric_column_name) {
        theader += `<th>${additional_metric_column_name}</th>`;
    }

    html += `
        <table class="tablesorter" id="results">
            <thead>
                <tr>${theader}</tr>
            </thead>
            <tfoot>
                <tr>${theader}</tr>
            </tfoot>
            <tbody>
    `;

    const performance_title = "Samples per Second";

    result.forEach(row => {
        //console.log(row);
        let cores = 0;
        html += "<tr>";
        const platform = row.Platform;
        const resultid = row.ID;
        const location = `https://github.com/mlcommons/inference_results_${version}/tree/main/${row.Location}`;
        // html += `<td title="${resultid}" class='location'><a target="_blank" href="${location}">${platform}</a></td>`;
        html += `<td title="${platform}">${row.System}</td>`;
        html += `<td>${row.Submitter}</td>`;

        if (row["a#"] == 0) {
            cores = row.Nodes * row.host_processors_per_node * row.host_processor_core_count;
            html += `<td>${row.host_processor_model_name}</td>`;
            html += `<td>${cores}</td>`;
        } else {
            html += `<td>${row.Accelerator}</td>`;
            html += `<td>${row["a#"]}</td>`;
        }

        html += `<td>${row.Software}</td>`;

        if (division === "open") {
            html += `<td>${row.Model}</td>`;
            html += `<td>${row.Accuracy}</td>`;
        }

        html += `<td class='performance' title='${performance_title}'>${row.Performance_Result}</td>`;

        if (additional_metric_column_name) {
            let value;
            if (metric === "Power efficiency") {
                let power_efficiency;
                if (scenario === "Offline" || scenario === "Server") {
                    power_efficiency = (row.Performance_Result / row.Power_Result).toFixed(2);
                } else if (scenario === "SingleStream") {
                    power_efficiency = (1000 / row.Power_Result).toFixed(2);
                } else if (scenario === "MultiStream") {
                    power_efficiency = (8000 / row.Power_Result).toFixed(2);
                }
                html += `<td class='power' title='Total Watts: ${row.Power_result}'>${power_efficiency}</td>`;
            } else if (metric === "Performance per accelerator") {
                value = row["a#"] > 0 ? (row.Performance_Result / row["a#"]).toFixed(2) : "0";
                html += `<td class='power'>${value}</td>`;
            } else if (metric === "Performance per core") {
                value = (row.Performance_Result / cores).toFixed(2);
                html += `<td class='power'>${value}</td>`;
            }
        }

        html += "</tr>";
    });

    html += `
            </tbody>
        </table>
    `;

    html += `
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

    return html;

}




$( document ).on( "click", "#results_Offline thead th", function() {
    drawCompareCharts_("Offline");
});
$( document ).on( "click", "#results_Server thead th", function() {
    drawCompareCharts_("Server");
});
$( document ).on( "click", "#results_SingleStream thead th", function() {
    drawCompareCharts_("SingleStream");
});
$( document ).on( "click", "#results_MultiStream thead th", function() {
    drawCompareCharts_("MultiStream");
});


$(document).ready(function() {
    //if(!is_power)
    {
        $('.power-content').hide();
    }
    $('#resultSelectionForm').submit(function(event) {
        event.preventDefault(); // This will cancel the form submission

        // Your custom logic here
        //console.log('Form submission canceled.');
        var system1 = $('#system1 option:selected').text();
        var system2 = $('#system2 option:selected').text();
        var selected_models = $('#models option:selected').map(function() {
            return $(this).text();
        }).get();

        //console.log(system1);
        //console.log(system2);
        //console.log(selected_models);
        //scenario = "Offline";
        //getSummaryData();
        /*   constructTable(scenario, models, system1, system2, False, results1, results2) {

        // Optionally, you can handle the form data yourself
        */
        var data;
        readAllData().then(function(allData) {
            //console.log(allData);
            sysversion1 = "v4.0";
            sysversion2 = "v4.0";
            reConstructTables(system1, sysversion1, system2, sysversion2, selected_models, allData);
        }).catch(function(error) {
            console.error(error);
        });
    }
    );

});



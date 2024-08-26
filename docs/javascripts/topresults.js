

$( document ).on( "click", "athead th", function() {
	drawPerfCharts();
});

$(document).ready(function() {
    // Your code here
  
        readAllData().then(function(allData) {
            //console.log(allData);
            keys = [ "Suite", "Category", "Availability" ];
            values = [ "datacenter", "closed", "available" ];

            myData = filterData(allData, keys, values);

            var models = getUniqueValues(myData, "Model");
            var platforms = getUniqueValues(myData, "Platform");
            var accelerators = getUniqueValues(myData, "Accelerator");
            var devices = getUniqueValuesCombined(myData, " x ", [ "Accelerator", "a#" ]);
            var platforms = getUniqueValuesCombined(myData, " : ", [ "version", "Platform" ]);
            var scenarios = validScenarios["datacenter"];// getUniqueValues(myData, "Scenario");
            buildSelectOption(models, "model");
            buildSelectOption(scenarios, "scenario");
            buildSelectOption(platforms, "filter_systems");
            buildSelectOption(devices, "filter_devices");
            sysversion1 = "v4.0";
            sysversion2 = "v4.0";
            console.log(models);
            //console.log(platforms);
            //console.log(accelerators);
            //reConstructTables(system1, sysversion1, system2, sysversion2, selected_models, allData);
        }).catch(function(error) {
            console.error(error);
        });

    console.log("The page is fully loaded.");
});


function construct_table(scenario, models, data1, data2, isPower, results1, results2) {
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
        let cores = 0;
        html += "<tr>";
        const platform = row.platform;
        const resultid = row.result_id;
        const location = `https://github.com/mlcommons/inference_results_${version}/tree/main/${row.Location}`;
       // html += `<td title="${resultid}" class='location'><a target="_blank" href="${location}">${platform}</a></td>`;
        html += `<td title="${platform}">${row.systemname}</td>`;
        html += `<td>${row.organization}</td>`;
        
        if (row.accelerators_per_node == 0) {
            cores = row.number_of_nodes * row.host_processors_per_node * row.host_processor_core_count;
            html += `<td>${row.host_processor_model_name}</td>`;
            html += `<td>${cores}</td>`;
        } else {
            html += `<td>${row.accelerator_model_name}</td>`;
            html += `<td>${row.accelerators_per_node}</td>`;
        }

        html += `<td>${row.framework}</td>`;

        if (division === "open") {
            html += `<td>${row.model}</td>`;
            html += `<td>${row.accuracy}</td>`;
        }

        html += `<td class='performance' title='${performance_title}'>${row.Performance_Result}</td>`;

        if (additional_metric_column_name) {
            let value;
            if (metric === "Power efficiency") {
                let power_efficiency;
                if (scenario === "Offline" || scenario === "Server") {
                    power_efficiency = (row.performance_result / row.power_result).toFixed(2);
                } else if (scenario === "SingleStream") {
                    power_efficiency = (1000 / row.power_result).toFixed(2);
                } else if (scenario === "MultiStream") {
                    power_efficiency = (8000 / row.power_result).toFixed(2);
                }
                html += `<td class='power' title='Total Watts: ${row.power_result}'>${power_efficiency}</td>`;
            } else if (metric === "Performance per accelerator") {
                value = row.accelerators_per_node > 0 ? (row.performance_result / row.accelerators_per_node).toFixed(2) : "0";
                html += `<td class='power'>${value}</td>`;
            } else if (metric === "Performance per core") {
                value = (row.performance_result / cores).toFixed(2);
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
    $('#compareform').submit(function(event) {
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

        fetchSummaryData();
});

// scenarios, system1, sysversion1, system2, sysversion2, data, ytitle_scenarios
function reConstructTables(system1, sysversion1, system2, sysversion2, selected_models, data) {
    scenarios = [ "Offline", "Server", "SingleStream", "MultiStream"];
scenarios.forEach(function(scenario) {
    let keys = ["Scenario", "Platform", "version"];
    let values = [scenario, system1, sysversion1];
    //console.log(scenario);

    let result1 = filterdata(data, keys, values);
    if (result1.length === 0) {
        $("#"+scenario).hide();
        //console.log(scenario +" is getting hidden")
        return; // Continue to the next scenario
    }

    values = [scenario, system2, sysversion2];
    let result2 = filterdata(data, keys, values);
    if (result2.length === 0) {
        $("#"+scenario).hide();
        //console.log(scenario +" is getting hidden")
        return; // Continue to the next scenario
    }
    $("#"+scenario).show();

    let is_power = result1[0]['has_power'] && result2[0]['has_power'];
    //console.log("is_power " + is_power);

    let data1_str = `${sysversion1}: ${system1}`;
    let data2_str = `${sysversion2}: ${system2}`;
    //let ytitle = ytitle_scenarios[scenario];

    let models = [];
    let result2_models = result2.map(row => row['Model']);

    result1.forEach(function(row) {
        if (selected_models == "All models") {
            if (!models.includes(row['Model']) && result2_models.includes(row['Model'])) {
                models.push(row['Model']);
            }
        }
        else {
            if (!models.includes(row['Model']) && result2_models.includes(row['Model']) && selected_models.includes(row['Model']) ) {
                models.push(row['Model']);
            }
        }
    });

    let results1 = {};
    let results2 = {};

    models.forEach(function(model) {
        results1[model] = result1.find(row => row['Model'] === model);
        results2[model] = result2.find(row => row['Model'] === model);
    });

    //console.log(results1);
    //console.log(results2);
    $("#table_header_"+scenario).text(`Comparing ${scenario} scenario for ${data1_str} and ${data2_str}`);
    //is_power = (result2[0]['has_power'])
    //is_power = false
    //console.log(scenario);

    data1[scenario] = data1_str, data2[scenario] = data2_str, draw_power[scenario] = is_power, draw_power_efficiency[scenario] = is_power;

    let htmltable = construct_table(scenario, models, data1_str, data2_str, is_power, results1, results2);
    html = htmltable;
    if(is_power) {
        $('.power-content').show();
    }
    else{
        $('.power-content').hide();
    }

    //console.log(html);

    // Assuming you want to append this HTML to a specific element on your page
    var elemId = "results_" + scenario
    //console.log(elemId);
    document.getElementById(elemId).innerHTML = html;
    $('table').tablesorter();
    var resort = true, // re-apply the current sort
        callback = function() {
          // do something after the updateAll method has completed
        };

      // let the plugin know that we made a update, then the plugin will
      // automatically sort the table based on the header settings
      $("table").trigger("updateAll", [ resort, callback ]);
    drawCompareCharts();
});
}


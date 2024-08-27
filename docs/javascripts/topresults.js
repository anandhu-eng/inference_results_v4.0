var allData = [];

$( document ).on( "click", "#results thead th", function() {
    drawPerfCharts();
});

var device_column_name = "Accelerator";
var device_count_column_name = "#a";
var additional_metric_column_name = "Performance per accelerator";
var version = "v4.0";
var openmodel=false;
var sortcolumnindex = 6;
var perfcolumnindex = 7; // starting from 1
var chart1title = ''; //defined when selecting metric
var chart2title = '';
var chart3title = 'Accuracy vs Performance';
var chart1ytitle = '';
var chart2ytitle = '';
var chart3ytitle = 'Accuracy';
var chart3xtitle = chart1ytitle;
var perfsortorder = 1;
var model='llama2-70b-99.9';

function updateContent(myData) {
    model = $("#model").val();
    scenario = $("#scenario").val();
    division = $("#division").val(); 
    metric = $("#metric").val(); 
    //updateScenarioUnits(myData);
    tablehtml = constructTable(division, scenario, model, metric, myData);
    //console.log(division+scenario);
    //console.log(tablehtml);
    document.getElementById("topresults_table_wrapper").innerHTML = tablehtml;
    tableSorterInit();
    
    //$('table').tablesorter();
    //$("table").trigger("updateAll");
    $('table')
    .tablesorter()
// bind to sort events
    .bind('tablesorter-ready', function(e, table) {
        // do something after the 'refreshWidgets' has refreshed
        //drawPowerChart();
        drawPerfCharts();
    });

}

$(document).ready(function() {
    readAllData().then(function(global_data) {
        //console.log(allData);
        allData = global_data;
        keys = [ "Suite", "Category", "Availability" ];
        values = [ "datacenter", "closed", "available" ];
        myData = filterData(allData, keys, values);
        var models = getUniqueValues(myData, "Model");
        scenario = "Offline";
        division = "closed"; 
        keys = ["Model", "Scenario"];
        values = ["llama2-70b-99.9", scenario];
        myData = filterData(myData, keys, values);
        //console.log(myData);
        $("#model").append('<option value="llama2-70b-99.9">Llama 2</option>');
    var platforms = getUniqueValues(myData, "Platform");
    var accelerators = getUniqueValues(myData, "Accelerator");
    var devices = getUniqueValuesCombined(myData, " x ", [ "Accelerator", "a#" ]);
    var platforms = getUniqueValuesCombined(myData, " : ", [ "version", "Platform" ]);
    var scenarios = validScenarios["datacenter"];// getUniqueValues(myData, "Scenario");
    model = $("#model").val();
    updateScenarioUnits(myData);
    buildSelectOption(models, "model", model);
    buildSelectOption(scenarios, "scenario", scenario);
    buildSelectOption(platforms, "filter_systems");
        updateContent(myData);
    }).catch(function(error) {
        console.error(error);
    });

    //console.log("The page is fully loaded.");
});


function constructTable(division, scenario, model, metric, result) {
    //console.log(metric);
    let html = tableposhtml;
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
    theader += `<th>Performance</th>`;

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

        html += `<td class='performance' title='${performance_title}'>${row.Performance_Result.toFixed(2)}</td>`;

        if (additional_metric_column_name) {
            let value;
            if (metric === "power_efficiency") {
                let power_efficiency;
                if (scenario === "Offline" || scenario === "Server") {
                    power_efficiency = (row.Performance_Result / row.Power_Result).toFixed(2);
                } else if (scenario === "SingleStream") {
                    power_efficiency = (1000 / row.Power_Result).toFixed(2);
                } else if (scenario === "MultiStream") {
                    power_efficiency = (8000 / row.Power_Result).toFixed(2);
                }
                html += `<td class='power' title='Total Watts: ${row.Power_Result.toFixed(0)}'>${power_efficiency}</td>`;
            } else if (metric === "performance_per_accelerator") {
                //console.log(row.Performance_Result);
                value = row["a#"] > 0 ? (row.Performance_Result / row["a#"]).toFixed(2) : "0";
                html += `<td class='power'>${value}</td>`;
            } else if (metric === "performance_per_core") {
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

    html += tableposhtml;

    return html;

}






$(document).ready(function() {
    $('#resultSelectionForm').submit(function(event) {
        event.preventDefault(); // This will cancel the form submission

        // Your custom logic here
        //console.log('Form submission canceled.');
        var category = $('#category').val();
        var division = $('#division').val();
        var availability = $('#availability').val();
        var scenario = $('#scenario').val();
        var metric = $('#metric').val();
        var model = $('#model').val();
        var system2 = $('#system2 option:selected').text();
        var filter_systems = $('#filter_systems option:selected').map(function() {
            return $(this).text();
        }).get();
        var filter_devices = $('#filter_devices option:selected').map(function() {
            return $(this).text();
        }).get();

        sortcolumnindex = 5;
        perfcolumnindex = 6; // starting from 1

        //console.log(division);
        if(division == "closed") {
            $('#chartContainer3').hide();
            $('#printChart3').hide();
        }
        else {
            $('#chartContainer3').show();
            $('#printChart3').show();
             sortcolumnindex+=2;
             perfcolumnindex+=2;
        }
        //console.log(category+division+availability+scenario+metric+model);
        keys = [ "Suite", "Category", "Availability" ];
        values = [ category, division, availability ];
        //console.log(allData);
        myData = filterData(allData, keys, values);
        //console.log(scenario);
        var models = getUniqueValues(myData, "Model");
        keys = ["Model", "Scenario"];
        values = [model, scenario];
        myData = filterData(myData, keys, values);


        additional_metric_column_name = "";
        chart2title = "";
        chart2ytitle = "";
        perfsortorder = 0;
        charttitlesuffix = ` for ${model} ${scenario} scenario in ${division} division ${category} category`;

        if (metric === 'performance') {
            device_column_name = "Device";
            device_count_column_name = "#devices";
            additional_metric_column_name = "";
            $('#chartContainer2').hide();
            $('#printChart2').hide();
        } else if (metric === 'power_efficiency') {
            device_column_name = "Processor";
            device_count_column_name = "Total Physical Cores";
            additional_metric_column_name = "Samples per Joule";
            chart2title = "Power efficiency " + charttitlesuffix;
            chart2ytitle = "Samples per Joule";
            sortcolumnindex = 6;
            perfsortorder = 1;
            $('#chartContainer2').show();
        } else if (metric === 'performance_per_accelerator') {
            device_column_name = "Accelerator";
            device_count_column_name = "#a";
            //filter = " and accelerators_per_node > 0";
            if (scenario === "Offline") {
                additional_metric_column_name = "Performance per accelerator";
                chart2title = "Performance per accelerator " + charttitlesuffix;
                chart2ytitle = "Samples per second per accelerator";
                sortcolumnindex = 6;
            }
            $('#chartContainer2').show();
       } else if (metric === 'performance_per_core') {
            //filter = " and accelerators_per_node = 0";
            device_column_name = "Processor";
            device_count_column_name = "Total Physical Cores";
            if (scenario === "Offline") {
                additional_metric_column_name = "Performance per core";
                chart2title = "Performance per core " + charttitlesuffix;
                chart2ytitle = "Samples per second per core";
                sortcolumnindex = 6;
            }
            $('#chartContainer2').show();
        }   

        updateContent(myData);
        //console.log(myData);
    });

});

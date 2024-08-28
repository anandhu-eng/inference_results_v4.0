function reConstructAccvsPerfChart(category, division, with_power, data) {
    availabilities = [ "Available", "Preview", "RDI" ]; 
    availabilities.forEach(function(availability) {
        // filtered data as per the user choice
        const filteredResults = filterDataResultsTable(category, division, with_power, availability, data);
        //console.log(filteredResults.length);
        constructAccvsPerfChart(category, division, with_power, availability, filteredResults);
    });
}

function drawAccvsPerfPlot(category, division, with_power, availability, data) {
    // the data here is the preprocessed data through function preprocessData
    models = []
    if (category == "datacenter") {
        models = models_datacenter;
    }
    else{
        models = models_edge;
    }
    models.forEach(function(model, index) {
        let accuracyMetric = ``;
        // Currently the first accuracy matrix is used to construct the scatter plot
        if (accuracyUnits.hasOwnProperty(model)) {
            accuracyMetric = accuracyUnits[model].split(",")[0].trim();
        }
        if (category === "datacenter" && division === "open") {
            let filteredData = filterForAccvsPerfPlot(data, model, category, division, accuracyMetric);
            if (filteredData.length !== 0) {
                let chart = new CanvasJS.Chart(`AccVsPerfScatterPlot_${model}_${division}_${category}`, {
                    animationEnabled: true,
                    theme: "light2",
                    title:{
                      text: `Accuracy vs Performance for ${model}`
                    },
                    axisX:{
                      title: "Performance"
                    },
                    axisY:{
                      title: "Accuracy",
                      includeZero: false
                    },
                    data: [{
                      type: "scatter",
                      toolTipContent: "<b>Submitter:</b> {Submitter}<br/><b>System:</b> {System}<br/><b>Scenario:</b> {Scenario}<br/><b>Performance:</b> {x}<br/><b>Accuracy:</b> {y}",
                      dataPoints: filteredData
                    }]
                  });
                chart.render();
            }
        }
    });
}

function constructAccvsPerfChart(category, division, with_power, availability, data) {
    var mydata = processData(data, category, division, availability)
    if (!Object.keys(mydata).length) {
        return null; // return if mydata is null
    }
    if(division == "open") {
        html =  drawAccvsPerfPlot(category, division, with_power, availability, mydata);
        //console.log(html);
        return html;
    }
}

function filterForAccvsPerfPlot(processedData, modelName, category, division, accuracyMetric) {
    const result = [];

    for (const myId in processedData) {
        const models = processedData[myId];
        if (models[modelName] && models.Category === division) {
            // console.log(models.Category);
            const scenarios = models[modelName];
            for (const scenario in scenarios) {
                const scenarioData = scenarios[scenario];
                const accuracyValues = scenarioData.Accuracy;
                // Accuracy value for the specific accuracy matrix would be extracted through this function
                const accuracyValue = parseFloat(extractAccuracyValue(accuracyValues, accuracyMetric));
                // console.log(typeof(accuracyValue));
                let markerType;
                switch (scenario) {
                    case "Offline":
                        markerType = "circle"; // Circle for Offline
                        break;
                    case "Server":
                        markerType = "triangle"; // Square for Server
                        break;
                    case "SingleStream":
                        markerType = "square"; // Triangle for Single Stream
                        break;
                    case "MultiStream":
                        markerType = "cross"; // Cross for Multi Stream
                        break;
                    default:
                        markerType = "circle"; // Default to circle if scenario is unknown
                }
                const details = {
                    x: scenarioData.Performance_Result,
                    y: accuracyValue,
                    Submitter: models.Submitter,
                    System: models.System,
                    Scenario: scenario,
                    markerType: markerType
                    // These are the keys that could be enabled if required in the future
                    // ID: myId,
                    // Model: modelName,
                    // // Scenario: scenario,
                    // // has_power: scenarioData.has_power,
                    // // Power_Result: scenarioData.Power_Result,
                    // // Power_Units: scenarioData.Power_Units,
                    // y: accuracyValue,
                    // Scenario: scenario,
                    // x: scenarioData.Performance_Result,
                    // Performance_Units: scenarioData.Performance_Units,
                    // Submitter: models.Submitter,
                    // System: models.System
                };

                result.push(details);
            }
        }
    }

    return result;
}


function constructChartFromSummary(data, category, division, with_power) {
    const [summaryData, countData] = getSummaryData(data, category, division, with_power);

    let html = "";
    html += `
        <div id="submittervssubmissionchartContainer" style="height: 370px; width: 100%;"></div>
        <div id="modelvssubmissionchartContainer" style="height: 370px; width: 100%;"></div>
    `;

    let submitterVsSubmissionsCntTmp = {};
    let modelsVsSubmissionsCntTmp = {};

    if ( category==="edge" ) {
        models = models_edge;
        //console.log("edgecategory");
    }
    else {
        models = models_datacenter;
        //console.log("datacenter");
    }

    // Loop for getting submitters vs number of submissions count
    for (const [submitter, item] of Object.entries(countData)) {
        let cnt = 0;
        for (const m of models) {
            if (item[m] !== undefined && item[m] !== '') {
                cnt += item[m];
                if (modelsVsSubmissionsCntTmp[m] === undefined) {
                    modelsVsSubmissionsCntTmp[m] = item[m];
                } else {
                    modelsVsSubmissionsCntTmp[m] += item[m];
                }
            }
        }
        submitterVsSubmissionsCntTmp[submitter] = cnt;
    }

    submitterVsSubmissionsCnt = Object.entries(submitterVsSubmissionsCntTmp).map(([key, value]) => ({
        label: key,
        y: value
    }));

    modelsVsSubmissionsCnt = Object.entries(modelsVsSubmissionsCntTmp).map(([key, value]) => ({
        label: key,
        y: value
    }));

    drawChartResults();
}
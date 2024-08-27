// for drawing pie chart for submitter name and number of submissions
alert(dataPointsSubmittervsSubmission)
var submitter_vs_submissions_chart = new CanvasJS.Chart("ContainerSubmitterSubmissions",
	{
		title:{
			text: "Number of Submissions by submitter"
		},
        axisX: {
            intervalType: String,
            valueFormatString: " ",
			title: "Submitters",
			labelAngle: -45
		},
        axisY: {
			title: "Number of Submissions"
		},
		legend: {
			maxWidth: 1000,
			itemWidth: 120
		},
		data: [
		{
			type: "column",
			showInLegend: true,
			legendText: "{indexLabel}",
			dataPoints: dataPointsSubmittervsSubmission
		}
		]
	});
submitter_vs_submissions_chart.render();

var submitter_vs_submissions_chart = new CanvasJS.Chart("pieContainerSubmitterSubmissions",
	{
		title:{
			text: "Number of Submissions by submitter"
		},
        axisX: {
            intervalType: String,
            valueFormatString: " ",
			title: "Submitters",
			labelAngle: -45
		},
        axisY: {
			title: "Number of Submissions"
		},
		legend: {
			maxWidth: 1000,
			itemWidth: 120
		},
		data: [
		{
			type: "pie",
			showInLegend: true,
			legendText: "{indexLabel}",
			dataPoints: dataPointsSubmittervsSubmission
		}
		]
	});
submitter_vs_submissions_chart.render();
function drawChart(type, filter, dayArrInc, dayArrExp) {
//	getData('act');
	// Get context with jQuery - using jQuery's .get() method.
	var ctx = $("#myChart").get(0).getContext("2d");
//	var months = "January", "February", "March", "April", "May", "June", "July"
	var label = ["test lbl"]
	if (filter == "month" && type == "all") {
		var data = {
			    labels: ["01", "02", "03", "04", "05", "06", "07", "10", "11", "12", "13", "14", "15", "16", "17", 
			             "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
			    datasets: [
			        {
			            label: "Income",
			            fillColor: "rgba(0,255,0,0.5)",
			            strokeColor: "rgba(0,255,0,0.8)",
			            highlightFill: "rgba(0,255,0,0.75)",
			            highlightStroke: "rgba(0,255,0,1)",
			            data: [dayArrInc["01"], dayArrInc["02"], dayArrInc["03"], dayArrInc["04"], dayArrInc["05"], dayArrInc["06"], dayArrInc["07"], dayArrInc["10"], dayArrInc["11"], dayArrInc["12"], dayArrInc["13"], dayArrInc["14"], dayArrInc["15"], dayArrInc["16"], dayArrInc["17"], dayArrInc["18"], dayArrInc["19"], dayArrInc["20"], dayArrInc["21"], dayArrInc["22"], dayArrInc["23"], dayArrInc["24"], dayArrInc["25"], dayArrInc["26"], dayArrInc["27"], dayArrInc["28"], dayArrInc["29"], dayArrInc["30"], dayArrInc["31"]]
			        },
			        {
			            label: "Expense",
			            fillColor: "rgba(255,0,0,0.5)",
			            strokeColor: "rgba(255,0,0,0.8)",
			            highlightFill: "rgba(255,0,0,0.75)",
			            highlightStroke: "rgba(255,0,0,1)",
			            data: [dayArrExp["01"], dayArrExp["02"], dayArrExp["03"], dayArrExp["04"], dayArrExp["05"], dayArrExp["06"], dayArrExp["07"], dayArrExp["10"], dayArrExp["11"], dayArrExp["12"], dayArrExp["13"], dayArrExp["14"], dayArrExp["15"], dayArrExp["16"], dayArrExp["17"], dayArrExp["18"], dayArrExp["19"], dayArrExp["20"], dayArrExp["21"], dayArrExp["22"], dayArrExp["23"], dayArrExp["24"], dayArrExp["25"], dayArrExp["26"], dayArrExp["27"], dayArrExp["28"], dayArrExp["29"], dayArrExp["30"], dayArrExp["31"]]
			        }
			    ]
		};
	}
	else if (filter == "month" && type == "inc") {
		var data = {
			    labels: ["01", "02", "03", "04", "05", "06", "07", "10", "11", "12", "13", "14", "15", "16", "17", 
			             "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
			    datasets: [
			        {
			            label: "Income",
			            fillColor: "rgba(0,255,0,0.5)",
			            strokeColor: "rgba(0,255,0,0.8)",
			            highlightFill: "rgba(0,255,0,0.75)",
			            highlightStroke: "rgba(0,255,0,1)",
			            data: [dayArrInc["01"], dayArrInc["02"], dayArrInc["03"], dayArrInc["04"], dayArrInc["05"], dayArrInc["06"], dayArrInc["07"], dayArrInc["10"], dayArrInc["11"], dayArrInc["12"], dayArrInc["13"], dayArrInc["14"], dayArrInc["15"], dayArrInc["16"], dayArrInc["17"], dayArrInc["18"], dayArrInc["19"], dayArrInc["20"], dayArrInc["21"], dayArrInc["22"], dayArrInc["23"], dayArrInc["24"], dayArrInc["25"], dayArrInc["26"], dayArrInc["27"], dayArrInc["28"], dayArrInc["29"], dayArrInc["30"], dayArrInc["31"]]
			        }
			    ]
		};
	}
	else if (filter == "month" && type == "exp") {
		var data = {
			    labels: ["01", "02", "03", "04", "05", "06", "07", "10", "11", "12", "13", "14", "15", "16", "17", 
			             "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
			    datasets: [
			        {
			            label: "Expense",
			            fillColor: "rgba(255,0,0,0.5)",
			            strokeColor: "rgba(255,0,0,0.8)",
			            highlightFill: "rgba(255,0,0,0.75)",
			            highlightStroke: "rgba(255,0,0,1)",
			            data: [dayArrExp["01"], dayArrExp["02"], dayArrExp["03"], dayArrExp["04"], dayArrExp["05"], dayArrExp["06"], dayArrExp["07"], dayArrExp["10"], dayArrExp["11"], dayArrExp["12"], dayArrExp["13"], dayArrExp["14"], dayArrExp["15"], dayArrExp["16"], dayArrExp["17"], dayArrExp["18"], dayArrExp["19"], dayArrExp["20"], dayArrExp["21"], dayArrExp["22"], dayArrExp["23"], dayArrExp["24"], dayArrExp["25"], dayArrExp["26"], dayArrExp["27"], dayArrExp["28"], dayArrExp["29"], dayArrExp["30"], dayArrExp["31"]]
			        }
			    ]
		};
	}
	else if (filter == "month" && type == "bal") {
//		var index;
//		for	(index = 0; index < dayArrExp.length; index++) {
//		    dayArrBal[index] = fruits[index];
//		} 
		var data = {
			    labels: ["01", "02", "03", "04", "05", "06", "07", "10", "11", "12", "13", "14", "15", "16", "17", 
			             "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
			    datasets: [
			        {
			            label: "Balance",
			            fillColor: "rgba(0,78,204,0.5)",
			            strokeColor: "rgba(0,78,204,0.8)",
			            highlightFill: "rgba(0,78,204,0.75)",
			            highlightStroke: "rgba(0,78,204,1)",
			            data: [(+dayArrInc["01"] - +dayArrExp["01"]), (+dayArrInc["02"] - +dayArrExp["02"]), (+dayArrInc["03"] - +dayArrExp["03"]), (+dayArrInc["04"] - +dayArrExp["04"]), (+dayArrInc["05"] - +dayArrExp["05"]), (+dayArrInc["06"] - +dayArrExp["06"]), (+dayArrInc["07"] - +dayArrExp["07"]), (+dayArrInc["10"] - +dayArrExp["10"]), (+dayArrInc["11"] - +dayArrExp["11"]), (+dayArrInc["12"] - +dayArrExp["12"]), (+dayArrInc["13"] - +dayArrExp["13"]), (+dayArrInc["14"] - +dayArrExp["14"]), (+dayArrInc["15"] - +dayArrExp["15"]), (+dayArrInc["16"] - +dayArrExp["16"]), (+dayArrInc["17"] - +dayArrExp["17"]), (+dayArrInc["18"] - +dayArrExp["18"]), (+dayArrInc["19"] - +dayArrExp["19"]), (+dayArrInc["20"] - +dayArrExp["20"]), (+dayArrInc["21"] - +dayArrExp["21"]), (+dayArrInc["22"] - +dayArrExp["22"]), (+dayArrInc["23"] - +dayArrExp["23"]), (+dayArrInc["24"] - +dayArrExp["24"]), (+dayArrInc["25"] - +dayArrExp["25"]), (+dayArrInc["26"] - +dayArrExp["26"]), (+dayArrInc["27"] - +dayArrExp["27"]), (+dayArrInc["28"] - +dayArrExp["28"]), (+dayArrInc["29"] - +dayArrExp["29"]), (+dayArrInc["30"] - +dayArrExp["30"]), (+dayArrInc["31"] - +dayArrExp["31"])]
			        }
			    ]
		};
	}
	
	var options = {
	    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	    scaleBeginAtZero : true,

	    //Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,
	    
	    
	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,

	    //Boolean - If there is a stroke on each bar
	    barShowStroke : true,

	    //Number - Pixel width of the bar stroke
	    barStrokeWidth : 2,

	    //Number - Spacing between each of the X value sets
	    barValueSpacing : 3,

	    //Number - Spacing between data sets within X values
	    barDatasetSpacing : 1,

	    //String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	}

	
	// This will get the first returned node in the jQuery collection.
	var myBarChart = new Chart(ctx).Bar(data, options);
	
}

//get sum of all transactions
function getChart(type, filter) {
	var dayArrInc = {  	'01': '0', '02': '0', '03': '0', '04': '0', '05': '0', '06': '0', '07': '0', '08': '0', '09': '0', '10': '0', 
			'11': '0', '12': '0', '13': '0', '14': '0', '15': '0', '16': '0', '17': '0', '18': '0', '19': '0', '20': '0', 
			'21': '0', '22': '0', '23': '0', '24': '0', '25': '0', '26': '0', '27': '0', '28': '0', '29': '0', '30': '0', '31': '0' }
	var dayArrExp = {  	'01': '0', '02': '0', '03': '0', '04': '0', '05': '0', '06': '0', '07': '0', '08': '0', '09': '0', '10': '0', 
			'11': '0', '12': '0', '13': '0', '14': '0', '15': '0', '16': '0', '17': '0', '18': '0', '19': '0', '20': '0', 
			'21': '0', '22': '0', '23': '0', '24': '0', '25': '0', '26': '0', '27': '0', '28': '0', '29': '0', '30': '0', '31': '0' }
 	var totalInc = "0";
 	var totalExp = "0";
 	var totalSum = "0";
 	console.log(type + ":" + filter);
// 	if ( event == "act") {
// 		var action = "act";
// 	} else {
// 		var action = event.data.action;
// 	}
 	
	var today = getDate();
	
	if ( filter == "month") {
		monthFilter = today.split("-",2)[1];
		yearFilter = today.split("-",2)[0];
	}		
	else if (action == "next") {
		monthFilter++;
    }
    else if (action == "prev") {
    	monthFilter--;
    }

	monthFilter = ("0" + monthFilter).slice(-2);
	
    if (monthFilter == "13" && action == "next") {
    	yearFilter++;
    	monthFilter = "01";
    }
    else if (monthFilter == "00" && action == "prev") {
    	yearFilter--;
    	monthFilter = "12";
    }

	var months = {	'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June',
			'07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December' };

	// display month name
	$("#month").html(months[monthFilter]);
  
	var objectStore = db.transaction(["expanses"],"readonly").objectStore("expanses");	
	var index = objectStore.index("date");
	var boundKeyRange = IDBKeyRange.bound(yearFilter + "-" + monthFilter + "-01", yearFilter + "-" + monthFilter + "-31", false, false);

	// To use one of the key ranges, pass it in as the first argument of
	// openCursor()/openKeyCursor()
	index.openCursor(boundKeyRange).onsuccess = function(event) {
		var cursor = event.target.result;
		
		// if there is still another cursor to go, keep runing this code
		if(cursor) {
			var dayFilter = cursor.value.date.split("-",3)[2];
//			var dayFilter = cursor.value.date;
//			dayFilter = dayFilter.split("-",2)[2];
			if (cursor.value.ttype == "inc") {
//				totalInc = (+totalInc + +cursor.value.sum).toFixed(2);
				dayArrInc[dayFilter] = (+dayArrInc[dayFilter] + +cursor.value.sum).toFixed(2);
			} 
			else if (cursor.value.ttype == "exp") {
//				totalExp = (+totalExp + +cursor.value.sum).toFixed(2);
				dayArrExp[dayFilter] = (+dayArrExp[dayFilter] + +cursor.value.sum).toFixed(2);
			}
			cursor.continue();
		}
		else {
			//draw graph here
			drawChart(type, filter, dayArrInc, dayArrExp);
			
		}
	};
}
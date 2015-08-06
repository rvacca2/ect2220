

CHART
populate the div: habitDetail-week



app.generateHabitDetailWeekly = function(habitObj){

	//setup all the days as moments
	var dSun = moment().day(0); // last Sunday (0 - 7)
	var dMon = moment().day(1); // last Sunday (0 - 7)
	var dTues = moment().day(2); // last Sunday (0 - 7)
	var dWed = moment().day(3); // last Sunday (0 - 7)
	var dThurs = moment().day(4); // last Sunday (0 - 7)
	var dFri = moment().day(5); // last Sunday (0 - 7)
	var dSat = moment().day(6); // last Sunday (0 - 7)
	
	//setup the variables to hold info for each day
	var dSunData = [];
	var dMonData = [];
	var dTuesData = [];
	var dWedData = [];
	var dThursData = [];
	var dFriData = [];
	var dSatData = [];

	//setup the dummy data for testing
	habitObj.log = app.generateDummyWeeklyLogData();
	console.log("HabitLog Length: " + habitObj.log.length);

	//loop through the habit log
	for(var i=0; i<habitObj.log.length; i++){
		var habitDate = moment(habitObj.log[i].date);

		if(habitDate.isSame(dSun,'day')){
			dSunData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dMon,'day')){
			dMonData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dTues,'day')){
			dTuesData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dWed,'day')){
			dWedData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dThurs,'day')){
			dThursData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dFri,'day')){
			dFriData.push(habitObj.log[i])	
		}
		if(habitDate.isSame(dSat,'day')){
			dSatData.push(habitObj.log[i])	
		}
	}


	//generate the display
	console.log("SUNDAY: " + dSunData.length);
	console.log("MONDAY: " + dMonData.length);
	console.log("TUESDAY: " + dTuesData.length);
	console.log("WEDNESDAY: " + dWedData.length);
	console.log("THURSDAY: " + dThursData.length);
	console.log("FRIDAY: " + dFriData.length);
	console.log("SATURDAY: " + dSatData.length);


	//set colors
	var barColor = "#cccccc";
	var barColorFail = "#E0C1C1";

	//create the chart labels
	var labels = ["Su", "M", "T", "W", "Th", "F", "Sa"];

	//generate datasets array
	//an object for each day
	var data = {
	    labels: labels,
	    datasets: [
	        {
	            label: "Su",
	            fillColor: barColor,
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: [dSunData.length, dMonData.length, dTuesData.length, dWedData.length, dThursData.length, dFriData.length, dSatData.length]
	        }
	    ]
	};	

	var context = $("#weeklyChart").get(0).getContext("2d");
	var options = {};
	var myBarChart = new Chart(context).Bar(data, options);


	//update the dataset based on target
	for(var t=0; t<data.datasets[0].data.length; t++){
		var dataSlot = data.datasets[0].data[t];

		if(habitObj.type == "increase"){
			if(dataSlot < habitObj.target){
				myBarChart.datasets[0].bars[t].fillColor = barColorFail;
				myBarChart.datasets[0].bars[t].highlightFill = barColorFail;
			}
		}else{
			if(dataSlot > habitObj.target){
				myBarChart.datasets[0].bars[t].fillColor = barColorFail;
				myBarChart.datasets[0].bars[t].highlightFill = barColorFail;
			}
		}
		
	}

	$("#weeklyChart-target").text(habitObj.target);

};




app.generateDummyWeeklyLogData = function(){

	var weeklyLogArray = [];

	weeklyLogArray.push({"date":moment().subtract(1, 'day')});
	weeklyLogArray.push({"date":moment().subtract(2, 'day')});
	weeklyLogArray.push({"date":moment().subtract(3, 'day')});
	weeklyLogArray.push({"date":moment().subtract(3, 'day')});
	weeklyLogArray.push({"date":moment().subtract(4, 'day')});

	weeklyLogArray.push({"date":moment().add(2, 'day')});
	weeklyLogArray.push({"date":moment().add(2, 'day')});
	weeklyLogArray.push({"date":moment().add(2, 'day')});

	return weeklyLogArray;

};




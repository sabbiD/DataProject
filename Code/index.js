window.onload = function() {

winterDeath = "Data/winterDeath.json";
soilUse = "Data/soilUse.json";
tempData = "Data/tempData.json";
specificPest = "Data/specificPest.json";
winterDeathUS = "Data/winterDeathUS.json";
mapDutch = "Data/provinces.geojson";
pest = "Data/pest.json"

d3.queue()
  .defer(d3.request, winterDeath)
  .defer(d3.request, soilUse)
  .defer(d3.request, tempData)
  .defer(d3.request, specificPest)
  .defer(d3.request, winterDeathUS)
  .defer(d3.request, mapDutch)
  .defer(d3.request, pest)
  .awaitAll(callback);


function callback(error, response) {
	if (error) throw error;

	winterDeathNL = JSON.parse(response[0].responseText)
	soilUse = JSON.parse(response[1].responseText)
	tempData = JSON.parse(response[2].responseText)
	specificPest = JSON.parse(response[3].responseText)
	winterDeathUS = JSON.parse(response[4].responseText)
	mapDutch = JSON.parse(response[5].responseText)
	pest = JSON.parse(response[6].responseText)

	years = winterDeathNL["Winter bee death in the Netherlands"]["0"]
	deathLines = Object.values(years)
	years = Object.keys(years)
	temps = Object.values(tempData["Temperatuur Midden-Nederland"])["0"]
	temps = Object.values(temps)
	//pesticides = Object.values(specificPest["Gewasbeschermingsmiddelen gebruik"]["0"])
	pestTotal = Object.values(pest)
	
	//console.log(pest)
	//console.log(deathLines)
	//console.log(temps)
	//console.log(specificPest)

	var linesData = []

	for (var i = 0; i < years.length - 4;i++){
			
			var n = i + 21
			linesData.push({
				
				key: years[i],
				values:{"death" : deathLines[i], "temp": temps[i + 11], 
				"pest": pestTotal[i + 21]["Totaal"] }
			})

	}

	//console.log(linesData)
	createMap(mapDutch);
	//createRose(specificPest);

	var chart = createLines(years, 'values', [deathLines,
        temps], {xAxis: 'Years', yAxis: 'Percentage'});
    chart.bind("#lineGraph");
    chart.render();

	}
}
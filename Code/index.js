//window.onload = function() {

winterDeath = "Data/winterDeath.json";
soilUse = "Data/soilUse.json";
tempData = "Data/tempData.json";
specificPest = "Data/specificPest.json";
winterDeathUS = "Data/winterDeathUS.json";
mapDutch = "Data/provinces.geojson";

d3.queue()
  .defer(d3.request, winterDeath)
  .defer(d3.request, soilUse)
  .defer(d3.request, tempData)
  .defer(d3.request, specificPest)
  .defer(d3.request, winterDeathUS)
  .defer(d3.request, mapDutch)
  .awaitAll(callback);


function callback(error, response) {
	if (error) throw error;

	winterDeathNL = JSON.parse(response[0].responseText)
	soilUse = JSON.parse(response[1].responseText)
	tempData = JSON.parse(response[2].responseText)
	specificPest = JSON.parse(response[3].responseText)
	winterDeathUS = JSON.parse(response[4].responseText)
	mapDutch = JSON.parse(response[5].responseText)
	/*console.log(winterDeathNL)
	console.log(soilUse)
	console.log(tempData)
	console.log(specificPest)
	console.log(winterDeathUS)*/

	createMap(mapDutch);
	}
//}
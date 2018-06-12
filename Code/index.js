//https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518 (sliders)
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
	death = Object.values(years)
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
	var yearLines = [],
	tempLines = [],
	deathLines = [],
	pestLines =  [],
	nameList = []

	for (var i = 0; i < years.length - 4;i++){
			
			// Data points with base line 2006
			deathLines.push({
				
				name: "Winter death rates",
				x: years[i],
				y: (death[i] / death[0] - 1) * 100
			})

			// Data points with base line 2006
			tempLines.push({

				name:"Temperature Change",
				x: years[i],
				y: ((parseFloat(temps[i+11], 1000) / parseFloat(temps[11], 1000)) - 1) * 100
			})

			// Data points with base line 2006 
			pestLines.push({

				name: "Pesticide Use",
				x: years[i],
				y: ((pestTotal[i + 21]["Totaal"] / pestTotal[21]["Totaal"]) - 1) * 100
			})


	}

	linesData.push(tempLines, deathLines, pestLines)
	console.log(linesData)

	//console.log(linesData)
	createMap(mapDutch);
	//createRose(specificPest);

	var chart = createLines(linesData)


	var data3 = d3.range(0, 10).map(function (d) { return new Date(2006 + d, 10, 3); });

	  var slider3 = d3.sliderHorizontal()
	    .min(d3.min(data3))
	    .max(d3.max(data3))
	    .step(1000 * 60 * 60 * 24 * 365)
	    .width(400)
	    .tickFormat(d3.timeFormat('%Y'))
	    .tickValues(data3)
	    .on('onchange', val => {
	      d3.select("p#value3").text(d3.timeFormat('%Y')(val));
	    });

	  var g = d3.select("div#slider3").append("svg")
	    .attr("width", 500)
	    .attr("height", 100)
	    .append("g")
	    .attr("transform", "translate(30,30)");

	  g.call(slider3);

	  d3.select("p#value3").text(d3.timeFormat('%Y')(slider3.value()));
	  d3.select("a#setValue3").on("click", () => slider3.value(new Date(2007, 11, 17)));


	}
}
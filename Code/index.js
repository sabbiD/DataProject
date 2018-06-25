//https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518 (sliders)
window.onload = function() {

var winterDeath = "Data/winterDeath.json",
soilUse = "Data/soilUse.json",
tempData = "Data/tempData.json",
specificPest = "Data/specificPest.json",
winterDeathUS = "Data/winterDeathUS.json",
mapDutch = "Data/provinces.geojson",
pest = "Data/pest.json";

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

	winterDeathNL = JSON.parse(response[0].responseText);
	soilUse = JSON.parse(response[1].responseText);
	tempData = JSON.parse(response[2].responseText);
	specificPest = JSON.parse(response[3].responseText);
	winterDeathUS = JSON.parse(response[4].responseText);
	mapDutch = JSON.parse(response[5].responseText);
	pest = JSON.parse(response[6].responseText);

	years = winterDeathNL["Winter bee death in the Netherlands"]["0"]
	death = Object.values(years)
	years = Object.keys(years)
	temps = Object.values(tempData["Temperatuur Midden-Nederland"])["0"]
	temps = Object.values(temps)
	//pesticides = Object.values(specificPest["Gewasbeschermingsmiddelen gebruik"])
	pestTotal = Object.values(pest)
	
	//console.log(pest)
	//console.log(deathLines)
	//console.log(temps)
	//console.log(specificPest)

	var linesData = []
	var yearLines = [],
	tempLines = [],
	deathLines = [],
	pestLinesTotal = [],
	pestLinesInsects = [],
	pestLinesWeeds = [],
	pestLinesFunghi = [],
	pestLinesOther = [],
	nameList = [],
	soilData = [],
	roseData = []

	for (var i = 0; i < years.length - 4; i++){
			
			// Data points with base line 2006
			deathLines.push({
				
				name: "Winter death rates",
				label:"deathRate",
				x: years[i],
				y: (death[i] / death[0] - 1) * 100
			})

			// Data points with base line 2006
			tempLines.push({

				name:"Temperature Change",
				label:"tempChange",
				x: years[i],
				y: ((parseFloat(temps[i+11], 1000) / parseFloat(temps[11], 1000)) - 1) * 100
			})

			// Data points with base line 2006 
			pestLinesTotal.push({

				name: "Total Pesticide Use",
				label:"totalPest",
				x: years[i],
				y: ((pestTotal[i + 21]["Totaal"] / pestTotal[21]["Totaal"]) - 1) * 100
			})

			// Data points with base line 2006 
			pestLinesInsects.push({

				name: "Pesticide Use: Insects and mites",
				label:"pestInsects",
				x: years[i],
				y: ((pestTotal[i + 21]["Bestrijding insecten en mijten"] / pestTotal[21]["Bestrijding insecten en mijten"]) - 1) * 100
			})

			pestLinesWeeds.push({

				name: "Pesticide Use: Weeds",
				label:"pestWeeds",
				x: years[i],
				y: ((pestTotal[i + 21]["Bestrijding onkruiden en loofdoding"] / pestTotal[21]["Bestrijding onkruiden en loofdoding"]) - 1) * 100
			})

			pestLinesFunghi.push({

				name: "Pesticide Use: Funghi and bacteria",
				label:"pestFunghi",
				x: years[i],
				y: ((pestTotal[i + 21]["Bestrijding schimmels en bacteriën"] / pestTotal[21]["Bestrijding schimmels en bacteriën"]) - 1) * 100
			})

			pestLinesOther.push({

				name: "Pesticide Use: Other",
				label:"pestOther",
				x: years[i],
				y: ((pestTotal[i + 21]["Overige Gewasbescher-mingsmiddelen"] / pestTotal[21]["Overige Gewasbescher-mingsmiddelen"]) - 1) * 100
			})


	}

	// adjust data for map
	for (var i = 0; i < 25; i+= 2){
			var yearData = [];
		
		for (var j = 2006; j < 2016; j++){

			yearData[j] = [ soilUse.soilUse[i][j],
				soilUse.soilUse[i+ 1][j]]
			}
		
		soilData[soilUse.soilUse[i].Regio] =  yearData;
		
	}

	//console.log(soilData)
		
	roseData.push(pest)
	linesData.push(tempLines, deathLines, pestLinesTotal, pestLinesInsects, pestLinesWeeds, pestLinesFunghi, pestLinesOther)
	//console.log(roseData)

	console.log(linesData)

	//console.log(roseData)
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
      sliderUpdate();
    });

  var g = d3.select("div#slider3").append("svg")
    .attr("width", 500)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(30,30)");

  g.call(slider3);

  d3.select("p#value3").text(d3.timeFormat('%Y')(slider3.value()));
  d3.select("a#setValue3").on("click", () => slider3.value(new Date(2007, 11, 17)));

  function sliderUpdate(){
  	var year = document.getElementById('value3').innerHTML;

  	createMap(mapDutch, soilData, year);
  	createRose(roseData, year);

	  }
	  
	  sliderUpdate();
/*anime({
  targets: 'div',
  translateX: 100,
  easing: [.91,-0.54,.29,1.56]
});
*/
 anime({
	  targets: '#containerRose',
	  translateX: [
	    { value: 100, duration: 1200 },
	    { value: 0, duration: 800 }
	  ],
	  rotate: '1turn',
	  backgroundColor: '#00',
	  duration: 2000,
	  loop: false
	});
	}

/*anime({
  targets: '#containerGraph #line',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});
*/
}
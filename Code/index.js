/*
	UvA minor programmeren
	Data Project Spring 2018
	Sebile Demirtas 
	10548270
	
	This file prepares the data for the rest of the files
	and calls all functions when the window is loaded. 
	In this file the data is loaded, some data is made 
	appropriate for the chart that it is used in.
	The slider is initialised and the function sliderUpdate() is used 
	to update the map and rose chart with the slider.
	Furthermore, the functions that create the charts are called here.

	Sources:
	- https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518 (for d3-slider)
*/


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

		// Separate arrays of datasets used in charts
		years = winterDeathNL["Winter bee death in the Netherlands"]["0"];
		death = Object.values(years);
		years = Object.keys(years);
		temps = Object.values(tempData["Temperatuur Midden-Nederland"])["0"];
		temps = Object.values(temps);
		pestTotal = Object.values(pest);
		
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
		roseData = [];

		// Put data in formar appropriate for use in charts
		for (var i = 0; i < years.length - 4; i++){
				
				// Data points with base line 2006
				deathLines.push({
					
					name: "Winter death rates",
					label:"deathRate",
					x: years[i],
					y: (death[i] / death[0] - 1) * 100
				});

				// Data points with base line 2006
				tempLines.push({

					name:"Temperature Change",
					label:"tempChange",
					x: years[i],
					y: ((parseFloat(temps[i+11], 1000) / parseFloat(temps[11], 1000)) - 1) * 100
				});

				// Data points with base line 2006 
				pestLinesTotal.push({

					name: "Total Pesticide Use",
					label:"totalPest",
					x: years[i],
					y: ((pestTotal[i + 21]["Totaal"] / pestTotal[21]["Totaal"]) - 1) * 100
				});

				// Data points with base line 2006 
				pestLinesInsects.push({

					name: "Insects and mites",
					label:"pestInsects",
					x: years[i],
					y: ((pestTotal[i + 21]["Bestrijding insecten en mijten"] / 
						pestTotal[21]["Bestrijding insecten en mijten"]) - 1) * 100
				});

				// Data points with base line 2006 
				pestLinesFunghi.push({

					name: "Funghi and bacteria",
					label:"pestFunghi",
					x: years[i],
					y: ((pestTotal[i + 21]["Bestrijding schimmels en bacteriën"] / 
						pestTotal[21]["Bestrijding schimmels en bacteriën"]) - 1) * 100
				});
				
				// Data points with base line 2006 
				pestLinesWeeds.push({

					name: "Weeds",
					label:"pestWeeds",
					x: years[i],
					y: ((pestTotal[i + 21]["Bestrijding onkruiden en loofdoding"] / 
						pestTotal[21]["Bestrijding onkruiden en loofdoding"]) - 1) * 100
				});
				
				// Data points with base line 2006 
				pestLinesOther.push({

					name: "Other",
					label:"pestOther",
					x: years[i],
					y: ((pestTotal[i + 21]["Overige gewasbeschermingsmiddelen"] / 
						pestTotal[21]["Overige gewasbeschermingsmiddelen"]) - 1) * 100
				});


		};

		// Adjust data for map
		for (var i = 0; i < 25; i+= 2){
			
			var yearData = [];
			
			// Get values to color map
			for (var j = 2006; j < 2016; j++){

				yearData[j] = [ soilUse.soilUse[i][j],
					soilUse.soilUse[i+ 1][j]]
				};
			
			// Link data to every region
			soilData[soilUse.soilUse[i].Regio] =  yearData;
			
		};
		
		// Pushing arrays to separate arrays for charts
		roseData.push(pest);
		linesData.push(tempLines, deathLines, pestLinesTotal, 
			pestLinesInsects, pestLinesFunghi, pestLinesWeeds, pestLinesOther);


		// Data for d3 slider
		var data = d3.range(0, 10).map(function (d) 
			{ return new Date(2006 + d, 10, 3); });

		// Define slider values and format
		var slider = d3.sliderHorizontal()
			.min(d3.min(data))
			.max(d3.max(data))
			.step(1000 * 60 * 60 * 24 * 365)
			.width(400)
			.tickFormat(d3.timeFormat('%Y'))
			.tickValues(data)
			.on('onchange', val => {
			  d3.select("p#valueSlider").text(d3.timeFormat('%Y')(val));
			  sliderUpdate(val);
			});

		// Append slider to an svg
		var g = d3.select("div#slider").append("svg")
			.attr("width", 500)
			.attr("height", 100)
			.append("g")
			.attr("transform", "translate(30,30)");

		// Call slider
		g.call(slider);

		
		// Update map and rose chart when slider is used
		function sliderUpdate(val){
			
			var year = val.getFullYear();

			updateMap(mapDutch, soilData, year);
			createRose(roseData, year);

		 };
		
		// Call create functions first load
		createRose(roseData, 2006);
		createMap(mapDutch, soilData, 2006);
		createLines(linesData);

		// On-click scroll to line graph
		$("#pointer-down").click(function()  {
		    $('html, body').animate({
		        scrollTop: $("#containerGraph").offset().top
		    }, 2000);
		});

		// Animation for rose chart when page is loaded for the first time
		 anime({
			  targets: '#containerRose',
			  translateX: [
			    { value: 100, duration: 1200 },
			    { value: 0, duration: 800 }
			  ],
			  rotate: '1turn',
			  //backgroundColor: '#00',
			  duration: 2000,
			  loop: false
			});
	}

}
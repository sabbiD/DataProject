/*
	UvA minor programmeren
	Data Project Spring 2018
	Sebile Demirtas 
	10548270

	The functions in this file draw a chloropleth map that can be 
	updated with the use of a slider and with the updateMap function. 
	The colorMap function is used to color the map 
	and the tooltip function to add tooltips tot the map.

	Sources:
	- http://blockbuilder.org/SpaceActuary/69e7f74035787955bcf9 (for legend)

*/


function createMap(mapData, soilData, year){

	// Define dimensions
	var	width		= 400,
	    height		= 400;


	// Map projection
	var projection = d3.geoMercator();

	var path = d3.geoPath()
				.projection(projection);

	// Append svg to container
	var svg = d3.select("#containerMap")
			.append("svg")
			.attr("width", width)
			.attr("height", height);


	// Dimensions legend 
	var w = 275, h = 40;

	// Append svg for legend to container
	var key = d3.select("#containerMap")
		.append("svg")
		.attr("class", "key")
		.attr("width", w)
		.attr("height", h);

	// Add linear gradient to svg
	var legend = key.append("defs")
		.append("svg:linearGradient")
		.attr("id", "gradient")
		.attr("x1", "0%")
		.attr("y1", "100%")
		.attr("x2", "100%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad");

	// Define start color gradient
	legend
		.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "#f7fcf5")
		.attr("stop-opacity", 1);

	// Define end color gradient
	legend
		.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "#00441b")
		.attr("stop-opacity", 1);

	// Append legend rectangle to legend svg
	key
		.append("rect")
		.attr("id", "legendMap")
		.attr("width", w - 35)
		.attr("height", h - 20)
		.style("stroke", "black")
		.style("fill", "url(#gradient)")
	    .attr("transform", "rotate(0)")
	    .attr("transform", "translate(10, 0)");

	// Define range and domain of y axis legend
	var y = d3.scaleOrdinal()
		.range([10, 125, 250])
		.domain([0.03, 0.09, 0.15]);

	var yAxis = d3.axisBottom()
		.scale(y);

	// Append y axis to legend
	key
		.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(0,23)")
		.call(yAxis.tickFormat(d3.format(".0%")))
		.append("text")
		.attr("transform", "translate(0,23)")
		.attr("text-anchor", "middle")
  		.attr("alignment-baseline", "alphabetic");


	// Initialize tooltips
	var tooltip = d3.select("#containerMap")
		.append("div")
		.attr("class", "tooltip hidden");
	
	// Set size of map according to container dimensions
	projection.fitSize([width, height], mapData);

	// Draw regions 
	svg.selectAll("path")
		.data(mapData.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("id", function(d) { return d.properties.name })
		.attr("stroke", "black")
		.attr("fill", function(d) { 
			return colorMap(d.properties.name, soilData, year)[0];
		})
		.on("mousemove", function (d) { 
			return showTooltip(d.properties.name, soilData, year); 
		})
  		.on("mouseout",  function(d,i) {
      	tooltip.classed("hidden", true);
   		});

}

// Calculate percentage used to color regions
function colorMap(regionName, soilData, year){
	
	var blues = ["#f7fcf5", "#e5f5e0", "#c7e9c0", "#a1d99b", 
				 "#74c476", "#41ab5d", "#238b45", "#006d2c", "#00441b"];

	// Scale to color regions
	var quantize = d3.scaleQuantize()
	.domain([0.03, 0.15])
	.range(blues);

	// Get data
	var limit = soilData[regionName][year];

	// Calculate total 
	var total = parseInt(limit[0]) + parseInt(limit[1]);

	// Calculate percentage of total
	limit = parseInt(limit[1]) / total; 

    return [quantize(limit) , limit * 100];

}

// Tooltips with info on map
function showTooltip(name, soilData, year) {

	// Initialize placing for tooltips
	var offsetL = document.getElementById('containerMap').offsetLeft+10;
	var offsetT = document.getElementById('containerMap').offsetTop+10;

	// Select container
	var svg = d3.select("#containerMap");

	var tooltip = svg.select(".tooltip");

	// Get percentage value to show in tooltip
	var valueRegion = colorMap(name, soilData, year)[1];

	// Define content of tooltips
	var mouse = d3.mouse(svg.node())
	.map( function(d) { return parseInt(d); } );
	tooltip.classed("hidden", false)
	.attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
	.html(name + "</br>" + parseFloat(valueRegion).toFixed(2) + "%");

}


// Updating map when slider is used
function updateMap(mapData, soilData, year){

	// Remove old coloring
	var svg = d3.select("#containerMap")
		.selectAll("path")
		.style("fill", "empty");


	// Initialize tooltips
	var tooltip = d3.select("#containerMap")
		.append("div")
		.attr("class", "tooltip hidden");

	// Color region again
	svg
		.data(mapData.features)
		.style("stroke", "black")
		.style("fill", function(d) { 
			return colorMap(d.properties.name, soilData, year)[0]; 
		})
		.on("mousemove", function (d) { 
			return showTooltip(d.properties.name, soilData, year); 
		})
  		.on("mouseout",  function(d,i) {
      	tooltip.classed("hidden", true);
   		});

}
// http://blockbuilder.org/SpaceActuary/69e7f74035787955bcf9 (for legend)

function createMap(mapData, soilData, year){

	var	width		= 400,
	    height		= 400;


	// define map projection
	var projection = d3.geoMercator();

	var path = d3.geoPath()
				.projection(projection);

	var svg = d3.select("#containerMap")
			.append("svg")
			.attr("width", width)
			.attr("height", height);


	// legend width and height 
	var w = 275, h = 40;

	var key = d3.select("#containerMap")
		.append("svg")
		.attr("class", "key")
		.attr("width", w)
		.attr("height", h);

	var legend = key.append("defs")
		.append("svg:linearGradient")
		.attr("id", "gradient")
		.attr("x1", "0%")
		.attr("y1", "100%")
		.attr("x2", "100%")
		.attr("y2", "100%")
		.attr("spreadMethod", "pad");

	legend.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "#f7fbff")
		.attr("stop-opacity", 1);

	legend.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "#08306b")
		.attr("stop-opacity", 1);

	key.append("rect")
		.attr("id", "legendMap")
		.attr("width", w - 35)
		.attr("height", h - 20)
		.style("stroke", "black")
		//.style("stroke-width", 2)
		//.style("stroke-dasharray", ("3, 3"))
		.style("fill", "url(#gradient)")
	    .attr("transform", "rotate(0)")
	    .attr("transform", "translate(10, 0)")

	var y = d3.scaleOrdinal()
		.range([10, 125, 250])
		.domain([0.03, 0.09, 0.15]);

	var yAxis = d3.axisBottom()
		.scale(y);

	key.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(0,23)")
		.call(yAxis.tickFormat(d3.format(".0%")))
		.append("text")
		.attr("transform", "translate(0,23)")
		.attr("text-anchor", "middle")
  		.attr("alignment-baseline", "alphabetic")
		//.style("text-anchor", "end")

	// add countries to map with country name as id
	// calling tooltips on hover
	// adding on click function to select scatters

/*var defs = svg.append('svg:defs');

defs.append("svg:pattern")
    .attr("id", "stripes")
    .attr("width", 20)
    .attr("height", 20)
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4JyBoZWlnaHQ9JzgnPgogIDxyZWN0IHdpZHRoPSc4JyBoZWlnaHQ9JzgnIGZpbGw9JyNmZmYnLz4KICA8cGF0aCBkPSdNMCAwTDggOFpNOCAwTDAgOFonIHN0cm9rZS13aWR0aD0nMC41JyBzdHJva2U9JyNhYWEnLz4KPC9zdmc+Cg==")
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", 0)
    .attr("y", 0);*/

	// initialize tooltips
	var tooltip = d3.select("#containerMap")
	.append("div")
	.attr("class", "tooltip hidden")
	
	// setting scales accoring to json file of continent
	projection.fitSize([width, height], mapData);

	svg.selectAll("path")
		.data(mapData.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("id", function(d) { return d.properties.name })
		.attr("stroke", "black")
		.attr("fill", function(d) { return colorMap(d.properties.name, soilData, year)})
		.on("mousemove", showTooltip)
  		.on("mouseout",  function(d,i) {
      	tooltip.classed("hidden", true);
   		})
   		/*.on("click", function (d){
   			d3.select(this)
        			.style("fill", "url(#stripes)");
   		})*/
}

function colorMap(regionName, soilData, year){
	
	var blues = ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"];

	var quantize = d3.scaleQuantize()
	.domain([0.03, 0.15])
	.range(blues);

	var limit = soilData[regionName][year]

	var total = parseInt(limit[0]) + parseInt(limit[1]);

	limit = parseInt(limit[1]) / total 

    return quantize(limit);

}

	// tooltips with info on map
function showTooltip(d) {

	// initialize placing for tooltips
	var offsetL = document.getElementById('containerMap').offsetLeft+10;
	var offsetT = document.getElementById('containerMap').offsetTop+10;

	var svg = d3.select("#containerMap")

	var tooltip = svg.select(".tooltip")

	// info for tooltips
	var label = d.properties.name;

	// define content of tooltips
	var mouse = d3.mouse(svg.node())
	.map( function(d) { return parseInt(d); } );
	tooltip.classed("hidden", false)
	.attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
	.html(label)// + "</br>" + income_grp)
	}



function updateMap(mapData, soilData, year){

	// remove old color
	var svg = d3.select("#containerMap").selectAll("path").style("fill", "empty")


	// initialize tooltips
	var tooltip = d3.select("#containerMap")
		.append("div")
		.attr("class", "tooltip hidden")


	svg
		.data(mapData.features)
		.style("stroke", "black")
		.style("fill", function(d) { return colorMap(d.properties.name, soilData, year)})
		.on("mousemove", showTooltip)
  		.on("mouseout",  function(d,i) {
      	tooltip.classed("hidden", true);
   		})
   		/*.on("click", function (d){
   			d3.select(this)
        			.style("fill", "url(#stripes)");
   		})*/
}
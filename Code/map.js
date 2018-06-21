// http://blockbuilder.org/SpaceActuary/69e7f74035787955bcf9 (for legend)




	//var year = document.getElementById('value3').innerHTML;

	//console.log(soilData)

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


	// initialize placing for tooltips
	var offsetL = document.getElementById('containerMap').offsetLeft+10;
	var offsetT = document.getElementById('containerMap').offsetTop+10;

	// initialize tooltips
	var tooltip = d3.select("#containerMap")
		.append("div")
		.attr("class", "tooltip hidden")

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
		.attr("width", w - 25)
		.attr("height", h - 20)
		.style("stroke", "black")
		//.style("stroke-width", 2)
		//.style("stroke-dasharray", ("3, 3"))
		.style("fill", "url(#gradient)")
	    .attr("transform", "rotate(0)")

	var y = d3.scaleOrdinal()
		.range([0, 125, 250])
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

function createMap(mapData, soilData, year){
	
	// setting scales accoring to json file of continent
	projection.fitSize([width, height], mapData);
	
	// remove old color
	svg.selectAll("path").remove();

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

  // info for tooltips
  label = d.properties.name;
  
  // define content of tooltips
  var mouse = d3.mouse(svg.node())
    .map( function(d) { return parseInt(d); } );
  	 tooltip.classed("hidden", false)
    .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
    .html(label)// + "</br>" + income_grp)
	}


// http://blockbuilder.org/SpaceActuary/69e7f74035787955bcf9 (for legend)

function createMap(mapData, soilData){

	//var year = document.getElementById('value3').innerHTML;

	//console.log(soilData)

	var	width		= 400,
	    height		= 400,
	    steps = 9,
    	breaks = d3.range(0, steps).map(function(d){ return d / (steps - 1); })


	// define map projection
	var projection = d3.geoMercator()

	var path = d3.geoPath()
				.projection(projection)

	var svg = d3.select("#container")
			.append("svg")
			.attr("width", width)
			.attr("height", height)


	// initialize placing for tooltips
	var offsetL = document.getElementById('container').offsetLeft+10;
	var offsetT = document.getElementById('container').offsetTop+10;

	// initialize tooltips
	var tooltip = d3.select("#container")
		.append("div")
		.attr("class", "tooltip hidden")

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

	var blues = ["#f7fbff","#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"];

	var quantize = d3.scaleQuantize()
	.domain([0.03, 0.15])
	.range(blues);
	

	// setting scales accoring to json file of continent
	projection.fitSize([width, height], mapData);

	function colorMap(regionName){
		
		var year = document.getElementById('value3').innerHTML;

		var limit = soilData[regionName][year]

		var total = parseInt(limit[0]) + parseInt(limit[1]);

		limit = parseInt(limit[1]) / total 

		var test = Object.values(soilData[regionName])

		console.log(limit) 

	    return quantize(limit);

	}

	
	var w = 400, h = 140;

	var key = d3.select("#container")
		.append("svg")
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
		.attr("width", w - 150)
		.attr("height", h - 120)
		.style("fill", "url(#gradient)")
	    .attr("transform", "rotate(0)")

	var y = d3.scaleLinear()
		.range([0, 250])
		.domain([0.03, 0.15]);

	var yAxis = d3.axisBottom()
		.scale(y);

	key.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(0,21)")
		.call(yAxis)
		.append("text")
		.attr("transform", "translate(0,21)")
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("axis title");


	// add countries to map with country name as id
	// calling tooltips on hover
	// adding on click function to select scatters

	svg.selectAll("path")
		.data(mapData.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("id", function(d) { return d.properties.name })
		.attr("stroke", "black")
		.attr("fill", function(d) { return colorMap(d.properties.name)})
		.on("mousemove", showTooltip)
  		.on("mouseout",  function(d,i) {
      	tooltip.classed("hidden", true);
   		})

}

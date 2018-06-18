	
function createMap(mapData, soilData){

	//var year = document.getElementById('value3').innerHTML;

	console.log(soilData)

	var	width		= 400,
	    height		= 400;


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

	

	// setting scales accoring to json file of continent
	projection.fitSize([width, height], mapData);

	function colorMap(regionName){
		
		var year = document.getElementById('value3').innerHTML;

		var limit = soilData[regionName][year]

		var total = parseInt(limit[0]) + parseInt(limit[1]);

		limit = parseInt(limit[1]) / total 

		var test = Object.values(soilData[regionName])

		console.log(limit) 

		var color = d3.scaleLinear()
	    .domain([0, 0.1, 0.2])
	    .range(["red", "white", "green"])
	    .interpolate(d3.interpolateRgb)

	    return color(limit);

	}

	

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

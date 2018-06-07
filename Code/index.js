window.onload = function() {

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
	projection.fitSize([width, height], mapDutch);

	// add countries to map with country name as id
	// calling tooltips on hover
	// adding on click function to select scatters

	svg.selectAll("path")
		.data(mapDutch.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("id", function(d) { return d.properties.admin })
		.attr("stroke", "yellow")
		.attr("fill", "black")
		.on("mousemove", showTooltip)
  		.on("mouseout",  function(d,i) {
      	tooltip.classed("hidden", true);
   		})

}
}
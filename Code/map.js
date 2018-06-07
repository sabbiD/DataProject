	
function createMap(data){

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
	projection.fitSize([width, height], data);

	// add countries to map with country name as id
	// calling tooltips on hover
	// adding on click function to select scatters

	svg.selectAll("path")
		.data(data.features)
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
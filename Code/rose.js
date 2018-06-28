/*
	UvA minor programmeren
	Data Project Spring 2018
	Sebile Demirtas 
	10548270

	The functions in this file are used to create a rose chart 
	with tooltips that can be updated with a slider. 

	Sources:
	- https://jsfiddle.net/forwardsprint/wrgtj1nL/ (for rose chart)
	- http://bl.ocks.org/ChandrakantThakkarDigiCorp/c8ce360f8bc896ffa6c16d30a4cd026b (for labels rose chart)

*/

function createRose(dataset, year){

	// Initialise variables for later use
	var value = Object.values(dataset[0][year]),
	valuePercent = [],
	data = [1, 1, 1, 1],
	width = 400,
	height = 400,
	radius = 140;

	// Change values to percentages
	value.forEach(function(i){
		
		valuePercent.push(i / value[0] * 100);
	
	});

	// Define color scale
	var color = d3.scaleOrdinal()
	  .range(["#a6611a", "#dfc27d", "#80cdc1", "#018571"]);
	
	var arc;

	// Define category scale
	var categories = d3.scaleOrdinal()
		.range(["Insects and mites", "Funghi and bacteria", "Weeds", "Other"])

	// Define "leaves" of rose chart
	var pie = d3.pie()
	  .value(function(d) { return d; });

	// Used to update rose chart
	d3.select("#containerRose")
		.select("svg")
    	.remove();
	
	// Append svg for chart to container
	var roseGraph = d3.select("#containerRose").append("svg")
	  .attr("width", width)
	  .attr("height", height)
	  .append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	// Append "leaves" to svg
	var g = roseGraph.selectAll(".arc")
		.data(pie(data))
		.enter().append("g")
		.attr("class", "arc");

	// Initialize placing for tooltips
	var offsetL = document.getElementById('containerRose').offsetLeft - 100;
	var offsetT = document.getElementById('containerRose').offsetTop + 50;

	// Initialize tooltips on container
	var tooltip = d3.select("#containerRose")
		.append("div")
		.attr("class", "tooltip hidden");

	
	// Tooltips with info on map
	function showTooltip(d) {

	  // Info for tooltips
      var label = this.id;

      // Define content of tooltips
      var mouse = d3.mouse(this)
      	 tooltip.classed("hidden", false)
        .attr("style", "left:" + (mouse[0] + offsetL) 
        	+ "px;top:"+(mouse[1] + offsetT) + "px")
        .html(label)
	};

	
	// Draw lines surrounding rose chart
	for (var i = 0; i < 20; i++) {
	  
	  arc = d3.arc()
	    .outerRadius(radius)
	    .innerRadius(radius - 4);
	  radius = radius - 4;

	  // Append path for every drawn line
	  g.append("path")
	  	.attr("id", function(d){ return "backArc" + i + d.index } )
	    .attr("d", arc)
	    .style("fill", "transparent")
	    .style("stroke", "black")
	    .style("stroke-width", 1);
	};

	var startAngle = 0;

	// Draw "leaves" of rose chart
	for (var i = 1; i < 5; i++) {
	  
		// Placing of labels with use of lines surrounding chart
		var labelSpace = ["#backArc00", "#backArc01", "#backArc02", "#backArc03"];

		// Calculate dimensions of "leaves"
		arc = d3.arc()
			.innerRadius(0)
			.outerRadius(radius + (valuePercent[i]))
			.startAngle(startAngle)
			.endAngle((2 * Math.PI) * (i - 1 + 1) / 4);
		startAngle = (2 * Math.PI) * (i - 1 + 1) / 4;

		// Draw leaves
		roseGraph.append("path")
			.attr("class", "arcs")
			.attr("id", function(d){ 
				return categories(i) + "<br>" +(parseFloat(valuePercent[i]).toFixed(2)) + "%"; 
			})
			.attr("d", arc)
			.style("fill", function(d) {
			  return color(i);
			})
			.on("mouseover", showTooltip)
				.on("mouseout",  function(d,i) {
				tooltip.classed("hidden", true);
				});

		// Add space for labels on svg
		var label = roseGraph.append("g")
			.attr("id", "label")
			.style("fill", "black");

		// Append text to label spaces
		label.append("text")
			.data(labelSpace)
			.style("font-size", "20px")
		  .append("textPath")
		    .attr("xlink:href", labelSpace[i - 1])
		    .text(categories(i));
		};
}

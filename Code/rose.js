// https://jsfiddle.net/forwardsprint/wrgtj1nL/ (rose chart)
// http://bl.ocks.org/ChandrakantThakkarDigiCorp/c8ce360f8bc896ffa6c16d30a4cd026b (labels rose chart)
// add dropdown to line chart with use in specific category.
// change death rate to survival rate.

function createRose(dataset, year){


	var value = Object.values(dataset[0][year]),
	data = [1, 1, 1, 1],
	width = 400,
	height = 400,
	radius = 140;

	// change values to percentages
	const reducer = (accumulator, currentValue) => accumulator + currentValue;

	value.forEach(function(i){
		value[i] = (value[i] / value.reduce(reducer));
	})
	console.log(value)

	var color = d3.scaleLinear()
	  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	var arc;

	var categories = d3.scaleOrdinal().range(["Insects and mites", "Funghi and bacteria", "Weeds", "Other"])
	//.domain([5, 9, 14, 19]);

	var pie = d3.pie()
	  .value(function(d) { return d; })
	  .sort(null);

	d3.select("#containerRose").select("svg")
    .remove();
	
	var roseGraph = d3.select("#containerRose").append("svg")
	  .attr("width", width)
	  .attr("height", height)
	  .append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	 var g = roseGraph.selectAll(".arc")
	  .data(pie(data))
	  .enter().append("g")
	  .attr("class", "arc");

	 // initialize placing for tooltips
	var offsetL = document.getElementById('containerRose').offsetLeft;
	var offsetT = document.getElementById('containerRose').offsetTop;

	// initialize tooltips
	var tooltip = d3.select("#containerRose")
		.append("div")
		.attr("class", "tooltip hidden")

	// tooltips with info on map
	function showTooltip(d) {

	  // info for tooltips
      var label = this.id;

      // define content of tooltips
      var mouse = d3.mouse(this)//roseGraph.node())
        //.map( function(d, i) { return parseInt(d); } );
      	 tooltip.classed("hidden", false)
        .attr("style", "left:" + (mouse[0] + offsetL) + "px;top:"+(mouse[1] + offsetT) + "px")
        .html(label)
		}

	for (var i = 0; i < 20; i++) {
	  
	  arc = d3.arc()
	    .outerRadius(radius)
	    .innerRadius(radius - 4);
	  radius = radius - 4;

	  g.append("path")
	  	.attr("id", function(d){ return "backArc" + i + d.index } )
	    .attr("d", arc)
	    .style("fill", "transparent")/*function(d) {
	      return color(d);
	    })*/
	    .style("stroke", "transparent")
	    .style("stroke-width", 3);
	}

	var startAngle = 0;
	for (var i = 1; i < 5; i++) {
	  
	  // placing of labels
	  var labelSpace = ["#backArc00", "#backArc01", "#backArc02", "#backArc03"];

	  arc = d3.arc()
	    .innerRadius(0)
	    .outerRadius(radius + (value[i] * 100) / 8)
	    .startAngle(startAngle)
	    .endAngle((2 * Math.PI) * (i - 1 + 1) / 4);
	  startAngle = (2 * Math.PI) * (i - 1 + 1) / 4;

	  roseGraph.append("path")
	  	.data(value)
	    .attr("class", "arcs")
	    .attr("id", function(d){ return categories(i); })
	    .attr("d", arc)
	    .style("fill", function(d) {
	      return color(i);
	    })
	    .style("stroke", "#ffffff")
	    .style("stroke-width", 2)
	    .on("mouseover", showTooltip)
  		.on("mouseout",  function(d,i) {
      	tooltip.classed("hidden", true);
   		});

	    var label = roseGraph.append("g")
		    .attr("id", "label")
		    .style("fill", "navy");

	   label.append("text")
	   		.data(labelSpace)
	   		.style("font-size", "15px")
		  .append("textPath")
		    .attr("xlink:href", labelSpace[i - 1])
		    .text(categories(i));
		}
	}

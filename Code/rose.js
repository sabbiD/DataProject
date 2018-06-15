// https://jsfiddle.net/forwardsprint/wrgtj1nL/ (rose chart)
// http://bl.ocks.org/ChandrakantThakkarDigiCorp/c8ce360f8bc896ffa6c16d30a4cd026b (labels rose chart)
function createRose(dataset){
	
	var value = [],
	data = [1, 1, 1, 1],
	width = 400,
	height = 400,
	radius = 140;

	value.push(Object.values(dataset[0][1996]));


	var color = d3.scaleLinear()
	  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	var arc;

	var categories = d3.scaleOrdinal().range(["Insects and mites", "Funghi and bacteria", "Weeds", "Other"])
	.domain([5, 9, 14, 19])

	var pie = d3.pie()
	  .sort(null)
	  /*.value(function(d) {
	    return d;
	  });*/

	var roseGraph = d3.select("#containerRose").append("svg")
	  .attr("width", width)
	  .attr("height", height)
	  .append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	 /*var label = roseGraph.append("g")
		    .attr("id", "label")
		    .style("fill", "navy");
*/
   /*label.append("text")
   		.style("font-size", "15px")
	  .append("textPath")
	    .attr("xlink:href", "#arc")
	    .text(categories(i));*/

	 var g = roseGraph.selectAll(".arc")
	  .data(pie(data))
	  .enter().append("g")
	  .attr("class", "arc");

	for (var i = 0; i < 20; i++) {
	  arc = d3.arc()
	    .outerRadius(radius)
	    .innerRadius(radius - 4);
	  radius = radius - 4;

	  g.append("path")
	  	.attr("id", "backArc" + i)
	    .attr("d", arc)
	    .style("fill", function(d) {
	      return color(d);
	    })
	    .style("stroke", "#ffffff")
	    .style("stroke-width", 3);
	
	  var label = roseGraph.append("g")
	    .attr("id", "label")
	    .style("fill", "navy");

	   label.append("text")
	   		.style("font-size", "15px")
		  .append("textPath")
		    .attr("xlink:href", "#backArc0")
		    .text(categories(i));

		label.append("use")
		    .attr("xlink:href", "#backArc")
		    .style("stroke", "black")
		    .style("fill", "none");

	}
	
	var startAngle = 0;
	for (var i = 1; i < 5; i++) {
	  
	  arc = d3.arc()
	    .innerRadius(0)
	    .outerRadius(radius + (value[0][i] * 100) / 8)
	    .startAngle(startAngle)
	    .endAngle((2 * Math.PI) * (i - 1 + 1) / 4);
	  startAngle = (2 * Math.PI) * (i - 1 + 1) / 4;

	  roseGraph.append("path")
	    .attr("id", "arc")
	    .attr("d", arc)
	    .style("fill", function(d) {
	      return color(i);
	    })
	    .style("stroke", "#ffffff")
	    .style("stroke-width", 2)
	    /*.on("mouseover", function(d) {
	      
	      arc.style("fill", "red");
	    
	    });*/


	    /*var label = roseGraph.append("g")
		    .attr("id", "label")
		    .style("fill", "navy");

	   label.append("text")
	   		.data(categories)
	   		.style("font-size", "15px")
		  .append("textPath")
		    .attr("xlink:href", "#backArc0")
		    .text(categories(i));*/
		  }
}
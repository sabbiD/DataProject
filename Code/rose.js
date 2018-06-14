// https://jsfiddle.net/forwardsprint/wrgtj1nL/ (rose chart)

function createRose(dataset){
	
	var value = [],
	data = [1, 1, 1, 1],
	width = 400,
	height = 400,
	radius = 140;

	value.push(Object.values(dataset[0][1996]));


	var color = d3.scaleOrdinal()
	  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	var arc;

	var categories = d3.scaleOrdinal().range(Object.keys(dataset[0][1995]))

	var pie = d3.pie()
	  .sort(null)
	  .value(function(d) {
	    return d;
	  });

	var roseGraph = d3.select("#containerRose").append("svg")
	  .attr("width", width)
	  .attr("height", height)
	  .append("g")
	  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

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
	    .attr("d", arc)
	    .style("fill", function(d) {
	      return color(d);
	    })
	    .style("stroke", "#ffffff")
	    .style("stroke-width", 3);

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
	    .attr("class", "arc")
	    .attr("d", arc)
	    .style("fill", function(d) {
	      return color(i);
	    })
	    .style("stroke", "#ffffff")
	    .style("stroke-width", 2)
	    .on("mouseover", function(d) {
	      
	      arc.style("fill", "red");
	    
	    });

	  var labels = roseGraph.selectAll("path")
	  	.append("text")
        .attr("dx", 100)
        .attr("dy", 50)
        .append("textPath")
        /*.attr("xlink:href", function(d, i) {
            return "#arc" + i;
        })*/
        .text(function(d) {
            return categories(d);
        })
	}
}